import { Table } from 'antd';
import React from 'react';

const TaskList = ({ tasks }) => {
  const columns = [{
    title: 'Key',
    dataIndex: 'taskKey',
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
  }];
  return (
    <Table
      dataSource={tasks}
      columns={columns}
      rowKey={record => record.id}
      pagination={false}
    />
  );
};

export default TaskList;
