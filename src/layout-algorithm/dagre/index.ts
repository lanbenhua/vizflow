import {
  ELayoutDirection,
  IData,
  ILink,
  IWorkflowData,
  IWorkflowNode,
  NodeId,
} from '../../types/base-type';

import { BaseLayout, IBaseLayoutOption } from '../layout-base';
import { getDagrePort, getDirection } from '../constant';
import { getNumber } from '../../lib/utils';
import * as dagre from 'dagre';

export interface IDagreLayoutOptions<T extends IData = IData, L extends ILink = ILink>
  extends IBaseLayoutOption<T, L>,
    Partial<dagre.GraphLabel> {
  direction?: ELayoutDirection;
}

export class Dagre<T extends IData = IData, L extends ILink = ILink> extends BaseLayout<T, L> {
  protected option: IDagreLayoutOptions<T, L>;
  private g: dagre.graphlib.Graph<IWorkflowNode<T>>;

  constructor(option: IDagreLayoutOptions<T, L>) {
    super(option);
  }

  protected initG() {
    this.g = new dagre.graphlib.Graph<IWorkflowNode<T>>({ compound: true })
      .setGraph({
        rankdir: getDirection(this.option.direction),
        ...this.option,
      })
      .setDefaultEdgeLabel(function () {
        return {};
      });
  }

  private getSize(node: T) {
    /**
     * For Dagre layout, we have to specific the size for each node,
     * 1. In autoSize mode, we will force call shopeeV.render() before calculating layout
     *    the value of height / width will be set during rendering (setNodeSize);
     * 2. Without autoSize mode, For nodes with no size value set, we will use the default value
     */
    const option = this.shopeeV.getOpt();
    const autoSize = option.autoSize === true;
    if (autoSize) return { width: node.width, height: node.height };

    const { defaultNodeWidth, defaultNodeHeight } = option;
    return {
      width: getNumber(node.width, defaultNodeWidth),
      height: getNumber(node.height, defaultNodeHeight),
    };
  }

  protected create({ nodes, links }: IWorkflowData<T, L>) {
    this.initG();
    nodes.forEach((n) => {
      this.g.setNode(`${n.id}`, {
        label: n.text,
        ...n,
        ...this.getSize(n),
        __ORIGINAL_ID__: n.id,
      });
    });

    links.forEach((link) => {
      this.g.setEdge(`${link.from.id}`, `${link.to.id}`);
    });

    return this.layout(links);
  }

  private layout(links: L[]) {
    dagre.layout(this.g);
    const nodes: IWorkflowNode<T>[] = [];
    const nodeMap: Map<NodeId, T> = new Map();
    this.g.nodes().forEach((v) => {
      const n = this.g.node(v);
      const width = n.width || 0;
      const height = n.height || 0;
      const xy = this.autoSizeAlignCenter({ width, height }, n);
      const node = {
        text: n.label,
        ...n,
        ...xy,
        id: n.__ORIGINAL_ID__,
      };
      nodes.push(node);
      nodeMap.set(node.__ORIGINAL_ID__, node);
    });

    const newLinks = this.makeLinksBeautiful(links, nodeMap);

    return { nodes, links: newLinks };
  }

  protected beautifyLinks(links: L[], nodeMap: Map<NodeId, T>) {
    return links.map((link) => {
      const [from, to] = getDagrePort(
        this.option.direction,
        nodeMap.get(link.from.id),
        nodeMap.get(link.to.id)
      );

      link.from.linkIndex = from;
      link.to.linkIndex = to;
      return link;
    });
  }
}
