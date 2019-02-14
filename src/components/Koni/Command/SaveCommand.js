import {RegisterCommand, withPropsAPI} from "gg-editor";
import React from "react";

const SaveCommand = (props) => {
  const {propsAPI} = props;
  const {
    config,
  } = props;
  const saveRemoteConfig = {
    queue: false,  // 命令是否进入队列，默认是 true
    // 命令是否可用
    enable(editor) {
      return config.enable()
    },
    // 正向命令
    execute() {
      const graph = propsAPI.save();
      console.debug("editor save", graph);
      config.execute && config.execute(graph);
    },
    // 反向命令
    back() {
    }
  };
  return <RegisterCommand name="saveRemote" config={saveRemoteConfig} />
};

export default withPropsAPI(SaveCommand);
