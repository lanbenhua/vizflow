import './index.less';

import {
  Force,
  ELineType,
  getCenterPorts,
  IData,
  ILink,
  ShopeeV,
  ESelectMode,
  IComboGroup,
  IComboOption,
} from '../../src';
import { globalState } from '../../src/lib/global-state';

const r = 20;

const nodes: IData[] = [
  { id: 'a', text: 'a', comboId: 'c1' },
  { id: 'b', text: 'b', width: r * 2, height: r * 2 },
  { id: 'c', text: 'c', comboId: 'c1' },
  { id: 'd', text: 'd' },
  { id: 'e', text: 'e', comboId: 'c2' },
  { id: 'f', text: 'f', comboId: 'c2' },
  { id: 'g', text: 'g' },
  { id: 'h', text: 'h' },
  { id: 'i', text: 'i' },
  { id: 'o', text: 'o' },
  { id: 'p', text: 'p' },
  { id: 'q', text: 'q' },
  { id: 'q1', text: 'q1' },
  { id: 'q2', text: 'q2' },
  { id: 'q3', text: 'q3' },
  { id: 'q4', text: 'q4' },
];

nodes.map((node) => (node.ports = getCenterPorts()));

const links: ILink[] = [
  // { from: { id: 'f' }, to: { id: 'c' } },
  { from: { id: 'b' }, to: { id: 'd' } },
  { from: { id: 'a' }, to: { id: 'b' } },
  { from: { id: 'b' }, to: { id: 'c' } },
  { from: { id: 'b' }, to: { id: 'e' } },
  { from: { id: 'b' }, to: { id: 'g' } },
  { from: { id: 'h' }, to: { id: 'b' } },
  { from: { id: 'o' }, to: { id: 'q' } },
  { from: { id: 'p' }, to: { id: 'q' } },
  { from: { id: 'b' }, to: { id: 'p' } },
  { from: { id: 'q' }, to: { id: 'i' } },
  { from: { id: 'q' }, to: { id: 'f' } },
  { from: { id: 'q1' }, to: { id: 'b' } },
  { from: { id: 'q2' }, to: { id: 'q1' } },
  { from: { id: 'q3' }, to: { id: 'q1' } },
  { from: { id: 'q4' }, to: { id: 'q1' } },
];

const parent = document.createElement('div');
parent.className = 'svg-parent';
document.body.append(parent);

interface IUDComboGroup extends IComboGroup {
  text1?: string;
}

const combo: IComboOption<IUDComboGroup> = {
  paddingLR: 30,
  paddingTB: 30,
  comboGroups: [
    {
      id: 'c1',
      paddingLR: 30,
      paddingTB: 100,
      text1: 'hello world3',
    },
    {
      id: 'c2',
    },
  ],
  text1: 'hello world2',
  render(r, d) {
    r.append('div').attr('class', 'user-defined-combo').append('span').text(d.text1);
  },
};

const shopeeV = new ShopeeV({
  parent: parent,
  nodes,
  links,
  defaultNodeWidth: 20,
  defaultNodeHeight: 20,
  // draggable: false,
  select: {
    selectMode: ESelectMode.touch,
  },
  combo,
  autoSize: true,
  zoom: {
    duration: 300,
    step: 1.2,
    clickDistance: 1,
    disableWheelZoom: false,
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
    lineType: ELineType.M,
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
    center: [400, 250],
    nodeStrength: -20,
    collideRadius: 60,
    shopeeV,
  });

  return layout.render().then(() => {
    console.log('render', globalState.isBusy(shopeeV.getId()));
  });
};

// shopeeV.render();
// shopeeV.render();
// shopeeV.render();
// shopeeV.render();
// shopeeV.render();
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

const updateNodeLink = document.createElement('button');
updateNodeLink.innerText = 'updateNodeLink';
updateNodeLink.onclick = () => {
  const link = shopeeV.getData().links.find((l) => l.from.id === 'start' && l.to.id === 'depend');
  link.attr = { ...link.attr };
  link.attr.markerStyle = 'stroke: purple; fill: purple';
  link.attr.pathStyle = 'stroke: purple';
  link.attr.text = 'update text';
  link.attr.textStyle = 'fill: purple';

  const node = {
    ...shopeeV.getOpt().nodes.find((n) => n.id === link.from.id),
    text: 'newTextahahaha',
  };

  shopeeV.node.updateNode(node).then(() => {
    shopeeV.link.moveLinks(node);
    shopeeV.link.updateLinkAttr(link);
  });
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

const updateCombo = document.createElement('button');
updateCombo.innerText = 'update combo';

updateCombo.onclick = () => {
  combo.comboGroups.push({
    id: 'c3',
  });

  shopeeV
    .updateData({
      nodes: nodes.map((node) => {
        if (['q1', 'q2'].includes(node.id as string)) {
          node.comboId = 'c3';
        }
        return node;
      }),
      links,
      comboGroups: combo.comboGroups,
    })
    .then(() => {
      layout();
    });
};

document.body.append(zoomIn);
document.body.append(zoomOut);
document.body.append(zoomReset);
document.body.append(randomHighlight);
document.body.append(addNode);
document.body.append(updateNodeLink);
document.body.append(multipleSelect);
document.body.append(zoomMode);
document.body.append(updateCombo);
