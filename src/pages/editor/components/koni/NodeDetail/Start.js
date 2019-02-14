import { Card, Form, Input } from 'antd';
import React from 'react';
import { isJSON } from '@/utils/utils';

const { Item } = Form;

const Start = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label, initParams } = model;
  return (
    <Card type="inner" title="起始节点" bordered={false}>
      <Form onSubmit={onSubmit}>
        <Item
          label="标签"
          {...formItemLayout}
        >
          {
            getFieldDecorator('label', {
              initialValue: label,
            })(<Input onBlur={onSubmit} disabled />)
          }
        </Item>
        <Item
          label="初始参数"
          {...formItemLayout}
        >
          {
            getFieldDecorator('initParams', {
              initialValue: initParams,
              rules: [{
                message: '请使用 json 格式',
                validator: (rule, value, callback) => {
                  isJSON(value) ? callback() : callback(true);
                },
              }],
            })(
              <Input onBlur={onSubmit} placeholder="json" />,
            )
          }
        </Item>
      </Form>
    </Card>
  );
};

export default Start;
