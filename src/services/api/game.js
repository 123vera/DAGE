import { onlinePost } from '../utils';
import request from '../request';

class GameApi {
  /**
   * 获取游戏资产
   *
   * @required openId string
   **/
  static getGameAssets(options) {
    return onlinePost('/game/assets', options);
  }

  /**
   * 资金划转初始化
   *
   * @required openId string
   **/
  static transferInit(options) {
    return onlinePost('/game/transferini', options);
  }

  /**
   * 资金划转
   *
   * @required openId string
   * @required transfer string 划转方向，DToG：dage到游戏，GToD：游戏到dage
   * @required num number 数量
   * @required type string 币种类型
   **/
  static transfer(options) {
    return onlinePost('/game/transfer', options);
  }

  /**
   * 资金划转
   *
   * @required openId string
   * @required row string
   * @required page number
   **/
  static getTransferRecord(options) {
    return onlinePost('/game/transferlist', options);

    // return Promise.resolve({
    //   'status': 1,
    //   'msg': '操作成功',
    //   'data': {
    //     'transferlist': [
    //       {
    //         'user_id': 202747,
    //         'type': 'rc',
    //         'num': '10.00000000',
    //         'remark': 'DAGE账户到游戏账户',
    //         'addTime': 1586829784,
    //       }, {
    //         'user_id': 202747,
    //         'type': 'rc',
    //         'num': '10.00000000',
    //         'remark': 'DAGE账户到游戏账户',
    //         'addTime': 1586829784,
    //       },{
    //         'user_id': 202747,
    //         'type': 'rc',
    //         'num': '10.00000000',
    //         'remark': 'DAGE账户到游戏账户',
    //         'addTime': 1586829784,
    //       },{
    //         'user_id': 202747,
    //         'type': 'rc',
    //         'num': '10.00000000',
    //         'remark': 'DAGE账户到游戏账户',
    //         'addTime': 1586829784,
    //       }, {
    //         'user_id': 202747,
    //         'type': 'rc',
    //         'num': '10.00000000',
    //         'remark': 'DAGE账户到游戏账户',
    //         'addTime': 1586829784,
    //       },
    //     ],
    //   },
    // });
  }

  /**
   * 获取游戏列表
   *
   * @required openId string
   * @required row number 条数
   * @required page number 页数
   * @required type string 游戏类别
   **/
  static getGameList(options) {
    return onlinePost('/game/gamelist', options);
  }

  /**
   * 获取游戏地址
   *
   * @required openId string
   * @required gameId number 游戏ID
   **/
  static getGameUrl(options) {
    return onlinePost('/game/game', { gameid: options.gameId });
  }

  /**
   * 获取推荐游戏及Banner
   *
   **/
  static getRecommendgame(params) {
    return request.get('/game/recommendgame', { params });
  }

  /**
   * 游戏类别列表
   *
   **/
  static getTypelist(options) {
    return request.get('/game/typelist', options);
  }

  /**
   * 获取游戏地址
   * @required openId string
   * @required gameid string 游戏id
   *
   **/
  static getGameAddress(options) {
    return onlinePost('/game/game', options);
  }

  /**
   * 游戏矿池（正在挖矿、昨日团队收益）
   * @required openId string
   *
   **/
  static getRewardAndAurplus(options) {
    return onlinePost('/other/index', options);
  }

  /**
   * 获取游戏DGT法币提现初始化信息
   *
   * @required openId string
   **/
  static getDgtWithdrawInitInfo(options) {
    return onlinePost('/game/withdrawalini', options);
  }

  /**
   * 游戏DGT法币提现银行卡信息
   *
   * @required openId string
   * @required bankName string 银行名称
   * @required bankBranch string 支行名称
   * @required bankNo string  银行卡号
   * @required name string 姓名
   * @required num string 数量
   * @required code string 手机验证码
   **/
  static dgtWithdraw(options) {
    return onlinePost('/game/withdrawal', options);
  }

  /**
   * 游戏dgt法币提现记录
   *
   * @required openId string
   * @required page string 页码
   * @required row string 条数
   **/
  static dgtWithdrawRecord(options) {
    return onlinePost('/game/withdrawallist', options);
  }
}

export default GameApi;
