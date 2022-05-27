import { ELayoutDirection, I2Number, IData } from '../types/base-type';

export enum RankDirection {
  TopToBottom = 'TB',
  BottomToTop = 'BT',
  LeftToRight = 'LR',
  RightToLeft = 'RL',
}

export enum AlignDirection {
  UpperLeft = 'UL',
  UpperRight = 'UR',
  DownLeft = 'DL',
  DownRight = 'DR',
}

export const RankDirectionMap = {
  [ELayoutDirection.H]: RankDirection.LeftToRight,
  [ELayoutDirection.V]: RankDirection.TopToBottom,
};

export const DagreMap: Record<
  ELayoutDirection,
  {
    coordinate: 'x' | 'y';
    ports: I2Number;
  }
> = {
  [ELayoutDirection.H]: {
    coordinate: 'x',
    ports: [1, 3],
  },
  [ELayoutDirection.V]: {
    coordinate: 'y',
    ports: [2, 0],
  },
};

export const getLayoutDirection = (direction: ELayoutDirection) => {
  return direction || ELayoutDirection.V;
};

export const getDagrePort = (direction: ELayoutDirection, source: IData, target: IData) => {
  const dagre = DagreMap[getLayoutDirection(direction)];
  const isReversed = source[dagre.coordinate] - target[dagre.coordinate] > 0;
  if (isReversed) return [...dagre.ports].reverse();
  return dagre.ports;
};

export const getDirection = (direction: ELayoutDirection): RankDirection => {
  return RankDirectionMap[getLayoutDirection(direction)];
};

export const defaultAlphaMin = 0.001;
export const defaultIterationTimes = 300;
