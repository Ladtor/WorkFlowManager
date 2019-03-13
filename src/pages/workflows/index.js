import React from 'react';
import { connect } from 'dva';
import CronEditor from 'antd-cron-editor';
import { Card, message, Modal } from 'antd';
import PopInputModal from "@/components/PopInputModal";
import { isJSON } from "@/utils/utils";
import WorkFlowList from './components/WorkFlowList';
import ButtonBar from "./components/ButtonBar";
import styles from './index.css';

const jsonRule = {
  message: '请使用 json 格式',
  validator: (rule, value, callback) => {
    isJSON(value) ? callback() : callback(true);
  },
};
const WorkFlows = ({ dispatch, workflows }) => {

  const { list, serialNo, cronText, runModalVisible, cronModalVisible } = workflows;

  const setState = (payload) => {
    dispatch({
      type: 'workflows/saveState',
      payload
    })
  };

  const handleToCreate = () => {
    window.open('/editor');
  };

  const handleRefresh = () => {
    dispatch({
      type: 'workflows/list'
    })
  };

  const handleSuccessAndRefresh = (msg) => {
    message.success(msg);
    handleRefresh();
  };

  const handleFailAndRefresh = (msg) => {
    message.error(msg);
    handleRefresh();
  };

  const checkSerialNo = () => {
    if(serialNo)return true;
    message.warn("请先选择工作流");
    return false;
  };

  const handleEdit = () => {
    if(checkSerialNo())window.open(`/editor/${serialNo}`);
  };

  const handleView = () => {
    if(checkSerialNo())window.open(`/graph/${serialNo}`)
  };

  const handleRun = (params) => {
    dispatch({
      type: 'workflows/execute',
      payload: {
        serialNo,
        params
      }
    }).then((response) => {
      if(response){
        handleSuccessAndRefresh("执行成功");
        handleHideRunModal();
      }else {
        handleFailAndRefresh("执行失败");
      }
    })
  };

  const handleRunCron = () => {
    dispatch({
      type: 'workflows/cron',
      payload: {
        serialNo,
        cronText
      }
    }).then((response) => {
      if(response){
        handleSuccessAndRefresh("执行成功");
        handleHideCronModal();
      }else {
        handleFailAndRefresh("执行失败");
      }
    })
  };

  const handleCancel = () => {
    if(!checkSerialNo())return;
    dispatch({
      type: 'workflows/cancel',
      payload: {
        serialNo
      }
    }).then((response) => {
      if(response){
        handleSuccessAndRefresh("取消成功");
      }else {
        handleFailAndRefresh("取消失败");
      }
    })
  };

  const handleDelete = () => {
    if(!checkSerialNo())return;
    dispatch({
      type: 'workflows/delete',
      payload: serialNo,
    }).then((respsonse) => {
      if(respsonse){
        handleSuccessAndRefresh("删除成功");
      }else {
        handleFailAndRefresh("删除失败");
      }
    });
  };

  const handleCronChange = (cronText) => {
    setState({ cronText });
  };

  const handleSelectChange = (serialNo) => {
    setState({ serialNo });
  };

  const handleShowRunModal = () => {
    if(!checkSerialNo())return;
    const runModalVisible = true;
    setState({ runModalVisible });
  };

  const handleHideRunModal = () => {
    const runModalVisible = false;
    setState({ runModalVisible });
  };

  const handleShowCronModal = () => {
    if(!checkSerialNo())return;
    const cronModalVisible = true;
    setState({ cronModalVisible });
  };

  const handleHideCronModal = () => {
    const cronModalVisible = false;
    setState({ cronModalVisible });
  };

  return (
    <div className={styles.normal}>
      <Card className={styles.card}>
        <ButtonBar
          onDelete={handleDelete}
          onEdit={handleEdit}
          onView={handleView}
          onCron={handleShowCronModal}
          onCancel={handleCancel}
          onRun={handleShowRunModal}
          onCreate={handleToCreate}
          onRefresh={handleRefresh}
        />
      </Card>
      <WorkFlowList workflows={list} serialNo={serialNo} onSelectChange={handleSelectChange} />

      <Modal visible={cronModalVisible} onCancel={handleHideCronModal} onOk={handleRunCron}>
        <div>
          <span>{cronText}</span>
        </div>
        <CronEditor span={3} defaultValue='0-2 * * * * ?' value={cronText} onChange={handleCronChange} />
      </Modal>
      <PopInputModal
        visible={runModalVisible}
        title="执行参数"
        onChange={handleRun}
        onCancel={handleHideRunModal}
        rules={[jsonRule]}
      />
    </div>
  );
};

export default connect(({ workflows }) => ({
  workflows,
}))(WorkFlows);
