import React from 'react';
import { Card } from 'antd';
import { withPropsAPI } from 'gg-editor';
import Detail from '@/pages/graph/components/NodeDetail/Detail';

const EdgeDetail = ({ propsAPI }) => {
  const { getSelected } = propsAPI;

  const item = getSelected()[0];

  if (!item) {
    return null;
  }

  const { model } = item;
  const { condition = '', params, result } = model;
  const data = [{
    label: 'condition',
    type: 'text',
    value: condition,
  }, {
    label: 'params',
    type: 'json',
    value: params
  }, {
    label: 'result',
    type: 'text',
    value: result? 'true': 'false'
  }];

  return (
    <Card type="inner" title="边线属性" bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default withPropsAPI(EdgeDetail);
