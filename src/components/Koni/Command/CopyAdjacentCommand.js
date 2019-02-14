import { RegisterCommand, withPropsAPI } from 'gg-editor';
import React from 'react';

const CopyAdjacentCommand = (props) => {
  const { propsAPI } = props;
  const {
    enable,
    config
  } = props;
  const _config = config || {};
  // _config.enable = ()=>enable===undefined && enable;
  return <RegisterCommand name="copyAdjacent" config={_config} />;
};

export default withPropsAPI(CopyAdjacentCommand);
