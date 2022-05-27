import { defaultNodeHeight, defaultNodeWidth } from './lib/constant';
import { IData, ILink } from './types/base-type';
import { SelectPlugin } from './plugins/select';
import { LinkPlugin } from './plugins/link';
import { NodePlugin } from './plugins/node';
import { PortPlugin } from './plugins/port';
import { ZoomPlugin } from './plugins/zoom';
import { Highlight } from './hightlight';
import { ShopeeVBase } from './render';
import { Combos } from './combo';
import * as d3 from 'd3';

export { getDefaultPorts, getCenterPorts } from './lib/utils';
export { defaultNodeHeight, defaultNodeWidth };
export * from './layout-algorithm';
export * from './types/base-type';
export * from './lib/mock-event';
export * from './lib/utils';
export * from './lib/graph';
export * from './lib/tree';

export class ShopeeV<T extends IData = IData, L extends ILink = ILink> extends ShopeeVBase<T, L> {
  public selectPlugin: SelectPlugin<T, L>;
  public zoomPlugin: ZoomPlugin<T, L>;
  public nodePlugin: NodePlugin<T, L>;
  public linkPlugin: LinkPlugin<T, L>;
  public portPlugin: PortPlugin<T, L>;
  public highlight: Highlight<T, L>;
  public combos: Combos<T>;
  private static globalStyle: d3.Selection<HTMLStyleElement, unknown, null, undefined>;

  protected initPlugins() {
    this.combos = new Combos(this);
    this.activePlugins();
    this.highlight = new Highlight<T, L>(this);
  }

  protected afterRender() {
    super.afterRender();
    this.combos.render();
  }

  activePlugins() {
    this.selectPlugin = new SelectPlugin<T, L>().active(this);
    this.zoomPlugin = new ZoomPlugin<T, L>().active(this);
    this.nodePlugin = new NodePlugin<T, L>().active(this);
    this.portPlugin = new PortPlugin<T, L>().active(this);
    this.linkPlugin = new LinkPlugin<T, L>().active(this);
  }

  private enablePluginEvents() {
    this.nodePlugin?.enableEvent();
    this.linkPlugin?.enableEvent();
    this.portPlugin?.enableEvent();
  }

  setReadOnly = (r: boolean) => {
    if (r === this.option.readonly) return;
    this.option.readonly = r;
    this.enablePluginEvents();
  };

  static setGlobalStyle(style: string) {
    if (!ShopeeV.globalStyle) {
      ShopeeV.globalStyle = d3.select(document.head).append('style').attr('belongstosvg', true);
    }
    ShopeeV.globalStyle.text(style);
  }
}
