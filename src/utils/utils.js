import Cookies from 'js-cookie';
import { REG } from './constants';

/**
 * @description query传参获取对应参数
 * @returns {key} 要查找的字段名
 * @returns {string} 返回值
 */
export const getQueryParam = key => {
  const reg = new RegExp('(^|&| )' + key + '=([^&]*)(&|$)', 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r !== null) {
    return decodeURI(r[2]);
  }
  return null;
};

/**
 * @description 验证 IP 地址
 * @param {string} str 待验证的字符串
 * @returns {boolean} true 为真，false 为假
 */
export const isIP = (str = '') => REG.IP.test(str);

/**
 * @description 获取 Cookie
 * @param {string} key Cookie 的键
 * @param {object} config 配置选项
 * @returns {string}
 */
const _getCookie = key => Cookies.get(key);

export const getCookie = _getCookie;

/**
 * @description 设置 Cookie
 * @param {string} key Cookie 的键
 * @param {string} value Cookie 的值
 * @param {object} config 配置选项
 */
export const setCookie = (key = '', value = '', config = {}) => {
  const { hostname = '' } = window.location;
  let domain = isIP(hostname)
    ? hostname
    : hostname
        .split('.')
        .slice(-2)
        .join('.');
  Cookies.set(key, value, { path: '/', domain: domain, ...config });
  Cookies.set(key, value, { path: '/', domain: '.' + domain, ...config });
};

/**
 * @description 删除 Cookie
 * @param {string} key Cookie 的键
 * @param {string} value Cookie 的值
 * @param {object} config 配置选项
 */
export const removeCookie = (key = '', config = {}) => {
  const { hostname = '' } = window.location;
  let domain = isIP(hostname)
    ? hostname
    : hostname
        .split('.')
        .slice(-2)
        .join('.');

  let keyArr = [];
  if (Array.isArray(key)) {
    keyArr = key;
  } else {
    keyArr = [key];
  }

  keyArr.forEach(item => {
    Cookies.remove(item, { path: '/', domain: domain, ...config });
    Cookies.remove(item, { path: '/', domain: '.' + domain, ...config });
  });
};

/**
 * @description 清空 Cookie
 * @param {object} config 配置选项
 */
export const clearCookie = (config = {}) => {
  const { hostname = '' } = window.location;
  let domain = isIP(hostname)
    ? hostname
    : hostname
        .split('.')
        .slice(-2)
        .join('.');

  Object.keys(Cookies.get()).forEach(key => {
    Cookies.remove(key, { path: '/', domain: domain, ...config });
    Cookies.remove(key, { path: '/', domain: '.' + domain, ...config });
  });
};
