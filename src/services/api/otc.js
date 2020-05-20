import { onlinePost, optionsToLine } from '../utils';

class OtcApi {
  /**
   * 上传支付宝信息初始化
   *
   * @required openId 用户openid
   **/
  static alipayInit() {
    return onlinePost('/otc/rmbpayini');
  }

  /**
   * 上传支付宝信息
   *
   * @required openId 用户openid
   * @required payName 支付宝账号
   * @required realName 真实姓名
   * @required payImg  收款二维码
   **/
  static alipayUpload(options) {
    return onlinePost('/otc/rmbpay', options, {
      transformRequest: [
        data => {
          data = optionsToLine(data);
          let formData = new FormData();
          for (const key of Object.keys(data)) {
            formData.append(key, data[key]);
          }
          return formData;
        },
      ],
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  /**
   * OTC 初始化
   *
   * @required openId 用户openid
   **/
  static otcInit(options) {
    return onlinePost('/otc/otcini', options);
  }

  /**
   * 提交OTC
   *
   * @required openId 用户openid
   * @required num 数量
   * @required type 币种
   **/
  static otcSubmit(options) {
    return onlinePost('/otc/otc', options);
  }

  /**
   * otc挖矿详情（otc挖矿内页点击）
   *
   * @required openId 用户openid
   * @required page 页码
   * @required row string 每页条数
   **/
  static otcDetails(options) {
    return onlinePost('/otc/otcdetails', options);
  }

  /**
   * OTC 挖矿详情（收益详情、明细 接口）(旧版，部分仍在用，otc挖矿详情有新的接口)
   * @required openId 用户openid
   * @required page 页码
   * @required type 推荐奖励：activate 、挖矿奖励：mining
   **/
  static otcDetail(options) {
    // return onlinePost('/otc/otclist', options);
    return onlinePost('/userasset/rewardlist', options);
    // return onlinePost('/otc/rmbwithdrawallist', options);
    // return Promise.resolve({
    //   status: 1,
    //   msg: '操作成功',
    //   data: {
    //     utotal: 0,
    //     rtotal: 0,
    //     lasttime: 1587917035 + 1000,
    //     ratio: 100,
    //     list: [
    //       {
    //         type: 'dgt',
    //         num: '100.00000000',
    //         remark: '参与挖矿',
    //         addTime: 1587566804,
    //       },
    //       {
    //         type: 'dgt',
    //         num: '100.00000000',
    //         remark: '参与挖矿',
    //         addTime: 1587566712,
    //       },
    //     ],
    //   },
    // });
  }
}

export default OtcApi;
