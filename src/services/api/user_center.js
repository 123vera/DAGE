// import { onlinePost } from '../utils';

class UserCenterApi {
  /**
   * 系统消息
   * @required openId 用户openid
   * @required page 页码
   * @required row 条数
   **/
  static getMessages(options) {
    // return onlinePost('/otc/buyotclist', options);
    let data = [];
    for (let i = options.row; i > 0; i--) {
      data.push({
        id: +new Date() + i,
        addTime: 1587566804,
        title: '尊敬的用户您好，您已获得DAGE德州扑克门 票购买资格！',
      });
    }
    return Promise.resolve({
      status: 1,
      msg: '操作成功',
      data,
    });
  }

  /**
   * 获取下载列表
   * @required openId 用户openid
   * @required page 页码
   * @required row 条数
   **/
  static getDownloadList(options) {
    // return onlinePost('/otc/buyotclist', options);
    let data = [];
    for (let i = options.row; i > 0; i--) {
      data.push({
        id: +new Date() + i,
        addTime: 1587566804,
        title: '尊敬的用户您好，您已获得DAGE德州扑克门 票购买资格！',
      });
    }
    return Promise.resolve({
      status: 1,
      msg: '操作成功',
      data,
    });
  }
}

export default UserCenterApi;
