import './index.less';

import { HierarchyLayout, IData, ILink, ShopeeV } from '../../src';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const nodes: IData[] = [
  {
    text: 'table002',
    style: 'fill: #ABC',
    id: '002',
  },
  {
    text: 'table001',
    // style: 'fill: red; stroke: yellow',
    id: '001',
  },
  {
    text: 'table003000005',
    id: '003',
    // width: 350,
  },
  {
    text: 'table004',
    id: '004',
  },
  {
    text: 'table005',
    id: '005',
  },
  {
    text: 'table006',
    id: '006',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const links: ILink[] = [
  {
    from: { id: '001', linkIndex: 1 },
    to: { id: '002', linkIndex: 3 },
  },
  {
    from: { id: '001', linkIndex: 1 },
    to: { id: '003', linkIndex: 3 },
  },
  {
    from: { id: '003', linkIndex: 1 },
    to: { id: '004', linkIndex: 3 },
  },
  {
    from: { id: '002', linkIndex: 1 },
    to: { id: '005', linkIndex: 3 },
  },
  {
    from: { id: '002', linkIndex: 1 },
    to: { id: '006', linkIndex: 3 },
  },
];

const shopeeV = new ShopeeV({
  parent: document.body,
  nodes,
  autoSize: true,
  links,
  defaultNodeWidth: 200,
  // draggable: false,
  zoom: {
    duration: 300,
    step: 1.2,
    clickDistance: 1,
  },
  miniMap: {
    size: [150, 100],
  },
  nodeConfig: {
    clickDistance: 1,
    hidePort: true,
    draggable: false,
    renderUDForeignObject: (r) => {
      r.append('span')
        .text((d) => d.text)
        .on('click', console.log);
    },
  },
});

const layout = () => {
  const layout = new HierarchyLayout({
    deltaX: 200,
    deltaY: 100,
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

shopeeV.zoomPlugin.zoomFit({
  duration: 0,
  autoResize: true,
});

shopeeV.linkPlugin.onClick = console.log;
