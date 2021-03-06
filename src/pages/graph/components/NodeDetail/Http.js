import { Card } from 'antd';
import React from 'react';
import Detail from './Detail';
import { locales } from '@/utils/utils';

const format = locales('editor');

const Http = (props) => {
  const { model } = props;
  const { label, url, method, requestParams, runParams, result } = model;
  const data = [{
    label: 'label',
    type: 'text',
    value: label,
  }, {
    label: 'url',
    type: 'text',
    value: url,
  }, {
    label: 'method',
    type: 'text',
    value: method,
  }, {
    label: 'requestParams',
    type: 'json',
    value: requestParams,
  }, {
    label: 'runParams',
    type: 'json',
    value: runParams
  }, {
    label: 'result',
    type: 'json',
    value: result
  }];
  return (
    <Card type="inner" title={format('Http')} bordered={false}>
      <Detail data={data} />
    </Card>
  );
};

export default Http;
