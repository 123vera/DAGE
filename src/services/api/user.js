import request from '../request';
import { getApiBaseUrl, onlineGet } from '../utils';

class UserApi {
  /**
   * 获取个人详细信息
   *
   * @required open_id string
   **/
  static getMyInfo(options) {
    return request.post('/user/myinfo', options);
  }
}

export default UserApi;
