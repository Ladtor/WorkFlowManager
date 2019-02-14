import React from 'react';
import { Card } from 'antd';
import { Item, ItemPanel } from 'gg-editor';
import styles from './koni.less';
import {
  TaskNode,
  HttpNode,
  WorkFlowNode,
  AndNode,
  OrNode,
  GraphModel,
} from '../../../../components/Koni/Node';

const KoniItemPanel = () => (
  <ItemPanel className={styles.itemPanel}>
    <Card bordered={false}>
      <GraphModel />
      <TaskNode />
      <HttpNode />
      <WorkFlowNode />
      <AndNode />
      <OrNode />
    </Card>
  </ItemPanel>
);

export default KoniItemPanel;
