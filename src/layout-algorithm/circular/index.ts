import { IData, ILink, IWorkflowData } from '../../types/base-type';
import { BaseLayout, IBaseLayoutOption } from '../layout-base';

export interface ICircleLayoutOptions<T extends IData = IData, L extends ILink = ILink>
  extends IBaseLayoutOption<T, L> {
  radius?: number;
  startAngle?: number; // 0,
  endAngle?: number; // Math.PI * 2;
  // to support ...
  // divisions: number; // 1;
  // ordering: 'topology' | 'degree';
  // clockwise: boolean;
}

export class Circular<T extends IData = IData, L extends ILink = ILink> extends BaseLayout<T, L> {
  protected option: ICircleLayoutOptions<T, L>;
  constructor(option: ICircleLayoutOptions<T, L>) {
    super(option);
  }

  protected create(source: IWorkflowData<T, L>) {
    const { nodes, links } = source;
    return { nodes: this.layout(nodes), links };
  }

  protected init() {
    this.option.radius ||= 150;
    this.option.center ||= [this.option.radius, this.option.radius];
    this.option.endAngle ||= Math.PI * 2;
    this.option.startAngle ||= 0;
  }

  private layout(nodes: T[]) {
    const angle = this.option.endAngle - this.option.startAngle;
    // if (angle <= 0) throw new Error('`endAngle - startAngle` must be greater than 0');
    const offset = angle / nodes.length;
    const { center, radius, startAngle } = this.option;
    return nodes.map((node, i) => {
      const angle = startAngle + i * offset;
      const x = center[0] + radius * Math.cos(angle);
      const y = center[1] + radius * Math.sin(angle);
      const xy = this.autoSizeAlignCenter({ width: node.width, height: node.height }, { x, y });
      return {
        ...node,
        ...xy,
      };
    });
  }
}
