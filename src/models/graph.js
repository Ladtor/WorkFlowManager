import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { get, getExecuteLog } from '@/services/workflows';
import { taskList } from '@/services/tasks';
import { message } from "antd";

export default {
  namespace: 'graph',
  state: {},
  reducers: {
    saveState(state, { payload }) {
      return { ...state, ...payload };
    },
    edgeLog(state, { payload }) {
      const { edgeLogList = [], serialNo, version, runVersion, koni } = state;
      if (serialNo === payload.serialNo && version === payload.version && runVersion === payload.runVersion) {
        edgeLogList.push(payload);
      }
      return { ...state, edgeLogList };
    },
    nodeLog(state, { payload }) {
      const { nodeLogList = [], serialNo, version, runVersion } = state;
      if (serialNo === payload.serialNo && version === payload.version && runVersion === payload.runVersion) {
        nodeLogList.push(payload);
      }
      return { ...state, nodeLogList };
    },
    connect(state) {
      message.success("已连接");
      return { ...state, connected: true }
    },
    disConnect(state) {
      message.warn("已断开");
      return { ...state, connected: false }
    }
  },
  effects: {
    * get({ payload: { serialNo, version, runVersion } }, { call, put }) {
      const response = yield call(get, serialNo, version, runVersion);
      if (response) {
        yield put({
          type: 'saveState',
          payload: response,
        });
      }
    },
    * getExecuteLog({ payload: serialNo }, { select, call, put }) {
      const state = yield select(state => state.graph);
      if (serialNo !== undefined && state.executeLog !== undefined) return;
      serialNo = serialNo || state.serialNo;
      const response = yield call(getExecuteLog, serialNo);
      if (response) {
        yield put({
          type: 'saveState',
          payload: {
            executeLog: response
          }
        });
      }
    },
    * replace(_, { select, put }) {
      const { executeLog } = yield select(state => state.graph);
      if (executeLog && executeLog.length > 0) {
        const { serialNo, version, runVersion } = executeLog[0];
        yield put(
          routerRedux.replace(`/graph/${serialNo}/${version}/${runVersion}`)
        )
      }
    },
    * nodeExecute({ payload: { client, params } }, { select }) {
      const graph = yield select(state => state.graph);
      const { executeId: nodeId, serialNo, version, runVersion, connected } = graph;
      if (connected)
        client.sendMessage(`/execute/${serialNo}/${version}/${runVersion}/${nodeId}`, params);
      else
        message.error("连接已断开");
    },
    * nodeSuccess({ payload: { client, params } }, { select }) {
      const graph = yield select(state => state.graph);
      const { successId: nodeId, serialNo, version, runVersion, connected } = graph;
      if (connected)
        client.sendMessage(`/success/${serialNo}/${version}/${runVersion}/${nodeId}`, params);
      else
        message.error("连接已断开");
    },
    * nodeFail({ payload: { client, params } }, { select }) {
      const graph = yield select(state => state.graph);
      const { successId: nodeId, serialNo, version, runVersion, connected } = graph;
      if (connected)
        client.sendMessage(`/fail/${serialNo}/${version}/${runVersion}/${nodeId}`, params);
      else
        message.error("连接已断开");
    },
    * getTasks(_, { call, put }) {
      const response = yield call(taskList);
      yield put({
        type: 'saveState',
        payload: {
          tasks: response,
        },
      });
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        let match = pathToRegexp('/graph/:serialNo').exec(pathname);
        if (match) {
          dispatch({
            type: 'getExecuteLog',
            payload: match[1],
          }).then(() => {
            dispatch({
              type: 'replace'
            })
          });
        }
        match = pathToRegexp('/graph/:serialNo/:version/:runVersion').exec(pathname);
        if (match) {
          dispatch({
            type: 'getExecuteLog',
            payload: match[1],
          });
          dispatch({
            type: 'get',
            payload: {
              serialNo: match[1],
              version: match[2],
              runVersion: match[3]
            },
          });
          dispatch({
            type: 'getTasks'
          });
        }
      });
    },
  },
};
