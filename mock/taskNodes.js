export default {
  'GET /api/taskNodes': [{
    id: '1',
    key: 'key',
    name: 'name',
    status: 'UP',
    total: 12,
    success: 8,
    fail: 2,
    running: 2,
  }],

  'GET /api/taskNode/{id}/health': {
    status: 'UP',
    diskSpace: {
      status: 'UP',
      total: 249779191808,
      free: 193741590528,
      threshold: 10485760,
    },
    db: {
      status: 'UP',
      database: 'MySQL',
      hello: 1,
    },
  },

  'GET /api/taskNode/1/tasks': [{
    name: 'task1',
    total: 8,
    success: 7,
    fail: 0,
    running: 1,
  }, {
    name: 'task2',
    total: 4,
    success: 1,
    fail: 2,
    running: 1,
  }],
};
