// import { onlinePost, optionsToLine } from '../utils';

class HomeApi {

  /**
   * 订单详情
   * @required openId 用户openid
   * @required page 页码
   * @required row 条数
   **/
  static orderDetail(options) {
    // return onlinePost('/otc/rmbwithdrawallist', options);
    let data = [];
    for (let i = options.row ; i > 0; i--) {
      data.push({
        orderNum: Math.floor(Math.random() * 1000000000),
        addTime: 1587566804,
        total: '100.00000000',
        num: '60.00000000',
        remark: '0.6',
      });
    }
    return Promise.resolve({
      status: 1,
      msg: '操作成功',
      data,
    });
  }
}

export default HomeApi;
