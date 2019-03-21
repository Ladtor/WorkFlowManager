import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';
import { locales } from '@/utils/utils';

const format = locales('editor');


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
    type: 'json',
    value: result
  }];
  return (
    <Card type="inner" title={format('Start')} bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default Start;
