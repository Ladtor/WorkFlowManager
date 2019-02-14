import { RegisterCommand, withPropsAPI } from 'gg-editor';
import React from 'react';

const AddCommand = (props) => {
  const { propsAPI } = props;
  const {
    config
  } = props;
  return <RegisterCommand name="add" config={config} />;
};

export default withPropsAPI(AddCommand);
