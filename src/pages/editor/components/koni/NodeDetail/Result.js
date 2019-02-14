import { Card, Form, Input } from 'antd';
import React from 'react';

const { Item } = Form;

const Result = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label } = model;
  return (
    <Card type="inner" title="结果节点" bordered={false}>
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
      </Form>
    </Card>
  );
};

export default Result;
