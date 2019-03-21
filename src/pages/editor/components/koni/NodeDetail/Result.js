import { Card, Form, Input } from 'antd';
import React from 'react';
import { locales } from '@/utils/utils';

const format = locales('editor');
const { Item } = Form;

const Result = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label } = model;
  return (
    <Card type="inner" title={format('Result')} bordered={false}>
      <Form onSubmit={onSubmit}>
        <Item
          label={format('Label')}
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
