import './index.less';

import { IData, ILink, ShopeeV, VerticalLayout } from '../../src';

const nodes: IData[] = [
  {
    id: 9563,
    text: 'task1',
  },
  {
    id: 9564,
    text: 'task2',
  },
  {
    id: 9565,
    text: 'task3',
  },
  {
    id: 9600,
    text: 'sparkjar',
  },
  {
    id: 9608,
    text: 'sparkjar111',
  },
  {
    id: 9628,
    text: 'test_lo',
  },
  {
    id: 9629,
    text: 'test_lo_copy',
  },
  {
    id: 9631,
    text: 'test_lo_2',
  },
  {
    id: 9632,
    text: 'test_lo_copy11_copy',
  },
  {
    id: 9633,
    text: 'test_lo_copy11_copy',
  },
  {
    id: 9634,
    text: 'test_lo_copy11_copy',
  },
  {
    id: 9635,
    text: 'test_lo_copy11_copy',
  },
  {
    id: 9636,
    text: 'test_lo_copy11_copy',
  },
];

const links: ILink[] = [
  { from: { id: 9563, linkIndex: 2 }, to: { id: 9564, linkIndex: 0 } },
  { from: { id: 9563, linkIndex: 2 }, to: { id: 9565, linkIndex: 0 } },
  { from: { id: 9565, linkIndex: 2 }, to: { id: 9608, linkIndex: 0 } },
  { from: { id: 9608, linkIndex: 2 }, to: { id: 9600, linkIndex: 0 } },
  { from: { id: 9608, linkIndex: 2 }, to: { id: 9629, linkIndex: 0 } },
  { from: { id: 9629, linkIndex: 2 }, to: { id: 9628, linkIndex: 0 } },
  { from: { id: 9628, linkIndex: 2 }, to: { id: 9631, linkIndex: 0 } },
  { from: { id: 9564, linkIndex: 2 }, to: { id: 9628, linkIndex: 0 } },
  { from: { id: 9632, linkIndex: 2 }, to: { id: 9631, linkIndex: 0 } },
  { from: { id: 9633, linkIndex: 2 }, to: { id: 9632, linkIndex: 0 } },
  { from: { id: 9634, linkIndex: 2 }, to: { id: 9633, linkIndex: 0 } },
  { from: { id: 9635, linkIndex: 2 }, to: { id: 9634, linkIndex: 0 } },
  { from: { id: 9636, linkIndex: 2 }, to: { id: 9635, linkIndex: 0 } },
];

const shopeeV = new ShopeeV({
  parent: document.body,
  nodes,
  links,
  defaultNodeWidth: 200,
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
        .text((d) => d.id)
        .on('click', console.log);
    },
  },
});

const layout = new VerticalLayout({
  deltaX: 310,
  deltaY: 100,
  shopeeV,
});

layout.render().then(() => {
  shopeeV.zoomPlugin.zoomFit({
    duration: 0,
    // autoResize: false,
  });
});
