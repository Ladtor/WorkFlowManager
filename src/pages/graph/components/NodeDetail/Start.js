import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';


const Start = (props) => {
  const { model } = props;
  const { label, initParams, result } = model;
  const data = [{
    label: 'label',
    type: 'text',
    value: label,
  }, {
    label: 'initParams',
    type: 'json',
    value: initParams,
  }, {
    label: 'result',
    type:  'json',
    value: result
  }];
  return (
    <Card type="inner" title="起始节点" bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default Start;
