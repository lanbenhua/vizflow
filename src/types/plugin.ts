import { ShopeeV } from '..';
import { IData, ILink } from './base-type';

export interface IPlugin<T extends IData, L extends ILink> {
  active: (shopeeV: ShopeeV<T, L>) => this;
}
