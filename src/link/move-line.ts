import { IData } from '../types/base-type';
import { ShopeeVBase } from '../render';
import * as d3 from 'd3';

export class MoveLine<T extends IData> {
  private line: d3.Selection<SVGLineElement, T, null, undefined>;
  private shopeeV: ShopeeVBase<T>;

  constructor(shopeeV: ShopeeVBase<T>) {
    this.shopeeV = shopeeV;
  }

  render() {
    this.line = this.shopeeV.group
      .append('line')
      .attr('class', 'shopee-v-connect-move-line')
      .attr('stroke-width', 1);
  }

  setStartPoint(x: number, y: number) {
    this.line.attr('x1', x).attr('y1', y);
  }

  setEndPoint(x: number, y: number) {
    this.line.attr('x2', x).attr('y2', y);
  }

  hide() {
    this.shopeeV.svg.attr('mode', 'not-connecting');
    this.line.attr('style', 'visibility: hidden');
    this.line.remove();
    this.line = null;
  }

  show() {
    if (!this.line) this.render();
    this.shopeeV.svg.attr('mode', 'connecting');
    this.line.attr('style', 'visibility: visible');
  }
}
