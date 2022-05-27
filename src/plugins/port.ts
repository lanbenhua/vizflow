/* eslint-disable @typescript-eslint/no-this-alias */
import { IData, ILink, IPortDetail, ISelectedPortDetail } from '../types/base-type';
import * as d3 from 'd3';
import { IPlugin } from '../types/plugin';
import { ShopeeV } from '..';
import { Port } from '../node/port';
import { debounceCreator } from '../lib/utils';

export class PortPlugin<T extends IData, L extends ILink> implements IPlugin<T, L> {
  private startPort: T & ISelectedPortDetail;
  private endPort: T & ISelectedPortDetail;
  private shopeeV: ShopeeV<T, L>;

  private dragPort(node: T) {
    const scope = this;
    return d3
      .drag<SVGCircleElement, IPortDetail>()
      .on('start', function (e, port) {
        d3.select(this).attr('start-point', 'true');
        const { cx, cy } = port;
        scope.shopeeV.moveLine.show();
        scope.shopeeV.moveLine.setStartPoint(cx + node.x, cy + node.y);
        scope.shopeeV.moveLine.setEndPoint(cx + node.x, cy + node.y);
      })
      .on('drag', (e, port) => {
        const { cx, cy } = port;
        this.shopeeV.moveLine.setEndPoint(e.x + cx + node.x, e.y + cy + node.y);
      })
      .on('end', function () {
        d3.select(this).node().removeAttribute('start-point');
        scope.shopeeV.moveLine.hide();
        if (!scope.endPort) return;
        scope.connected();
      });
  }

  private connected() {
    const _link = {
      from: { id: this.startPort.id, linkIndex: this.startPort.port.index },
      to: { id: this.endPort.id, linkIndex: this.endPort.port.index },
    } as L;

    const canConnect = this.onConnecting?.(_link);
    if (canConnect === false) return;
    const link = this.shopeeV.link.addLink(_link);
    if (link) this.onConnected?.(link);
  }

  onClick: (e: MouseEvent, d: T & ISelectedPortDetail) => void = null;
  onDblClick: (e: MouseEvent, d: T & ISelectedPortDetail) => void = null;
  onConnecting: (link: L) => boolean = null;
  onConnected: (link: L) => void;

  private activeEvent(
    circle: d3.Selection<SVGCircleElement, IPortDetail, SVGGElement, T>,
    node: T
  ) {
    const debounce = debounceCreator(this.shopeeV.getOpt().dblClickTimeInterval);
    circle
      .on('click', (e, d) => {
        if (this.onDblClick && this.onClick) {
          debounce.on(() => this.onClick(e, { ...node, port: d }));
          return;
        }
        this.onClick?.(e, { ...node, port: d });
      })
      .on('dblclick', (e, d) => {
        debounce.clear();
        this.onDblClick?.(e, { ...node, port: d });
      })
      .on('mousedown', (event, port) => {
        this.startPort = { ...node, port };
      })
      .on('mouseenter', (event, port) => {
        if (!this.startPort) return;
        this.endPort = { ...node, port };
      })
      .on('mouseleave', () => {
        this.endPort = null;
      });

    circle.call(this.dragPort(node));
  }

  private deactivateEvent(circle: d3.Selection<SVGCircleElement, IPortDetail, SVGGElement, T>) {
    circle
      .on('click', null)
      .on('dblclick', null)
      .on('mousedown', null)
      .on('mouseenter', null)
      .on('mouseleave', null);

    circle.call(
      d3.drag<SVGCircleElement, IPortDetail>().on('start', null).on('drag', null).on('end', null)
    );
  }

  public enableEvent() {
    const scope = this;
    this.shopeeV.node.getAllGroups().each(function (node) {
      const circle = d3
        .select<SVGGElement, T>(this)
        .selectAll<SVGCircleElement, IPortDetail>('circle.shopee-v-port');
      scope.enableEventSinglePort(circle, node);
    });
  }

  private enableEventSinglePort = (
    circle: d3.Selection<SVGCircleElement, IPortDetail, SVGGElement, T>,
    node: T
  ) => {
    this.shopeeV.getOpt().readonly ? this.deactivateEvent(circle) : this.activeEvent(circle, node);
  };

  active(shopeeV: ShopeeV<T, L>) {
    this.shopeeV = shopeeV;
    Port.prototype.enableEvent = this.enableEventSinglePort;
    return this;
  }
}
