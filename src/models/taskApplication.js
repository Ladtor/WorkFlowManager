import { queryTaskApplications, saveApplication } from '@/services/taskApplication';
import { queryTasks, saveTask } from '@/services/tasks';

export default {
  namespace: 'taskApplication',
  state: {
    list: [],
    health: {},
    tasks: {},
    current: {},
  },
  effects: {
    * fetch(_, { call, put }) {
      const response = yield call(queryTaskApplications);
      yield put({
        type: 'saveTaskApplications',
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
      const { name } = yield select(state => state.taskApplication);
      const response = yield call(saveTask, name, payload);
      yield put({
        type: 'fetchTasks',
        payload: name,
      });
    },
    * addApplication({ payload }, { call }) {
      return yield call(saveApplication, payload);
    }
  },
  reducers: {
    saveTaskApplications(state, action) {
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
        if (pathname === '/taskApplication') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};
