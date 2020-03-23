import request from '../request';
import { onlinePost } from '../utils';

class AssetApi {
  /**
   * 获取站内还是站外提币及手续费比例
   *
   * @required address string 钱包地址
   * @required currency string 币种
   **/
  static getServiceCharge(params) {
    return request.get('/userasset/walletforaddress', { params });
  }

  /**
   * 提币申请初始化
   *
   * @required type string 提币类型,usdt|dgt, 默认usdt
   * @required openId string 用户openid
   **/
  static withdrawInit(options) {
    return onlinePost('/userasset/cashini', options);
  }

  /**
   * 提交提币申请
   *
   * @required code string 手机验证码
   * @required amount number 提币数量
   * @required walletTo string 提入的钱包地址
   * @required type string 提币类型,usdt|dgt, 默认usdt
   * @required openId string 用户openid
   *
   **/
  static submitWithdrawal(options) {
    return onlinePost('/userasset/cash', options);
  }

  /**
   * 资产流水
   *
   * @required type string 币种类型
   * @required page string 页码
   * @required row string 每页条数
   * @required openId string 用户openid
   *
   **/
  static async getAssetFlow(options) {
    return onlinePost('/userasset/stream', options);

    // const data = {
    //   balance: 300.0000,
    //   list: [],
    // };
    // const order = (options.page - 1) * options.row;
    // for (let i = order; i < options.row + order; i++) {
    //   data.list.push({
    //     addTime: +new Date(),
    //     remark: '充值',
    //     type: options.type,
    //     amount: 300,
    //     userId: '32424232',
    //     id: i,
    //   });
    // }
    //
    // return new Promise(resolve => setTimeout(() => resolve({ status: 1, data }), 1000));
    // return Promise.resolve({ status: 1, data });
  }

  /**
   * 获取提现记录
   *
   * @required type string 币种类型
   * @required page string 页码
   * @required row string 每页条数
   * @required openId string 用户openid
   *
   **/
  static getWithdrawRecord(options) {
    return onlinePost('/userasset/cashlist', options);
  }

  /**
   * 币种兑换初始化
   *
   * @required currency1 string 币种1
   * @required currency2 string 币种2
   * @required openId string 用户openid
   *
   **/
  static exchangeInit(options) {
    return onlinePost('/userasset/exini', options);
  }

  /**
   * 获取系统所有币种
   **/
  static getCurrencyList(params) {
    return request.get('/userasset/currency', { params });
  }

  /**
   * 提交币种兑换
   *
   * @required currency1 string 币种1, 非必填
   * @required currency2 string 币种2，非必填
   * @required amount string 兑换数量
   * @required code string 手机验证码
   * @required openId string 用户openid
   *
   **/
  static submitExchange(options) {
    return onlinePost('/userasset/exchange', options);
  }

  /**
   * 昨日收益详情、明细
   *
   * @required page string 页码
   * @required openId string 用户openid
   *
   **/
  static getRewardList(options) {
    return onlinePost('/userasset/rewardlist', options);

    // const list = [];
    // const order = (options.page - 1) * options.row;
    // for (let i = order; i < options.row + order; i++) {
    //   list.push({
    //     addTime: +Math.floor(new Date() / 1000),
    //     type: options.type,
    //     amount: 300 + i,
    //   });
    // }
    // return new Promise(resolve => setTimeout(() => resolve({
    //   status: 1,
    //   data: { list, pageCount: 30 },
    // }), 500));
  }
}

export default AssetApi;
