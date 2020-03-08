import Request from '../request';

class OtherApi {
  /**
   * 获取公告列表
   *
   * @required page number 页码
   * @required row number 每页条数
   **/
  static getNoticeList(options) {
    return Request.post('/other/noticelist', options);

    // const data = [];
    // const order = (options.page - 1) * options.row;
    // for (let i = order; i < options.row + order; i++) {
    //   data.push({
    //     id: i,
    //     title: '测试上线' + i,
    //     linkUrl: 'https://goldsands.zendesk.com/hc/zh-cn/articles/360040170553-%E9%87%91%E6%B2%99%E5%95%86%E5%9F%8E%E6%AD%A3%E5%BC%8F%E4%B8%8A%E7%BA%BF%E7%9A%84%E5%85%AC%E5%91%8A',
    //     content: '',
    //     addTime: +new Date(),
    //   });
    // }
    // return new Promise(resolve => setTimeout(() => resolve({ status: 1, data }), 500));
  }

  /**
   * 语言切换
   *
   * @required lang string 语言包名称，zh-cn（默认）、en-us
   **/
  static setlang(params) {
    return Request.get('/other/setlang', { params });
  }
}

export default OtherApi;
