import { IData, ILink, ISVGForeignObjectLinkElementSelection } from '../types/base-type';
import { EDGE_TOOLTIP_ROOT } from '../lib/constant';
import { ShopeeVBase } from '../render';
import * as d3 from 'd3';

export class ToolTips<T extends ILink> {
  protected shopeeV: ShopeeVBase<IData, T>;

  constructor(shopeeV: ShopeeVBase<IData, T>) {
    this.shopeeV = shopeeV;
  }

  public getTooltipSelection(): ISVGForeignObjectLinkElementSelection<T> {
    const divTooltip = d3.select<HTMLDivElement, T>(`.${EDGE_TOOLTIP_ROOT}`);
    if (!divTooltip.empty()) return divTooltip;
    return d3.select<HTMLDivElement, T>('body').append('div').attr('class', EDGE_TOOLTIP_ROOT);
  }

  public removeTooltip(id: string) {
    const tooltip = d3.select<HTMLDivElement, T>(`.${EDGE_TOOLTIP_ROOT}`);
    if (tooltip.empty()) return;
    const datum = tooltip.datum();
    if (datum && datum.id === id) tooltip.remove();
  }

  public updatePosition(e: { x: number; y: number }) {
    const [offsetX, offsetY] = this.shopeeV.getOpt().linkConfig.tooltipOffset;

    this.getTooltipSelection()
      .style('top', `${e.y}px`)
      .style('left', `${e.x}px`)
      .style('transform', `translate(${offsetX}, ${offsetY})`);
  }

  public renderUDTooltipForeignObject(l: T) {
    const option = this.shopeeV.getOpt();
    if (!option.linkConfig?.renderUDTooltipForeignObject) return;
    option.linkConfig.renderUDTooltipForeignObject(this.getTooltipSelection().data([l]));
    this.getTooltipSelection().style('display', 'block');
  }
}
