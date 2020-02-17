export default [
  {
    path: '/',
    redirect: './account/login',
    component: './account/login',
    title: '主页',
  },
  {
    path: '/home',
    component: '../layouts/MainLayout',
    routes: [
      { path: '/home/wallet', title: '钱包', exact: true, component: './wallet' },
      // { path: '/account/register', title: '注册', component: './account/register' },
      // { path: '/account/account', title: '选择登录账号', component: './account/account' },
    ],
  },

  {
    path: '',
    component: '../layouts/index',
    routes: [
      { path: '/wallet/flow', title: '资金流水', component: './wallet/flow' },
    ],
  },

  {
    path: '/account',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/account/login', title: '登录', component: './account/login' },
      { path: '/account/register', title: '注册', component: './account/register' },
      // { path: '/account/account', title: '选择登录账号', component: './account/account' },
    ],
  },
];
