import * as d3 from 'd3';
import { I2Number, IData } from '../types/base-type';

export interface IMarkerOptions {
  markerWidth: number;
  markerHeight: number;
}

let globalDefs: d3.Selection<SVGDefsElement, IData, null, undefined> = null;

export const createGlobalDefs = () => {
  if (globalDefs) return globalDefs;
  const svg = d3.create('svg').attr('width', '0').attr('height', '0').attr('class', 'shopee-v-svg');
  globalDefs = svg.append('defs').attr('belongstosvg', 'true');
  document.body.appendChild(svg.node());
  return globalDefs;
};

export const createMarker = <T>(defs: d3.Selection<SVGDefsElement, T, null, undefined>) => (
  markerBoxWidth = 16,
  markerBoxHeight = 20,
  ids = ['arrow', 'hover-arrow'],
  _refX = markerBoxWidth
) => {
  const refX = _refX;
  const refY = markerBoxHeight / 2;
  const arrowPoints: I2Number[] = [
    [0, 0],
    [0, markerBoxHeight],
    [markerBoxWidth, markerBoxHeight / 2],
  ];

  const selectionIds = ids.map((id) => `marker#${id}`).join(',');

  defs
    .selectAll(selectionIds)
    .data(ids)
    .join('marker')
    .attr('id', (d) => d)
    .attr('viewBox', `0, 0, ${markerBoxWidth}, ${markerBoxHeight}`)
    .attr('refX', refX)
    .attr('refY', refY)
    .attr('markerWidth', markerBoxWidth / 2)
    .attr('markerHeight', markerBoxHeight / 2)
    .attr('orient', 'auto')
    .attr('markerUnits', 'strokeWidth')
    .selectAll('path')
    .data([''])
    .join('path')
    .attr('d', d3.line()(arrowPoints));
};

export const removeMarker = <T>(
  defs: d3.Selection<SVGDefsElement, T, null, undefined>,
  id: string
) => {
  defs.selectAll(id).remove();
};
