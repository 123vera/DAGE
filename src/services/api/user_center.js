import { onlinePost } from '../utils';

class UserCenterApi {

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
  }

  /**
   * 用户资产列表
   * @required openId 用户openid
   **/
  static getUserAssets(params) {
    return onlinePost('/userasset/assets', { params });
  }

  /**
   * 系统消息
   * @required openId 用户openid
   * @required page 页码
   * @required row 条数
   **/
  static getMessages(options) {
    return onlinePost('/other/sysmessage', options);
    // let data = [];
    // for (let i = options.row; i > 0; i--) {
    //   data.push({
    //     id: +new Date() + i,
    //     addTime: 1587566804,
    //     title: '尊敬的用户您好，您已获得DAGE德州扑克门 票购买资格！',
    //   });
    // }
    // return Promise.resolve({
    //   status: 1,
    //   msg: '操作成功',
    //   data,
    // });
  }

  /**
   * 获取下载列表
   * @required openId 用户openid
   * @required page 页码
   * @required row 条数
   **/
  static getDownloadList(options) {
    return onlinePost('/other/download', options);
    // let data = [];
    // for (let i = options.row; i > 0; i--) {
    //   data.push({
    //     id: +new Date() + i,
    //     addTime: 1587566804,
    //     title: '尊敬的用户您好，您已获得DAGE德州扑克门 票购买资格！',
    //   });
    // }
    // return Promise.resolve({
    //   status: 1,
    //   msg: '操作成功',
    //   data,
    // });
  }
}

export default UserCenterApi;
