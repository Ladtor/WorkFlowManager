import React from 'react';
import { connect } from 'dva';
import TaskApplicationList from './components/TaskApplicationList';
import styles from './index.css';
import PopMulInputModal from '@/components/PopMulInputModal';
import { Button, Card, message } from "antd";
import { formatTableTitle, getSetState, locales } from "@/utils/utils";

const prefix = 'taskApplication';
const format = locales(prefix);
const TaskApplication = ({ taskApplication, dispatch }) => {

  const { list, tasks, taskVisible, applicationVisible } = taskApplication;
  const setState = getSetState(dispatch, prefix);

  const handleExpandedRowsChange = (name) => {
    dispatch({
      type: `${prefix}/fetchTasks`,
      payload: name,
    });
  };

  const handleRefresh = () => {
    dispatch({
      type: `${prefix}/fetch`
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
      type: `${prefix}/addTask`,
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
      type: `${prefix}/addApplication`,
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
    title: 'Task Name',
    field: 'name'
  }];

  const applicationData = [{
    title: 'Application Name',
    field: 'name'
  }, {
    title: 'Url',
    field: 'url'
  }];

  return (
    <div className={styles.normal}>
      <Card>
        <Button type="primary" onClick={handleAddApplication}>{format('New')}</Button>
      </Card>
      <TaskApplicationList dataSource={list} tasks={tasks} onAddClick={handleAddClick}
                           onExpandedRowsChange={handleExpandedRowsChange} />
      <PopMulInputModal visible={taskVisible} data={formatTableTitle(prefix, taskData)} onCancel={handleHideTask} onChange={handleSubmitTask} />
      <PopMulInputModal visible={applicationVisible} data={formatTableTitle(prefix, applicationData)} onCancel={handleHideApplication} onChange={handleSubmitApplication} />
    </div>
  );
};

export default connect(({ taskApplication }) => ({
  taskApplication,
}))(TaskApplication);
