import { onlinePost } from '../utils';

class HomeApi {

  /**
   * 购买配套初始化
   * @required openId 用户openid
   * @required type 币种类型
   **/
  static getSupportings(options) {
    return onlinePost('/otc/buyotcini', options);
  }

  /**
   * 购买配套
   * @required openId 用户openid
   * @required type 币种类型
   * @required buylv 购买等级
   **/
  static buySupporting(options) {
    return onlinePost('/otc/buyotc', options);
  }

  /**
   * 订单详情
   * @required openId 用户openid
   * @required page 页码
   * @required row 条数
   **/
  static orderDetail(options) {
    return onlinePost('/otc/buyotclist', options);
    // let data = [];
    // for (let i = options.row; i > 0; i--) {
    //   data.push({
    //     orderNo: Math.floor(Math.random() * 1000000000),
    //     userId: 1587566804,
    //     addTime: 1587566804,
    //     status: 1,
    //     usdt: '1222.333333',
    //     returnNum: '100.00000000',
    //     ratio: 0.6,
    //   });
    // }
    // return Promise.resolve({
    //   status: 1,
    //   msg: '操作成功',
    //   data,
    // });
  }
}

export default HomeApi;
