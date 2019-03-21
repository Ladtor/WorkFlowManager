import { Card, Form, Input, Select } from 'antd';
import React from 'react';
import { isJSON } from '@/utils/utils';
import { locales } from '@/utils/utils';

const format = locales('editor');
const { Item } = Form;
const { Option } = Select;
const Http = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label, url, method, requestParams } = model;
  return (
    <Card type="inner" title={format('Http')} bordered={false}>
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
          label={format('Url')}
          {...formItemLayout}
        >
          {
            getFieldDecorator('url', {
              initialValue: url,
              rules: [{
                required: true,
              },{
                pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/,
                message: format('Format Error')
              }],
            })(<Input onBlur={onSubmit} />)
          }
        </Item>
        <Item
          label={format('Method')}
          {...formItemLayout}
        >
          {
            getFieldDecorator('method', {
              initialValue: method || 'GET',
            })(
              <Select
                onBlur={onSubmit}
              >
                <Option value="GET">
                  GET
                </Option>
                <Option value="POST">
                  POST
                </Option>
              </Select>,
            )
          }
        </Item>
        <Item
          label={format('Request Params')}
          {...formItemLayout}
        >
          {
            getFieldDecorator('requestParams', {
              initialValue: requestParams,
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

export default Http;
