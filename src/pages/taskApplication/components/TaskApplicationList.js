import React from 'react';
import { Table } from 'antd';
import TaskList from './TaskList';
import { formatTableTitle, locales } from "@/utils/utils";

const prefix = 'taskApplication';
const format = locales(prefix);
const TaskApplicationList = ({ dataSource, tasks, onAddClick, onExpandedRowsChange }) => {

  const columns = [{
    title: 'Application Name',
    dataIndex: 'name',
  }, {
    title: 'CreatedAt',
    dataIndex: 'createdAt'
  }, {
    title: 'Actions',
    render: (text, record) => (
      <span>
        <a href="javascript:" onClick={onAddClick.bind(this, record.name)}>{format('add Task')}</a>
      </span>
    ),
  }];
  return (
    <Table
      dataSource={dataSource}
      columns={formatTableTitle(prefix, columns)}
      rowKey={record => record.name}
      onExpandedRowsChange={onExpandedRowsChange}
      expandedRowRender={record => <TaskList tasks={tasks[record.name]} />}
    />
  );
};

export default TaskApplicationList;
