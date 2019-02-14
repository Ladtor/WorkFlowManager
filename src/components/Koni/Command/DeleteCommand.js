import { RegisterCommand, withPropsAPI } from 'gg-editor';
import React from 'react';

const DeleteCommand = (props) => {
  const { propsAPI } = props;
  const {
    config
  } = props;
  return <RegisterCommand name="delete" config={config} />;
};

export default withPropsAPI(DeleteCommand);
