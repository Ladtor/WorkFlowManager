import React from 'react';
import { Col, Row, message } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import { connect } from 'dva';
import KoniToolbar from './components/koni/KoniToolbar';
import KoniItemPanel from './components/koni/KoniItemPanel';
import KoniDetailPanel from './components/koni/KoniDetailPanel';
import KoniContextMenu from './components/koni/KoniContextMenu';
import EditorMinimap from '../../components/Koni/EditorMinimap';
import {
  SaveCommand,
  CopyCommand,
  CopyAdjacentCommand,
  DeleteCommand,
} from '@/components/Koni/Command';
import { RESULT, START } from '../../components/Koni/NodeType';
import PopInputModal from '@/components/PopInputModal';
import styles from './index.less';

const START_ID = '00000000';
const RESULT_ID = 'ffffffff';
const LOCK_ID_LIST = [START_ID, RESULT_ID];
const defaultGraph =
//   {
//     'nodes': [
//       {
//         'type': 'node',
//         'size': '40',
//         'shape': 'graph-model',
//         'labelOffsetY': 28,
//         'label': 'Http',
//         'nodeType': 'HTTP',
//         'color': '#BFD7D8',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'x': 294.5,
//         'y': 241.5,
//         'id': 'f33afb13',
//         'index': 5,
//       },
//       {
//         'type': 'node',
//         'size': '40',
//         'shape': 'graph-model',
//         'labelOffsetY': 28,
//         'label': 'Task',
//         'nodeType': 'TASK',
//         'color': '#FEC370',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'x': 534.5,
//         'y': 388.5,
//         'id': 'd4a5e271',
//         'index': 6,
//       },
//       {
//         'type': 'node',
//         'size': '40',
//         'shape': 'graph-model',
//         'labelOffsetY': 28,
//         'label': 'And',
//         'nodeType': 'AND',
//         'color': '#B98AEC',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'x': 424.5,
//         'y': 388,
//         'id': '69e7df9c',
//         'index': 11,
//       },
//       {
//         'type': 'node',
//         'size': '40',
//         'shape': 'graph-model',
//         'labelOffsetY': 28,
//         'label': 'Or',
//         'nodeType': 'OR',
//         'color': '#75C4FE',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'x': 424,
//         'y': 241,
//         'id': '926690c5',
//         'index': 12,
//       },
//       {
//         'type': 'node',
//         'size': '40',
//         'shape': 'graph-model',
//         'labelOffsetY': 28,
//         'label': 'Http',
//         'nodeType': 'HTTP',
//         'color': '#BFD7D8',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'x': 534,
//         'y': 242,
//         'id': '95975057',
//         'index': 13,
//       },
//       {
//         'type': 'node',
//         'size': '40',
//         'shape': 'graph-model',
//         'labelOffsetY': 28,
//         'label': 'Task',
//         'nodeType': 'TASK',
//         'color': '#FEC370',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'x': 295,
//         'y': 388,
//         'id': '70643b51',
//         'index': 15,
//       },
//       {
//         'id': 'ffffffff',
//         'color': '#333333',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'index': 16,
//         'label': 'Result',
//         'labelOffsetY': 28,
//         'shape': 'graph-model',
//         'size': '40',
//         'type': 'node',
//         'x': 621,
//         'y': 315,
//         'nodeType': 'RESULT',
//       },
//       {
//         'id': '00000000',
//         'color': '#5CDBD3',
//         'icon': 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
//         'index': 17,
//         'label': 'Start',
//         'labelOffsetY': 28,
//         'shape': 'graph-model',
//         'size': '40',
//         'type': 'node',
//         'x': 212.5,
//         'y': 314.5,
//         'nodeType': 'START',
//         'initParams': '{}',
//       },
//     ],
//     'edges': [
//       {
//         'source': '00000000',
//         'target': '70643b51',
//         'id': 'c025c117',
//         'index': 0,
//       },
//       {
//         'source': '70643b51',
//         'target': '69e7df9c',
//         'id': '81e6f41d',
//         'index': 1,
//       },
//       {
//         'source': 'f33afb13',
//         'target': '69e7df9c',
//         'id': '888a81de',
//         'index': 2,
//       },
//       {
//         'source': '69e7df9c',
//         'target': 'd4a5e271',
//         'id': 'c0928cf0',
//         'index': 3,
//       },
//       {
//         'source': '00000000',
//         'target': 'f33afb13',
//         'id': '99624afc',
//         'index': 4,
//       },
//       {
//         'source': 'd4a5e271',
//         'target': 'ffffffff',
//         'id': '366ee297',
//         'index': 7,
//       },
//       {
//         'source': 'f33afb13',
//         'target': '926690c5',
//         'id': '6735cf66',
//         'index': 8,
//       },
//       {
//         'source': '70643b51',
//         'target': '926690c5',
//         'id': 'f669369a',
//         'index': 9,
//       },
//       {
//         'source': '926690c5',
//         'target': '95975057',
//         'id': 'be1a1c69',
//         'index': 10,
//       },
//       {
//         'source': '95975057',
//         'target': 'ffffffff',
//         'id': '964f5055',
//         'index': 14,
//       },
//     ],
//   };
{
  // edges: [{
  //   id: 'de094151',
  //   index: 2,
  //   // color: 'red',
  //   source: START_ID,
  //   target: RESULT_ID,
  // }],
  nodes: [{
    id: START_ID,
    color: '#5CDBD3',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
    index: 0,
    label: 'Start',
    labelOffsetY: 28,
    shape: 'graph-model',
    size: '40',
    type: 'node',
    x: 150,
    y: 266.5,
    nodeType: START,
    initParams: '{}',
  }, {
    id: RESULT_ID,
    color: '#333333',
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/zByaCkBKPacvgJqFgtwy.svg',
    index: 1,
    label: 'Result',
    labelOffsetY: 28,
    shape: 'graph-model',
    size: '40',
    type: 'node',
    x: 676.5,
    y: 266,
    nodeType: RESULT,
  }],
};
const commandState = {
  lockCopy: false,
  lockSave: false,
};

let koni;
const KoniPage = ({ dispatch, editor, setting }) => {
  const { name, graph, modalVisible, workflows, tasks } = editor;
  const validate = (node) => {
    const { formValid: { node: nodeValid } } = setting;
    const { nodeType } = node;
    const validKeys = nodeValid[nodeType];
    for (const i in validKeys) {
      const key = validKeys[i];
      if (node[key] === undefined || node[key] === null || node[key] === '') {
        return false;
      }
    }
    return true;
  };

  const onEvent = (name, ...args) => {
    // console.log(name, args);
  };

  const handleAfterChange = (ev) => {
    console.log(ev);
  };

  const save = (name, graph) => {
    console.log(name, graph);
    commandState.lockSave = true;
    dispatch({
      type: 'editor/save',
      payload: {
        name,
        graph,
      },
    }).finally(() => {
      commandState.lockSave = false;
    });
  };

  const handleAfterItemSelected = ({ item }) => {
    // console.log(item);
    if (LOCK_ID_LIST.indexOf(item.id) !== -1)
      commandState.lockCopy = true;
  };

  const handleAfterItemUnselected = ({ item }) => {
    commandState.lockCopy = false;
  };

  const handleSave = (graph) => {
    koni.clearSelected();
    for (const i in graph.nodes) {
      const node = graph.nodes[i];
      if (!validate(node)) {
        console.log(node);
        koni.setSelected(node.id, true);
        message.error('请填写完整');
        return;
      }
    }
    save(name, graph);
  };

  const handleSaveName = (value) => {
    save(value, graph);
    dispatch({
      type: 'editor/saveState',
      payload: {
        modalVisible: false,
      },
    });
  };

  const handleCancel = () => {
    dispatch({
      type: 'editor/saveState',
      payload: {
        modalVisible: false,
      },
    });
  };

  const config = {
    enable: () => !commandState.lockCopy,
  };

  const saveConfig = {
    enable: () => !commandState.lockSave,
    execute: handleSave,
  };

  const copyAdjacentConfig = {
    enable() {
      return LOCK_ID_LIST.indexOf(this.copyNode.id) === -1;
    },
  };
  const data = graph || defaultGraph;

  function setKoni(ggEditor) {
    if(ggEditor){
      koni = ggEditor.editor.getCurrentPage();
    }
  }

  return (
    <GGEditor
      className={styles.editor}
      onBeforeCommandExecute={({ command }) => {
        console.log('command', command);
      }}
      ref={setKoni}
    >
      <Row type="flex" className={styles.editorHd}>
        <Col span={24}>
          <KoniToolbar />
        </Col>
      </Row>
      <Row type="flex" className={styles.editorBd}>
        <Col span={2} className={styles.editorSidebar}>
          <KoniItemPanel />
        </Col>
        <Col span={16} className={styles.editorContent}>
          <Koni
            className={styles.koni}
            data={data}
            onMouseWheel={onEvent.bind(this, 'onMouseWheel')}
            onKeyDown={onEvent.bind(this, 'onKeyDown')}
            onKeyUp={onEvent.bind(this, 'onKeyUp')}
            onBeforeChange={onEvent.bind(this, 'onBeforeChange')}
            onAfterChange={onEvent.bind(this, 'onAfterChange')}
            onBeforeChangeSize={onEvent.bind(this, 'onBeforeChangeSize')}
            onAfterChangeSize={onEvent.bind(this, 'onAfterChangeSize')}
            onBeforeViewportChange={onEvent.bind(this, 'onBeforeViewportChange')}
            onAfterViewportChange={onEvent.bind(this, 'onAfterViewportChange')}
            onBeforeItemActived={onEvent.bind(this, 'onBeforeItemActived')}
            onAfterItemActived={onEvent.bind(this, 'onAfterItemActived')}
            onBeforeItemInactivated={onEvent.bind(this, 'onBeforeItemInactivated')}
            onAfterItemInactivated={onEvent.bind(this, 'onAfterItemInactivated')}
            onBeforeItemSelected={onEvent.bind(this, 'onBeforeItemSelected')}
            // onAfterItemSelected={onEvent.bind(this, "onAfterItemSelected")}
            onBeforeItemUnselected={onEvent.bind(this, 'onBeforeItemUnselected')}
            // onAfterItemUnselected={onEvent.bind(this, "onAfterItemUnselected")}
            onKeyUpEditLabel={onEvent.bind(this, 'onKeyUpEditLabel')}
            onAfterItemSelected={handleAfterItemSelected}
            onAfterItemUnselected={handleAfterItemUnselected}
          />
        </Col>
        <Col span={6} className={styles.editorSidebar}>
          <KoniDetailPanel workflows={workflows} tasks={tasks} />
          <EditorMinimap />
        </Col>
      </Row>
      <KoniContextMenu />
      <SaveCommand config={saveConfig} />

      <CopyCommand config={config} />
      <DeleteCommand config={config} />
      <CopyAdjacentCommand config={copyAdjacentConfig} />

      <PopInputModal title="名称" visible={modalVisible} onChange={handleSaveName} onCancel={handleCancel} />
    </GGEditor>
  );
};

export default connect(({ editor, setting }) => ({
  editor, setting,
}))(KoniPage);
