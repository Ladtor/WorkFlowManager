import React from 'react';
import { Col, Row, message } from 'antd';
import GGEditor, { Koni } from 'gg-editor';
import { connect } from 'dva';
import DocumentTitle from 'react-document-title';
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
const defaultGraph = {
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

  const getPageTitle = () => {
    const { title } = setting;
    return `${title}`;
  };

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
    if (ggEditor) {
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
      <DocumentTitle title={getPageTitle()} />
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
