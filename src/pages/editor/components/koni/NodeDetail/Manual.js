import { Card, Form, Input } from 'antd';
import React from 'react';
import { locales } from '@/utils/utils';

const format = locales('editor');
const { Item } = Form;

const Manual = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model, disabled } = props;
  const { label } = model;
  return (
    <Card type="inner" title={format('Manual')} bordered={false}>
      <Form onSubmit={onSubmit}>
        <Item
          label={format('Label')}
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

export default Manual;
