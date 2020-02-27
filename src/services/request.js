import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getCookie } from '@/utils/utils';
import { getApiBaseUrl, optionsToLine, optionsToHump, getHumpData } from './utils';
import qs from 'qs';

const Request = axios.create({
  timeout: 9000,
  baseURL: getApiBaseUrl(),
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    // 'Content-Type': 'application/json;charset=UTF-8',
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
  config => {
    // 设置请求头
    // config.headers.lang = config.headers.lang || getCookie('DGC.language') || '';
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

    // 处理未登录
    // if (data.status === -101) {
    //   Toast.fail(data.msg);
    //   return;
    // }

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
  err => Promise.reject(err),
);

export default Request;
