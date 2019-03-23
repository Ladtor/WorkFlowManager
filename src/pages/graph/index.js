import React from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Col, Row, Card, Icon } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import SockJsClient from 'react-stomp';
import DocumentTitle from 'react-document-title';
import EditorMinimap from '@/components/Koni/EditorMinimap';
import { GraphModel } from '@/components/Koni/Node';
import { AddCommand, CopyAdjacentCommand, CopyCommand, DeleteCommand } from '@/components/Koni/Command';
import GraphDetailPanel from './components/GraphDetailPanel/index';
import ExecuteLogList from './components/ExecuteLogList';
import PopInputModal from '@/components/PopInputModal';
import { isJSON } from '@/utils/utils';
import styles from './index.less';

let koni;
let client;
const Graph = ({ setting, graph: props, dispatch }) => {
  const { edgeStatusColor, nodeStatusColor, stompUrl, title } = setting;
  const { graph, resultModalVisible, paramsModalVisible, executeLog, runVersion, edgeLogList, nodeLogList, serialNo, version, tasks } = props;
  const NODE_LOG = '/nodeLog';
  const EDGE_LOG = '/edgeLog';
  const EXECUTE_LOG = '/executeLog';
  const config = {
    enable: () => false,
  };

  const getPageTitle = () =>{
    return `${title}`;
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
        if(koni)koni.update(edge.id, {...edge});
        return edge;
      });
    }
    if(nodeLogList){
      const nodeLogMap = {};
      nodeLogList.map(log =>{
        nodeLogMap[log.nodeId] = log;
        return log;
      });
      data.nodes = (data.nodes || []).map(node => {
        if(nodeLogMap[node.id]){
          node.statusColor = nodeStatusColor[nodeLogMap[node.id].status];
          node.runParams = nodeLogMap[node.id].params;
          node.result = nodeLogMap[node.id].result;
        }
        if(koni)koni.update(node.id, {...node});
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

  const handleParams = (params) => {
    dispatch({
      type: 'graph/nodeExecute',
      payload: {
        client,
        params
      },
    }).then(()=>{
      handleHideParamsModal();
    });
  };

  const handleResult = (params) => {
    dispatch({
      type: 'graph/nodeSuccess',
      payload: {
        client,
        params
      },
    }).then(()=>{
      handleHideResultModal();
    });
  };

  const handleFail = (params) => {
    dispatch({
      type: 'graph/nodeFail',
      payload: {
        client,
        params
      },
    }).then(()=>{
      handleHideResultModal();
    });
  };

  const handleExecuteLogClick = (executeLog) => {
    dispatch(
      routerRedux.push(`/graph/${executeLog.serialNo}/${executeLog.version}/${executeLog.runVersion}`)
    );
  };

  const handleRefreshExecuteLog = () => {
    dispatch({
      type: 'graph/getExecuteLog'
    })
  };

  const handleRefreshNodeLog = () => {
    dispatch({
      type: 'graph/get',
      payload: {
        serialNo,
        version,
        runVersion
      }
    })
  };

  const jsonRule = {
    message: '请使用 json 格式',
    validator: (rule, value, callback) => {
      isJSON(value) ? callback() : callback(true);
    },
  };

  const handleStompMessage = (msg, topic) => {
    switch (topic) {
      case NODE_LOG:
        dispatch({
          type: 'graph/nodeLog',
          payload: msg
        });
        break;
      case EDGE_LOG:
        dispatch({
          type: 'graph/edgeLog',
          payload: msg
        });
        break;
      case EXECUTE_LOG:
        dispatch({
          type: 'graph/executeLog',
          payload: msg
        });
        break;
      default:
        console.warn("topic not found ", topic);
    }
  };

  const handleConnect = () => {
    dispatch({
      type: 'graph/connect'
    });
  };

  const handleDisConnect = () => {
    dispatch({
      type: 'graph/disConnect'
    });
  };

  function setKoni(ggEditor) {
    if(ggEditor){
      koni = ggEditor.editor.getCurrentPage();
    }
  }

  function setClient(_client) {
    client = _client;
  }

  fillLog(graph, edgeLogList, nodeLogList);
  return (
    <GGEditor
      className={styles.editor}
      onBeforeCommandExecute={({ command }) => {
        console.debug('command', command);
      }}
      ref={setKoni}
    >
      <DocumentTitle title={getPageTitle()} />
      <Row type="flex" className={styles.editorBd}>
        <Col span={3} className={styles.editorSidebar}>
          <Card title='运行记录' bordered={false} extra={<a onClick={handleRefreshExecuteLog}><Icon type="sync" /></a>}>
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
          <GraphDetailPanel onExecute={handleExecute} onSuccess={handleSuccess} className={styles.detailPanel} tasks={tasks} />
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

      <SockJsClient
        url={stompUrl}
        topics={[NODE_LOG, EDGE_LOG, EXECUTE_LOG]}
        onConnect={handleConnect}
        onDisconnect={handleDisConnect}
        onMessage={handleStompMessage}
        ref={setClient}
      />
    </GGEditor>
  );
};

export default connect(({ setting, graph }) => ({
  setting, graph,
}))(Graph);
