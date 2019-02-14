import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { get, getExecuteLog } from '@/services/workflows';
import { execute, success } from '@/services/graph';
import { taskList } from '@/services/tasks';

export default {
  namespace: 'graph',
  state: {},
  reducers: {
    saveState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * get({ payload: { serialNo, version, runVersion }}, { call, put }) {
      const response = yield call(get, serialNo, version, runVersion);
      if (response) {
        yield put({
          type: 'saveState',
          payload: response,
        });
      }
    },
    * getExecuteLog({ payload: serialNo }, { select, call, put }) {
      const state = yield select(state=> state.graph);
      if(serialNo !== undefined && state.executeLog !== undefined)return;
      serialNo = serialNo || state.serialNo;
      const response = yield call(getExecuteLog, serialNo);
      if (response) {
        yield put({
          type: 'saveState',
          payload: {
            executeLog: response
          }
        });
        if(response && response.length > 0 ){
          const executeLog = response[0];
          const {version, runVersion} = executeLog;
          yield put(
            routerRedux.replace(`/graph/${serialNo}/${version}/${runVersion}`)
          )
        }
      }
    },
    * nodeExecute({ payload: value }, { select, call, put }) {
      const graph = yield select(state => state.graph);
      const { executeId: nodeId, serialNo, version, runVersion } = graph;
      yield call(execute, serialNo, version, runVersion, nodeId, value);
      const response = yield call(get, serialNo, version, runVersion);
      if (response) {
        yield put({
          type: 'saveState',
          payload: response,
        });
      }
    },
    * nodeSuccess({ payload: value }, { select, call, put }) {
      const graph = yield select(state => state.graph);
      const { successId: nodeId, serialNo, version, runVersion } = graph;
      yield call(success, serialNo, version, runVersion, nodeId, value);
      const response = yield call(get, serialNo, version, runVersion);
      if (response) {
        yield put({
          type: 'saveState',
          payload: response,
        });
      }
    },
    * getTasks(_, { call, put }) {
      const response = yield call(taskList);
      yield put({
        type: 'saveState',
        payload: {
          tasks: response,
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        let match = pathToRegexp('/graph/:serialNo').exec(pathname);
        if (match) {
          dispatch({
            type: 'getExecuteLog',
            payload: match[1],
          });
        }
        match = pathToRegexp('/graph/:serialNo/:version/:runVersion').exec(pathname);
        if( match) {
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
