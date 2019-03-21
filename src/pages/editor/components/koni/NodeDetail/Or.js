import { Card, Form, Input } from 'antd';
import React from 'react';
import { locales } from '@/utils/utils';

const format = locales('editor');
const { Item } = Form;

const Or = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label } = model;
  return (
    <Card type="inner" title={format('Or')} bordered={false}>
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
      </Form>
    </Card>
  );
};

export default Or;
