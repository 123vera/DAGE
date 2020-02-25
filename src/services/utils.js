import Cookies from 'js-cookie';
import request from './request';

export function getOpenId() {
  return Cookies.get('OPENID');
}

export function getToken() {
  return Cookies.get('TOKEN');
}

export function getApiBaseUrl() {
  if (window.location.href.includes('localhost')) {
    return 'http://47.75.3.2:82/api';
  }

  return 'http://47.75.3.2:82/api';
}

export function onlinePost(path, options = {}) {
  return request.post(path, { ...options, openId: getOpenId() });
}

export function onlineGet(path, params = {}) {
  return request.get(path, { ...params, openId: getOpenId() });
}

// 下划线转驼峰
export function optionsToHump(options) {
  const result = {};
  Object.keys(options).forEach(key => {
    const newKey = key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
    result[newKey] = options[key]
  });
  return result
}

// 驼峰转换下划线
export function optionsToLine(options) {
  const result = {}
  Object.keys(options).forEach(key => {
    const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
    result[newKey] = options[key]
  });
  return result
}
