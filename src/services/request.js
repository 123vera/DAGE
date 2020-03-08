import axios from 'axios';
// import { getLocale } from 'umi/locale';
// import { getCookie } from '@/utils/utils';
import { getApiBaseUrl, optionsToLine, optionsToHump, getHumpData } from './utils';
import qs from 'qs';
import { Toast } from 'antd-mobile';
import { router } from 'umi';

// 对所有 axios 请求做处理
// axios.defaults.withCredentials = true;

const Request = axios.create({
  timeout: 9000,
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 'Content-Type': 'application/json;charset=UTF-8',
    // lang: getLocale() || 'ZH_CN',
  },
  // baseURL: '/api',
  withCredentials: true,
  transformRequest: [
    data => {
      if (!data) return data;
      return qs.stringify(optionsToLine(data));
      // return optionsToLine(data);
    },
  ], // 对data进行转换处理
});

// 拦截请求
Request.interceptors.request.use(
  async config => {
    // 设置请求头
    // config.headers.lang = getLocale() || 'ZH_CN';
    return config;
  },
  err => Promise.reject(err),
);

// 拦截响应
Request.interceptors.response.use(
  res => {
    const { data } = res;
    // const config = res.config;
    // const apiArr = config.url.substr(config.url.indexOf('://') + 3).split('/');
    // apiArr[0] = '';
    // const api = apiArr.join('/');
    //
    // // 把 headers 的内容写进响应里
    // res.data.headers = { ...headers };
    //
    // // 处理登录过期
    // if (data.status === -2 && api !== '/api/sign_out') {
    //   Toast.error(data.msg);
    // }
    console.log(res);

    // 处理未登录
    if (data.status === -101) {
      Toast.fail('请先登录', 2, () => router.push('/login'));
      return Promise.reject(data);
    }

    // 对下划线转驼峰进行处理
    if (data.data) {
      const isArr = data.data instanceof Array;
      if (isArr) {
        data.data = data.data.map(i => optionsToHump(i));
        return data;
      }
      data.data = getHumpData(data.data);
    }

    return data;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  },
);

export default Request;
