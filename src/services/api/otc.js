import { onlinePost, optionsToLine } from '../utils';

class OtcApi {
  /**
   * 上传支付宝信息初始化
   *
   * @required openId 用户openid
   **/
  static alipayInit() {
    return onlinePost('/otc/rmbpayini');
  }

  /**
   * 上传支付宝信息
   *
   * @required openId 用户openid
   * @required payName 支付宝账号
   * @required realName 真实姓名
   * @required payImg  收款二维码
   **/
  static alipayUpload(options) {
    return onlinePost('/otc/rmbpay', options, {
      transformRequest: [
        data => {
          data = optionsToLine(data);
          let formData = new FormData();
          for (const key of Object.keys(data)) {
            formData.append(key, data[key]);
          }
          return formData;
        },
      ],
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  /**
   * OTC 初始化
   *
   * @required openId 用户openid
   **/
  static otcInit(options) {
    return onlinePost('/otc/otcini', options);
  }

  /**
   * 提交OTC
   *
   * @required openId 用户openid
   * @required num 数量
   * @required type 币种
   **/
  static otcSubmit(options) {
    return onlinePost('/otc/otc', options);
  }

  /**
   * OTC 挖矿详情（收益详情、明细 接口）
   * @required openId 用户openid
   * @required page 页码
   * @required type 推荐奖励：activate 、挖矿奖励：mining
   **/
  static otcDetail(options) {
    // return onlinePost('/otc/otclist', options);
    return onlinePost('/userasset/rewardlist', options);
  }
}

export default OtcApi;
