import { centerPorts, defaultLinkConfig, defaultPorts } from './constant';
import { normalizeNodeKey } from '../types/internal';
import {
  INodeSizeOption,
  IinternalData,
  ILinkOption,
  NodeId,
  IData,
  ILink,
  IPort,
  ISize,
} from '../types/base-type';

const centerPortsString = JSON.stringify(centerPorts);
export const getCenterPorts = (): IPort[] => JSON.parse(centerPortsString);

const defaultPortsString = JSON.stringify(defaultPorts);
export const getDefaultPorts = (): IPort[] => JSON.parse(defaultPortsString);

export const normalizeNode = (node: IinternalData) => {
  if (node[normalizeNodeKey]) return node;
  node[normalizeNodeKey] = true;
  node.x ||= 0;
  node.y ||= 0;
  node.ports ||= getDefaultPorts();
  if (typeof node.height === 'number') node.originHeight = node.height;
  if (typeof node.width === 'number') node.originWidth = node.width;
  return node;
};

export const createNodesMap = <T extends IinternalData>(
  nodes: T[],
  deNormalize = false
) => {
  const nodeMap = new Map<NodeId, T>();
  if (!nodes) return nodeMap;
  nodes.forEach((node, mapIndex) => {
    if (deNormalize) delete node[normalizeNodeKey];
    normalizeNode(node);
    nodeMap.set(node.id, Object.assign(node, { mapIndex }));
  });
  return nodeMap;
};

export const createLinksMap = <T extends ILink>(
  links: T[],
  preHandler: (link: T) => T
) => {
  const linkMap = new Map<string, T>();
  if (!links) return linkMap;
  links.forEach((l, mapIndex) => {
    const link = preHandler(l);
    linkMap.set(link.id, Object.assign(link, { mapIndex }));
  });
  return linkMap;
};

export const range = (n: number): 0.5 | 1 | 0 => (n === 1 || n === 0 ? n : 0.5);

export const createRangeKey = (port: IPort) =>
  `${range(port.x)}-${range(port.y)}`;

export const debounceCreator = (delay: number) => {
  let debounceTimer: number = null;
  const on = (listener: () => void) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      listener();
      debounceTimer = null;
    }, delay);
    return debounceTimer;
  };

  const clear = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = null;
  };

  return { on, clear };
};

const toPx = (t: string | number) => (typeof t === 'number' ? `${t}px` : t);

export const normalizeLinkConfig = (
  cfg: ILinkOption['linkConfig']
): ILinkOption['linkConfig'] => {
  const linkConfig = {
    ...defaultLinkConfig,
    ...cfg,
  };

  return {
    ...linkConfig,
    tooltipOffset: linkConfig.tooltipOffset.map(toPx) as [string, string],
  };
};

export const debounce = (cb: () => void, delay: number) => {
  let timer: number = null;
  return () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => cb(), delay);
  };
};

export const getRect = (
  nodes: IData[],
  _minX = Number.MAX_SAFE_INTEGER,
  _minY = Number.MAX_SAFE_INTEGER,
  _maxX = Number.MIN_SAFE_INTEGER,
  _maxY = Number.MIN_SAFE_INTEGER
) => {
  // exception case when there is no nodes selected
  if (!nodes.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };

  let minX = _minX;
  let minY = _minY;
  let maxX = _maxX;
  let maxY = _maxY;
  nodes.map((node) => {
    const nStartX = node.x || 0;
    const nStartY = node.y || 0;
    const nEndX = nStartX + node.width;
    const nEndY = nStartY + node.height;

    if (minX > nStartX) minX = nStartX;
    if (minY > nStartY) minY = nStartY;

    if (maxX < nEndX) maxX = nEndX;
    if (maxY < nEndY) maxY = nEndY;
  });
  return { minX, minY, maxX, maxY };
};

export const getNumber = (a: number, b: number) => {
  return typeof a === 'number' ? a : b;
};

export const setNodeSize = (
  d: IinternalData,
  rect: ISize,
  opt: INodeSizeOption
) => {
  normalizeNode(d);
  const autoSize = opt.autoSize === true;
  const paddingTB = getNumber(opt.paddingTB, 10) * 2;
  const paddingLR = getNumber(opt.paddingLR, 10) * 2;

  let reactScaledHeight = opt.defaultNodeHeight;

  if (autoSize) {
    reactScaledHeight = rect.height + paddingTB;
    reactScaledHeight =
      reactScaledHeight < opt.defaultNodeHeight
        ? opt.defaultNodeHeight
        : reactScaledHeight;
  }

  let reactScaledWidth = rect.width + paddingLR;
  reactScaledWidth = autoSize ? reactScaledWidth : opt.defaultNodeWidth;

  const width = getNumber(d.originWidth, reactScaledWidth);
  const height = getNumber(d.originHeight, reactScaledHeight);

  d.width = width;
  d.height = height;
  return [width, height];
};

let i = 0;
export const uniqueId = () => `${++i}`;
