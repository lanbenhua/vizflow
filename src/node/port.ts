import { IData, IPortDetail } from '../types/base-type';
import { ShopeeVBase } from '../render';
import * as d3 from 'd3';

export class Port<T extends IData> {
  private shopeeV: ShopeeVBase<T>;

  constructor(shopeeV: ShopeeVBase<T>) {
    this.shopeeV = shopeeV;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enableEvent(circle: d3.Selection<SVGCircleElement, IPortDetail, SVGGElement, T>, node: T) {
    // left for plugin implement
  }

  private renderPort(g: d3.Selection<SVGGElement, T, HTMLElement, undefined>, node: T) {
    const ports = node.ports as IPortDetail[];
    const option = this.shopeeV.getOpt();
    const circle = g
      .selectAll<SVGCircleElement, T>('circle')
      .data(ports)
      .join('circle')
      .attr('r', (d) => d.r || option.defaultPortR || 5)
      .attr('class', (d) => `shopee-v-port ${option.portClassName || ''} ${d.className || ''}`)
      .attr('id', (d, index) => `p${node.id}_${index}`)
      .attr('style', (d) => d.style)
      .attr('cx', (d, index) => {
        d.cx = node.width * d.x;
        d.index = index;
        return d.cx;
      })
      .attr('cy', (d) => {
        d.cy = node.height * d.y;
        return d.cy;
      });
    this.enableEvent(circle, node);
  }

  public render(group: d3.Selection<d3.BaseType, T, SVGGElement, T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const scope = this;
    group.each(function (node) {
      scope.renderPort(d3.select<SVGGElement, T>(this as SVGGElement), node);
    });
    return this;
  }
}
