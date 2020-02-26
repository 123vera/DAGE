import Request from '../request';

class AsideApi {
  /**
   * 检测手机号是否已被注册
   *
   * @required prefix number 手机号国际码
   * @required phone number 手机号
   **/
  static getNoticeList(params) {
    return Request.get('/other/noticelist', { params });
  }
}

export default AsideApi;
