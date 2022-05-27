import './index.less';

import { HorizontalLayout, IData, ILink, ShopeeV } from '../../src';

const nodes: IData[] = [
  {
    id: 208,
    text: 'sql_query_spark_sql_1sql_query_spark_sql_1sql_query_spark_sql_1sql_query_spark_sql_1',
  },
  { id: 209, text: 'sql_query_spark_sql_2' },
  { id: 210, text: 'sql_query_presto_sql_3' },
  { id: 211, text: 'sql_query_presto_sql_4' },
  { id: 212, text: 'sql_query_spark_sql_5' },
  { id: 213, text: 'sql_query_presto_sql_6' },
  { id: 2380, text: 'zhichuan_spark_test' },
  { id: 3298, text: 'test001sparkjar' },
  { id: 2225, text: 'test_shell' },
  { id: 4373, text: 'test' },
  { id: 4379, text: 'test2' },
  { id: 4380, text: 'test3' },
];

const links: ILink[] = [
  { from: { id: 208, linkIndex: 2 }, to: { id: 209, linkIndex: 0 } },
  { from: { id: 208, linkIndex: 2 }, to: { id: 210, linkIndex: 0 } },
  { from: { id: 209, linkIndex: 2 }, to: { id: 211, linkIndex: 0 } },
  { from: { id: 211, linkIndex: 2 }, to: { id: 212, linkIndex: 0 } },
  { from: { id: 211, linkIndex: 2 }, to: { id: 213, linkIndex: 1 } },
  { from: { id: 210, linkIndex: 2 }, to: { id: 2380, linkIndex: 0 } },
  { from: { id: 210, linkIndex: 2 }, to: { id: 3298, linkIndex: 0 } },
  { from: { id: 213, linkIndex: 2 }, to: { id: 2225, linkIndex: 0 } },
  { from: { id: 2380, linkIndex: 2 }, to: { id: 2225, linkIndex: 0 } },
  { from: { id: 3298, linkIndex: 2 }, to: { id: 2225, linkIndex: 0 } },
  { from: { id: 2225, linkIndex: 2 }, to: { id: 4373, linkIndex: 0 } },
  { from: { id: 4380, linkIndex: 2 }, to: { id: 4373, linkIndex: 1 } },
];

const shopeeV = new ShopeeV({
  parent: document.body,
  nodes,
  links,
  // autoSize: true,
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
        .text((d) => d.text)
        .on('click', console.log);
    },
  },
});

const layout = new HorizontalLayout({
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

shopeeV.linkPlugin.onClick = console.log;
