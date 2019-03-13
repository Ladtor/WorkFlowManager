import { del, list, save, execute, cron, cancel } from '@/services/workflows';

export default {
  namespace: 'workflows',
  state: {
    list: [],
    current: {},
  },
  reducers: {
    saveState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * list({ payload }, { call, put }) {
      const response = yield call(list);
      yield put({
        type: 'saveState',
        payload: {
          list: response
        },
      });
    },
    * save({ payload: workflow }, { call }) {
      return yield call(save, workflow);
    },
    * delete({ payload: serialNo }, { call }) {
      return yield call(del, serialNo);
    },
    * execute({ payload: { serialNo, params } }, { call }) {
      return yield call(execute, serialNo, params);
    },
    * cron({ payload: { serialNo, cronText } }, { call }) {
      return yield call(cron, serialNo, cronText);
    },
    * cancel({ payload: { serialNo } }, { call }) {
      return yield call(cancel, serialNo);
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/workflows') {
          dispatch({
            type: 'list',
          });
        }
      });
    },
  },
};
