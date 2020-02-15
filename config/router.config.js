export default [
  {
    path: '/',
    redirect: './user/login',
    component: './user/login',
    title: '主页',
  },
  {
    path: '/user',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/user/login', title: '登录', component: './user/login' },
      { path: '/user/register', title: '注册', component: './user/register' },
      { path: '/user/account', title: '选择登录账号', component: './user/account' },
    ],
  },
];
