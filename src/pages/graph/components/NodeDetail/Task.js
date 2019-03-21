import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';
import { locales } from '@/utils/utils';

const format = locales('editor');

const getTaskName = (task, tasks) => {
  if (!tasks) return null;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].node === task[0] && tasks[i].taskKey === task[1]) {
      return tasks[i].name || tasks[i].taskKey;
    }
  }
  return null;
};

const Task = (props) => {
  const { model, tasks } = props;
  const { label, task, runParams, result } = model;
  const data = [{
    label: 'label',
    value: label,
  }, {
    label: 'task',
    value: getTaskName(task, tasks),
  }, {
    label: 'runParams',
    type: 'json',
    value: runParams,
  }, {
    label: 'result',
    type: 'json',
    value: result,
  }];
  return (
    <Card type="inner" title={format('Task')} bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default Task;
