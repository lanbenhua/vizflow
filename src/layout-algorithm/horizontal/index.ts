import { genarateTrees, removeVirtualLink, removeVirtualNode } from '../../lib/tree';
import { IData, ELayoutDirection, ILink, IWorkflowData } from '../../types/base-type';
import { HierarchyLayout, IHierarchyLayoutOption } from '../hierarchy';

export class HorizontalLayout<
  T extends IData = IData,
  L extends ILink = ILink
> extends HierarchyLayout<T, L> {
  static direction: ELayoutDirection = ELayoutDirection.H;

  constructor(opt: IHierarchyLayoutOption<T, L>) {
    super({ direction: HorizontalLayout.direction, ...opt });
  }

  protected create({ nodes, links }: IWorkflowData<T, L>) {
    const { treeLinks, treeNodes, unlinkedLinks } = genarateTrees<T, L>(
      nodes,
      links,
      this.option.direction
    );

    const allLinks = [...treeLinks, ...unlinkedLinks];
    const { nodes: newNodes } = super.create({ nodes: treeNodes, links: treeLinks });

    return {
      nodes: removeVirtualNode(newNodes),
      links: removeVirtualLink(allLinks),
    };
  }
}
