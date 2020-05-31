export default [
  // 入口页
  {
    path: '/',
    redirect: './account/homepage',
    component: './account/homepage',
  },

  // 四大入口
  {
    path: '/main',
    component: '../layouts/MainLayout',
    routes: [
      { path: '/main/home', component: './home' }, // 首页
      { path: '/main/user', component: './user' }, // 个人中心
      { path: '/main/ecology', component: './ecology' }, // 生态
      { path: '/main/assets', component: './assets' }, // 资产
    ],
  },

  // 用户账号相关
  {
    path: '/account',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/account/homepage', component: './account/homepage' }, // 入口页
      { path: '/account/login', component: './account/login' }, // 登录
      { path: '/account/email-login', component: './account/email_login' }, // 邮箱登录
      { path: '/account/register', component: './account/register' }, // 注册
      { path: '/account/select-account', component: './account/selectAccount' }, // 选择登录账号
      { path: '/account/set-account', component: './account/setAccount' }, // 创建新账号

      { path: '/account/reset-password/verify', component: './account/password/verify' }, // 重置密码
      { path: '/account/reset-password/edit', component: './account/password/edit' }, // 设置新密码
      { path: '/account/find-password/verify', component: './account/password/verify' }, // 找回密码
      { path: '/account/find-password/edit', component: './account/password/edit' }, // 设置新密码
    ],
  },

  // 首页相关
  {
    path: '/home',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/home/switch-account', component: './account/selectAccount' }, // 切换登录账号
      { path: '/home/referral-code', component: './home/referral_code' }, //邀请码
      { path: '/home/recharge', component: './home/recharge' }, // 充币
      { path: '/home/order-detail', component: './home/order_detail' }, // 订单详情
      { path: '/home/buy-supporting', component: './home/buy_supporting' }, // 购买配套

      { path: '/home/cny/recharge', component: './home/cny/recharge' }, // 法币充值
      { path: '/home/cny/alipay', component: './home/cny/alipay' }, // 支付宝支付 - 收款二维码
      { path: '/home/cny/bank-pay', component: './home/cny/bank_pay' }, // 银行卡支付
    ],
  },

  // 个人中心
  {
    path: '/user',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/user/message', component: './user/message' }, // 系统消息
      { path: '/user/alipay', component: './user/alipay' }, // 上传支付宝信息
      { path: '/user/alipay/pass', component: './user/alipay/pass' }, // 审核通过
      { path: '/user/alipay/pending', component: './user/alipay/pending' }, // 审核中
      { path: '/user/alipay/reject', component: './user/alipay/reject' }, // 审核拒绝

      { path: '/user/bind-email', component: './user/bind_email' }, // 绑定邮箱
      { path: '/user/download', component: './user/download' }, // 下载中心
    ],
  },

  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [

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
      { path: '/wallet/withdraw', title: 'DAGE WALLET', component: './wallet/withdraw' }, // 提币

      {
        path: '/wallet/withdraw-record',
        title: 'DAGE WALLET',
        component: './wallet/withdraw-record',
      }, // 提币记录
      { path: '/wallet/reward-detail', title: 'DAGE WALLET', component: './wallet/reward-detail' }, // 推广收益详情
      // { path: '/wallet/mining-detail', title: 'DAGE WALLET', component: './wallet/mining-detail' }, // 挖矿详情

      { path: '/exchange', title: 'DAGE WALLET', component: './ecology/exchange' }, // 去中心化交易中心
      { path: '/mining-detail', title: 'DAGE WALLET', component: './ecology/mining-detail' }, // 新挖矿详情
      // {
      //   path: '/mining-detail/otc',
      //   title: 'DAGE WALLET',
      //   component: './ecology/mining-detail/otc',
      // }, // OTC挖矿详情
      {
        path: '/otc-mining/inland',
        title: 'DAGE WALLET',
        component: './ecology/otc-mining/inland',
      }, // OTC挖矿中国区
      {
        path: '/otc-mining/abroad',
        title: 'DAGE WALLET',
        component: './ecology/otc-mining/abroad',
      }, // OTC挖矿国际区
      // { path: '/compound-dep', title: 'DAGE WALLET', component: './ecology/compound-dep' }, // 合成DEP

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
      { path: '/fabi/withdrawRecord', title: 'DAGE WALLET', component: './fabi/withdrawRecord' }, // 法币提现记录
      { path: '/fabi/rechargeRecord', title: 'DAGE WALLET', component: './fabi/Record' }, // 法币充值 - 充值记录

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
