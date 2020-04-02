import Cookies from 'js-cookie';
import request from './request';

export function getOpenId() {
  return Cookies.get('OPENID');
}

export function getAccountToken() {
  return Cookies.get('ACCOUNT_TOKEN');
}

export function getApiBaseUrl() {
  // 本地
  if (window.location.href.includes('localhost')) {
    return 'http://47.75.3.2:82/api';
  }
  // 生产环境
  if (window.location.href.includes('https://wallet.thedage.com')) {
    return 'https://api.thedage.com/api';
  }

  // 测试环境
  return 'http://47.75.3.2:82/api';
}

export function onlinePost(path, options = {}, config = {}) {
  return request.post(path, { ...options, openId: getOpenId() }, config);
}

export function onlineGet(path, params = {}) {
  params.openId = getOpenId();
  return request.get(path, { ...params });
}

// 下划线转驼峰
export function optionsToHump(options) {
  const result = {};
  Object.keys(options).forEach(key => {
    const newKey = key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
    result[newKey] = options[key];
  });
  return result;
}

// 驼峰转换下划线
export function optionsToLine(options) {
  const result = {};
  Object.keys(options).forEach(key => {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[newKey] = options[key];
  });
  return result;
}

export function getHumpData(data) {
  if (data instanceof Array) {
    return data.map(item => {
      return getHumpData(item);
    });
  }
  if (data instanceof Object) {
    const result = {};
    Object.keys(data).forEach(key => {
      const newKey = key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
      result[newKey] = getHumpData(data[key]);
    });
    return result;
  }
  return data;
}
