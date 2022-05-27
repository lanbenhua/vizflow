import { ELineType, ILinkOption, IPort } from '../types/base-type';

export const EDGE_TOOLTIP_ROOT = 'shopee-v-edge-tooltip-root';

export const defaultNodeHeight = 32;
export const defaultNodeWidth = 160;

export const defaultLinkConfig: ILinkOption['linkConfig'] = {
  tooltipOffset: [0, 0],
  supportMultipleLinks: false,
  lineType: ELineType.C,
  multipleLinkGradeRate: 0.4,
  multipleLinkMaxGrade: 30,
};

export const defaultPorts: IPort[] = [
  {
    x: 0.5,
    y: 0,
  },
  {
    x: 1,
    y: 0.5,
  },
  {
    x: 0.5,
    y: 1,
  },
  {
    x: 0,
    y: 0.5,
  },
];

export const centerPorts: IPort[] = [
  { x: 0.5, y: 0.5 },
  { x: 0.5, y: 0.5 },
  { x: 0.5, y: 0.5 },
  { x: 0.5, y: 0.5 },
];
