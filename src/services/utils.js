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

