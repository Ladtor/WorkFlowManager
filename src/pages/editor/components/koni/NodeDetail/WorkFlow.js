import { Card, Form, Input, Select } from 'antd';
import React from 'react';

const { Item } = Form;
const { Option } = Select;

const WorkFlow = (props) => {
  const { getFieldDecorator, formItemLayout, onSubmit, model, workflows } = props;
  const { label, subSerialNo } = model;
  const options = ( workflows || []).map(d => <Option value={d.serialNo}>{d.name}</Option>);
  return (
    <Card type="inner" title="子工作流节点" bordered={false}>
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
          label="工作流"
          {...formItemLayout}
        >
          {
            getFieldDecorator('subSerialNo', {
              initialValue: subSerialNo
            })(
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择工作流"
                optionFilterProp="children"
                onChange={onSubmit}
                onBlur={onSubmit}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {options}
              </Select>,
            )
          }
        </Item>
      </Form>
    </Card>
  );
};

export default WorkFlow;
