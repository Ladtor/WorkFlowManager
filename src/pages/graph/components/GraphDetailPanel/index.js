import React from 'react';
import { DetailPanel, EdgePanel, NodePanel } from 'gg-editor';
import NodeDetail from '../NodeDetail/index';
import EdgeDetail from '../EdgeDetail/index';
import NodeExecute from '../NodeExecute/index';
import styles from './index.less';

const GraphDetailPanel = ({ onExecute, onSuccess, className, tasks }) => {
  return (
    <DetailPanel className={className}>
      <NodePanel style={{ height: '100%' }}>
        <NodeDetail className={styles.nodeDetail} tasks={tasks} />
        <NodeExecute onExecute={onExecute} onSuccess={onSuccess} />
      </NodePanel>
      <EdgePanel style={{ height: '100%' }}>
        <EdgeDetail />
      </EdgePanel>
    </DetailPanel>
  );
};

export default GraphDetailPanel;
