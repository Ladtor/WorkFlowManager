import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';
import { locales } from '@/utils/utils';

const format = locales('editor');

const Result = (props) => {
  const { model } = props;
  const { label, result } = model;
  const data = [{
    label: 'label',
    type: 'text',
    value: label
  }, {
    label: 'result',
    type: 'json',
    value: result
  }];
  return (
    <Card type="inner" title={format('Result')} bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default Result;
