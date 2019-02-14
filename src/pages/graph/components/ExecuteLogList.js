import React from 'react';
import { Badge } from 'antd';

const ExecuteLog = ({ data, active, onClick }) => {
  const handleClick = (data) => {
    onClick && onClick(data);
  };
  const getStatus = (data) => {
    const statusMap = {
      'RUNNING': 'processing',
      'SUCCESS': 'success',
      'ERROR': 'error',
      'CANCEL': 'default',
    };
    return statusMap[data];
  };
  const getBody = (data) => {
    if (active) {
      return (
        <span>
          <span>
            {data.version} - {data.runVersion}
          </span>
          <div>
            {data.createdAt}
          </div>
        </span>
      );
    }
    return (
      <a onClick={() => handleClick(data)}>
        <span>
          {data.version} - {data.runVersion}
        </span>
        <div>
          {data.createdAt}
        </div>
      </a>
    );
  };
  return (
    <div>
      <div>
        <Badge
          status={getStatus(data.status)}
          text={
            getBody(data)
          }
        />
      </div>
    </div>
  );
};
const ExecuteLogList = ({ data = [], onSelect, active, onClick }) => {

  return (
    <div>
      {data.map(item => <ExecuteLog data={item} key={item.id} active={item.runVersion == active} onClick={onClick} />)}
    </div>
  );
};

export default ExecuteLogList;
