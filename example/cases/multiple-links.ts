import './index.less';

import { Force, ELineType, getCenterPorts, ShopeeV, IData, ILink } from '../../src';

// import { nodes, links } from './air-flow/data';

const r = 20;

const nodes: IData[] = [
  { id: 'a', text: 'a' },
  { id: 'b', text: 'b', width: r * 2, height: r * 2 },
  { id: 'c', text: 'c' },
  { id: 'd', text: 'd' },
  { id: 'e', text: 'e' },
  { id: 'f', text: 'f' },
  { id: 'g', text: 'g' },
  { id: 'h', text: 'h' },
  { id: 'i', text: 'i' },
  { id: 'o', text: 'o' },
  { id: 'p', text: 'p' },
  { id: 'q', text: 'q' },
  // { id: 'q1', text: 'q1' },
  // { id: 'q2', text: 'q2' },
  // { id: 'q3', text: 'q3' },
  { id: 'q4', text: 'q4' },
];

nodes.map((node) => (node.ports = getCenterPorts()));

const links: ILink[] = [
  // { from: { id: 'f' }, to: { id: 'c' } },
  { from: { id: 'd' }, to: { id: 'c' }, id: 'c_d_1', attr: { text: 'hello world 1' } },
  { from: { id: 'c' }, to: { id: 'd' }, id: 'c_d_2', attr: { text: 'hello world 2' } },
  { from: { id: 'c' }, to: { id: 'd' }, id: 'c_d_3', attr: { text: 'hello world 3' } },
  { from: { id: 'd' }, to: { id: 'c' }, id: 'c_d_4', attr: { text: 'hello world 4' } },
  // { from: { id: 'c' }, to: { id: 'd' }, id: 'c_d_4', attr: { text: 'hello world 4' } },
  { from: { id: 'a' }, to: { id: 'b' } },
  { from: { id: 'b' }, to: { id: 'c' } },
  { from: { id: 'b' }, to: { id: 'e' } },
  // { from: { id: 'a' }, to: { id: 'b' } },
  { from: { id: 'b' }, to: { id: 'g' } },
  { from: { id: 'h' }, to: { id: 'b' } },
  { from: { id: 'o' }, to: { id: 'q' } },
  { from: { id: 'p' }, to: { id: 'q' } },
  // { from: { id: 'b' }, to: { id: 'p' } },
  { from: { id: 'q' }, to: { id: 'd' } },
  { from: { id: 'q' }, to: { id: 'i' } },
  { from: { id: 'q' }, to: { id: 'f' } },
  // { from: { id: 'q1' }, to: { id: 'b' } },
  // { from: { id: 'q2' }, to: { id: 'q1' } },
  // { from: { id: 'q3' }, to: { id: 'q1' } },
  // { from: { id: 'q4' }, to: { id: 'q1' } },
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
  // autoSize: true,
  zoom: {
    duration: 300,
    step: 1.2,
    clickDistance: 1,
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
