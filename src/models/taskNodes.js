import { queryTaskNodes, queryTasks, saveTask } from '@/services/taskNodes';

export default {
  namespace: 'taskNodes',
  state: {
    list: [],
    health: {},
    tasks: {},
    current: {},
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryTaskNodes);
      yield put({
        type: 'saveTaskNodes',
        payload: response,
      });
    },
    * fetchTasks({ payload: name }, { call, put }) {
      const response = yield call(queryTasks, name);
      yield put({
        type: 'saveTasks',
        payload: {
          name,
          tasks: response,
        },
      });
    },
    * addTask({ payload }, { call, put, select }) {
      const { name } = yield select(state => state.taskNodes);
      const response = yield call(saveTask, name, payload);
      yield put({
        type: 'fetchTasks',
        payload: name,
      });
    },
  },
  reducers: {
    saveTaskNodes(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveTasks(state, { payload: { name, tasks } }) {
      const _tasks = state.tasks || {};
      _tasks[name] = tasks;
      return {
        ...state,
        tasks: {
          ..._tasks,
        },
      };
    },
    saveState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/taskNodes') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};
