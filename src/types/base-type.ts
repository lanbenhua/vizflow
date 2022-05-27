import { normalizeLinkKey, normalizeNodeKey } from './internal';
import * as d3 from 'd3';

export type NodeId = string | number;

export interface IBaseNode {
  text: string;
  id: NodeId;
  x?: number;
  y?: number;
}

export interface IData extends IBaseNode {
  height?: number;
  width?: number;
  style?: string;
  className?: string;
  ports?: IPort[];
  comboId?: string;
  mapIndex?: number;
}

export interface IinternalData extends IData {
  originWidth?: number;
  originHeight?: number;
  [normalizeNodeKey]?: boolean;
}

export interface IPort {
  x: number;
  y: number;
  r?: number;
  style?: string;
  className?: string;
}

export interface IPortDetail extends IPort {
  cy?: number;
  cx?: number;
  index: number;
}

export interface ISelectedPortDetail {
  port: IPortDetail;
}

export interface INodePort {
  id: NodeId;
  linkIndex?: number;
}

export interface ILinkAttribute {
  text?: string;
  textLength?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  letterSpacing?: number;
  alignmentBaseline?: string;
  textStyle?: string;
  pathStyle?: string;
  markerStyle?: string;
  lengthAdjust?: 'spacing' | 'spacingAndGlyphs';
}

export interface ILink {
  from: INodePort;
  to: INodePort;
  attr?: ILinkAttribute;
  id?: string;
  mapIndex?: number;
}

export interface IInternalLink extends ILink {
  [normalizeLinkKey]?: boolean;
  multipleLinksindex?: number;
}

export interface IDragEvent<T> {
  start?: (event?: ID3Event, d?: T) => void;
  drag?: (event?: ID3Event, d?: T) => void;
  end?: (event?: ID3Event, d?: T) => void;
}

export enum ESelectMode {
  cover = 0,
  touch,
}

export type TComboRender<T> = (
  root: d3.Selection<HTMLDivElement, IComboNode, SVGForeignObjectElement, IComboNode>,
  d: T
) => void;

export interface ISelectOption extends Omit<IComboGroup, 'id'> {
  selectMode?: ESelectMode;
  keyModifier?: boolean;
}

export type IComboNode = IComboGroup &
  IXy & {
    comboId: string;
  };

export interface IComboGroup {
  id: string;
  render?: TComboRender<IComboNode & this>;
  paddingTB?: number;
  paddingLR?: number;
  borderRadius?: number;
  width?: number;
  height?: number;
}

export type IComboOption<T extends IComboGroup = IComboGroup> = Omit<T, 'id'> & {
  comboGroups: T[];
};

export type IMiniMapOption = {
  margin?: number;
  size?: I2Number;
  renderMode?: 'sync' | 'async';
  hideLinkText?: boolean;
};

export interface IShopeeV<T extends IData = IData, L extends ILink = ILink>
  extends INodeOption<T>,
    ILinkOption<L> {
  svgClassName?: string;
  parent: HTMLElement;
  zoom?: IZoomOption;
  select?: ISelectOption;
  combo?: IComboOption;
  dblClickTimeInterval?: number;
  draggable?: boolean;
  readonly?: boolean;
  miniMap?: IMiniMapOption;
}

export interface ILinkOption<L extends ILink = ILink, T extends IData = IData> {
  defaultNodeHeight?: number;
  defaultNodeWidth?: number;
  markerHeight?: number;
  markerWidth?: number;
  linkClassName?: string;
  dblClickTimeInterval?: number;
  portSensitive?: boolean;
  disableLoop?: boolean;
  links: L[];
  linkConfig?: ILinkConfig<T>;
}

export interface ILinkConfig<T extends IData = IData> {
  supportMultipleLinks?: boolean;
  multipleLinkMaxGrade?: number;
  multipleLinkGradeRate?: number;
  portCenterDistance?: ((node: T) => number) | number;
  renderUDTooltipForeignObject?: (rootDiv: ISVGForeignObjectLinkElementSelection<ILink>) => void;
  tooltipOffset?: [number | string, number | string];
  lineType?: ELineType;
  bezierController?: (s: IXy, t: IXy, b: IBezierValue) => IBezierValue;
}

export type ISVGForeignObjectElementSelection<T> = d3.Selection<
  HTMLDivElement,
  T,
  HTMLDivElement,
  T
>;

export type ISVGForeignObjectLinkElementSelection<T extends ILink> = d3.Selection<
  HTMLDivElement,
  T,
  Element,
  undefined
>;

export interface INodeOption<T extends IData> extends INodeSizeOption {
  defaultPortR?: number;
  groupClassName?: string;
  rectClassName?: string;
  textClassName?: string;
  portClassName?: string;
  renderNode?: () => void;
  nodeConfig?: {
    clickDistance?: number;
    hidePort?: boolean;
    draggable?: boolean;
    renderUDForeignObject?: (
      rootDiv: ISVGForeignObjectElementSelection<T>,
      node: T
    ) => void | Promise<void>;
    paddingTB?: number;
    paddingLR?: number;
  };
  nodes: T[];
}

export interface INodeSizeOption {
  autoSize?: boolean;
  paddingTB?: number;
  paddingLR?: number;
  defaultNodeHeight?: number;
  defaultNodeWidth?: number;
}

type OffsetFunc = (n?: number, offset?: number) => number;
export interface IOffsetValue {
  to: {
    x: OffsetFunc;
    y: OffsetFunc;
  };
}

export interface IXy {
  x: number;
  y: number;
}

export interface IBezierValue {
  p1: IXy;
  p2: IXy;
}
export interface IZoomOption {
  scaleExtent?: I2Number;
  duration?: number;
  step?: number;
  clickDistance?: number;
  disableWheelZoom?: boolean;
  disableDblclickZoom?: boolean;
  hideLinkDuringZooming?: boolean;
}

export interface ITransform extends IXy {
  k?: number;
}

export interface IRectPoints {
  startX: number;
  endX: number;
  startY: number;
  endY: number;
}

export interface ID3Event extends IXy {
  sourceEvent: {
    offsetX: number;
    offsetY: number;
  };
  stopPropagation: () => void;
}

export interface ID3ZoomEvent extends IXy {
  sourceEvent: {
    offsetX: number;
    offsetY: number;
  };
  transform: d3.ZoomTransform;
}

export interface IHierarchyData extends IBaseNode {
  children: IBaseNode[];
}

export enum ELayoutDirection {
  H = 'horizontal',
  V = 'vertical',
}

export type IWorkflowNode<T extends IData = IData> = T & {
  __ORIGINAL_ID__: NodeId;
};

export interface IWorkflowData<T extends IData = IData, L extends ILink = ILink> {
  nodes: T[];
  links: L[];
}

export interface ISize {
  width: number;
  height: number;
}
export interface IMinimapContainer {
  node: HTMLDivElement;
  size: ISize;
  aspectRatio: number;
}

export type I2Number = [number, number];
export type I22Number = [I2Number, I2Number];

export enum ELineType {
  C = 'curve',
  S = 'straight',
  M = 'multiple',
}

export type IMockMouseEvent = MouseEvent & { __stopPropagation__?: boolean };

export type IResolve = (res?: unknown) => void;
export type IReject = (rej?: unknown) => void;

export interface IQueueSchedulerParams<S> {
  handler: () => Promise<S>;
  resolve: IResolve;
  reject: IReject;
}

export type IdebounceResult = {
  on: (listener: () => void) => number;
  clear: () => void;
};

export interface IShopeeUpdateData<T, L> {
  nodes?: T[];
  links?: L[];
  comboGroups?: IComboGroup[];
}
