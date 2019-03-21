import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';
import { locales } from '@/utils/utils';

const format = locales('editor');

const WorkFlow = (props) => {
  const { model } = props;
  const { label, subSerialNo, runParams, result } = model;
  const data = [{
    label: 'label',
    value: label
  },{
    label: 'serialNo',
    value: subSerialNo
  }, {
    label: 'runParams',
    type: 'json',
    value: runParams
  }, {
    label: 'result',
    type:  'json',
    value: result
  }];
  return (
    <Card type="inner" title={format('Sub WorkFlow')} bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default WorkFlow;
