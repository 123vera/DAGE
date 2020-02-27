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

      { path: '/referral_code', title: '推荐码', component: './user/referralCode' },
      { path: '/notices', title: '公告列表', component: './user/notices' },
      { path: '/promotion', title: '我的推广', component: './user/promotion' },

      {
        path: '/home',
        component: '../layouts/MainLayout',
        routes: [
          { path: '/home/wallet', title: '钱包', component: './wallet' },
          { path: '/home/user', title: '个人中心', component: './user/home' },
          { path: '/home/ecological', title: '生态', component: './ecological/home' },
        ],
      },

      { path: '/wallet/flow', title: '资金流水', component: './wallet/flow' },
      { path: '/wallet/recharge', title: '充值', component: './wallet/recharge' },
      { path: '/wallet/withdraw', title: '提币', component: './wallet/withdraw' },
      { path: '/wallet/mining-detail', title: '挖矿详情', component: './wallet/mining-detail' },

      { path: '/user', title: '', component: './user' },

      {
        path: '/exchange',
        title: '去中心化交易中心',
        component: './ecological/exchange',
      },
      {
        path: '/choose',
        title: '选择币种',
        component: './ecological/choose',
      },
    ],
  },
];
