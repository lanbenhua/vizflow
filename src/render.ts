/* eslint-disable @typescript-eslint/no-this-alias */
import * as d3 from 'd3';

import { ELineType, IData, ILink, IShopeeUpdateData, IShopeeV } from './types/base-type';
import { defaultNodeHeight, defaultNodeWidth } from './lib/constant';
import { normalizeLinkConfig, uniqueId } from './lib/utils';
import { createGlobalDefs, createMarker } from './marker';
import { globalState } from './lib/global-state';
import { MoveLine } from './link/move-line';
import { DataMap } from './lib/data-map';
import { MiniMap } from './minimap';
import { Link } from './link';
import { Node } from './node';
import './index.less';

export class ShopeeVBase<T extends IData = IData, L extends ILink = ILink> {
  public group: d3.Selection<SVGGElement, T, null, undefined>;
  public linkGroup: d3.Selection<SVGGElement, T, null, undefined>;
  public comboGroup: d3.Selection<SVGGElement, T, null, undefined>;
  public svg: d3.Selection<SVGSVGElement, T, null, undefined>;
  public defs = createGlobalDefs();
  public miniMap: MiniMap<T>;
  public moveLine: MoveLine<T>;
  protected option: IShopeeV<T, L>;
  public link: Link<L, T>;
  public node: Node<T>;
  public dataMap: DataMap<T, L>;
  private renderOnce = false;
  private id = uniqueId();
  private alterNumber = 0;

  constructor(shopeeVOption: IShopeeV<T, L>) {
    this.option = {
      defaultNodeHeight,
      defaultNodeWidth,
      markerHeight: 8,
      markerWidth: 10,
      ...shopeeVOption,
      linkConfig: normalizeLinkConfig(shopeeVOption.linkConfig),
    };

    this.option.links = this.option.links || [];
    this.option.nodes = this.option.nodes || [];

    if (typeof this.option.dblClickTimeInterval !== 'number') {
      this.option.dblClickTimeInterval = 200;
    }

    this.dataMap = new DataMap(this);
    this.init();
  }

  isInLayout() {
    return globalState.isBusy(this.id);
  }

  inLayoutError() {
    return new Error("Can't add / delete / update node or link during layout");
  }

  getId() {
    return this.id;
  }

  getOpt() {
    return this.option;
  }

  protected initPlugins() {
    // to do...
  }

  protected setReadOnly: (r: boolean) => void;
  protected init() {
    if (this.svg) return;
    this.createSvg().createMarker().initPlugins();
  }

  private createSvg() {
    this.svg = d3
      .create('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr(
        'class',
        `shopee-v-svg ${this.option.svgClassName || ''} ${this.option.readonly ? 'readonly' : ''}`
      );

    this.option.parent.className += ' shopee-v-svg-parent';
    this.option.parent.appendChild(this.svg.node());
    return this;
  }

  getSVGSize() {
    return this.svg.node().getBoundingClientRect();
  }

  getCurrentTransform() {
    return d3.zoomTransform(this.svg.node());
  }

  private createNodeMap(deNormalize = false) {
    this.dataMap.createNodeMap(deNormalize);
    this.dataMap.createLinkMap();
    return this;
  }

  private createElement() {
    if (!this.group) {
      this.group = this.svg.append('g').attr('class', 'shopee-v-root-group');
      this.linkGroup = this.group.append('g').attr('class', 'shopee-v-link-root-group');
      this.comboGroup = this.group.append('g').attr('class', 'shopee-v-combo-group');
    }

    this.moveLine = new MoveLine(this);
    this.node = new Node(this);
    this.link = new Link(this);
    return this;
  }

  public createMarker(ids?: string[]) {
    const width = this.option.markerWidth * 2;
    const refX = this.option.linkConfig?.lineType === ELineType.C ? 0 : width;
    createMarker(this.defs)(width, this.option.markerHeight * 2, ids, refX);
    return this;
  }

  getData() {
    return { links: this.option.links, nodes: this.option.nodes };
  }

  private renderNodesAndLinks(deNormalize: boolean) {
    return this.createElement()
      .createNodeMap(deNormalize)
      .node.render()
      .then(() => {
        return this.link.render();
      });
  }

  private createMiniMap() {
    if (!this.option.miniMap) return;
    if (!this.miniMap) this.miniMap = new MiniMap(this);
  }

  plusAlterNumber() {
    this.alterNumber++;
  }

  minusAlterNumber() {
    this.alterNumber--;
  }

  isAltering() {
    return this.alterNumber > 0;
  }

  isRendered() {
    return this.renderOnce;
  }

  protected afterRender() {
    if (this.isRendered()) {
      return this.miniMap?.updateMiniMap();
    }
    this.createMiniMap();
  }

  updateData(data: IShopeeUpdateData<T, L>) {
    if (this.isInLayout()) return Promise.reject(this.inLayoutError());
    return this.__unsafeUpdateData(data);
  }

  private updateOption({ nodes, links, comboGroups }: IShopeeUpdateData<T, L>) {
    if (comboGroups) this.option.combo = { ...this.option.combo, comboGroups };
    this.option = { ...this.option, nodes, links };
  }

  __unsafeUpdateData(data: IShopeeUpdateData<T, L>, deNormalize = true) {
    this.updateOption(data);
    this.plusAlterNumber();
    return this.__unsafeRender(deNormalize).finally(() => {
      this.minusAlterNumber();
    });
  }

  render() {
    return this.__unsafeRender();
  }

  __unsafeRender(deNormalize = true) {
    return this.renderNodesAndLinks(deNormalize).then(() => {
      this.afterRender();
      this.renderOnce = true;
    });
  }
}
