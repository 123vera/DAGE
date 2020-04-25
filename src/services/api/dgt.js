import { onlinePost } from '../utils';

class DgtApi {
  /**
   * 获取法币提现初始化信息
   *
   * @required openId string
   **/
  static getDgtWithdrawInitInfo(options) {
    return onlinePost('/otc/rmbwithdrawalini', options);
  }

  /**
   * 资金划转初始化
   *
   * @required openId string
   * @required bankName string 银行名称
   * @required bankBranch string 支行名称
   * @required bankNo string  银行卡号
   * @required name string 姓名
   * @required num string 数量
   * @required code string 手机验证码
   **/
  static dgtWithdraw(options) {
    return onlinePost('/otc/rmbwithdrawal', options);
  }

  /**
   * 法币提现记录
   *
   * @required openId string
   * @required page string 页码
   * @required row string 条数
   **/
  static dgtWithdrawRecord(options) {
    return onlinePost('/otc/rmbwithdrawallist', options);
  }
}

export default DgtApi;
