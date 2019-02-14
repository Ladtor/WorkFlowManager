import React from 'react';
import {Row, Col, Button} from 'antd';
import { withPropsAPI } from 'gg-editor';

const NodeExecute = ({ propsAPI, onExecute, onSuccess }) => {
  const { getSelected } = propsAPI;
  const item = getSelected()[0];

  if (!item) {
    return null;
  }

  const handleExecute = ()=>{
    onExecute && onExecute(item)
  };

  const handleSuccess = ()=>{
    onSuccess && onSuccess(item)
  };

  return (
    <div style={{backgroundColor: '#fff', paddingBottom: '15px'}}>
      <Row gutter={16} style={{textAlign: 'center'}}>
        <Col span={12}>
          <Button type='primary' onClick={handleExecute}>立即执行</Button>
        </Col>
        <Col span={12}>
          <Button onClick={handleSuccess}>立即完成</Button>
        </Col>
      </Row>
    </div>
  )
};

export default withPropsAPI(NodeExecute);
