import axios from 'axios';
import { Toast } from 'antd-mobile';
import { getCookie } from '@/utils/utils';

const Request = axios.create({
  timeout: 10 * 1000,
});

// 拦截请求
Request.interceptors.request.use(
  config => {
    // 设置请求头
    config.headers.lang = config.headers.lang || getCookie('DGC.language') || '';
    return config;
  },
  err => Promise.reject(err),
);

// 拦截响应
Request.interceptors.response.use(
  res => {
    const { headers, data } = res;
    const config = res.config;
    const apiArr = config.url.substr(config.url.indexOf('://') + 3).split('/');
    apiArr[0] = '';
    const api = apiArr.join('/');

    // 把 headers 的内容写进响应里
    res.data.headers = { ...headers };

    // 处理登录过期
    if (data.status === -2 && api !== '/api/sign_out') {
      Toast.error(data.msg);
    }

    return res;
  },
  err => Promise.reject(err),
);

export default Request;
