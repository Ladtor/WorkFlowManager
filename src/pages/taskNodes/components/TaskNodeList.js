import React from 'react';
import { Table, Badge, Divider } from 'antd';
import TaskList from '@/pages/taskNodes/components/TaskList';

const renderBadge = (key) => {
  const Status = {
    'UP': {
      status: 'success',
      text: '健康',
    },
    'DOWN': {
      status: 'warning',
      text: '繁忙',
    },
    'OFFLINE': {
      status: 'error',
      text: '宕机',
    },
    'OUT_OF_SERVICE': {
      status: 'error',
      text: '丢失'
    },
    'UNKNOWN': {
      status: 'warning',
      text: '未知'
    },
    'RESTRICTED': {
      status: 'warning',
      text: '受限'
    }
  };

  const status = Status[key] || { text: key };
  return <Badge status={status.status} text={status.text} />;
};

const TaskNodeList = ({ taskNodes, tasks, onAddClick, onExpandedRowsChange }) => {
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Status',
    render: record => renderBadge(record.status),
  }, {
    title: 'Actions',
    render: (text, record) => (
      <span>
        <a href="javascript:" onClick={onAddClick.bind(this, record.name)}>add Task</a>
        {/*<Divider type="vertical" />*/}
        {/*<a href="javascript:" onClick={onHealthClick.bind(this, record.name)}>Health</a>*/}
      </span>
    ),
  }];

  return (
    <Table
      dataSource={taskNodes}
      columns={columns}
      rowKey={record => record.name}
      onExpandedRowsChange={onExpandedRowsChange}
      expandedRowRender={record => <TaskList tasks={tasks[record.name]} />}
    />
  );
};

export default TaskNodeList;
