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
   * 游戏列表
   * @required openId string
   * @required type string 游戏类别
   * @required page number 页码
   * @required row number 条数
   *
   **/
  static getGamelist(options) {
    // return request.get('/game/gamelist', { params });
    return onlinePost('/game/gamelist', options);
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
}

export default GameApi;
