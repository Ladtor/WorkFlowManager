import { Card, Form, Input, Select, Cascader } from 'antd';
import React from 'react';

const { Item } = Form;
const { Option } = Select;
const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }, {
      value: 'xiasha',
      label: 'Xia Sha',
      disabled: true,
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua men',
    }],
  }],
}];

function onChange(value, selectedOptions) {
  console.log(value, selectedOptions);
}

function filter(inputValue, path) {
  return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
}

const group = (items, getKey) => {
  const map = {};
  items.map(item=>{
    const key = getKey(item);
    const sub = map[key] || [];
    sub.push(item);
    map[key] = sub;
  });
  return map;
};

const getOptions = (tasks = []) => {
  const tasksGroup = group(tasks, task=>task.node);
  const arr = [];
  for (let key in tasksGroup){
    arr.push({
      value:key,
      label:key,
      children: tasksGroup[key].map(task=>({
        value: task.taskKey,
        label: task.name || task.taskKey
      }))
    });
  }
  return arr;
};

const Task = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model, tasks } = props;
  const { label, task } = model;
  const options = getOptions(tasks);
  return (
    <Card type="inner" title="任务节点" bordered={false}>
      <Form onSubmit={onSubmit}>
        <Item
          label="标签"
          {...formItemLayout}
        >
          {
            getFieldDecorator('label', {
              initialValue: label,
            })(<Input onBlur={onSubmit} />)
          }
        </Item>
        <Item
          label="任务"
          {...formItemLayout}
        >
          {
            getFieldDecorator('task', {
              initialValue: task,
              rules: [{
                required: true
              }]
            })(
              <Cascader
                options={options}
                onChange={onChange}
                onBlur={onSubmit}
                placeholder="选择任务"
                showSearch={{ filter }}
              />
            )
          }
        </Item>
      </Form>
    </Card>
  );
};

export default Task;
