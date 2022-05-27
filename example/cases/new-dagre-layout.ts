import './index.less';

import {
  Dagre,
  ELayoutDirection,
  ELineType,
  ESelectMode,
  getDefaultPorts,
  ShopeeV,
} from '../../src';

import { nodes, links } from './data/air-flow';

const parent = document.createElement('div');
parent.className = 'svg-parent';
document.body.append(parent);

ShopeeV.setGlobalStyle(`
  // just for test
`);

nodes.map((node) => (node.ports = getDefaultPorts()));

const shopeeV = new ShopeeV({
  parent: parent,
  nodes,
  links,
  autoSize: true,
  // draggable: false,
  // defaultNodeHeight: 32,
  // defaultNodeWidth: 160,
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
      return new Promise((res) => {
        r.append('span')
          .text((d) => d.text)
          .on('click', console.log);

        res();
      });
    },
    paddingLR: 10,
    paddingTB: 10,
  },
  linkConfig: {
    lineType: ELineType.C,
    // portCenterDistance: (n) => {
    //   return n.width / 2;
    // },
  },
  miniMap: {
    margin: 0.05,
    size: [189, 129],
  },
  select: {
    selectMode: ESelectMode.touch,
  },
});

const layout = () => {
  const layout = new Dagre({
    direction: ELayoutDirection.H,
    ranksep: 30,
    nodesep: 30,
    compound: true,
    // ranker: 'network-simplex',
    shopeeV,
  });

  layout.render();
};

layout();

// shopeeV.render().then(() => {
//   shopeeV.node.addNode({ id: 'test1', text: 'test_id' });
//   layout();
// });

document.body.addEventListener('keydown', () => {
  shopeeV.zoomPlugin.stop();
  shopeeV.selectPlugin.start();
});

document.body.addEventListener('keyup', () => {
  shopeeV.zoomPlugin.start();
  shopeeV.selectPlugin.stop();
});

shopeeV.linkPlugin.onDblClick = (e, l) => {
  e.stopPropagation();
  shopeeV.link.deleteLink(l);
};

shopeeV.linkPlugin.onClick = (e, l) => shopeeV.linkPlugin.activeLink(l);

shopeeV.nodePlugin.onDblClick = (e, d) => {
  console.log('dblClick 2');
  // e.stopPropagation();
  shopeeV.node.deleteNode(d.id);
};

shopeeV.nodePlugin.onClick = (e) => {
  if (!e.shiftKey) return;
  console.log('node click');
  e.stopPropagation();
};

const dagreLayout = document.createElement('button');
dagreLayout.innerText = 'dagre layout';
dagreLayout.onclick = () => {
  layout();
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

document.body.append(dagreLayout);
document.body.append(zoomIn);
document.body.append(zoomOut);
document.body.append(zoomReset);
document.body.append(randomHighlight);
document.body.append(addNode);
document.body.append(updateNodeLink);
document.body.append(multipleSelect);
document.body.append(zoomMode);
