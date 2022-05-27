import { IData, ILink, ShopeeV } from '../index';
// import { debounceCreator } from '../lib/utils';
// import { mockEvent } from '../lib/mock-event';
import { IPlugin } from '../types/plugin';
import { Link } from '../link';
import * as d3 from 'd3';

export class LinkPlugin<T extends IData, L extends ILink> implements IPlugin<T, L> {
  private shopeeV: ShopeeV<T, L>;
  private selectedLinks: L[] = [];

  private event(group: d3.Selection<d3.BaseType, L, SVGGElement, T>) {
    // const debounce = debounceCreator(200);
    group
      .on('click', (e, d) => {
        // if (this.onDblClick && this.onClick) {
        //   if (mockEvent.start(e)) return;
        //   debounce.on(() => {
        //     this.onClick(e, d);
        //     mockEvent.end(e);
        //   });
        //   return;
        // }
        this.onClick?.(e, d);
      })
      .on('dblclick', (e, d) => {
        // debounce.clear();
        this.onDblClick?.(e, d);
      })
      .on('contextmenu', (e, d) => this.onContextMenu?.(e, d));
  }

  onContextMenu: (e: MouseEvent, d: L) => void = null;
  onDblClick: (e: MouseEvent, d: L) => void = null;
  onClick: (e: MouseEvent, d: L) => void = null;
  onMouseEnter: (e: MouseEvent, d: L) => void = null;
  onMouseMove: (e: MouseEvent, d: L) => void = null;
  onMouseLeave: (e: MouseEvent, d: L) => void = null;

  private blurSelectedNodes = () => {
    this.selectedLinks = this.selectedLinks.filter((d) => {
      this.shopeeV.link.getLinkSelection(d).dispatch('link-blur');
      return false;
    });

    if (this.selectedLinks.length === 0) {
      this.shopeeV.svg.on('click.link', null);
    }
  };

  getSelectedLinks() {
    return this.selectedLinks;
  }

  activeLink(link: L, autoBlur = true) {
    this.activeLinks([link], autoBlur);
  }

  activeLinks(links: L[], autoBlur = true) {
    if (this.selectedLinks.length) this.blurSelectedNodes();
    this.selectedLinks = links;
    this.selectedLinks.map((d) => {
      const g = this.shopeeV.link
        .getLinkSelection(d)
        .attr('select-link', true)
        .on('link-blur', () => g.removeAttribute('select-link'))
        .node();
    });

    if (!autoBlur) return;
    this.shopeeV.svg.on('click.link', this.blurSelectedNodes);
  }

  private bindHoverEvent(group: d3.Selection<d3.BaseType, L, SVGGElement, T>) {
    if (!this.shopeeV.getOpt().linkConfig?.renderUDTooltipForeignObject) return;

    return group
      .on('mouseenter', (e, d) => {
        this.shopeeV.link.tooltips.renderUDTooltipForeignObject(d);
        this.shopeeV.link.tooltips.updatePosition(e);
        this.onMouseEnter?.(e, d);
      })
      .on('mousemove', (e, d) => {
        this.shopeeV.link.tooltips.updatePosition(e);
        this.onMouseMove?.(e, d);
      })
      .on('mouseleave', (e, d) => {
        this.shopeeV.link.tooltips.removeTooltip(d.id);
        this.onMouseLeave?.(e, d);
      });
  }

  private activeEvents = (group: d3.Selection<d3.BaseType, L, SVGGElement, T>) => {
    this.event(group);
  };

  private deactivateEvents = (group: d3.Selection<d3.BaseType, L, SVGGElement, T>) => {
    group.on('click', null).on('dblclick', null).on('contextmenu', null);
  };

  public enableEvent = () => {
    const group = this.shopeeV.link.getAllGroups();
    this.shopeeV.getOpt().readonly ? this.deactivateEvents(group) : this.activeEvents(group);
    this.bindHoverEvent(group);
  };

  active(shopeeV: ShopeeV<T, L>) {
    this.shopeeV = shopeeV;
    Link.prototype.enableEvent = this.enableEvent;
    return this;
  }
}
