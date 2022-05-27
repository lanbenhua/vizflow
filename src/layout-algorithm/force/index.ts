import { IData, ILink, IWorkflowData, IWorkflowNode } from '../../types/base-type';
import { BaseLayout, IBaseLayoutOption } from '../layout-base';
import { SimulationLinkDatum } from 'd3';
import * as d3 from 'd3';

const initValue: d3.SimulationNodeDatum = {
  vx: undefined,
  vy: undefined,
  x: undefined,
  y: undefined,
};

/**
 * For nodeStrength, positive value means attractive force,
 * while negative value means repulsive force.
 * LinkDistance should be less than absolute value of negative nodeStrength
 * because links act as traction between nodes.
 */
export interface IForceLayoutOptions<T extends IData = IData, L extends ILink = ILink>
  extends IBaseLayoutOption<T, L> {
  nodeStrength?: number; // -20;
  collideRadius?: ((d: T) => number) | number;
  collideIterations?: number;
  baseOnPrevious?: boolean;
  tickIterations?: number;
}

export class Force<T extends IData = IData, L extends ILink = ILink> extends BaseLayout<T, L> {
  protected option: IForceLayoutOptions<T, L>;

  constructor(option: IForceLayoutOptions<T, L>) {
    super(option);
  }

  private getForceManyBody() {
    const forceManyBody = d3.forceManyBody();

    if (typeof this.option.nodeStrength === 'number') {
      forceManyBody.strength(this.option.nodeStrength);
    }

    return forceManyBody;
  }

  private getForceCollide() {
    const forceCollide = d3.forceCollide<IWorkflowNode<T>>(); // .radius().iterations(1)
    const { collideRadius, collideIterations } = this.option;
    if (typeof collideRadius === 'number') {
      forceCollide.radius(collideRadius);
    } else if (typeof collideRadius === 'function') {
      forceCollide.radius(collideRadius);
    }

    if (typeof collideIterations === 'number') {
      forceCollide.iterations(collideIterations);
    }

    return forceCollide;
  }

  private getForceLink(links: L[]) {
    return d3
      .forceLink<IWorkflowNode<T>, SimulationLinkDatum<IWorkflowNode<T>>>(
        links.map((link) => ({ source: `${link.from.id}`, target: `${link.to.id}` }))
      )
      .id((d) => `${d.id}`);
  }

  private forceCenter(simulation: d3.Simulation<T, undefined>) {
    if (!this.option.center) return;
    const [x, y] = this.option.center;
    simulation.force('center', d3.forceCenter(x, y));
  }

  private setTick(simulation: d3.Simulation<T, undefined>) {
    if (typeof this.option.tickIterations !== 'number') this.option.tickIterations = 300;
    simulation.tick(this.option.tickIterations);
  }

  private layout(
    { nodes, links }: IWorkflowData<T, L>,
    id: string,
    resolve: (value: IWorkflowData<T, L> | PromiseLike<IWorkflowData<T, L>>) => void,
    reject: (reason?: Error) => void
  ) {
    const newNodes = nodes.map((node) => ({
      ...node,
      ...(this.option.baseOnPrevious === true ? {} : initValue),
      id: `${node.id}`,
      __ORIGINAL_ID__: node.id,
    })) as IWorkflowNode<T>[];

    const simulation = d3
      .forceSimulation<T>(newNodes)
      .force('link', this.getForceLink(links))
      .force('charge', this.getForceManyBody())
      .force('collide', this.getForceCollide())
      .force('x', d3.forceX())
      .force('y', d3.forceY());

    this.forceCenter(simulation);
    this.setTick(simulation);

    simulation.on('tick', () => {
      try {
        this.idCheck(id);
      } catch (e) {
        simulation.stop();
        reject(e);
      }
    });

    simulation.on('end', () => {
      if (this.isIllegalId(id)) return;
      const nodes = newNodes.map((n) => ({ ...n, id: n.__ORIGINAL_ID__ }));
      resolve({ nodes, links: this.makeLinksBeautiful(links) });
    });
  }

  protected beautifyLinks(links: L[]) {
    links.forEach((link) => {
      link.from.linkIndex = 3;
      link.to.linkIndex = 1;
    });

    return links;
  }

  protected create(source: IWorkflowData<T, L>, id: string) {
    return new Promise<IWorkflowData<T, L>>((resolve, reject) => {
      this.layout(source, id, resolve, reject);
    });
  }
}
