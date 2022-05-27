import * as d3 from 'd3';
import { ID3ZoomEvent, IData, ILink, NodeId } from '../types/base-type';
import { IPlugin } from '../types/plugin';
import { getRect } from '../lib/utils';
import { ShopeeV } from '..';

export class ZoomPlugin<T extends IData, L extends ILink> implements IPlugin<T, L> {
  private zoomHandler = d3.zoom<SVGSVGElement, T>();
  private zoomOriginStatus = false;
  private shopeeV: ShopeeV<T, L>;
  private zoomOutStep: number;
  private zoomInStep: number;
  private zoomStart = false;
  private zoomedByBrush: boolean;
  private zoomQueue: boolean[] = [];
  private isZooming = false;
  private isHideLink = false;

  private init() {
    const option = this.shopeeV.getOpt();
    option.zoom ||= {};
    // this.shopeeV.option.zoom.scaleExtent = this.shopeeV.option.zoom.scaleExtent || [0.2, 4];
    option.zoom.duration ||= 0;
    option.zoom.step ||= 2;
    this.zoomOutStep = 1 / option.zoom.step;
    this.zoomInStep = option.zoom.step;
    this.initZoom();
  }

  private initZoom() {
    const option = this.shopeeV.getOpt();
    if (typeof option.zoom.clickDistance !== 'number') {
      option.zoom.clickDistance = 1;
    }

    this.zoomHandler.clickDistance(option.zoom.clickDistance);

    this.zoomReset = this.zoomStatusRecovery.bind(this, this.zoomReset);
    this.zoomOut = this.zoomStatusRecovery.bind(this, this.zoomOut);
    this.zoomIn = this.zoomStatusRecovery.bind(this, this.zoomIn);
    this.zoomFit = this.zoomStatusRecovery.bind(this, this.zoomFit);

    this.panToXY = this.zoomStatusRecovery.bind(this, this.panToXY);
    this.zoomByBrush = this.zoomStatusRecovery.bind(this, this.zoomByBrush);
  }

  private cacheZoomStatus(status: boolean) {
    if (this.zoomOriginStatus === false) return;
    this.zoomOriginStatus = status;
  }

  private setZoomStatus(status: boolean, triggerBySwitchZoomStatus = true) {
    this.zoomStart = status;
    if (triggerBySwitchZoomStatus) this.zoomOriginStatus = this.zoomStart;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private zoomStatusRecovery(fn: (...args: any) => unknown, ...args: any) {
    this.cacheZoomStatus(this.zoomStart);

    const res = fn(...args);
    const needStop = !this.zoomOriginStatus;
    if (!needStop) return res;

    this.zoomQueue.push(true);
    const stop = () => {
      this.zoomQueue.pop();
      if (this.zoomQueue.length) return;
      this.stop();
    };

    if (res instanceof Promise) {
      return res.finally(stop);
    }

    stop();
    return res;
  }

  private updateSvgTransform(trans: d3.ZoomTransform) {
    if (!trans) return;
    this.shopeeV.svg.call(this.zoomHandler.transform, trans);
  }

  zoomByBrush = (brushX: number, brushY: number) => {
    this.start(false);

    this.zoomedByBrush = true;
    const scale = this.shopeeV.getCurrentTransform().k;
    this.updateSvgTransform(
      d3.zoomIdentity.translate(-brushX * scale, -brushY * scale).scale(scale)
    );
    this.zoomedByBrush = false;
  };

  private updateGroupTransform(transform: d3.ZoomTransform) {
    if (!this.shopeeV.group) return;
    this.shopeeV.group.attr('transform', transform.toString());
  }

  stop() {
    this.setZoomStatus(false);
    this.shopeeV.svg.attr('zoom-stop', 'true');
    this.zoomHandler.on('start.zoomMove', null);
    this.zoomHandler.on('zoom.zoomMove', null);
    this.zoomHandler.on('end.zoomMove', null);
    this.isZooming = false;
    this.shopeeV.svg.call(this.zoomHandler).on('.zoom', null);
  }

  private enableZoomHandler() {
    const selection = this.shopeeV.svg.call(this.zoomHandler);
    const option = this.shopeeV.getOpt();
    if (option.zoom.disableDblclickZoom !== false) {
      selection.on('dblclick.zoom', null);
    }

    if (option.zoom.disableWheelZoom !== false) {
      selection.on('wheel.zoom', null);
    }
  }

  start(triggerBySwitchZoomStatus = true) {
    if (this.zoomStart) return false;
    this.setZoomStatus(true, triggerBySwitchZoomStatus);
    this.enableZoomHandler();
    this.shopeeV.svg.node().removeAttribute('zoom-stop');
    this.zoomHandler.on('start.zoomMove', this.zoomStarting);
    this.zoomHandler.on('zoom.zoomMove', this.zooming());
    this.zoomHandler.on('end.zoomMove', this.zoomEnd());
    return true;
  }

  private bind() {
    const option = this.shopeeV.getOpt();
    if (option.zoom.scaleExtent) {
      this.zoomHandler.scaleExtent(option.zoom.scaleExtent);
    }
  }

  getZoomingStatus() {
    return this.isZooming;
  }

  public hideLink() {
    if (!this.shopeeV.getOpt().zoom.hideLinkDuringZooming) return;
    if (this.isHideLink) return;
    this.isHideLink = true;
    this.shopeeV.linkGroup.style('display', 'none');
  }

  public showLink() {
    if (this.isHideLink === false) return;
    this.isHideLink = false;
    if (!this.shopeeV.getOpt().zoom.hideLinkDuringZooming) return;
    this.shopeeV.linkGroup.style('display', '');
  }

  private zoomStarting = () => {
    this.isZooming = true;
  };

  private zooming = () => {
    const brush =
      this.shopeeV.getOpt().miniMap?.renderMode === 'async' ? () => 0 : this.moveBrushByZoom;
    return (e: ID3ZoomEvent) => {
      this.hideLink();
      this.updateGroupTransform(e.transform);
      brush(e);
    };
  };

  private zoomEnd = () => {
    const brush =
      this.shopeeV.getOpt().miniMap?.renderMode === 'sync' ? () => 0 : this.moveBrushByZoom;

    return (e: ID3ZoomEvent) => {
      this.isZooming = false;
      if (!this.zoomedByBrush) this.showLink();
      brush(e);
    };
  };

  private moveBrushByZoom = (e: ID3ZoomEvent) => {
    if (this.zoomedByBrush) return;
    this.shopeeV.miniMap?.moveBrushByZoom(e.transform);
  };

  zoomIn = () => {
    this.start(false);

    return this.shopeeV.svg
      .transition()
      .duration(this.shopeeV.getOpt().zoom.duration)
      .call(this.zoomHandler.scaleBy, this.zoomInStep)
      .end();
  };

  zoomOut = () => {
    this.start(false);

    return this.shopeeV.svg
      .transition()
      .duration(this.shopeeV.getOpt().zoom.duration)
      .call(this.zoomHandler.scaleBy, this.zoomOutStep)
      .end();
  };

  zoomReset = () => {
    this.start(false);

    return this.shopeeV.svg
      .transition()
      .duration(this.shopeeV.getOpt().zoom.duration)
      .call(this.zoomHandler.transform, d3.zoomIdentity)
      .end();
  };

  centerNode(nodeId: NodeId) {
    const selectedNode = this.shopeeV.dataMap.getNodeFromMap(nodeId);
    const { x, y } = selectedNode;
    this.panToXY(x + selectedNode.width / 2, y + selectedNode.height / 2);
  }

  panToXY = (x: number, y: number) => {
    this.start(false);
    return this.shopeeV.svg
      .transition()
      .duration(this.shopeeV.getOpt().zoom.duration)
      .call(this.zoomHandler.translateTo, x, y)
      .end();
  };

  zoomFit = (
    fit: {
      paddingPercent?: number;
      duration?: number;
      autoResize?: boolean;
      AllowScaleExceedOne?: boolean;
      strictScaleExtent?: boolean;
    } = {}
  ) => {
    this.start(false);

    const option = this.shopeeV.getOpt();
    const root = this.shopeeV.group;
    const bounds = getRect(this.shopeeV.getData().nodes);
    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;
    // when nodes.length === 0
    if (width <= 0 || height <= 0) return;

    const parent = root.node().parentElement;
    const fullWidth = parent.clientWidth;
    const fullHeight = parent.clientHeight;
    const midX = bounds.minX + width / 2;
    const midY = bounds.minY + height / 2;

    const getScale = () => {
      if (fit.autoResize === false) return 1;

      const scale = (fit.paddingPercent || 0.75) / Math.max(width / fullWidth, height / fullHeight);

      const realScale = fit.AllowScaleExceedOne ? scale : scale > 1 ? 1 : scale;

      if (fit.strictScaleExtent !== true) return realScale;

      if (realScale < option.zoom.scaleExtent?.[0]) {
        return option.zoom.scaleExtent[0];
      }

      if (realScale > option.zoom.scaleExtent?.[1]) {
        return option.zoom.scaleExtent[1];
      }

      return realScale;
    };
    const scale = getScale();
    const xy = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];
    const dura = fit.duration !== undefined ? fit.duration : option.zoom.duration;
    return this.shopeeV.svg
      .transition()
      .duration(dura)
      .call(this.zoomHandler.transform, d3.zoomIdentity.translate(xy[0], xy[1]).scale(scale))
      .end();
  };

  active(shopeeV: ShopeeV<T, L>) {
    this.shopeeV = shopeeV;
    this.init();
    this.bind();
    if (this.shopeeV.getOpt().draggable !== false) this.start();
    return this;
  }
}
