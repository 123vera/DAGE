export default [
  {
    path: '/',
    redirect: './home',
    component: './home',
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
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/login', title: '登录', component: './account/login' },
      { path: '/register', title: '注册', component: './account/register' },
      { path: '/select_account', title: '选择登录账号', component: './account/selectAccount' },
      { path: '/set_account', title: '创建新账号', component: './account/setAccount' },
      { path: '/set_password', title: '设置新密码', component: './account/setPassword' },
      { path: '/forgot_password', title: '忘记密码', component: './account/forgotPassword' },
    ],
  },
];
