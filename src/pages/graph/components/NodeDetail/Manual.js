import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';
import { locales } from '@/utils/utils';

const format = locales('editor');
const Manual = (props) => {
  const { model } = props;
  const { label, result, runParams } = model;
  const data = [{
    label: 'label',
    type: 'text',
    value: label,
  }, {
    label: 'params',
    type: 'json',
    value: runParams,
  }, {
    label: 'result',
    type:  'json',
    value: result
  }];
  return (
    <Card type="inner" title={format('Manual')} bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default Manual;
