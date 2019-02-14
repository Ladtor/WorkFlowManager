import React from 'react';

const JsonView = ({ data }) => {
  let json = {};
  try {
    json = JSON.parse(data) || {};
  }catch (e) {
    json = {};
  }
  return (
    <div>
      <pre>
        {JSON.stringify(json, null, 2)}
      </pre>
    </div>
  );
};
export default JsonView;
