import React from 'react';
import { connect } from 'dva';
import { Button, Card, Row, Col } from 'antd';
import WorkFlowList from './components/WorkFlowList';
import styles from './index.css';

const WorkFlows = ({ dispatch, workflows }) => {
  const { list, current } = workflows;

  function handleDelete(id) {
    dispatch({
      type: 'workflows/delete',
      payload: id,
    });
  }

  const handleToCreate = () => {
    window.open('/editor');
  };
  const handleEdit = (serialNo) => {
    window.open(`/editor/${serialNo}`);
  };

  const handleRefresh = () =>{
    dispatch({
      type: 'workflows/list'
    })
  };

  const handleView = (serialNo) =>{
    window.open(`/graph/${serialNo}`)
  };

  const handleRun = (serialNo, params) =>{
    dispatch({
      type: 'workflows/execute',
      payload: {
        serialNo,
        params
      }
    })
  };

  return (
    <div className={styles.normal}>
      <Card className={styles.card}>
        <Row>
          <Col span={12}>
            <Button type='primary' onClick={handleToCreate}>
              新增工作流
            </Button>
          </Col>
          <Col span={12} style={{textAlign: 'right'}}>
            <Button type='default' onClick={handleRefresh}>
              刷新
            </Button>
          </Col>
        </Row>
      </Card>
      <WorkFlowList workflows={list} onDelete={handleDelete} onEdit={handleEdit} onView={handleView} onRun={handleRun} />
    </div>
  );
};

export default connect(({ workflows }) => ({
  workflows,
}))(WorkFlows);
