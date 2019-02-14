import React from 'react';
import { connect } from 'dva';
import TaskNodeList from './components/TaskNodeList';
import styles from './index.css';
import PopMulInputModal from '@/components/PopMulInputModal';

const TaskNodes = ({ taskNodes, dispatch }) => {
  const { list, tasks, modalVisible } = taskNodes;

  const handleExpandedRowsChange = (name) => {
    dispatch({
      type: 'taskNodes/fetchTasks',
      payload: name,
    });
  };

  const handleAddClick = (name) => {
    dispatch({
      type: 'taskNodes/saveState',
      payload: {
        modalVisible:true,
        name
      }
    })
  };

  const handleHideModal = () => {
    dispatch({
      type: 'taskNodes/saveState',
      payload: {
        modalVisible:false,
        name: undefined
      }
    })
  };

  const handleSubmit = (values) => {
    dispatch({
      type: 'taskNodes/addTask',
      payload: values
    }).then(()=>{
      handleHideModal();
    })
  };

  const formData = [{
    title: 'Key',
    field: 'taskKey'
  },{
    title: 'Name',
    field: 'name'
  }];

  return (
    <div className={styles.normal}>
      <h1>Page taskNodes</h1>
      <TaskNodeList taskNodes={list} tasks={tasks} onAddClick={handleAddClick} onExpandedRowsChange={handleExpandedRowsChange} />
      <PopMulInputModal visible={modalVisible} data={formData} onCancel={handleHideModal} onChange={handleSubmit} />
    </div>
  );
};

export default connect(({ taskNodes }) => ({
  taskNodes,
}))(TaskNodes);
