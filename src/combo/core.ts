import { debounceCreator, getNumber, getRect } from '../lib/utils';
import { IComboGroup, IComboNode, IData } from '../types/base-type';
import { IdebounceResult, IXy, ShopeeV } from '..';

export class Combo<T extends IData = IData> {
  private group: d3.Selection<SVGGElement, IComboNode, SVGGElement, T>;
  private shopeeV: ShopeeV<T>;
  private nodes: T[] = [];
  private active = false;
  private debounce: IdebounceResult;
  private option: IComboGroup & { nodes: T[] };

  constructor(shopeeV: ShopeeV<T>, groupOption: IComboGroup) {
    this.option = { ...groupOption, nodes: [] };
    this.shopeeV = shopeeV;
    this.debounce = debounceCreator(0);
  }

  getNodes() {
    return this.nodes;
  }

  clearCombo() {
    this.debounce.on(() => {
      this.group?.remove?.();
      this.active = false;
      this.group = null;
      this.nodes = [];
      this.shopeeV.miniMap?.updateMiniMap();
    });
  }

  isActive(d: T) {
    if (d.comboId === this.option.id) return true;
    return this.active && this.nodes.find((n) => n.id === d.id);
  }

  render() {
    const nodes = this.option.nodes;
    if (!nodes || nodes.length === 0) return this.clearCombo();
    this.debounce.clear();
    this.nodes = nodes;
    this.active = true;
    this.renderComboRect();
  }

  updateData(groupOption: Omit<IComboGroup, 'id'> & { nodes?: T[] }) {
    this.option = { ...this.option, ...groupOption };
    this.render();
  }

  getComboCoords() {
    const { paddingLR, paddingTB } = this.option;
    const pLR = getNumber(paddingLR, 10);
    const pTB = getNumber(paddingTB, 10);

    const { minX, minY, maxX, maxY } = getRect(this.nodes || []);
    return {
      minX: minX - pLR,
      minY: minY - pTB,
      maxX: maxX + pLR,
      maxY: maxY + pTB,
      height: maxY - minY + pTB * 2,
      width: maxX - minX + pLR * 2,
    };
  }

  setComboTransform({ x, y }: IXy) {
    this.group.attr('transform', `translate(${x}, ${y})`);
  }

  private renderRect(node: IComboNode) {
    const { borderRadius } = node;
    const r = getNumber(borderRadius, 10);
    this.group
      .selectAll<SVGRectElement, T>('rect')
      .data([node], (d) => d.comboId)
      .join('rect')
      .attr('class', 'shopee-v-combo shopee-v-combo-rect')
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .attr('rx', r)
      .attr('ry', r);
  }

  private renderUDCombo(node: IComboNode) {
    const { render } = node;
    const foreignSelection = this.group
      .selectAll<SVGForeignObjectElement, IComboNode>('foreignObject')
      .data([node], (d) => d.comboId)
      .join('foreignObject')
      .attr('class', 'shopee-v-combo shopee-v-combo-foreignobject')
      .attr('width', (d) => d.width)
      .attr('height', (d) => d.height)
      .selectAll<HTMLDivElement, IComboNode>('div.shopee-v-foreignobject-div');

    foreignSelection.remove();

    const foreignDiv = foreignSelection
      .data([node])
      .join<HTMLDivElement>('xhtml:div')
      .attr('class', 'shopee-v-combo-content');

    return render(foreignDiv, node);
  }

  private renderComboRect() {
    const { minX, minY, maxX, maxY } = this.getComboCoords();
    const width = maxX - minX;
    const height = maxY - minY;

    const node = {
      x: minX,
      y: minY,
      width,
      height,
      comboId: this.option.id,
      ...this.option,
    } as IComboNode;

    this.group = this.shopeeV.comboGroup
      .selectAll<SVGGElement, IComboNode>(`g[comboId=${this.option.id}]`)
      .data<IComboNode>([node], (d) => d.comboId)
      .join('g')
      .attr('comboId', this.option.id);

    this.option.render ? this.renderUDCombo(node) : this.renderRect(node);
    this.setComboTransform(node);
    this.shopeeV.nodePlugin.dragEvent(this.group);
    this.shopeeV.miniMap?.updateMiniMap();
  }
}
