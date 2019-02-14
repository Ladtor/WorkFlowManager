import { RegisterCommand, withPropsAPI } from 'gg-editor';
import React from 'react';

const CopyCommand = (props) => {
  const { propsAPI } = props;
  const {
    config
  } = props;
  return <RegisterCommand name="copy" config={config} />;
};

export default withPropsAPI(CopyCommand);
