import './index.less';

import { ESelectMode, IData, ILink, ShopeeV, getCenterPorts } from '../../src';

const r = 40;

const nodes: IData[] = [
  { id: 'a', text: 'a' },
  { id: 'b', text: 'b', width: r * 5, height: r * 5 },
  { id: 'c', text: 'c' },
  // { id: 'd', text: 'd' },
  // { id: 'e', text: 'e' },
  { id: 'f', text: 'f' },
  // { id: 'g', text: 'g' },
  // { id: 'h', text: 'h' },
  // { id: 'i', text: 'i' },
];

nodes.map((node) => (node.ports = getCenterPorts()));

const links: ILink[] = [
  { from: { id: 'f' }, to: { id: 'c' } },
  { from: { id: 'c' }, to: { id: 'c' } },
  {
    from: { id: 'b' },
    to: { id: 'b' },
    attr: {
      text: 'global hi hello world',
      textStyle: 'fill: red',
      textAnchor: 'middle',
      pathStyle: 'stroke: red;',
      markerStyle: 'fill: red; stroke: red;',
    },
  },
  // { from: { id: 'a' }, to: { id: 'c' } },
  // { from: { id: 'c' }, to: { id: 'e' } },
  // { from: { id: 'a' }, to: { id: 'g' } },
  // { from: { id: 'b' }, to: { id: 'g' } },
  // {
  //   from: { id: 'd' },
  //   to: { id: 'a' },
  //   attr: {
  //     text: 'global hi hello world',
  //     textStyle: 'fill: red',
  //     textAnchor: 'middle',
  //     pathStyle: 'stroke: red;',
  //     markerStyle: 'fill: red; stroke: red;',
  //   },
  // },
  // {
  //   from: { id: 'g' },
  //   to: { id: 'h' },
  //   attr: {
  //     text: 'global hi hello world',
  //     pathStyle: 'stroke: purple;',
  //     markerStyle: 'fill: purple; stroke: purple;',
  //   },
  // },
  // { from: { id: 'h' }, to: { id: 'i' } },
];

const parent = document.createElement('div');
parent.className = 'svg-parent';
document.body.append(parent);

const shopeeV = new ShopeeV({
  parent: parent,
  nodes,
  links,
  defaultNodeWidth: r,
  defaultNodeHeight: r,
  // draggable: false,
  zoom: {
    duration: 300,
    step: 1.2,
    clickDistance: 1,
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
  linkConfig: {
    // lineType: ELineType.S,
    portCenterDistance: (n) => {
      return (n.width || r) / 2;
    },
  },
  miniMap: {
    margin: 0.05,
    size: [189, 129],
  },
  select: {
    selectMode: ESelectMode.touch,
  },
});

shopeeV.render().then(() => {
  shopeeV.zoomPlugin.zoomFit({
    duration: 0,
    // autoResize: false,
  });
});

document.body.addEventListener('keydown', (e) => {
  console.log(e);
  shopeeV.zoomPlugin.stop();
  shopeeV.selectPlugin.start();
});

document.body.addEventListener('keyup', () => {
  shopeeV.zoomPlugin.start();
  shopeeV.selectPlugin.stop();
});

shopeeV.linkPlugin.onDblClick = (e, l) => shopeeV.link.deleteLink(l);

shopeeV.linkPlugin.onClick = (e, l) => shopeeV.linkPlugin.activeLink(l);

shopeeV.nodePlugin.onDblClick = (e, d) => {
  e.stopPropagation();
  shopeeV.node.deleteNode(d.id);
};

shopeeV.nodePlugin.onContextMenu = (e, d) => {
  console.log('===>', e, d);
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

const randomHighlight = document.createElement('button');
randomHighlight.innerText = 'random highlight';
randomHighlight.onclick = () => {
  const randomIndex = Math.floor(Math.random() * nodes.length);
  shopeeV.zoomPlugin.centerNode(nodes[randomIndex].id);
};

const addNode = document.createElement('button');
addNode.innerText = 'addNode';
addNode.onclick = () => {
  shopeeV.node.addNode({
    id: `${Math.random()}`,
    x: 100,
    y: 50,
    text: `Presto SQL Editor${Math.random()}`.slice(0, 22),
  });
};

const updateLink = document.createElement('button');
updateLink.innerText = 'updateLink';
updateLink.onclick = () => {
  const link = shopeeV.getData().links.find((l) => l.from.id === 'f' && l.to.id === 'c');
  link.attr = { ...link.attr };
  link.attr.markerStyle = 'stroke: purple; fill: purple';
  link.attr.pathStyle = 'stroke: purple';
  link.attr.text = 'update text';
  link.attr.textStyle = 'fill: purple';

  shopeeV.link.updateLinkAttr(link);
};

const multipleSelect = document.createElement('button');
multipleSelect.innerText = 'select mode';

shopeeV.selectPlugin.onSelectEnd = () => {
  shopeeV.nodePlugin.activeNodes(shopeeV.selectPlugin.getSelectedNodes());
  // shopeeV.highlight.set(shopeeV.selectPlugin.getSelectedNodes(), [links[0]]);
};

multipleSelect.onclick = () => {
  shopeeV.zoomPlugin.stop();
  shopeeV.selectPlugin.start();
};

const zoomMode = document.createElement('button');
zoomMode.innerText = 'zoom mode';

zoomMode.onclick = () => {
  shopeeV.selectPlugin.stop();
  shopeeV.zoomPlugin.start();
};

document.body.append(zoomIn);
document.body.append(zoomOut);
document.body.append(zoomReset);
document.body.append(randomHighlight);
document.body.append(addNode);
document.body.append(updateLink);
document.body.append(multipleSelect);
document.body.append(zoomMode);
