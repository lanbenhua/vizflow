import './index.less';

import { Force, ELineType, getCenterPorts, ShopeeV } from '../../src';

import { nodes, links } from './data/graph';

const r = 20;

nodes.map((node) => (node.ports = getCenterPorts()));

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
  // autoSize: true,
  zoom: {
    duration: 400,
    step: 1.5,
    clickDistance: 1,
    disableWheelZoom: false,
    // scaleExtent: [0.5, 4],
    hideLinkDuringZooming: true,
  },
  nodeConfig: {
    clickDistance: 1,
    hidePort: true,
    // draggable: false,
    renderUDForeignObject: (r) => {
      r.append('span')
        .text((d) => d.text)
        .on('click', console.log);
    },
  },
  linkConfig: {
    lineType: ELineType.M,
    supportMultipleLinks: true,
    multipleLinkMaxGrade: 50,
    portCenterDistance: (n) => {
      return (n.width || r) / 2;
    },
  },
  miniMap: {
    margin: 0.05,
    size: [189, 129],
    renderMode: 'async',
    hideLinkText: true,
  },
});

const layout = () => {
  const layout = new Force({
    center: [400, 400],
    nodeStrength: -30,
    collideRadius: 100,
    shopeeV,
  });

  return layout.render();
};

shopeeV.render().then(() => layout());

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

const deleteLink = document.createElement('button');
deleteLink.innerText = 'delete link';
deleteLink.onclick = () => {
  shopeeV.link.deleteLink('c_d_1');
  shopeeV.link.deleteLink('c_d_2');
};

document.body.append(zoomIn);
document.body.append(zoomOut);
document.body.append(deleteLink);
