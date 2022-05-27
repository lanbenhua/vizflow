import { IData, ILink, ISize, IWorkflowData, IXy, NodeId } from '../types/base-type';
import { globalState } from '../lib/global-state';
import { ShopeeV } from '../';

export interface IBaseLayoutOption<T extends IData = IData, L extends ILink = ILink> {
  shopeeV: ShopeeV<T, L>;
  center?: [number, number];
  disableBeautifyLinks?: boolean;
}

export class BaseLayout<T extends IData = IData, L extends ILink = ILink> {
  protected option: IBaseLayoutOption<T, L>;
  protected shopeeV: ShopeeV<T, L>;

  constructor(opt: IBaseLayoutOption<T, L>) {
    this.option = opt;
    this.shopeeV = opt.shopeeV;
    this.init();
  }

  protected init() {
    // to do...
  }

  protected create(
    source: IWorkflowData<T, L>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    id: string
  ): IWorkflowData<T, L> | Promise<IWorkflowData<T, L>> {
    return source;
  }

  private getLayout(source: IWorkflowData<T, L>, id: string) {
    return Promise.resolve(this.create(source, id));
  }

  protected isIllegalId(id: string) {
    return globalState.isIllegalId(this.shopeeV.getId(), id);
  }

  protected idCheck(id: string, clear = false) {
    globalState.idCheck(this.shopeeV.getId(), id, clear);
  }

  protected needRenderInAdvance() {
    const autoSize = this.shopeeV.getOpt().autoSize === true;
    return autoSize && (!this.shopeeV.isRendered() || this.shopeeV.isAltering());
  }

  private _render() {
    const id = globalState.start(this.shopeeV.getId());
    let promise = Promise.resolve();
    if (this.needRenderInAdvance()) {
      promise = this.shopeeV.__unsafeRender(false);
    }

    return promise
      .then(() => {
        const source = this.shopeeV.getData();
        return this.getLayout(source, id);
      })
      .then((data) => {
        this.idCheck(id, true);
        return this.shopeeV.__unsafeUpdateData(data, false).then(() => data);
      });
  }

  render() {
    return this._render();
  }

  protected autoSizeAlignCenter(size: ISize, xy: IXy) {
    // const autoSize = this.shopeeV.option.autoSize === true;
    // if (!autoSize) return xy;

    return {
      x: xy.x - (size.width || 0) / 2,
      y: xy.y - (size.height || 0) / 2,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected beautifyLinks(links: L[], _?: Map<NodeId, T>) {
    return links;
  }

  protected makeLinksBeautiful(links: L[], nodeMap?: Map<NodeId, T>) {
    if (this.option.disableBeautifyLinks) return links;
    return this.beautifyLinks(links, nodeMap);
  }
}
