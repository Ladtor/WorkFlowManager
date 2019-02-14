import React from 'react';
import { Modal, Form, Input } from 'antd';

const PopMulInputModal = ({ data, onChange, onCancel, form, visible }) => {
  const { getFieldDecorator } = form;
  const handleOk = () => {
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      onChange(values);
    });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Modal onOk={handleOk} onCancel={onCancel} visible={visible}>
      <Form layout="horizontal">
        {
          data.map(data => {
            return (
              <Form.Item
                key={data.field}
                label={data.title}
                {...formItemLayout}
              >
                {getFieldDecorator(data.field, {
                  rules: data.rules || [{ required: true }],
                })(
                  <Input />,
                )}
              </Form.Item>
            );
          })
        }
      </Form>
    </Modal>
  );
};

export default Form.create()(PopMulInputModal);
