import React from 'react';
import { Modal, Form, Input } from 'antd';

const PopInputModal = ({ title, onChange, onCancel, form, visible, rules }) => {
  const { getFieldDecorator } = form;
  const handleOk = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      onChange(values.input)
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal onOk={handleOk} onCancel={onCancel} visible={visible}>
      <Form layout="horizontal">
        <Form.Item
          label={title}
          {...formItemLayout}
        >
          {getFieldDecorator('input', {
            rules: rules || [{ required: true }],
          })(
            <Input />,
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(PopInputModal);
