import { IData, NodeId } from '../types/base-type';
import { setNodeSize } from '../lib/utils';
import { ShopeeVBase } from '../render';
import { Port } from './port';
import * as d3 from 'd3';

export class Node<T extends IData> {
  private f: d3.Selection<HTMLDivElement, T, SVGGElement, T>;
  private shopeeV: ShopeeVBase<T>;
  public port: Port<T>;

  constructor(shopeeV: ShopeeVBase<T>) {
    this.port = new Port(shopeeV);
    this.shopeeV = shopeeV;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  enableEvent(group: d3.Selection<SVGGElement, T, SVGGElement, T>) {
    // left for plugin implement
  }

  private createOneGroup(node: T) {
    return this.shopeeV.group.append('g').data([node]);
  }

  getNodesSelection(nodes: T[]) {
    const classNames = nodes.map((d) => `g[g-id="${d.id}"]`).join(',');
    return this.shopeeV.group.selectAll<SVGGElement, T>(classNames);
  }

  updateNodes(nodes: T[]) {
    if (this.shopeeV.isInLayout()) return Promise.reject(this.shopeeV.inLayoutError());

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      if (this.shopeeV.dataMap.getNodeFromMap(node.id)) continue;
      return Promise.reject(new Error(`the node id: \`${node.id}\` is not exist!`));
    }

    const newNodes = this.shopeeV.dataMap.addOrUpdateNodes(nodes);
    this.shopeeV.plusAlterNumber();
    return this.renderAll(this.getNodesSelection(newNodes).data(newNodes))
      .then(() => {
        newNodes.forEach((node) => this.shopeeV.link.moveLinks(node));
      })
      .finally(() => {
        this.shopeeV.minusAlterNumber();
      });
  }

  updateNode(node: T) {
    return this.updateNodes([node]);
  }

  addNode(node: T) {
    if (this.shopeeV.isInLayout()) return Promise.reject(this.shopeeV.inLayoutError());

    if (this.shopeeV.dataMap.getNodeFromMap(node.id)) {
      return Promise.reject(new Error(`the node id: \`${node.id}\` is exist!`));
    }

    const { x, y, k } = d3.zoomTransform(this.shopeeV.svg.node());
    if (typeof node.x === 'number') node.x = (node.x - x) / k;
    if (typeof node.y === 'number') node.y = (node.y - y) / k;

    const newNode = this.shopeeV.dataMap.addOrUpdateNode(node);
    this.shopeeV.plusAlterNumber();
    return this.renderAll(this.createOneGroup(newNode)).finally(() => {
      this.shopeeV.minusAlterNumber();
    });
  }

  deleteNode(id: NodeId) {
    if (this.shopeeV.isInLayout()) throw this.shopeeV.inLayoutError();
    this.removeNodeDom(id);
    this.shopeeV.dataMap.deleteNode(id);
    this.shopeeV.miniMap?.updateMiniMap();
  }

  private removeNodeDom(id: NodeId) {
    this.shopeeV.group.selectAll(`g.shopee-v-group[g-id="${id}"]`).remove();
  }

  private setNodesSize(groups: d3.Selection<d3.BaseType, T, SVGGElement, T>) {
    const option = this.shopeeV.getOpt();
    const { k } = d3.zoomTransform(this.shopeeV.svg.node());
    const paddingLR = option.nodeConfig?.paddingLR;
    const paddingTB = option.nodeConfig?.paddingTB;
    groups.each(function (d) {
      const group = d3.select(this);
      const content = group.select<HTMLElement>('.shopee-v-node-content');
      const rect = content.node().getBoundingClientRect();
      const scaleRect = { width: rect.width / k, height: rect.height / k };
      const container = group.select('.shopee-v-node');

      const [width, height] = setNodeSize(d, scaleRect, { ...option, paddingLR, paddingTB });
      container.attr('height', height).attr('width', width);
      content.attr('x', width / 2).attr('y', height / 2);
      group.attr('transform', `translate(${d.x || 0}, ${d.y || 0})`);
    });
  }

  private renderAll(group: d3.Selection<SVGGElement, T, SVGGElement, T>) {
    this.setGroup(group);
    this.enableEvent(group);

    return this.renderNode(group)
      .then(() => {
        this.renderPort(group);
      })
      .finally(() => {
        this.shopeeV.miniMap?.updateMiniMap();
      });
  }

  private renderNode(groups: d3.Selection<SVGGElement, T, SVGGElement, T>) {
    const render = (nodeGroup: d3.Selection<SVGGElement, T, null, undefined>, d: T) => {
      if (this.shopeeV.getOpt().nodeConfig?.renderUDForeignObject) {
        return this.renderUDForeignObject(nodeGroup, d);
      }
      this.renderRect(nodeGroup, d).renderText(nodeGroup, d);
    };

    const all: unknown[] = [];
    groups.each(function (d) {
      const node = d3.select<SVGGElement, T>(this);
      all.push(render(node, d));
    });

    return Promise.all(all).then(() => {
      this.setNodesSize(groups);
    });
  }

  private renderUDForeignObject(group: d3.Selection<SVGGElement, T, SVGGElement, T>, d: T) {
    const option = this.shopeeV.getOpt();
    const autoSize = option.autoSize === true ? 'auto-size' : '';
    const groupClassName = option.groupClassName || '';

    const foreignSelection = group
      .selectAll<SVGForeignObjectElement, T>('foreignObject')
      .data([d])
      .join('foreignObject')
      .attr('class', `shopee-v-node shopee-v-foreignobject ${groupClassName}`)
      .selectAll<HTMLDivElement, T>('div.shopee-v-foreignobject-div');

    foreignSelection.selectChildren().remove();

    const foreignDiv = foreignSelection
      .data([d])
      .join<HTMLDivElement, T>('xhtml:div')
      .attr('class', 'shopee-v-foreignobject-div')
      .selectAll<HTMLDivElement, T>('div.shopee-v-node-content')
      .data([d])
      .join('div')
      .attr('class', `shopee-v-node-content shopee-v-foreignobject-root ${autoSize}`);

    return option.nodeConfig.renderUDForeignObject(foreignDiv, d);
  }

  getAllGroups() {
    return this.shopeeV.group.selectAll<SVGGElement, T>('g.shopee-v-group');
  }

  private createGroups() {
    return this.getAllGroups()
      .data(this.shopeeV.getOpt().nodes, (node) => node.id)
      .join('g');
  }

  private setGroup(group: d3.Selection<d3.BaseType, T, SVGGElement, T>) {
    group
      .attr('g-id', (d) => d.id)
      .attr('class', `shopee-v-group ${this.shopeeV.getOpt().groupClassName || ''}`);
    return this;
  }

  private renderRect(nodeGroup: d3.Selection<d3.BaseType, T, SVGGElement, T>, d: T) {
    nodeGroup
      .selectAll('rect')
      .data([d])
      .join('rect')
      .attr(
        'class',
        (d) => `shopee-v-node ${this.shopeeV.getOpt().rectClassName || ''} ${d.className || ''}`
      )
      .attr('rx', 5)
      .attr('ry', 5)
      .attr('style', (d) => d.style);
    return this;
  }

  private renderText(nodeGroup: d3.Selection<d3.BaseType, T, SVGGElement, T>, d: T) {
    nodeGroup
      .selectAll('text')
      .data([d])
      .join('text')
      .attr(
        'class',
        `shopee-v-node-content shopee-v-text ${this.shopeeV.getOpt().textClassName || ''}`
      )
      .attr('dominant-baseline', 'central')
      .attr('text-anchor', 'middle')
      .text((d) => d.text);
    return this;
  }

  private renderPort(group: d3.Selection<d3.BaseType, T, SVGGElement, T>) {
    if (this.shopeeV.getOpt().nodeConfig?.hidePort) return this;
    this.port.render(group);
    return this;
  }

  render() {
    return this.renderAll(this.createGroups());
  }
}
