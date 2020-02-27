import request from '../request';
import { getApiBaseUrl, onlineGet } from '../utils';

const SID = '12c68f99664da7bc';

class AccountApi {
  /**
   * 获取图形验证码图片
   *
   * @required key number 唯一健值，一般为时间戳的毫秒数
   **/
  static getCaptcha(key) {
    return Promise.resolve(`${getApiBaseUrl()}/captchapng/png?sid=${SID}&key=${key}`);
  }

  /**
   * 检测手机号是否已被注册
   *
   * @required prefix number 手机号国际码
   * @required phone number 手机号
   **/
  static existPhone(options) {
    return request.post('user/phoneexist', options);
  }

  /**
   * 发送手机验证码
   *
   * @required imgcode number 图形验证码
   * @required prefix number 手机国际码
   * @required phone number 手机号
   * @required type string 验证码类型，reg（注册）,exchange(币种兑换),cash(提现)
   **/
  static sendSmsCode(options, key) {
    return request.post('/user/sendsmscode?key=' + key, { ...options, sid: SID });
  }

  /**
   * 注册账号
   *
   * @required prefix number 手机国家码
   * @required phone number 手机号
   * @required code number 手机验证码，请求type为reg
   * @required password string 密码
   * @required passwordConfirm string 密码
   **/
  static register(options) {
    return request.post('/user/reg', options);
  }

  /**
   * 登录账号
   *
   * @required prefix number 手机号国际码
   * @required phone number 手机号
   * @required password string 密码
   **/
  static login(options) {
    return request.post('/user/login', options);
  }

  /**
   * 新增角色账号
   *
   * @required accountToken string 账号token
   * @required userName string 昵称
   * @required recommendCode string 邀请码
   **/
  static addRole(options) {
    return request.post('/user/adduser', options);
  }

  /**
   * 找回登录密码
   *
   * @required prefix number 手机号国家码
   * @required phone number 手机号
   * @required code number 验证码
   * @required password string 密码
   * @required passwordConfirm string 确认密码
   **/
  static findPassword(options) {
    return request.post('/user/findpasswordforsms', options);
  }

  /**
   * 用户修改密码
   *
   * @required openId string 用户的openid
   * @required password string 新密码
   * @required passwordConfirm string 确认密码
   **/
  static editPassword(params) {
    return onlineGet('/user/editpassword', params);
  }

  /**
   * 选择角色账号进行登录
   *
   * @required accountToken string 账号token
   * @required userId string 用户角色id
   **/
  static selectUser(options) {
    return request.post('/user/selectuser', options);
  }

  /**
   * 角色账号激活
   *
   * @required openId string 用户open_id
   **/
  static activateRole() {
    return onlineGet('/user/useractivate');
  }
}

export default AccountApi;
