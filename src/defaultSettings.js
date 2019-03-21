module.exports = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#1890FF', // primary color of ant design
  layout: 'sidemenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: false, // sticky header
  autoHideHeader: false, // auto hide header
  fixSiderbar: false, // sticky siderbar
  edgeStatusColor: { true: '#52c41a', false: '#f5222d'},
  nodeStatusColor: { RUNNING: '#1890ff', SUCCESS: '#52c41a', FAIL: '#f5222d', PENDING: '#00CCFF', BLOCK: '#faad14'},
  formValid: {
    node: {
      "AND": ['label'],
      "HTTP":['label', 'url', 'method', 'requestParams'],
      "OR": ['label'],
      "RESULT": ['label'],
      "START": ['label','initParams'],
      "TASK": ['label', 'task'],
      "WORK_FLOW": ['label', 'subSerialNo'],
    }
  },
  stompUrl: 'http://localhost:8080/stomp',
  proxy: {
    "/api": {
      "target": "http://localhost:8080/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  title: 'Ladtor',
};
