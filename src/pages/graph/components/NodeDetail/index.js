import React from 'react';
import { withPropsAPI } from 'gg-editor';
import StartForm from './Start';
import ResultForm from './Result';
import AndForm from './And';
import OrForm from './Or';
import WorkFlowForm from './WorkFlow';
import HttpForm from './Http';
import TaskForm from './Task';
import ManualForm from './Manual';

import { AND, HTTP, OR, RESULT, START, WORK_FLOW, TASK, MANUAL } from '@/components/Koni/NodeType';

const inlineFormItemLayout = {
  labelCol: {
    md: { span: 9 },
  },
  wrapperCol: {
    md: { span: 15 },
  },
};

class NodeDetail extends React.Component {

  getForm = (model, tasks) => {
    switch (model.nodeType) {
      case START:
        return <StartForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      case RESULT:
        return <ResultForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      case TASK:
        return <TaskForm
          model={model}
          formItemLayout={inlineFormItemLayout}
          tasks={tasks}
        />;
      case HTTP:
        return <HttpForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      case WORK_FLOW:
        return <WorkFlowForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      case AND:
        return <AndForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      case OR:
        return <OrForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      case MANUAL:
        return <ManualForm
          model={model}
          formItemLayout={inlineFormItemLayout}
        />;
      default:
        return <div />;
    }
  };

  render() {
    const { propsAPI, className, tasks } = this.props;
    const { getSelected } = propsAPI;

    const item = getSelected()[0];

    if (!item) {
      return null;
    }

    return (
      <div className={className}>{this.getForm(item.model, tasks)}</div>
    )
  }
}

export default withPropsAPI(NodeDetail);
