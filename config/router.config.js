export default [
  {
    path: '/',
    redirect: './account/login',
    component: './account/login',
    title: '主页',
  },{
    path: '/home',
    component: './home',
    title: '首页',
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
