import { createAdjacency, IAdjacency, IData, ELayoutDirection, ILink, NodeId } from '../';
import { createLinksMap, createNodesMap } from './utils';

export const VIRTUAL_NODE_ID = 'XXX_VIRTUAL_NODE_ID';

export const getFromIndex = (direction: ELayoutDirection) =>
  direction === ELayoutDirection.H ? 1 : 2;

export const getToIndex = (direction: ELayoutDirection) =>
  direction === ELayoutDirection.H ? 3 : 0;

interface TreeNode {
  parent: NodeId;
  level?: number;
  id?: NodeId;
}

const findRoots = (adj: IAdjacency) => {
  const rootMap = new Map<NodeId, boolean>();
  adj.forEach((leafs, id) => {
    if (rootMap.get(id) !== false) rootMap.set(id, true);

    leafs.map((leaf) => {
      rootMap.set(leaf, false);
    });
  });

  const roots: NodeId[] = [];
  rootMap.forEach((v, k) => (v ? roots.push(k) : null));

  const rootDeep: Record<NodeId, number> = {};
  const calculateRootDeep = (root: NodeId) => {
    const calculateDeep = (leaf: NodeId, level = 0) => {
      if (!rootDeep[root] || rootDeep[root] < level) rootDeep[root] = level;
      const leafs = adj.get(leaf);
      if (leafs) {
        leafs.map((leaf) => {
          calculateDeep(leaf, level + 1);
        });
      }
    };

    return calculateDeep;
  };

  roots.map((root) => {
    calculateRootDeep(root)(root, 0);
  });
  return roots.sort((a, b) => rootDeep[b] - rootDeep[a]);
};

const createTreeMap = (adj: IAdjacency) => {
  const treeMap: Record<string, TreeNode> = {};
  const roots = findRoots(adj);
  const visitor = (root: NodeId, leafs: NodeId[], level = 0) => {
    leafs.map((leaf) => {
      const currentLayer = { level, parent: root, id: leaf };
      let from = treeMap[leaf];
      if (!from || from.level < currentLayer.level) from = currentLayer;

      treeMap[leaf] = from;
      const nextLeafs = adj.get(leaf);
      if (nextLeafs) visitor(leaf, nextLeafs, level + 1);
    });
  };

  visitor(null, roots);
  return treeMap;
};

const createVirtualNode = <T extends IData = IData>() =>
  ({ text: VIRTUAL_NODE_ID, id: VIRTUAL_NODE_ID } as T);

const createVirtualLink = <L extends ILink = ILink>(
  toId: NodeId,
  direction: ELayoutDirection = ELayoutDirection.H
): L => {
  const link = {
    from: { id: VIRTUAL_NODE_ID, linkIndex: getFromIndex(direction) },
    to: { id: toId, linkIndex: getToIndex(direction) },
  } as L;

  return link;
};

export const removeVirtualNode = <T extends IData = IData>(nodes: T[]) => {
  return nodes.filter((node) => node.id !== VIRTUAL_NODE_ID);
};

export const removeVirtualLink = <L extends ILink = ILink>(links: L[]) => {
  return links.filter((link) => link.from.id !== VIRTUAL_NODE_ID);
};

export const getDirectedLink = <L extends ILink = ILink>(link: L, direction: ELayoutDirection) => {
  return {
    from: { ...link.from, linkIndex: getFromIndex(direction) },
    to: { ...link.to, linkIndex: getToIndex(direction) },
  } as L;
};

const createTreeLinksAndNodes = <T extends IData = IData, L extends ILink = ILink>(
  nodes: T[],
  links: L[],
  direction: ELayoutDirection
) => {
  const treeMap = createTreeMap(createAdjacency(links));
  const linkMap = createLinksMap(links, (l) => {
    l.id = `${l.from.id}-${l.to.id}`;
    return l;
  });
  const nodeMap = createNodesMap<T>(nodes);
  const treeLinks: L[] = [];
  const linkedNodes: T[] = [];

  Object.keys(treeMap)
    .sort((a, b) => treeMap[a].level - treeMap[b].level)
    .map((toId) => {
      const to = treeMap[toId];
      linkedNodes.push(nodeMap.get(to.id));
      if (to.parent) {
        const id = `${to.parent}-${toId}`;
        if (!linkMap.get(id)) return;
        treeLinks.push(getDirectedLink(linkMap.get(id), direction));
        linkMap.delete(id);
        return;
      }
      treeLinks.push(createVirtualLink(to.id, direction) as L);
    });

  const leftNodes = nodes.filter((node) => !treeMap[node.id]);
  treeLinks.push(...leftNodes.map((node) => createVirtualLink<L>(node.id, direction)));

  return {
    treeLinks,
    treeNodes: [...linkedNodes, ...leftNodes, createVirtualNode<T>()],
    unlinkedLinks: Object.keys(linkMap).map((id) => getDirectedLink(linkMap.get(id), direction)),
  };
};

export const genarateTrees = <T extends IData = IData, L extends ILink = ILink>(
  nodes: T[],
  links: L[],
  direction: ELayoutDirection
) => {
  return createTreeLinksAndNodes<T, L>(nodes, links, direction);
};
