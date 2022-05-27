import { NodeId } from '../types/base-type';
import { ILink, INodePort } from '../';

export type IAdjacency = Map<NodeId, NodeId[]>;

export const createAdjacency = <T extends ILink>(links: T[]) => {
  const adjacency = new Map<NodeId, NodeId[]>();
  if (!links) return adjacency;
  links.forEach((link) => {
    if (adjacency.get(link.from.id)) adjacency.get(link.from.id).push(link.to.id);
    else adjacency.set(link.from.id, [link.to.id]);
  });
  return adjacency;
};

const detectOneNode = (
  adjacency: IAdjacency,
  source: INodePort['id'],
  visitedLinkMap: Record<string, boolean>
) => {
  const dfs = (vertex: NodeId) => {
    if (!vertex) return false;
    visitedLinkMap[vertex] = true;
    const list = adjacency.get(vertex) || [];
    for (let i = 0; i < list.length; i++) {
      if (list[i] === source) return true;
      if (visitedLinkMap[list[i]]) continue;
      if (dfs(list[i])) return true;
    }

    return false;
  };

  return dfs(source);
};

export const loopDetect = (links: ILink[], source?: INodePort['id']) => {
  const adjacency = createAdjacency(links);
  const visitedLinkMap: Record<string, boolean> = {};

  if (source) {
    return detectOneNode(adjacency, source, visitedLinkMap);
  }

  const adjLinks = Object.keys(adjacency);
  for (let i = 0; i < adjLinks.length; i++) {
    if (detectOneNode(adjacency, adjLinks[i], visitedLinkMap)) return true;
  }

  return false;
};
