import { Card, Form, Input, Select } from 'antd';
import React from 'react';
import { isJSON } from '@/utils/utils';

const { Item } = Form;
const { Option } = Select;
const Http = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model } = props;
  const { label, url, method, requestParams } = model;
  return (
    <Card type="inner" title="远程节点" bordered={false}>
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
          label="url"
          {...formItemLayout}
        >
          {
            getFieldDecorator('url', {
              initialValue: url,
              rules: [{
                required: true,
              },{
                pattern: /^((ht|f)tps?):\/\/([\w\-]+(\.[\w\-]+)*\/)*[\w\-]+(\.[\w\-]+)*\/?(\?([\w\-\.,@?^=%&:\/~\+#]*)+)?/,
                message: '格式错误'
              }],
            })(<Input onBlur={onSubmit} />)
          }
        </Item>
        <Item
          label="请求方式"
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
          label="请求参数"
          {...formItemLayout}
        >
          {
            getFieldDecorator('requestParams', {
              initialValue: requestParams,
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

export default Http;
