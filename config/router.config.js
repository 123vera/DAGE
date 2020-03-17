export default [
  {
    path: '/',
    redirect: './login',
    component: './account/login',
    title: '登录',
  },

  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: '/home',
        component: '../layouts/MainLayout',
        routes: [
          { path: '/home/wallet', title: '首页', component: './wallet' },
          { path: '/home/user', title: '个人中心', component: './user/home' },
          { path: '/home/ecological', title: '生态', component: './ecological/home' },
        ],
      },

      { path: '/login', title: '登录', component: './account/login' },
      { path: '/register', title: '注册', component: './account/register' },
      { path: '/select_account', title: '选择登录账号', component: './account/selectAccount' },
      { path: '/set_account', title: '创建新账号', component: './account/setAccount' },

      { path: '/reset_password/verify', title: '重置密码', component: './account/password/verify' },
      { path: '/reset_password/edit', title: '设置新密码', component: './account/password/edit' },
      { path: '/find_password/verify', title: '找回密码', component: './account/password/verify' },
      { path: '/find_password/edit', title: '设置新密码', component: './account/password/edit' },

      { path: '/referral_code', title: '邀请码', component: './user/referralCode' },
      { path: '/notices', title: '公告列表', component: './user/notices' },
      { path: '/notice', title: '公告详情', component: './user/notice' },
      { path: '/promotion', title: '我的推广', component: './user/promotion' },
      { path: '/zendesk', title: '联系客服', component: './user/zendesk' },
      { path: '/switch_lang', title: '语言切换', component: './user/switchLang' },
      { path: '/alipay', title: '上传支付宝信息', component: './user/alipay' },
      { path: '/alipay/pass', title: '审核通过', component: './user/alipay/pass' },
      { path: '/alipay/pending', title: '审核中', component: './user/alipay/pending' },
      { path: '/alipay/reject', title: '审核拒绝', component: './user/alipay/reject' },


      { path: '/wallet/flow', title: '资金流水', component: './wallet/flow' },
      { path: '/wallet/recharge', title: '充值', component: './wallet/recharge' },
      { path: '/wallet/withdraw', title: '提币', component: './wallet/withdraw' },
      { path: '/wallet/withdraw-record', title: '提币记录', component: './wallet/withdraw-record' },
      { path: '/wallet/reward-detail', title: '收益详情', component: './wallet/reward-detail' },

      { path: '/exchange', title: '去中心化交易中心', component: './ecological/exchange' },
      { path: '/mining-detail', title: '挖矿详情', component: './ecological/mining-detail' },
      { path: '/mining-detail/otc', title: 'OTC挖矿详情', component: './ecological/mining-detail/otc' },
      {
        path: '/otc-mining/inland',
        title: 'OTC挖矿中国区',
        component: './ecological/otc-mining/inland',
      },
      {
        path: '/otc-mining/abroad',
        title: 'OTC挖矿国际区',
        component: './ecological/otc-mining/abroad',
      },
      { path: '/compound-dep', title: '合成DEP', component: './ecological/compound-dep' },
      { component: './404' },
    ],
  },
];
