import { message } from 'antd';
import { del, get, list, save, execute, cron, cancel } from '@/services/workflows';

export default {
  namespace: 'workflows',
  state: {
    list: [],
    current: {},
  },
  reducers: {
    saveList(state, { payload: list }) {
      return { ...state, list };
    },
    saveOne(state, { payload: current }) {
      return { ...state, current };
    },
  },
  effects: {
    * get({ payload: { serialNo, version } }, { call, put }) {
      const response = yield call(get, serialNo, version);
      yield put({
        type: 'saveOne',
        payload: response,
      });
    },
    * list({ payload }, { call, put }) {
      const response = yield call(list);
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    * save({ payload: workflow }, { call, put }) {
      const response = yield call(save, workflow);
    },
    * delete({ payload: id }, { call, put }) {
      const response = yield call(del, id);
      yield put({
        type: 'list',
      });
    },
    * execute({ payload: { serialNo, params } }, { call, put }) {
      const response = yield call(execute, serialNo, params);
      if(response != null){
        message.success('执行成功');
        yield put({
          type: 'list',
        })
      }
    },
    * cron({ payload: { serialNo, cronText } }, { call, put }) {
      const response = yield call(cron, serialNo, cronText);
      if(response != null){
        message.success('执行成功');
        yield put({
          type: 'list',
        })
      }
    },
    * cancel({ payload: { serialNo }}, { call, put}) {
      yield call(cancel, serialNo);
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
