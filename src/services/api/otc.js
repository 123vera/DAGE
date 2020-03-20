import Request from '../request';
import { onlinePost, optionsToLine } from '../utils';

class OtherApi {
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
      transformRequest: [data => {
        data = optionsToLine(data);
        let formData = new FormData();
        for (const key of Object.keys(data)) {
          formData.append(key, data[key]);
        }
        return formData;
      }],
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }
}

export default OtherApi;
