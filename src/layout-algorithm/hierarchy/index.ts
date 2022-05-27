import { IData, ELayoutDirection, ILink, IWorkflowData } from '../../types/base-type';

import { BaseLayout, IBaseLayoutOption } from '../layout-base';
import { loopDetect } from '../../lib/graph';
import { ShopeeV } from '../../';
import * as d3 from 'd3';

export interface IHierarchyLayoutOption<T extends IData = IData, L extends ILink = ILink>
  extends IBaseLayoutOption<T, L> {
  deltaX?: number;
  deltaY?: number;
  direction?: ELayoutDirection;
}

export class HierarchyLayout<T extends IData = IData, L extends ILink = ILink> extends BaseLayout<
  T,
  L
> {
  public option: IHierarchyLayoutOption<T, L>;
  public shopeeV: ShopeeV<T, L>;
  private deltaX: number;
  private deltaY: number;

  constructor(opt: IHierarchyLayoutOption<T, L>) {
    super(opt);
  }

  protected init() {
    this.deltaX = this.option.deltaY;
    this.deltaY = this.option.deltaX;
    this.option.direction = this.option.direction ? this.option.direction : ELayoutDirection.H;
    if (this.option.direction !== ELayoutDirection.H) {
      this.deltaX = this.option.deltaX;
      this.deltaY = this.option.deltaY;
    }
  }

  protected beautifyLinks(links: L[]) {
    links.forEach((link) => {
      link.from.linkIndex = 1;
      link.to.linkIndex = 3;
    });

    return links;
  }

  protected create({ nodes, links }: IWorkflowData<T, L>) {
    if (loopDetect(links)) {
      throw new Error('The graph has loops and cannot be automatically laid out!');
    }

    if (nodes.length === 0) return { nodes, links };

    const { hierarchyData, nodeMap } = this.createTree(nodes, links);
    const tree = d3
      .tree<T>()
      .nodeSize([this.deltaX, this.deltaY])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.1));

    const hierarchyTreeData = tree(hierarchyData);
    const newNodes: T[] = [];
    hierarchyTreeData.each((d) => {
      const { defaultNodeWidth, defaultNodeHeight } = this.shopeeV.getOpt();
      const nodeBound =
        this.option.direction === ELayoutDirection.H ? defaultNodeWidth : defaultNodeHeight;

      const dy = d.y + d.depth * nodeBound;
      const dx = d.x;
      let xy = { x: dy, y: dx };

      if (this.option.direction !== ELayoutDirection.H) {
        xy = { x: dx, y: dy };
      }
      const node = nodeMap[d.id];
      // need to do enhencement
      // xy = this.autoSizeAlignCenter({ width: node.width, height: node.height }, xy);
      newNodes.push({
        ...node,
        ...xy,
      });
    });

    links = this.makeLinksBeautiful(links);

    return { nodes: newNodes, links };
  }

  private createTree(_nodes: T[], links: L[]) {
    const nodes = JSON.parse(JSON.stringify(_nodes)) as T[];
    const nodeMap: Record<number | string, T & { parentId?: string | number }> = {};
    nodes.map((node) => (nodeMap[node.id] = node));
    links.map((link) => {
      const {
        from: { id: from },
        to: { id: to },
      } = link;
      nodeMap[to].parentId = from;
    });
    return { hierarchyData: d3.stratify<T>()(nodes), nodeMap };
  }
}
