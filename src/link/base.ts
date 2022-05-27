import { ELineType, IData, IInternalLink, ILink, IOffsetValue } from '../types/base-type';
import { createRangeKey, getDefaultPorts } from '../lib/utils';
import { ShopeeVBase } from 'src/render';
import * as d3 from 'd3';

import {
  bezierController,
  createOffset,
  getLinkGroup,
  getLinkId,
  bezier,
  getQuadraticCurveCp,
} from './constant';

export class BaseLink<T extends ILink, N extends IData> {
  protected offset: Record<string, IOffsetValue>;
  protected shopeeV: ShopeeVBase<N, T>;
  protected linkGroups: Record<string, T[]> = {};
  private lineMap: Record<ELineType, (link: T, from: N, to: N) => d3.Path>;

  constructor(shopeeV: ShopeeVBase<N, T>) {
    this.shopeeV = shopeeV;
    this.initOffset();

    this.lineMap = {
      [ELineType.S]: this.createStraightLine,
      [ELineType.C]: this.createCurveBezierPath,
      [ELineType.M]: this.createMultipleLine,
    };
  }

  private initOffset() {
    const option = this.shopeeV.getOpt();
    const width = option.linkConfig?.lineType === ELineType.C ? option.markerWidth : 0;
    this.offset = createOffset(width);
  }

  protected getLinkPath(link: T, from: N, to: N) {
    if (from.id === to.id) return this.createCycle(from, to);

    const linkType = this.shopeeV.getOpt().linkConfig?.lineType;
    return this.lineMap[linkType](link, from, to);
  }

  getLinksSelection(links: T[]) {
    const classNames = links.map((d) => `g[linkId=${this.getLinkId(d)}]`).join(',');
    return this.shopeeV.linkGroup.selectAll<SVGGElement, N>(classNames);
  }

  private createCurveBezierPath = (link: T, from: N, to: N) => {
    const fPort = from.ports[Number(link.from.linkIndex)];
    const tPort = to.ports[Number(link.to.linkIndex)];
    const fKey = createRangeKey(fPort);
    const tKey = createRangeKey(tPort);

    const linkSource = {
      x: from.x + fPort.x * from.width,
      y: from.y + fPort.y * from.height,
    };

    const linkTarget = {
      x: to.x + this.offset[tKey].to.x(to.width, tPort.x),
      y: to.y + this.offset[tKey].to.y(to.height, tPort.y),
    };

    const path = d3.path();
    path.moveTo(linkSource.x, linkSource.y);

    const cp = {
      p1: bezier[fKey].p1,
      p2: bezier[tKey].p2,
    };

    const option = this.shopeeV.getOpt();
    const bezierCp = option.linkConfig?.bezierController
      ? option.linkConfig.bezierController(linkSource, linkTarget, cp)
      : bezierController(linkSource, linkTarget, cp);

    path.bezierCurveTo(
      linkSource.x + bezierCp.p1.x,
      linkSource.y + bezierCp.p1.y,
      linkTarget.x + bezierCp.p2.x,
      linkTarget.y + bezierCp.p2.y,
      linkTarget.x,
      linkTarget.y
    );

    return path;
  };

  private portCenterDistance(node: N) {
    const option = this.shopeeV.getOpt();
    return typeof option.linkConfig?.portCenterDistance === 'function'
      ? option.linkConfig?.portCenterDistance(node)
      : option.linkConfig?.portCenterDistance;
  }

  private createCycle(from: N, to: N) {
    // fixed ports
    const ports = getDefaultPorts();
    const fPort = ports[1];
    const tPort = ports[2];
    const fKey = createRangeKey(fPort);
    const tKey = createRangeKey(tPort);
    // from and to is the same
    const width = from.width;
    const height = from.height;

    const linkSource = {
      x: from.x + fPort.x * from.width,
      y: from.y + fPort.y * from.height,
    };

    const linkTarget = {
      x: to.x + this.offset[tKey].to.x(width, tPort.x),
      y: to.y + this.offset[tKey].to.y(height, tPort.y),
    };

    const rad = Math.atan2(linkTarget.y - linkSource.y, linkTarget.x - linkSource.x);
    const angle1 = Math.PI / 2 - rad;
    const minOffset = Math.min(width, height);
    const cPt1 = {
      x: linkSource.x + bezier[fKey].p1.x + minOffset * Math.cos(angle1),
      y: linkSource.y + bezier[fKey].p1.y - minOffset * Math.sin(angle1),
    };

    const cPt2 = {
      x: linkTarget.x + bezier[tKey].p2.x,
      y: linkTarget.y + bezier[tKey].p2.y - (width / 2) * Math.tan(rad),
    };

    const path = d3.path();
    path.moveTo(linkSource.x, linkSource.y);
    // for debug
    // path.lineTo(cPt1.x, cPt1.y);
    // path.lineTo(cPt2.x, cPt2.y);
    // path.lineTo(linkTarget.x, linkTarget.y);
    // path.moveTo(linkSource.x, linkSource.y);
    path.bezierCurveTo(cPt1.x, cPt1.y, cPt2.x, cPt2.y, linkTarget.x, linkTarget.y);

    return path;
  }

  private getSourceAndTarget(link: T, from: N, to: N) {
    const fPort = from.ports[Number(link.from.linkIndex)];
    const tPort = to.ports[Number(link.to.linkIndex)];

    const linkSource = {
      x: from.x + fPort.x * from.width,
      y: from.y + fPort.y * from.height,
    };

    const linkTarget = {
      x: to.x + tPort.x * to.width,
      y: to.y + tPort.y * to.height,
    };

    const rad = Math.atan2(linkTarget.y - linkSource.y, linkTarget.x - linkSource.x);
    // calculation: https://stackoverflow.com/questions/38218338/how-to-get-the-marker-end-position-in-svg
    const spcd = this.portCenterDistance(from);
    const sr = spcd || 0;
    const sourceX = linkSource.x + sr * Math.cos(rad);
    const sourceY = linkSource.y + sr * Math.sin(rad);

    const tpcd = this.portCenterDistance(to);
    const tr = tpcd || 0;
    const targetX = linkTarget.x - tr * Math.cos(rad);
    const targetY = linkTarget.y - tr * Math.sin(rad);

    return { sourceX, sourceY, targetX, targetY, rad };
  }

  private createMultipleLine = (link: T, from: N, to: N) => {
    const { linksNumber, nlg } = this.getLinkGroup(link);
    const linkMiddleIndex = linksNumber >> 1;
    const isEven = (linksNumber & 1) === 0;

    const { sourceX, sourceY, targetX, targetY, rad } = this.getSourceAndTarget(link, from, to);

    const path = d3.path();
    path.moveTo(sourceX, sourceY);

    if (linksNumber <= 1) {
      path.lineTo(targetX, targetY);
      return path;
    }

    const halfHypotenuse =
      Math.sqrt(Math.pow(targetX - sourceX, 2) + Math.pow(targetY - sourceY, 2)) / 2;

    const _link = link as IInternalLink;
    if (typeof _link.multipleLinksindex !== 'number') {
      _link.multipleLinksindex = nlg.findIndex((l) => l === link);
    }

    const { cpHypotenuse, cpRad } = getQuadraticCurveCp(
      halfHypotenuse,
      linkMiddleIndex,
      isEven,
      _link.multipleLinksindex,
      this.shopeeV.getOpt().linkConfig
    );

    const r = rad + cpRad;
    const cpX = sourceX + cpHypotenuse * Math.cos(r);
    const cpY = sourceY + cpHypotenuse * Math.sin(r);

    path.quadraticCurveTo(cpX, cpY, targetX, targetY);
    return path;
  };

  private createStraightLine = (link: T, from: N, to: N) => {
    const { sourceX, sourceY, targetX, targetY } = this.getSourceAndTarget(link, from, to);
    const path = d3.path();
    path.moveTo(sourceX, sourceY);
    path.lineTo(targetX, targetY);

    return path;
  };

  getLinkId = (link: T) => {
    return getLinkId(this.shopeeV.getId(), link, this.shopeeV.getOpt().portSensitive);
  };

  protected getLinkSelectionId = (link: T) => {
    return `g.shopee-v-link-group[linkId=${this.getLinkId(link)}]`;
  };

  protected groupByLinks() {
    this.linkGroups = {};
    const links = this.shopeeV.getOpt().links;
    links.forEach(this.setGroupLink);
  }

  protected setGroupLink = (link: T) => {
    const { nlg } = this.getLinkGroup(link);
    if (nlg.length > 0 && this.shopeeV.getOpt().linkConfig?.supportMultipleLinks === false) {
      throw new Error(
        'Please set `linkConfig.supportMultipleLinks: true` if you want to support multiple links between two ports'
      );
    }
    nlg.push(link);
  };

  protected getLinkGroup(link: T) {
    const from = this.shopeeV.dataMap.getNodeFromMap(link.from.id);
    const to = this.shopeeV.dataMap.getNodeFromMap(link.to.id);
    return getLinkGroup(from, to, link, this.linkGroups);
  }
}
