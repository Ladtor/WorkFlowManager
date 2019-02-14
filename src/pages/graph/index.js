import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Col, Row, Card, Icon } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import EditorMinimap from '@/components/Koni/EditorMinimap';
import { GraphModel } from '@/components/Koni/Node';
import { AddCommand, CopyAdjacentCommand, CopyCommand, DeleteCommand } from '@/components/Koni/Command';
import GraphDetailPanel from './components/GraphDetailPanel/index';
import ExecuteLogList from './components/ExecuteLogList';
import PopInputModal from '@/components/PopInputModal';
import { isJSON } from '@/utils/utils';
import styles from './index.less';

const Graph = ({ setting, graph: props, dispatch }) => {
  const { edgeStatusColor, nodeStatusColor } = setting;
  const { graph, resultModalVisible, paramsModalVisible, executeLog, runVersion, edgeLogList, nodeLogList, serialNo, tasks } = props;

  const config = {
    enable: () => false,
  };

  const fillLog = (data, edgeLogList, nodeLogList) => {
    if(edgeLogList){
      const edgeLogMap = {};
      edgeLogList.map(log =>{
        edgeLogMap[log.edgeId] = log;
        return log;
      });
      (data.edges || []).map(edge => {
        if (edgeLogMap[edge.id]) {
          edge.color = edgeStatusColor[edgeLogMap[edge.id].result];
          edge.params = edgeLogMap[edge.id].params;
          edge.result = edgeLogMap[edge.id].result;
        }
        edge.label = edge.label || edge.condition;
        return edge;
      });
    }
    if(nodeLogList){
      const nodeLogMap = {};
      nodeLogList.map(log =>{
        nodeLogMap[log.nodeId] = log;
        return log;
      });
      (data.nodes || []).map(node => {
        if(nodeLogMap[node.id]){
          node.statusColor = nodeStatusColor[nodeLogMap[node.id].status];
          node.runParams = nodeLogMap[node.id].params;
          node.result = nodeLogMap[node.id].result;
        }
        return node;
      });
    }
  };

  const handleExecute = ({ model }) => {
    const { id } = model;
    dispatch({
      type: 'graph/saveState',
      payload: {
        executeId: id,
        paramsModalVisible: true,
      },
    });
  };

  const handleSuccess = ({ model }) => {
    const { id } = model;
    dispatch({
      type: 'graph/saveState',
      payload: {
        successId: id,
        resultModalVisible: true,
      },
    });
  };

  const handleHideParamsModal = () => {
    dispatch({
      type: 'graph/saveState',
      payload: {
        paramsModalVisible: false
      }
    })
  };

  const handleHideResultModal = () => {
    dispatch({
      type: 'graph/saveState',
      payload: {
        resultModalVisible: false
      }
    })
  };

  const handleParams = (value) => {
    dispatch({
      type: 'graph/nodeExecute',
      payload: value,
    }).then(()=>{
      handleHideParamsModal();
    });
  };

  const handleResult = (value) => {
    dispatch({
      type: 'graph/nodeSuccess',
      payload: value,
    }).then(()=>{
      handleHideResultModal();
    });
  };

  const handleExecuteLogClick = (executeLog) => {
    dispatch(
      routerRedux.push(`/graph/${executeLog.serialNo}/${executeLog.version}/${executeLog.runVersion}`)
    );
  };

  const handleRefreshLog = () => {
    dispatch({
      type: 'graph/getExecuteLog'
    })
  };

  const jsonRule = {
    message: '请使用 json 格式',
    validator: (rule, value, callback) => {
      isJSON(value) ? callback() : callback(true);
    },
  };

  fillLog(graph, edgeLogList, nodeLogList);
  return (
    <GGEditor
      className={styles.editor}
      onBeforeCommandExecute={({ command }) => {
        console.log('command', command);
      }}
    >
      <Row type="flex" className={styles.editorBd}>
        <Col span={3} className={styles.editorSidebar}>
          <Card title='运行记录' bordered={false} extra={<a onClick={handleRefreshLog}><Icon type="sync" /></a>}>
            <ExecuteLogList data={executeLog} active={runVersion} onClick={handleExecuteLogClick} />
          </Card>
        </Col>
        <Col span={15} className={styles.editorContent}>
          <Koni
            className={styles.koni}
            data={graph}
          />
        </Col>
        <Col span={6} className={styles.editorSidebar}>
          <GraphDetailPanel onExecute={handleExecute} onSuccess={handleSuccess} className={styles.detailPanel} tasks={tasks}/>
          <EditorMinimap />
        </Col>
      </Row>
      <GraphModel />

      <AddCommand config={config} />
      <CopyCommand config={config} />
      <DeleteCommand config={config} />
      <CopyAdjacentCommand config={config} />

      <PopInputModal title='执行参数' onChange={handleParams} visible={paramsModalVisible} onCancel={handleHideParamsModal} rules={[jsonRule]} />
      <PopInputModal title='结果参数' onChange={handleResult} visible={resultModalVisible} onCancel={handleHideResultModal} rules={[jsonRule]} />
    </GGEditor>
  );
};

export default connect(({ setting, graph }) => ({
  setting, graph,
}))(Graph);
