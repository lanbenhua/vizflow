import { IData, ILink } from '../types/base-type';
import { ShopeeV } from '..';

export class Highlight<T extends IData = IData, L extends ILink = ILink> {
  private shopeeV: ShopeeV<T, L>;
  private nodes: T[];
  private links: L[];

  constructor(shopeeV: ShopeeV<T, L>) {
    this.shopeeV = shopeeV;
  }

  private getNodes() {
    if (this.nodes) return this.shopeeV.node.getNodesSelection(this.nodes);
    return null;
  }

  private getLinks() {
    if (this.links) return this.shopeeV.link.getLinksSelection(this.links);
    return null;
  }

  set(nodes: T[], links: L[]) {
    this.clear();
    this.nodes = nodes;
    this.links = links;
    this.shopeeV.svg.attr('shopee-v-group-highlight', true);
    this.getNodes()?.attr('shopee-v-group-highlight', true);
    this.getLinks()?.attr('shopee-v-group-highlight', true);
  }

  clear() {
    this.shopeeV.svg.attr('shopee-v-group-highlight', null);
    this.getNodes()?.attr('shopee-v-group-highlight', null);
    this.getLinks()?.attr('shopee-v-group-highlight', null);
    this.nodes = null;
    this.links = null;
  }
}
