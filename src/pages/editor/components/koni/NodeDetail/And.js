import { Card, Form, Input } from 'antd';
import React from 'react';

const { Item } = Form;

const And = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model, disabled } = props;
  const { label } = model;
  return (
    <Card type="inner" title="与节点" bordered={false}>
      <Form onSubmit={onSubmit}>
        <Item
          label="标签"
          {...formItemLayout}
        >
          {
            getFieldDecorator('label', {
              initialValue: label,
            })(<Input onBlur={onSubmit} disabled={disabled} />)
          }
        </Item>
      </Form>
    </Card>
  );
};

export default And;
