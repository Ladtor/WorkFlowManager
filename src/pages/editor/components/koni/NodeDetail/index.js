import React from 'react';
import { Form } from 'antd';
import { withPropsAPI } from 'gg-editor';
import StartForm from './Start';
import ResultForm from './Result';
import AndForm from './And';
import OrForm from './Or';
import WorkFlowForm from './WorkFlow';
import HttpForm from './Http';
import TaskForm from './Task';

import { AND, HTTP, OR, RESULT, START, WORK_FLOW, TASK } from '../../../../../components/Koni/NodeType';

const inlineFormItemLayout = {
  labelCol: {
    md: { span: 9 },
  },
  wrapperCol: {
    md: { span: 15 },
  },
};

class NodeDetail extends React.Component {
  handleSubmit = (e) => {
    e && e.preventDefault && e.preventDefault();

    const { form, propsAPI } = this.props;
    const { getSelected, executeCommand, update } = propsAPI;

    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        for (const e in err) {
          delete values[e];
        }
      }

      const item = getSelected()[0];

      if (!item) {
        return;
      }

      executeCommand(() => {
        update(item, {
          ...values,
        });
      });
    });
  };

  getForm = (model, getFieldDecorator) => {
    const { workflows, tasks } = this.props;
    // this.handleSubmit();
    switch (model.nodeType) {
      case START:
        return <StartForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
        />;
      case RESULT:
        return <ResultForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
        />;
      case TASK:
        return <TaskForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
          tasks={tasks}
        />;
      case HTTP:
        return <HttpForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
        />;
      case WORK_FLOW:
        return <WorkFlowForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
          workflows={workflows}
        />;
      case AND:
        return <AndForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
        />;
      case OR:
        return <OrForm
          model={model}
          onSubmit={this.handleSubmit}
          getFieldDecorator={getFieldDecorator}
          formItemLayout={inlineFormItemLayout}
        />;
      default:
        return <div />;
    }
  };

  render() {
    const { form, propsAPI } = this.props;
    const { getFieldDecorator } = form;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    return this.getForm(item.model, getFieldDecorator);
  }
}

export default Form.create()(withPropsAPI(NodeDetail));
