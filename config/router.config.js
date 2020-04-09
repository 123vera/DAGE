export default [
  {
    path: '/',
    redirect: './login',
    component: './account/login',
    title: 'DAGE WALLET',
  }, // 登录
  // {
  //   path: '/',
  //   // redirect: './homepage',
  //   component: './account/homepage',
  //   title: 'DAGE WALLET',
  // }, // 启动页
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/alipay', title: 'DAGE WALLET', component: './user/alipay' }, // 上传支付宝信息
      { path: '/alipay/pass', title: 'DAGE WALLET', component: './user/alipay/pass' }, // 审核通过
      { path: '/alipay/pending', title: 'DAGE WALLET', component: './user/alipay/pending' }, // 审核中
      { path: '/alipay/reject', title: 'DAGE WALLET', component: './user/alipay/reject' }, // 审核拒绝

      { path: '/login', title: 'DAGE WALLET', component: './account/login' }, // 登录
      { path: '/register', title: 'DAGE WALLET', component: './account/register' }, // 注册
      { path: '/select_account', title: 'DAGE WALLET', component: './account/selectAccount' }, // 选择登录账号
      { path: '/set_account', title: 'DAGE WALLET', component: './account/setAccount' }, // 创建新账号

      {
        path: '/reset_password/verify',
        title: 'DAGE WALLET',
        component: './account/password/verify',
      }, // 重置密码
      { path: '/reset_password/edit', title: 'DAGE WALLET', component: './account/password/edit' }, // 设置新密码

      {
        path: '/find_password/verify',
        title: 'DAGE WALLET',
        component: './account/password/verify',
      }, // 找回密码
      { path: '/find_password/edit', title: 'DAGE WALLET', component: './account/password/edit' }, // 设置新密码

      { path: '/referral_code', title: 'DAGE WALLET', component: './user/referralCode' }, //邀请码
      { path: '/notices', title: 'DAGE WALLET', component: './user/notices' }, // 公告列表
      { path: '/notice', title: 'DAGE WALLET', component: './user/notice' }, // 公告详情
      { path: '/promotion', title: 'DAGE WALLET', component: './user/promotion' }, // 我的推广/等级
      {
        path: '/zendesk',
        title: 'DAGE WALLET',
        component: './user/zendesk',
      }, // 联系客服
      {
        path: '/switch_lang',
        title: 'DAGE WALLET',
        component: './user/switchLang',
      }, // 语言切换
      {
        path: '/home',
        component: '../layouts/MainLayout',
        routes: [
          { path: '/home/wallet', title: 'DAGE WALLET', component: './wallet' }, // 首页
          { path: '/home/user', title: 'DAGE WALLET', component: './user/home' }, // 个人中心
          { path: '/home/ecological', title: 'DAGE WALLET', component: './ecological/home' }, //生态
          { path: '/home/assets', title: 'DAGE WALLET', component: './assets' }, // 资产
        ],
      },

      { path: '/wallet/flow', title: 'DAGE WALLET', component: './wallet/flow' }, // 资金流水
      { path: '/wallet/recharge', title: 'DAGE WALLET', component: './wallet/recharge' }, // 充币
      { path: '/wallet/dgt_recharge', title: 'DAGE WALLET', component: './wallet/dgt-recharge' }, // DGT法币充值
      { path: '/wallet/dgt_pay', title: 'DAGE WALLET', component: './wallet/dgt-pay' }, // DGT法币充值 - 支付二维码
      { path: '/wallet/withdraw', title: 'DAGE WALLET', component: './wallet/withdraw' }, // 提币
      {
        path: '/wallet/withdraw-record',
        title: 'DAGE WALLET',
        component: './wallet/withdraw-record',
      }, // 提币记录
      { path: '/wallet/reward-detail', title: 'DAGE WALLET', component: './wallet/reward-detail' }, // 收益详情
      // { path: '/wallet/mining-detail', title: 'DAGE WALLET', component: './wallet/mining-detail' }, // 挖矿详情

      { path: '/exchange', title: 'DAGE WALLET', component: './ecological/exchange' }, // 去中心化交易中心
      { path: '/mining-detail', title: 'DAGE WALLET', component: './ecological/mining-detail' }, // 挖矿详情
      {
        path: '/mining-detail/otc',
        title: 'DAGE WALLET',
        component: './ecological/mining-detail/otc',
      }, // OTC挖矿详情
      {
        path: '/otc-mining/inland',
        title: 'DAGE WALLET',
        component: './ecological/otc-mining/inland',
      }, // OTC挖矿中国区
      {
        path: '/otc-mining/abroad',
        title: 'DAGE WALLET',
        component: './ecological/otc-mining/abroad',
      }, // OTC挖矿国际区
      { path: '/compound-dep', title: 'DAGE WALLET', component: './ecological/compound-dep' }, // 合成DEP

      { component: './404' },
    ],
  },
];
