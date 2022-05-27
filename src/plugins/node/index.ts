/* eslint-disable @typescript-eslint/no-this-alias */

import { IComboNode, ID3Event, ISize, IXy } from '../../types/base-type';
// import { debounceCreator } from '../../lib/utils';
// import { mockEvent } from '../../lib/mock-event';
import { IData, ILink, ShopeeV } from '../..';
import { IPlugin } from '../../types/plugin';
import { Combo } from '../../combo';
import { Node } from '../../node';
import * as d3 from 'd3';

const defaultStartingState: ISize & IXy & { ox: number; oy: number } = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  ox: 0,
  oy: 0,
};

export class NodePlugin<T extends IData, L extends ILink> implements IPlugin<T, L> {
  private dashRect: d3.Selection<SVGRectElement, T, null, undefined>;
  private startingState = defaultStartingState;
  private shopeeV: ShopeeV<T, L>;
  private isMoving = false;
  private selectCombo: Combo<T>;
  private combo: Combo<T>;
  private selectedNodes: T[] = [];
  private moveR2 = 1; // r * r

  private clearDashRect() {
    this.dashRect?.remove?.();
    this.dashRect = null;
    this.isMoving = false;
    this.startingState = defaultStartingState;
  }

  getSelectedNodes() {
    return this.selectedNodes;
  }

  blurSelectedNodes = () => {
    if (this.selectedNodes.length === 0) return;

    this.shopeeV.node.getNodesSelection(this.selectedNodes).attr('select-node', null);
    this.onBlur?.(this.selectedNodes);
    this.selectCombo.clearCombo();
    this.selectedNodes = [];
    this.shopeeV.svg.on('click.node dblclick.node', null);
  };

  activeNode(node: T) {
    this.activeNodes([node]);
  }

  // getNodesSelection(nodes: T[]) {
  //   const classNames = nodes.map((d) => `g[g-id="${d.id}"]`).join(',');
  //   return this.shopeeV.group.selectAll<SVGGElement, T>(classNames);
  // }

  activeNodes(nodes: T[]) {
    if (this.selectedNodes.length) this.blurSelectedNodes();
    this.selectedNodes = nodes.map((n) => {
      return this.shopeeV.dataMap.getNodeFromMap(n.id);
    });

    if (this.selectedNodes.length === 0) return;

    this.shopeeV.node.getNodesSelection(this.selectedNodes).attr('select-node', true);

    if (this.isMultiSelection()) {
      this.selectCombo.updateData({ nodes: this.selectedNodes });
    }

    this.shopeeV.svg.on('click.node dblclick.node', this.blurSelectedNodes);
  }

  onClick: (e: MouseEvent, d: T) => void | boolean = null;
  onDblClick: (e: MouseEvent, d: T) => void = null;
  onBlur: (d: T[]) => void = null;
  onNodeMove: (e: ID3Event, d: T) => void = null;
  onContextMenu: (e: MouseEvent, d: T) => void = null;

  private moveDistanceLessThanMoveR(x: number, y: number) {
    return (
      Math.pow(x - this.startingState.x, 2) + Math.pow(y - this.startingState.y, 2) < this.moveR2
    );
  }

  private isMultiSelection() {
    return this.selectedNodes.length > 1;
  }

  private getComboFromNode(d: T) {
    const combo = this.shopeeV.combos.getComboByNode(d);
    if (combo) return combo;
    if (this.selectCombo.isActive(d)) return this.selectCombo;
  }

  private recordStartingState(d: T) {
    this.combo = this.getComboFromNode(d);
    let height = d.height;
    let width = d.width;
    let x = d.x;
    let y = d.y;

    if (this.combo?.isActive(d)) {
      const coord = this.combo?.getComboCoords();
      height = coord.height;
      width = coord.width;
      x = coord.minX;
      y = coord.minY;
    }

    this.startingState = { x, y, width, height, ox: d.x - x, oy: d.y - y };
  }

  dragEvent(group: d3.Selection<SVGGElement, T | IComboNode, SVGGElement, T>) {
    const option = this.shopeeV.getOpt();
    if (option.nodeConfig?.draggable === false) return;

    group.call(
      d3
        .drag<SVGGElement, T>()
        .clickDistance(option.nodeConfig.clickDistance)
        .on('start', (e, d) => {
          this.recordStartingState(d as T);
        })
        .on('drag', (event) => {
          if (!this.isMoving && this.moveDistanceLessThanMoveR(event.x, event.y)) return;
          this.isMoving = true;
          this.renderDashRect(event);
        })
        .on('end', (event, d) => {
          if (!this.isMoving && this.moveDistanceLessThanMoveR(event.x, event.y)) return;
          this.moveSelectedNodes(event, d as T);
          this.combo = null;
          this.clearDashRect();
        })
    );
  }

  private renderDashRect(event: ID3Event) {
    if (!this.dashRect) {
      this.dashRect = this.shopeeV.group
        .append('rect')
        .attr('class', 'shopee-v-dash-rect')
        .attr('rx', 10)
        .attr('ry', 10)
        .attr('stroke-width', 1)
        .attr('width', this.startingState.width)
        .attr('height', this.startingState.height);
    }

    this.dashRect.attr(
      'transform',
      `translate(${event.x - this.startingState.ox}, ${event.y - this.startingState.oy})`
    );
  }

  private updateNodesAfterDragEnd(event: ID3Event, d: T) {
    this.shopeeV.link.moveLinks(d);
    this.shopeeV.miniMap?.updateMiniMap();
    this.onNodeMove?.(event, d);
  }

  private moveSelectedNodes(event: ID3Event, d: T) {
    const isComboActive = this.combo?.isActive(d);
    const nodes = isComboActive ? this.combo.getNodes() : [d];
    const { x, y, ox, oy } = this.startingState;
    const offsetX = event.x - x - ox;
    const offsetY = event.y - y - oy;

    this.shopeeV.node.getNodesSelection(nodes).attr('transform', (d) => {
      d.x += offsetX;
      d.y += offsetY;
      this.updateNodesAfterDragEnd(event, d);
      return `translate(${d.x}, ${d.y})`;
    });

    if (isComboActive) {
      this.combo?.setComboTransform({ x: event.x - ox, y: event.y - oy });
    }
  }

  private event(group: d3.Selection<SVGGElement, T, SVGGElement, T>) {
    // const debounce = debounceCreator(200);
    group
      .on('click', (e: PointerEvent, d) => {
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

  private activeEvents = (group: d3.Selection<SVGGElement, T, SVGGElement, T>) => {
    this.event(group);
    this.dragEvent(group);
  };

  private deactivateEvents = (group: d3.Selection<SVGGElement, T, SVGGElement, T>) => {
    group.on('click', null).on('dblclick', null).on('contextmenu', null);
    group.call(d3.drag<SVGGElement, T>().on('start', null).on('drag', null).on('end', null));
  };

  public enableEvent = () => {
    const group = this.shopeeV.node.getAllGroups();
    this.shopeeV.getOpt().readonly ? this.deactivateEvents(group) : this.activeEvents(group);
  };

  private init(shopeeV: ShopeeV<T, L>) {
    this.shopeeV = shopeeV;
    const option = this.shopeeV.getOpt();

    this.selectCombo = new Combo<T>(this.shopeeV, {
      id: `select_${this.shopeeV.getId()}`,
      ...option.select,
    });

    option.nodeConfig ||= {};
    if (typeof option.nodeConfig.clickDistance !== 'number') {
      option.nodeConfig.clickDistance = 1;
    }

    this.moveR2 = Math.pow(option.nodeConfig.clickDistance, 2);
    Node.prototype.enableEvent = this.enableEvent;
  }

  active(shopeeV: ShopeeV<T, L>) {
    this.init(shopeeV);
    return this;
  }
}
