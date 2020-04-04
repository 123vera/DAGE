import request from '../request';
import { getApiBaseUrl, getAccountToken, getOpenId, onlinePost, onlineGet } from '../utils';

const SID = '12c68f99664da7bc';

class UserApi {
  /**
   * 获取图形验证码图片
   *
   * @required key number 唯一键值，一般为时间戳的毫秒数
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
   * @required type string 验证码类型，reg（注册）,exchange(币种兑换),cash(提币)
   **/
  static sendSmsCode(options) {
    return request.post('/user/sendsmscode', { ...options, sid: SID });
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
   **/
  static findPassword(options) {
    return request.post('/user/findpasswordforsms', options);
  }

  /**
   * 用户修改密码 accountToken 与 openId必须存在一个
   *
   * accountToken string 用户的accountToken
   * openId string 用户的openid
   * @required password string 新密码
   * @required passwordConfirm string 确认密码
   **/
  static editPassword(options) {
    return onlinePost('/user/editpassword', {
      ...options,
      accountToken: getAccountToken(),
      openId: getOpenId(),
    });
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
    return onlinePost('/user/useractivate');
  }

  /**
   * 获取角色列表
   *
   * @required accountToken string 账号token
   * @required userId string 用户角色id
   **/
  static getUserList(options) {
    return onlinePost('/user/getuserlist', options);
  }

  /**
   * 获取个人详细信息
   *
   * @required openId string
   **/
  static getMyInfo(options) {
    return onlinePost('/user/myinfo', options);
  }

  /**
   * 获取我的钱包地址
   *
   * @required openId string
   * @required type string 钱包类型，默认usdt
   **/
  static getMyWallet(options) {
    return onlinePost('/userasset/mywallet', options);
  }

  /**
   * 我的推广 （我的等级）
   * @required openId 用户openid
   * @required page 页码
   **/
  static getRecommendList(options) {
    return onlinePost('/user/recommendlist', options);
    // return request.get('/user/recommendlist', { ...params, openId: getOpenId() });
  }

  /**
   * 用户资产列表
   * @required openId 用户openid
   **/
  static getUserAssets(params) {
    return onlinePost('/userasset/assets', { params });
  }
}

export default UserApi;
