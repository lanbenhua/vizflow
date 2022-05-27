import { IData, ILink, IRectPoints, ShopeeV } from '..';
import { ESelectMode, I22Number } from '../types/base-type';
import { IPlugin } from '../types/plugin';
import { Brush } from '../lib/brush';
import { D3BrushEvent } from 'd3';

export class SelectPlugin<T extends IData, L extends ILink>
  extends Brush<T>
  implements IPlugin<T, L> {
  private shopeeV: ShopeeV<T, L>;
  private selectedNodes: T[] = [];

  active(shopeeV: ShopeeV<T, L>) {
    this.shopeeV = shopeeV;
    return this;
  }

  start() {
    if (this.gBrush) return;

    this.initGBrush(this.shopeeV.svg).attr('class', 'select-brush-group');
    const { width, height } = this.shopeeV.getSVGSize();
    this.createBrush([
      [0, 0],
      [width, height],
    ]);
    this.brush.keyModifiers(this.shopeeV.getOpt().select?.keyModifier || false);
  }

  stop() {
    this.gBrush?.remove();
    this.gBrush = null;
    this.clearSelectedNodes();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectStart: (e: D3BrushEvent<T>) => void = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSelectEnd: (e: D3BrushEvent<T>) => void = null;

  protected onBrushStart(e: D3BrushEvent<T>) {
    this.onSelectStart?.(e);
  }

  public getSelectedNodes() {
    return this.selectedNodes;
  }

  public clearSelectedNodes() {
    this.selectedNodes = [];
  }

  private isIn(np: IRectPoints, sp: IRectPoints) {
    if (this.isWrapped(np, sp)) return true;
    const isTouch = this.shopeeV.getOpt().select?.selectMode === ESelectMode.touch;
    if (!isTouch) return false;
    return this.isOverlapRect(np, sp);
  }

  private isWrapped(np: IRectPoints, range: IRectPoints) {
    /**
     * only need to detect wether
     * (startx, starty), (endx, endy)
     * are in range
     */
    return (
      this.isPointInRange({ x: np.startX, y: np.startY }, range) &&
      this.isPointInRange({ x: np.endX, y: np.endY }, range)
    );
  }

  private isOverlapRect(r1: IRectPoints, r2: IRectPoints) {
    return r1.startX < r2.endX && r1.endX > r2.startX && r1.startY < r2.endY && r1.endY > r2.startY;
  }

  private isPointInRange(p: { x: number; y: number }, r: IRectPoints) {
    return p.x >= r.startX && p.x <= r.endX && p.y >= r.startY && p.y <= r.endY;
  }

  private getSelectRange(e: D3BrushEvent<T>): IRectPoints {
    const [[startX, startY], [endX, endY]] = e.selection as I22Number;
    const { x: baseX, y: baseY, k } = this.shopeeV.getCurrentTransform();

    return {
      startX: (startX - baseX) / k,
      startY: (startY - baseY) / k,
      endX: (endX - baseX) / k,
      endY: (endY - baseY) / k,
    };
  }

  private getNodes(e: D3BrushEvent<T>) {
    const selectRange = this.getSelectRange(e);
    return this.shopeeV.getOpt().nodes.filter((d) => {
      const height = d.height;
      const width = d.width;

      const nodePoints: IRectPoints = {
        startX: d.x,
        endX: d.x + width,
        startY: d.y,
        endY: d.y + height,
      };
      return this.isIn(nodePoints, selectRange);
    });
  }

  protected onEnd(e: D3BrushEvent<T>) {
    this.selectedNodes = this.getNodes(e);
    this.clear();
    this.onSelectEnd?.(e);
  }
}
