export default [
  {
    path: '/',
    redirect: './home/wallet',
    component: './wallet/flow',
    title: '主页',
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

      {
        path: '/home',
        component: '../layouts/MainLayout',
        routes: [
          { path: '/home/wallet', title: '钱包', component: './wallet' },
          { path: '/home/user', title: '个人中心', component: './user/home' },
          // { path: '/account/account', title: '选择登录账号', component: './account/account' },
        ],
      },
    ],
  },
];
