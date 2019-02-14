import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';

const And = (props) => {
  const { model } = props;
  const { label, result } = model;
  const data = [{
    label: 'label',
    type: 'text',
    value: label,
  }, {
    label: 'result',
    type:  'json',
    value: result
  }];
  return (
    <Card type="inner" title="与节点" bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default And;
