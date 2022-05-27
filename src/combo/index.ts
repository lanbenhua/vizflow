export { Combo } from './core';

import { IComboGroup, IComboOption, IData } from '../types/base-type';
import { Combo } from './core';
import { ShopeeV } from '..';

export class Combos<T extends IData = IData> {
  private map = new Map<string, Combo<T>>();
  private shopeeV: ShopeeV<T>;

  constructor(shopeeV: ShopeeV<T>) {
    this.shopeeV = shopeeV;
  }

  render() {
    this.shopeeV.getOpt().combo?.comboGroups.map((group) => {
      const combo = this.map.get(group.id);
      const nodes = this.shopeeV.getData().nodes.filter((n) => n.comboId === group.id);
      if (combo) return combo.updateData({ ...group, nodes });
      this.newCombo(group).render();
    });
  }

  private newCombo(group: IComboGroup) {
    const id = group.id;
    const defaultOption: IComboOption = { ...this.shopeeV.getOpt().combo, comboGroups: undefined };
    const combo = new Combo<T>(this.shopeeV, {
      ...defaultOption,
      ...group,
      id,
    });
    this.map.set(id, combo);
    return combo;
  }

  getComboByNode(d: T) {
    const comboId = d.comboId;
    return this.getCombo(comboId);
  }

  getCombo(id: string) {
    return this.map.get(id);
  }

  updateCombo(group: IComboGroup) {
    this.map.get(group.id).updateData(group);
  }

  updateCombos(groups: IComboGroup[]) {
    groups.forEach((group) => {
      this.map.get(group.id).updateData(group);
    });
  }

  deleteCombo(id: string) {
    this.map.get(id).clearCombo();
    this.map.delete(id);
  }
}
