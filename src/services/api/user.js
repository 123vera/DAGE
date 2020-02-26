// import request from '../request';
import { onlinePost } from '../utils';

class UserApi {
  /**
   * 获取个人详细信息
   *
   * @required openId string
   **/
  static getMyInfo(options) {
    return onlinePost('/user/myinfo', options);
  }
}

export default UserApi;
