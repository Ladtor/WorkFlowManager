import React from 'react';
import { EdgePanel, NodePanel, DetailPanel } from 'gg-editor';
import NodeDetail from './NodeDetail/index';
import EdgeDetail from './EdgeDetail/index';

class KoniDetailPanel extends React.Component {
  render() {
    const {workflows, tasks} = this.props;
    return (
      <DetailPanel>
        <NodePanel>
          <NodeDetail workflows={workflows} tasks={tasks}/>
        </NodePanel>
        <EdgePanel>
          <EdgeDetail />
        </EdgePanel>
      </DetailPanel>
    );
  }
}

export default KoniDetailPanel;
