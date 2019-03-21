import { Card, Form, Input } from 'antd';
import React from 'react';
import { isJSON } from '@/utils/utils';
import { locales } from '@/utils/utils';

const format = locales('editor');
const { Item } = Form;

const Start = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label, initParams } = model;
  return (
    <Card type="inner" title={format('Start')} bordered={false}>
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
        <Item
          label={format('Init Params')}
          {...formItemLayout}
        >
          {
            getFieldDecorator('initParams', {
              initialValue: initParams,
              rules: [{
                message: format('JSON'),
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
