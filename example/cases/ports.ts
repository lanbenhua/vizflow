import './index.less';

import { IData, ILink, ShopeeV } from '../../src';

const nodes: IData[] = [
  {
    x: 300,
    y: 200,
    text: 'Presto SQL Editor',
    height: 70,
    // style: 'fill: red; stroke: yellow',
    id: '001',
    ports: [
      {
        x: 1,
        y: 0.5,
      },
    ],
    // subNodes: [
    //   {
    //     text: 'Presto SQL Editor',
    //     // style: 'fill: red; stroke: yellow',
    //     id: '00100',
    //     ports: [
    //       {
    //         x: 0,
    //         y: 0.5,
    //       },
    //     ],
    //   },
    // ],
  },
  {
    x: 510,
    y: 10,
    width: 200,
    height: 100,
    text: 'dblclick delete me',
    style: 'fill: #EEE',
    ports: [
      {
        x: 0.8,
        y: 1,
        style: 'fill: black',
      },
      {
        x: 0.2,
        y: 1,
      },
      {
        x: 1,
        y: 0.7,
      },
    ],
    id: '002',
  },
  {
    x: 610,
    y: 310,
    text: 'Output DW Table2',
    style: 'fill: #ABC',
    id: '003',
  },
  {
    x: 300,
    y: 400,
    text: 'Presto SQL Editor2',
    id: '005',
  },
];

const links: ILink[] = [
  {
    from: { id: '001', linkIndex: 0 },
    to: { id: '002', linkIndex: 1 },
  },
  // {
  //   from: { id: '001', linkIndex: 0 },
  //   to: { id: '002', linkIndex: 1 },
  //   id: 'test',
  // },
  {
    from: { id: '002', linkIndex: 0 },
    to: { id: '003', linkIndex: 0 },
  },
  {
    from: { id: '005', linkIndex: 1 },
    to: { id: '003', linkIndex: 3 },
  },
];

const divSvgCtn = document.createElement('div');
divSvgCtn.classList.add('ctn');
document.body.append(divSvgCtn);

const shopeeV = new ShopeeV({
  parent: divSvgCtn,
  nodes,
  links,
  defaultNodeWidth: 200,
  portSensitive: false,
  disableLoop: true,
  zoom: {
    duration: 300,
    step: 1.2,
    clickDistance: 1,
  },
  nodeConfig: {
    clickDistance: 10,
    renderUDForeignObject: (f) => {
      f.append('span')
        .text((d) => `${d.text}-${d.id}`)
        .on('click', console.log);
    },
  },
  linkConfig: {
    supportMultipleLinks: false,
    renderUDTooltipForeignObject: (f) => {
      f.append('div')
        .style('text-align', 'center')
        .text((d) => {
          return `${d.from.id}=${d.to.id}`;
        });
    },
    tooltipOffset: ['-50%', -15],
  },
  readonly: false,
});

shopeeV.nodePlugin.onContextMenu = console.log;

shopeeV.linkPlugin.onDblClick = (e, l) => shopeeV.link.deleteLink(l);
shopeeV.linkPlugin.onClick = (e, l) => shopeeV.linkPlugin.activeLink(l);

// shopeeV.portPlugin.onConnecting = (l) => {
//   shopeeV.link.addLink({ ...l, id: 'new_link001' });
//   return false;
// };

// demo for tooltip
shopeeV.linkPlugin.onMouseEnter = function () {
  console.log('mouse enter');
};
shopeeV.linkPlugin.onMouseLeave = () => {
  console.log('mouse leave');
};

shopeeV.linkPlugin.onMouseMove = () => {
  console.log('mouse moving');
};

shopeeV.render();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// shopeeV.portPlugin.onConnecting = (start, end) => {
//   if (start.id === '002') return false;
//   return true;
// };

shopeeV.nodePlugin.onClick = (e, d) => {
  shopeeV.nodePlugin.activeNode(d);
  e.stopPropagation();
  // console.log(d);
};

shopeeV.nodePlugin.onNodeMove = (e, d) => {
  console.log(e, d);
};

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

// const multipleSelect = document.createElement('button');
// multipleSelect.innerText = 'multiple select';

// shopeeV.selectPlugin.onSelectEnd = (e: ID3ZoomEvent) => {
//   shopeeV.selectPlugin.stop();
//   shopeeV.zoomPlugin.start();
//   shopeeV.nodePlugin.activeNodes(shopeeV.selectPlugin.getNodes(e));
// };

// multipleSelect.onclick = () => {
//   shopeeV.zoomPlugin.stop();
//   shopeeV.selectPlugin.start();
// };

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

const updateNode = document.createElement('button');
updateNode.innerText = 'updateNode';
updateNode.onclick = () => {
  const node = shopeeV.getData().nodes.find((n) => n.id === '001');
  shopeeV.node.updateNode(node);
};

const toggleReadOnly = document.createElement('button');
toggleReadOnly.innerText = 'toggleReadOnly';
toggleReadOnly.onclick = () => {
  shopeeV.setReadOnly(!shopeeV.getOpt().readonly);
  console.log('readonly ->', shopeeV.getOpt().readonly);
};

document.body.append(zoomIn);
document.body.append(zoomOut);
document.body.append(zoomReset);
// document.body.append(multipleSelect);
document.body.append(addNode);
document.body.append(updateNode);
document.body.append(toggleReadOnly);
