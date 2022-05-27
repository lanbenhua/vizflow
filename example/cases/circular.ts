import './index.less';

import { Circular, ELineType, getCenterPorts, IData, ILink, ShopeeV } from '../../src';

const nodes: IData[] = [
  { id: 'a', text: 'a' },
  { id: 'b', text: 'b' },
  { id: 'c', text: 'c' },
  { id: 'd', text: 'd' },
  { id: 'e', text: 'e' },
  { id: 'f', text: 'f' },
  { id: 'g', text: 'g' },
  { id: 'h', text: 'h' },
  { id: 'i', text: 'i' },
];

nodes.map((node) => (node.ports = getCenterPorts()));

const links: ILink[] = [
  { from: { id: 'f' }, to: { id: 'c' } },
  { from: { id: 'c' }, to: { id: 'd' } },
  { from: { id: 'a' }, to: { id: 'a' }, attr: { text: 'test if this works' } },
  { from: { id: 'a' }, to: { id: 'c' } },
  { from: { id: 'c' }, to: { id: 'e' } },
  { from: { id: 'a' }, to: { id: 'g' } },
  { from: { id: 'b' }, to: { id: 'g' } },
  { from: { id: 'd' }, to: { id: 'a' } },
  { from: { id: 'g' }, to: { id: 'h' }, attr: { text: 'AHAHAHAHAHHAHAAH' } },
  { from: { id: 'h' }, to: { id: 'i' } },
];

const parent = document.createElement('div');
parent.className = 'svg-parent';
document.body.append(parent);

const shopeeV = new ShopeeV({
  parent: parent,
  nodes,
  links,
  defaultNodeWidth: 20,
  defaultNodeHeight: 20,
  // draggable: false,
  autoSize: true,
  zoom: {
    duration: 300,
    step: 1.2,
    clickDistance: 1,
    disableWheelZoom: false,
  },
  linkConfig: {
    lineType: ELineType.S,
    portCenterDistance: () => {
      return 10;
    },
  },
  nodeConfig: {
    clickDistance: 1,
    // hidePort: true,
    // draggable: false,
    renderUDForeignObject: (r) => {
      r.append('span')
        .text((d) => d.text)
        .on('click', console.log);
    },
  },
  miniMap: {
    margin: 0.05,
    size: [189, 129],
  },
});

const layout = () => {
  const layout = new Circular({
    center: [400, 350],
    startAngle: 0,
    endAngle: Math.PI * 2,
    // divisions: 1,
    radius: 150,
    shopeeV,
  });

  layout.render().then(() => {
    shopeeV.zoomPlugin.zoomFit({
      duration: 0,
      autoResize: false,
    });
  });
};

layout();
layout();

shopeeV.linkPlugin.onDblClick = (e, l) => shopeeV.link.deleteLink(l);
shopeeV.linkPlugin.onClick = console.log;
shopeeV.nodePlugin.onDblClick = (e, d) => {
  e.stopPropagation();
  shopeeV.node.deleteNode(d.id);
};

const zoomIn = document.createElement('button');
zoomIn.innerText = 'zoom in';
zoomIn.onclick = () => {
  shopeeV.zoomPlugin.zoomIn();
};

const zoomOut = document.createElement('button');
zoomOut.innerText = 'zoom out';
zoomOut.onclick = () => {
  shopeeV.zoomPlugin.zoomOut();
};

const zoomReset = document.createElement('button');
zoomReset.innerText = 'zoom reset';
zoomReset.onclick = () => {
  shopeeV.zoomPlugin.zoomReset();
};

document.body.append(zoomIn);
document.body.append(zoomOut);
document.body.append(zoomReset);
