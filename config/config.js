// ref: https://umijs.org/config/
import { primaryColor, proxy } from '../src/defaultSettings';
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: { hmr: true },
        targets: { ie: 11 },
        locale: {
          enable: true,
          // default false
          default: 'zh-CN',
          // default zh-CN
          baseNavigator: true,
        },
        // default true, when it is true, will use `navigator.language` overwrite default
        dynamicImport: { loadingComponent: './components/PageLoading/index' },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  targets: { ie: 11 },
  /**
   * 路由相关配置
   */
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/user',
          component: './Welcome',
        },
      ],
    },
    {
      path: '/editor',
      name: 'editor',
      icon: 'editor',
      target: '_blank',
      component: './editor',
    },
    {
      path: '/editor/:serialNo',
      name: 'editor',
      icon: 'editor',
      target: '_blank',
      component: './editor',
    },
    {
      path: '/graph/:serialNo',
      name: 'graph',
      icon: 'graph',
      target: '_blank',
      component: './graph',
    },
    {
      path: '/graph/:serialNo/:version/:runVersion',
      name: 'graph',
      icon: 'graph',
      target: '_blank',
      component: './graph',
    },
    {
      path: '/test',
      name: 'test',
      icon: 'test',
      target: '_blank',
      component: './test',
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/welcome',
        },
        // dashboard
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: 'https://github.com/umijs/umi-blocks/tree/master/ant-design-pro',
          name: 'more-blocks',
          icon: 'block',
        },
        {
          name: 'analysis',
          icon: 'smile',
          path: '/analysis',
          component: './analysis',
        },
        {
          name: 'workflows',
          icon: 'smile',
          path: '/workflows',
          component: './workflows',
        },
        {
          name: 'taskApplication',
          icon: 'smile',
          path: '/taskApplication',
          component: './taskApplication',
        },
      ],
    },
  ],
  disableRedirectHoist: true,
  /**
   * webpack 相关配置
   */
  define: { APP_TYPE: process.env.APP_TYPE || '' },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: { 'primary-color': primaryColor },
  externals: { '@antv/data-set': 'DataSet' },
  ignoreMomentLocale: true,
  lessLoaderOptions: { javascriptEnabled: true },
  proxy
};
