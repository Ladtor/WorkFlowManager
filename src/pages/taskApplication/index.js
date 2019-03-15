import React from 'react';
import { connect } from 'dva';
import TaskApplicationList from './components/TaskApplicationList';
import styles from './index.css';
import PopMulInputModal from '@/components/PopMulInputModal';
import { Button, Card, message } from "antd";
import { getSetState } from "@/utils/utils";

const TaskApplication = ({ taskApplication, dispatch }) => {
  const { list, tasks, taskVisible, applicationVisible } = taskApplication;

  const setState = getSetState(dispatch, 'taskApplication');

  const handleExpandedRowsChange = (name) => {
    dispatch({
      type: 'taskApplication/fetchTasks',
      payload: name,
    });
  };

  const handleRefresh = () => {
    dispatch({
      type: 'taskApplication/fetch'
    })
  };

  const handleAddClick = (name) => {
    setState({ name, taskVisible: true });
  };

  const handleHideTask = () => {
    setState({ taskVisible: false, name: undefined });
  };

  const handleSubmitTask = (values) => {
    dispatch({
      type: 'taskApplication/addTask',
      payload: values
    }).then(() => {
      handleHideTask();
    })
  };

  const handleAddApplication = () => {
    setState({ applicationVisible: true });
  };

  const handleHideApplication = () => {
    setState({ applicationVisible: false });
  };

  const handleSubmitApplication = (values) => {
    dispatch({
      type: 'taskApplication/addApplication',
      payload: values
    }).then((response)=>{
      if(!response){
        message.error("添加失败");
        return;
      }
      message.success("添加成功");
      handleRefresh();
      handleHideApplication();
    });
  };

  const taskData = [{
    title: 'Key',
    field: 'taskKey'
  }, {
    title: 'Name',
    field: 'name'
  }];

  const applicationData = [{
    title: '应用名称',
    field: 'name'
  }, {
    title: '请求地址',
    field: 'url'
  }];

  return (
    <div className={styles.normal}>
      <Card>
        <Button type="primary" onClick={handleAddApplication}>新增应用</Button>
      </Card>
      <TaskApplicationList dataSource={list} tasks={tasks} onAddClick={handleAddClick}
                           onExpandedRowsChange={handleExpandedRowsChange} />
      <PopMulInputModal visible={taskVisible} data={taskData} onCancel={handleHideTask} onChange={handleSubmitTask} />
      <PopMulInputModal visible={applicationVisible} data={applicationData} onCancel={handleHideApplication} onChange={handleSubmitApplication} />
    </div>
  );
};

export default connect(({ taskApplication }) => ({
  taskApplication,
}))(TaskApplication);
