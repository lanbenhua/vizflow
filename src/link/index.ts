/* eslint-disable @typescript-eslint/no-this-alias */
import * as d3 from 'd3';

import { createCustomMarker, getMarkerStyleId } from '../marker/constant';
import { NodeId, ILink, IData } from '../types/base-type';
import { loopDetect } from '../lib/graph';
import { removeMarker } from '../marker';
import { ShopeeVBase } from '../render';
import { ToolTips } from './tooltips';
import { BaseLink } from './base';
import { createLinkId } from './constant';

export class Link<T extends ILink, N extends IData> extends BaseLink<T, N> {
  public tooltips: ToolTips<T>;

  constructor(shopeeV: ShopeeVBase<N, T>) {
    super(shopeeV);
    this.tooltips = new ToolTips<T>(this.shopeeV);
  }

  moveLinks(d: N) {
    this.shopeeV.linkGroup
      .selectAll(`g.shopee-v-link-group[to="${d.id}"],g.shopee-v-link-group[from="${d.id}"]`)
      .selectAll<SVGPathElement, T>('path')
      .attr('d', (link) => {
        const path = this.getLinkPath(
          link,
          this.shopeeV.dataMap.getNodeFromMap(link.from.id),
          this.shopeeV.dataMap.getNodeFromMap(link.to.id)
        );
        return path.toString();
      });
  }

  addLink(_link: T) {
    if (this.shopeeV.isInLayout()) throw this.shopeeV.inLayoutError();
    const { links, disableLoop } = this.shopeeV.getOpt();
    const exist = this.shopeeV.dataMap.getLinkFromMap(_link);
    if (exist && this.shopeeV.getOpt().linkConfig?.supportMultipleLinks === false) return;
    if (disableLoop && loopDetect([_link, ...links], _link.from.id)) {
      return;
    }

    const link = this.shopeeV.dataMap.addOrUpdataLink(_link);
    this.render();
    return link;
  }

  public getLinkSelection(link: T) {
    return this.shopeeV.linkGroup.select<SVGGElement>(this.getLinkSelectionId(link));
  }

  private removeLinkAttr(id: string) {
    const { styleDomId, markerDomId } = getMarkerStyleId(id);
    removeMarker(this.shopeeV.defs, markerDomId);
    d3.select(document.head).selectAll(styleDomId).remove();
  }

  updateLinkAttr(link: T) {
    return this.updateLinksAttr([link]);
  }

  updateLinksAttr(links: T[]) {
    if (this.shopeeV.isInLayout()) throw this.shopeeV.inLayoutError();

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      if (this.shopeeV.dataMap.getLinkFromMap(link)) continue;
      throw new Error(`the link id: \`${this.getLinkId(link)}\` is not exist!`);
    }

    this.shopeeV.dataMap.addOrUpdataLinks(links);
    this.render();
  }

  deleteLink(_id: T | string) {
    if (this.shopeeV.isInLayout()) throw this.shopeeV.inLayoutError();

    const id =
      typeof _id === 'string' ? createLinkId(this.shopeeV.getId(), _id) : this.getLinkId(_id as T);

    this.shopeeV.dataMap.deleteLinkFromMap(id);

    this.deleteLinkRelevantDom(id);
    this.render();
  }

  private deleteLinkRelevantDom(id: string) {
    this.tooltips.removeTooltip(id);
    this.removeLinkAttr(id);
  }

  deleteLinkFromNode(nodeId: NodeId) {
    if (this.shopeeV.isInLayout()) throw this.shopeeV.inLayoutError();
    const needToBeDeleted = this.shopeeV.dataMap.deleteLinkFromNode(nodeId);
    needToBeDeleted.forEach((link) => this.deleteLinkRelevantDom(link.id));

    this.render();
  }

  enableEvent() {
    // left for plugin implement
  }

  private setGroup(group: d3.Selection<d3.BaseType, T, SVGGElement, N>, link: T) {
    group
      .attr('from', link.from.id)
      .attr('to', link.to.id)
      .attr('linkId', this.getLinkId(link))
      .attr('class', `shopee-v-link-group`);
    return group;
  }

  private setLinkMarkerStyle(link: T) {
    if (!link.attr?.markerStyle) return;
    const id = this.getLinkId(link);
    const { styleDomId, styleId, markerDomId, markerId } = getMarkerStyleId(id);
    d3.select(document.head)
      .selectAll<HTMLStyleElement, T>(styleDomId)
      .data([styleId])
      .join('style')
      .attr('id', (id) => id)
      .attr('shopeevid', this.shopeeV.getId())
      .attr('belongstosvg', 'true')
      .text(
        `${markerDomId} { ${link.attr.markerStyle} } ${createCustomMarker(
          this.getLinkSelectionId(link),
          `${markerDomId}`
        )} `
      );

    this.shopeeV.createMarker([markerId]);
  }

  private drawLinkInGroup(group: d3.Selection<d3.BaseType, T, SVGGElement, N>, link: T) {
    const from = this.shopeeV.dataMap.getNodeFromMap(link.from.id);
    const to = this.shopeeV.dataMap.getNodeFromMap(link.to.id);
    const path = this.getLinkPath(link, from, to).toString();
    this.setGroup(group, link);

    const twoLinks = [
      {
        ...link,
        style: null as string,
        class: 'invisible-link',
      },
      {
        ...link,
        id: null as string,
        style: link.attr?.pathStyle,
        class: `${this.shopeeV.getOpt().linkClassName || ''}`,
      },
    ];

    group
      .selectAll('path')
      .data(twoLinks)
      .join('path')
      .attr('d', path)
      .attr('id', (l) => l.id)
      .attr('style', (l) => l.style)
      .attr('class', (l) => `shopee-v-link ${l.class}`);

    this.setLinkMarkerStyle(link);
    this.setText(link);
  }

  private setText(link: T) {
    if (!link.attr?.text) return;
    this.getLinkSelection(link)
      .selectAll('text')
      .data([link.attr])
      .join('text')
      .attr('style', link.attr.textStyle)
      .style('text-anchor', link.attr.textAnchor || 'middle')
      .attr('letter-spacing', link.attr.letterSpacing)
      .attr('textLength', link.attr.textLength)
      .attr('lengthAdjust', link.attr.lengthAdjust)
      .selectAll('textPath')
      .data(['textPath'])
      .join('textPath')
      .attr('alignment-baseline', link.attr.alignmentBaseline || 'after-edge')
      .attr('href', `#${this.getLinkId(link)}`)
      .attr('startOffset', '50%')
      .text(link.attr.text);
  }

  getAllGroups() {
    return this.shopeeV.linkGroup.selectAll<SVGGElement, T>('g.shopee-v-link-group');
  }

  private createGroups() {
    return this.getAllGroups().data(this.shopeeV.getOpt().links, this.getLinkId).join('g');
  }

  private renderAll(gs: d3.Selection<d3.BaseType, T, SVGGElement, N>) {
    const scope = this;
    gs.each(function (link) {
      scope.drawLinkInGroup(d3.select(this), link);
    });

    this.enableEvent();
  }

  render() {
    this.groupByLinks();
    this.renderAll(this.createGroups());
    this.shopeeV.miniMap?.updateMiniMap();
    return this;
  }
}
