import request from '../request';
import { onlinePost } from '../utils';

class AssetApi {
  /**
   * 获取站内还是站外提币及手续费比例
   *
   * @required address string 钱包地址
   * @required currency string 币种
   **/
  static getServiceCharge(option) {
    return request.post('/userasset/walletforaddress', option);
  }

  /**
   * 提币申请初始化
   *
   * @required type string 提币类型,usdt|dgt, 默认usdt
   * @required openId string 用户openid
   **/
  static withdrawInit(options) {
    return request.post('/userasset/cashini', options);
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
    return request.post('/userasset/cash', options);
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
  static getAssetFlow(params) {
    return request.get('/userasset/stream', { params });
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
    return request.post('/userasset/stream', options);
  }

  /**
   * 币种兑换初始化
   *
   * @required currency1 string 币种1
   * @required currency2 string 币种2
   * @required openId string 用户openid
   *
   **/
  static setExchangeInit(options) {
    return onlinePost('/userasset/exini', options);
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
}

export default AssetApi;
