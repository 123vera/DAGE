export default [
  {
    path: '/',
    redirect: './home',
    component: './home',
    title: '主页',
  },
  {
    path: '/user',
    component: '../layouts/LoginLayout',
    routes: [
      { path: '/user/login', title: '登录', component: './user/login' },
      // { path: '/register', title: '注册', component: './user/register' },
    ],
  },
];
