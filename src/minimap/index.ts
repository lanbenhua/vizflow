import { getViewBoxBounding, getGroupBounding, getMinimapRect } from './utils';
import { I22Number, IData, IMinimapContainer } from '../types/base-type';
import { ShopeeVBase } from '../render';
import { debounce } from '../lib/utils';
import { Brush } from '../lib/brush';
import { D3BrushEvent } from 'd3';
import { ShopeeV } from '..';
import * as d3 from 'd3';

export class MiniMap<T extends IData> extends Brush<T> {
  private shopeeV: ShopeeV<T>;
  private svg: d3.Selection<SVGElement, T, null, undefined>;
  private brushByZoom: boolean;
  private container: IMinimapContainer;
  public updateMiniMap: () => void;

  constructor(shopeeV: ShopeeVBase<T>) {
    super();
    this.shopeeV = shopeeV as ShopeeV<T>;
    // to improve minimap performance
    this.updateMiniMap = debounce(this.createMiniMap, 200);
    this.initMiniMap();
  }

  private initMiniMap() {
    this.container = this.createMiniMapContainer();
    this.createMiniMap();
  }

  private createMiniMap = () => {
    this.svg?.node().remove();
    this.setExtent(null);
    this.createMiniSvg();
    this.moveBrushByZoom(this.shopeeV.getCurrentTransform());
    this.container.node.append(this.svg.node());
    this.shopeeV.getOpt().parent.append(this.container.node);
  };

  private createMiniMapContainer(): IMinimapContainer {
    const { width, height } = getMinimapRect(this.shopeeV.getOpt().miniMap);
    const node = document.createElement('div');
    node.className = 'shopee-v-minimap-parent';
    node.style.width = `${width}px`;
    node.style.height = `${height}px`;
    return { node, size: { width, height }, aspectRatio: height / width };
  }

  protected afterCreateBrush(rect: I22Number) {
    this.brush.move(this.gBrush, rect);

    this.gBrush.selectAll('.handle').remove();
    this.gBrush.selectAll('.overlay').remove();
  }

  moveBrushByZoom(trans: d3.ZoomTransform) {
    this.brushByZoom = true;
    const { x, y, k } = trans;
    const brushRect = this.shopeeV.getSVGSize();
    const rect: I22Number = [
      [-x / k, -y / k],
      [(brushRect.width - x) / k, (brushRect.height - y) / k],
    ];
    this.createBrush(rect);
    this.afterCreateBrush(rect);
    this.brushByZoom = false;
  }

  protected onBrush(e: D3BrushEvent<T>) {
    if (this.brushByZoom) return;
    const [[brushX, brushY]] = e.selection as I22Number;
    this.shopeeV.zoomPlugin?.zoomByBrush(brushX, brushY);
  }

  protected onEnd() {
    this.shopeeV.zoomPlugin?.showLink();
  }

  private hideLinkText() {
    if (!this.shopeeV.getOpt()?.miniMap?.hideLinkText) return;
    this.svg.selectAll('g.shopee-v-link-group text').remove();
  }

  private createMiniSvg() {
    this.svg = d3.select<SVGElement, T>(this.shopeeV.svg.node().cloneNode(true) as SVGGElement);
    this.hideLinkText();
    this.svg.select('g.shopee-v-root-group').attr('transform', null);

    const vb = getViewBoxBounding(
      this.shopeeV.getSVGSize(),
      getGroupBounding(this.shopeeV.getData().nodes),
      this.container.aspectRatio,
      this.shopeeV.getOpt().miniMap.margin
    );

    this.svg.attr('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`);
    this.svg.attr('preserveAspectRatio', 'xMinYMin meet');
    // this.svg.attr('preserveAspectRatio', 'xMidYMid meet');

    this.initGBrush(this.svg, true).attr('class', 'brush-group');
    this.setExtent(vb.extent);
  }
}
