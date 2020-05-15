export default [
  {
    path: '/',
    redirect: './homepage',
    component: './account/homepage',
    title: 'DAGE WALLET',
  }, // 入口页

  // 四大入口
  {
    path: '/main',
    component: '../layouts/MainLayout',
    routes: [
      { path: '/main/home', title: 'DAGE WALLET', component: './home' }, // 首页
      { path: '/main/user', title: 'DAGE WALLET', component: './user/home' }, // 个人中心
      { path: '/main/ecological', title: 'DAGE WALLET', component: './ecological/home' }, //生态
      { path: '/main/assets', title: 'DAGE WALLET', component: './assets' }, // 资产
    ],
  },

  {
    path: '/home',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/home/order-detail', title: 'DAGE WALLET', component: './home/order_detail' }, // 订单详情
      { path: '/home/buy-supporting', title: 'DAGE WALLET', component: './home/buy_supporting' }, // 购买配套
    ],
  },

  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/alipay', title: 'DAGE WALLET', component: './user/alipay' }, // 上传支付宝信息
      { path: '/alipay/pass', title: 'DAGE WALLET', component: './user/alipay/pass' }, // 审核通过
      { path: '/alipay/pending', title: 'DAGE WALLET', component: './user/alipay/pending' }, // 审核中
      { path: '/alipay/reject', title: 'DAGE WALLET', component: './user/alipay/reject' }, // 审核拒绝

      { path: '/homepage', title: 'DAGE WALLET', component: './account/homepage' }, // 入口页
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
      { path: '/notice/:id', title: 'DAGE WALLET', component: './user/notice' }, // 公告详情
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

      { path: '/wallet/flow', title: 'DAGE WALLET', component: './wallet/flow' }, // 资金流水
      { path: '/wallet/recharge', title: 'DAGE WALLET', component: './wallet/recharge' }, // 充币
      { path: '/wallet/withdraw', title: 'DAGE WALLET', component: './wallet/withdraw' }, // 提币

      {
        path: '/wallet/withdraw-record',
        title: 'DAGE WALLET',
        component: './wallet/withdraw-record',
      }, // 提币记录
      { path: '/wallet/reward-detail', title: 'DAGE WALLET', component: './wallet/reward-detail' }, // 推广收益详情
      // { path: '/wallet/mining-detail', title: 'DAGE WALLET', component: './wallet/mining-detail' }, // 挖矿详情

      { path: '/exchange', title: 'DAGE WALLET', component: './ecological/exchange' }, // 去中心化交易中心
      { path: '/mining-detail', title: 'DAGE WALLET', component: './ecological/mining-detail' }, // 新挖矿详情
      // {
      //   path: '/mining-detail/otc',
      //   title: 'DAGE WALLET',
      //   component: './ecological/mining-detail/otc',
      // }, // OTC挖矿详情
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
      // { path: '/compound-dep', title: 'DAGE WALLET', component: './ecological/compound-dep' }, // 合成DEP

      { path: '/assets/transfer', title: 'DAGE WALLET', component: './assets/transfer' }, // 划转
      {
        path: '/assets/transfer/record',
        title: 'DAGE WALLET',
        component: './assets/transfer/record',
      }, // 划转记录

      { path: '/game', title: 'DAGE WALLET', component: './game/index' }, // 游戏中心
      { path: '/game_list', title: 'DAGE WALLET', component: './game/list' }, // 游戏列表

      // 法币系列
      { path: '/fabi/withdraw/:step', title: 'DAGE WALLET', component: './fabi/withdraw' }, // 法币提现
      { path: '/fabi/record', title: 'DAGE WALLET', component: './fabi/withdrawRecord' }, // 法币提现记录
      { path: '/fabi/recharge', title: 'DAGE WALLET', component: './fabi/recharge' }, // 法币充值
      { path: '/fabi/pay', title: 'DAGE WALLET', component: './fabi/pay' }, // 法币充值 - 收款二维码
      { path: '/fabi/record', title: 'DAGE WALLET', component: './fabi/record' }, // 法币充值 - 充值记录

      // 游戏dgt系列
      { path: '/dgt/withdraw/:step', title: 'DAGE WALLET', component: './dgt/withdraw' }, // DGT法币提现
      { path: '/dgt/record', title: 'DAGE WALLET', component: './dgt/withdrawRecord' }, // DGT法币提现记录
      // { path: '/wallet/dgt_recharge', title: 'DAGE WALLET', component: './wallet/dgt-recharge' }, // DGT法币充值 （4.17版本去掉，改成法币充值下的2个页面）
      // { path: '/wallet/dgt_pay', title: 'DAGE WALLET', component: './wallet/dgt-pay' }, // DGT法币充值 - 支付二维码 （4.17版本去掉，改成法币充值下的2个页面）
      // { path: '/wallet/dgt_record', title: 'DAGE WALLET', component: './wallet/dgt-record' }, // DGT法币充值 - 充值记录 （4.17版本去掉，改成法币充值下的2个页面）

      { component: './404' },
    ],
  },
];
