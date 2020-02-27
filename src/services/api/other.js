import Request from '../request';

class OtherApi {
  /**
   * 检测手机号是否已被注册
   *
   * @required prefix number 手机号国际码
   * @required phone number 手机号
   **/
  static getNoticelist(params) {
    return Request.post('/other/noticelist', params);
  }
}

export default OtherApi;
