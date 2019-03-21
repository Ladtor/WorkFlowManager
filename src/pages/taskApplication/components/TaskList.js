import { Table } from 'antd';
import React from 'react';
import { formatTableTitle } from "@/utils/utils";

const TaskList = ({ tasks }) => {
  const columns = [{
    title: 'Key',
    dataIndex: 'taskKey',
  }, {
    title: 'Task Name',
    dataIndex: 'name',
  }, {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
  }];
  return (
    <Table
      dataSource={tasks}
      columns={formatTableTitle('taskApplication', columns)}
      rowKey={record => record.id}
      pagination={false}
    />
  );
};

export default TaskList;
