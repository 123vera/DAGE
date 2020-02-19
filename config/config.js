import path from 'path';
import pageRoutes from './router.config';

// import createLoading from 'dva-loading';

const config = {
  treeShaking: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          hmr: true,
        },
        dynamicImport: {
          // loadingComponent: createLoading(),
          webpackChunkName: true,
        },
        hd: true,
        title: {
          defaultTitle: 'DAGE',
        },
        locale: {
          default: 'zh-CN',
          baseNavigator: true,
          antd: false,
          baseSeparator: '-', // 语言默认分割符 -
        },
      },
    ],
  ],
  targets: {
    ie: 11,
  },
  theme: {
    'primary-color': '#FFFFFF',
    // 'font-size-base': '14px',
  },
  routes: pageRoutes,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  history: 'browser',
  hash: true,
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  proxy: {
    '/api': {
      target: 'http://greencourtdevweb:5005',
      changeOrigin: true,
    },
  },
};

export default config;
