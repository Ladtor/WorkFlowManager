import pathToRegexp from 'path-to-regexp';
import { routerRedux } from 'dva/router';
import { taskList } from '@/services/tasks';
import { save, update, get, list } from '@/services/workflows';

export default {
  namespace: 'editor',
  state: {
    serialNo: undefined,
    version: undefined,
    name: undefined,
    graph: undefined,
    workflows: [],
  },
  reducers: {
    saveState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * save({ payload: workflow }, { call, put, select }) {
      const editor = yield select(state => state.editor);
      if (!editor.name && !workflow.name) {
        yield put({
          type: 'saveState',
          payload: {
            modalVisible: true,
            ...workflow,
          },
        });
      } else if (editor.serialNo) {
        const { serialNo, version } = yield call(update, editor.serialNo, editor.version, workflow.graph);
        yield put({
          type: 'saveState',
          payload: {
            serialNo,
            version,
            ...workflow,
          },
        });
      } else {
        const serialNo = yield call(save, workflow);
        yield put(routerRedux.replace(`/editor/${serialNo}`));
      }
    },
    * get({ payload: serialNo }, { call, put }) {
      const response = yield call(get, serialNo);
      if (response) {
        yield put({
          type: 'saveState',
          payload: response,
        });
      } else {
        yield put(routerRedux.replace('/editor'));
      }
    },
    * getWorkflows(_, { call, put }) {
      const response = yield call(list);
      yield put({
        type: 'saveState',
        payload: {
          workflows: response,
        },
      });
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
        const match = pathToRegexp('/editor/:serialNo').exec(pathname);
        if (match) {
          dispatch({
            type: 'get',
            payload: match[1],
          });
          dispatch({
            type: 'getWorkflows',
          });
          dispatch({
            type: 'getTasks',
          });
        }
        if (pathname === '/editor') {
          dispatch({
            type: 'getWorkflows',
          });
          dispatch({
            type: 'getTasks',
          });
        }
      });
    },
  },
};
