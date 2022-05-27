import { IData, ELayoutDirection, ILink } from '../../types/base-type';
import { IHierarchyLayoutOption } from '../hierarchy';
import { HorizontalLayout } from '../horizontal';

export class VerticalLayout<
  T extends IData = IData,
  L extends ILink = ILink
> extends HorizontalLayout<T, L> {
  static direction: ELayoutDirection = ELayoutDirection.V;

  constructor(opt: IHierarchyLayoutOption<T, L>) {
    super({ direction: VerticalLayout.direction, ...opt });
  }

  protected beautifyLinks(links: L[]) {
    links.forEach((link) => {
      link.from.linkIndex = 2;
      link.to.linkIndex = 0;
    });

    return links;
  }
}
