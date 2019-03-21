import React from 'react';
import { connect } from 'dva';
import CronEditor from 'antd-cron-editor';
import { Card, message, Modal } from 'antd';
import PopInputModal from "@/components/PopInputModal";
import { isJSON, locales } from "@/utils/utils";
import WorkFlowList from './components/WorkFlowList';
import ButtonBar from "./components/ButtonBar";
import styles from './index.css';

const format = locales('workflow');
const jsonRule = {
  message: format('tip.jsonInvalid'),
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
    if (serialNo) return true;
    message.warn(format('tip.unSelect'));
    return false;
  };

  const handleEdit = () => {
    if (checkSerialNo()) window.open(`/editor/${serialNo}`);
  };

  const handleView = () => {
    if (checkSerialNo()) window.open(`/graph/${serialNo}`)
  };

  const handleRun = (params) => {
    dispatch({
      type: 'workflows/execute',
      payload: {
        serialNo,
        params: JSON.parse(params)
      }
    }).then((response) => {
      if (response) {
        handleSuccessAndRefresh(format('Run Success'));
        handleHideRunModal();
      } else {
        handleFailAndRefresh(format('Run Fail'));
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
      if (response) {
        handleSuccessAndRefresh(format('Run Success'));
        handleHideCronModal();
      } else {
        handleFailAndRefresh(format('Run Fail'));
      }
    })
  };

  const handleCancel = () => {
    if (!checkSerialNo()) return;
    dispatch({
      type: 'workflows/cancel',
      payload: {
        serialNo
      }
    }).then((response) => {
      if (response) {
        handleSuccessAndRefresh(format('Cancel Success'));
      } else {
        handleFailAndRefresh(format('Cancel Fail'));
      }
    })
  };

  const handleDelete = () => {
    if (!checkSerialNo()) return;
    dispatch({
      type: 'workflows/delete',
      payload: serialNo,
    }).then((respsonse) => {
      if (respsonse) {
        handleSuccessAndRefresh(format('Delete Success'));
      } else {
        handleFailAndRefresh(format('Delete Fail'));
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
    if (!checkSerialNo()) return;
    const runModalVisible = true;
    setState({ runModalVisible });
  };

  const handleHideRunModal = () => {
    const runModalVisible = false;
    setState({ runModalVisible });
  };

  const handleShowCronModal = () => {
    if (!checkSerialNo()) return;
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
        title={format('Run Params')}
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
