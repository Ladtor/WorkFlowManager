import React from 'react';
import { Row, Col } from 'antd';
import JsonView from '@/components/JsonView';
import styles from './index.css';


const getText = (value, type) =>{
  switch (type) {
    case "json":
      return <JsonView data={value} />;
    default:
      return value;
  }
};
const getRow = (item) => {
  return (
    <Row className={styles.row} key={item.label}>
      <Col span={8}>
        {item.label}
      </Col>
      <Col span={16}>
        {getText(item.value, item.type)}
      </Col>
    </Row>
  );
};
const Detail = ({ data }) => {
  return (
    <div>
      {data.map(getRow)}
    </div>
  );
};

export default Detail;
