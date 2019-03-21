import { Card, Form, Input, Cascader } from 'antd';
import React from 'react';
import { locales } from '@/utils/utils';

const format = locales('editor');
const { Item } = Form;
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
    <Card type="inner" title={format('Task')} bordered={false}>
      <Form onSubmit={onSubmit}>
        <Item
          label={format('Label')}
          {...formItemLayout}
        >
          {
            getFieldDecorator('label', {
              initialValue: label,
            })(<Input onBlur={onSubmit} />)
          }
        </Item>
        <Item
          label={format('Select Task')}
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
