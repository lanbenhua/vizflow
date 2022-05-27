import { extendsExtent } from '../minimap/utils';
import { I22Number } from '../types/base-type';
import * as d3 from 'd3';
import { D3BrushEvent } from 'd3';

export class Brush<T> {
  protected gBrush: d3.Selection<SVGGElement, T, null, undefined>;
  protected brush: d3.BrushBehavior<T>;
  protected extent: I22Number;

  initGBrush(parent: d3.Selection<d3.BaseType, T, null, undefined>, top = false) {
    if (top) return (this.gBrush = parent.append('g'));
    return (this.gBrush = parent.insert('g', ':first-child'));
  }

  protected clear() {
    this.gBrush.call(this.brush.clear);
  }

  protected setExtent(extent: I22Number) {
    this.extent = extent;
  }

  protected calculateExtent(extent: I22Number) {
    if (!this.extent) return this.setExtent(extent);
    this.setExtent(extendsExtent(this.extent, extent));
  }

  protected createBrush(extent: I22Number) {
    this.calculateExtent(extent);

    this.brush = d3
      .brush<T>()
      .extent(this.extent)
      .on('start', (e) => this.onBrushStart(e))
      .on('brush', (e) => this.onBrush(e))
      .on('end', (e) => {
        if (!e.selection) return;
        this.onEnd(e);
      });

    this.gBrush.call(this.brush);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected afterCreateBrush(_: I22Number) {
    // to do
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onBrush(_: D3BrushEvent<T>) {
    // to do
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onEnd(e: D3BrushEvent<T>) {
    // to do
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onBrushStart(e: D3BrushEvent<T>) {
    // to do
  }
}
