import { createLinksMap, createNodesMap, normalizeNode } from '../lib/utils';
import { IData, IInternalLink, ILink, NodeId } from '../types/base-type';
import { normalizeLinkKey } from '../types/internal';
import { ShopeeVBase } from '../render';

export class DataMap<T extends IData, L extends ILink> {
  private nodeMap = new Map<NodeId, T>();
  private linkMap = new Map<string, L>();
  private shopeeV: ShopeeVBase<T, L>;

  constructor(shopeeV: ShopeeVBase<T, L>) {
    this.shopeeV = shopeeV;
  }

  createNodeMap(deNormalize = false) {
    this.nodeMap = createNodesMap(this.shopeeV.getOpt().nodes, deNormalize);
  }

  deleteNode(id: NodeId) {
    const node = this.nodeMap.get(id);
    if (!node) return;

    this.shopeeV.getOpt().nodes.splice(node.mapIndex, 1);
    this.createNodeMap();
    this.shopeeV.link.deleteLinkFromNode(id);
  }

  addOrUpdateNode(_node: T, updateMap = true) {
    const oldNode = this.nodeMap.get(_node.id);
    const { x, y } = oldNode || ({} as T);
    const node = { x, y, ..._node };
    normalizeNode(node);
    const newNode = { ...oldNode, ...node };

    if (!oldNode) {
      this.shopeeV.getOpt().nodes.push(newNode);
      if (updateMap) this.createNodeMap();
    } else {
      this.shopeeV.getOpt().nodes[oldNode.mapIndex] = newNode;
    }

    return newNode;
  }

  addOrUpdateNodes(nodes: T[]) {
    const newNodes = nodes.map((node) => this.addOrUpdateNode(node, false));
    this.createNodeMap();
    return newNodes;
  }

  getNodeFromMap(id: NodeId) {
    return this.nodeMap.get(id);
  }

  createLinkMap() {
    this.linkMap = createLinksMap(this.shopeeV.getOpt().links, (l) => {
      return this.normalizeLink(l);
    });
  }

  deleteLinkFromMap(id: string) {
    const link = this.linkMap.get(id);
    if (!link) return;
    this.shopeeV.getOpt().links.splice(link.mapIndex, 1);
    this.createLinkMap();
  }

  deleteLinkFromNode(nodeId: NodeId) {
    const needToBeDeleted: L[] = [];
    const left: L[] = [];

    const option = this.shopeeV.getOpt();
    option.links.forEach((link) => {
      if (link.from.id === nodeId || link.to.id === nodeId) return needToBeDeleted.push(link);
      left.push(link);
    });

    option.links = left;
    this.createLinkMap();
    return needToBeDeleted;
  }

  normalizeLink = (link: L) => {
    if ((link as IInternalLink)[normalizeLinkKey]) return link;
    link.from.linkIndex ||= 0;
    link.to.linkIndex ||= 0;
    link.id = this.shopeeV.link.getLinkId(link);
    (link as IInternalLink)[normalizeLinkKey] = true;
    return link;
  };

  addOrUpdataLink(l: L, updateMap = true) {
    const _link = this.normalizeLink(l);
    const oldLink = this.linkMap.get(_link.id);

    if (!oldLink) {
      this.shopeeV.getOpt().links.push(_link);
      if (updateMap) this.createLinkMap();
      return _link;
    }
    const newLink = Object.assign(oldLink, { ..._link });
    this.shopeeV.getOpt().links[oldLink.mapIndex] = newLink;
    return newLink;
  }

  addOrUpdataLinks(links: L[]) {
    const newLinks = links.map((link) => this.addOrUpdataLink(link, false));
    this.createLinkMap();
    return newLinks;
  }

  getLinkFromMap(link: L) {
    return this.linkMap.get(this.shopeeV.link.getLinkId(link));
  }
}
