import { I22Number, IData, ILink, IShopeeV, ISize } from '../types/base-type';
import { getRect } from '../lib/utils';

export const getGroupBounding = <T extends IData = IData>(nodes: T[]) => {
  return getRect(nodes);
};

const minWidth = 150;
const minHeight = 100;

export const getMinimapRect = <T extends IData = IData, L extends ILink = ILink>(
  option: IShopeeV<T, L>['miniMap']
) => {
  const width = option.size?.[0] || minWidth;
  const height = option.size?.[1] || minHeight;
  return { width, height };
};

export const getViewBoxBounding = (
  svgSize: ISize,
  size: ReturnType<typeof getGroupBounding>,
  aspectRatio: number,
  margin = 0.05
) => {
  const { minX, minY, maxX, maxY } = size;
  const contentW = maxX - minX;
  const contentH = maxY - minY;
  const viewBoxW = svgSize.width > contentW ? svgSize.width : contentW;
  const viewBoxH = svgSize.height > contentH ? svgSize.height : contentH;
  const marginX = margin * viewBoxW;
  const marginY = margin * viewBoxH;
  const vb = [viewBoxW + 2 * marginX, viewBoxH + 2 * marginY];
  /**
   * to keep the viewBox's aspect ratio the same with minimap svg's aspect ratio
   * aspectRatio = minimapContainer.height / minimapContainer.width
   * Note!
   *    minimapContainer.height / minimapContainer.width === minimapSvg.height / minimapSvg.width
   *
   * (vb[1] + y) / (vb[0] + x) = aspectRatio
   * ==> vb[1] + y = vb[0] * aspectRatio + x * aspectRatio
   * ==> y = (vb[0] * aspectRatio - vb[1]) + x * aspectRatio
   *
   * let's say: m = vb[0] * aspectRatio - vb[1];
   * ==> y = m + x * aspectRatio
   *    1) if m > 0, when x = 0, y = m
   *      ==> (vb[1] + y) / (vb[0] + x) = aspectRatio
   *      ==> (vb[1] + m) / (vb[0] + 0) = aspectRatio
   *      ==> vb[1] should reset to be `vb[1] + m`;
   *      ==> vb[1] += m;
   *    2) if m < 0, when y = 0, x = -m / aspectRatio
   *      ==> (vb[1] + y) / (vb[0] + x) = aspectRatio
   *      ==> (vb[1] + 0) / (vb[0] - m / aspectRatio) = aspectRatio
   *      ==> vb[0] should reset to be `vb[0] - m / aspectRatio`;
   *      ==> vb[0] += -m / aspectRatio;
   */
  const m = vb[0] * aspectRatio - vb[1];
  if (m > 0) {
    vb[1] += m;
  } else if (m < 0) {
    vb[0] += -m / aspectRatio;
  }

  const x = size.minX - marginX;
  const y = size.minY - marginY;
  const extent: I22Number = [
    [x, y],
    [vb[0] + x, vb[1] + y],
  ];

  return {
    width: vb[0],
    height: vb[1],
    x,
    y,
    extent,
  };
};

export const extendsExtent = (prev: I22Number, curr: I22Number) => {
  return prev.map((_, i) => {
    const compare = i === 0 ? 'min' : 'max';
    return [Math[compare](prev[i][0], curr[i][0]), Math[compare](prev[i][1], curr[i][1])];
  }) as I22Number;
};
