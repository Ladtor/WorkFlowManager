import React from 'react';
import { Card, Form, Input, Select } from 'antd';
import { withPropsAPI } from 'gg-editor';

const { Item } = Form;
const { Option } = Select;

const inlineFormItemLayout = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

class EdgeDetail extends React.Component {
  handleSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    setTimeout(() => {
      form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        }

        const item = getSelected()[0];

        if (!item) {
          return;
        }

        if(!values.label)values.label = values.condition;
        executeCommand(() => {
          update(item, {
            ...values,
          });
        });
      });
    }, 0);
  };

  renderShapeSelect(disabled) {
    return (
      <Select onChange={this.handleSubmit} disabled={disabled}>
        <Option value="flow">直线</Option>
        <Option value="flow-smooth">图曲线</Option>
        <Option value="flow-polyline">图折线</Option>
        <Option value="flow-polyline-round">圆角折线</Option>
      </Select>
    );
  }

  render() {
    const { form, propsAPI, disabled } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    const { label = '', shape = 'flow', condition } = item.getModel();

    return (
      <Card type="inner" title="边线属性" bordered={false}>
        <Form onSubmit={this.handleSubmit}>
          <Item
            label="标签"
            {...inlineFormItemLayout}
          >
            {
              getFieldDecorator('label', {
                initialValue: label,
              })(<Input onBlur={this.handleSubmit} disabled={disabled} />)
            }
          </Item>
          <Item
            label="条件"
            {...inlineFormItemLayout}
          >
            {
              getFieldDecorator('condition', {
                initialValue: condition,
              })(<Input onBlur={this.handleSubmit} disabled={disabled} />)
            }
          </Item>
          <Item
            label="图形"
            {...inlineFormItemLayout}
          >
            {
              getFieldDecorator('shape', {
                initialValue: shape,
              })(this.renderShapeSelect(disabled))
            }
          </Item>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(withPropsAPI(EdgeDetail));
