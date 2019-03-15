import React from 'react';
import { Table } from 'antd';
import TaskList from './TaskList';

const TaskApplicationList = ({ dataSource, tasks, onAddClick, onExpandedRowsChange }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'CreatedAt',
    dataIndex: 'createdAt'
  }, {
    title: 'Actions',
    render: (text, record) => (
      <span>
        <a href="javascript:" onClick={onAddClick.bind(this, record.name)}>add Task</a>
      </span>
    ),
  }];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={record => record.name}
      onExpandedRowsChange={onExpandedRowsChange}
      expandedRowRender={record => <TaskList tasks={tasks[record.name]} />}
    />
  );
};

export default TaskApplicationList;
