import Cookies from 'js-cookie';
import request from './request';

/**
 * @description 隐藏联系客服按钮
 * @returns {void}
 */

export function hideChatButton() {
  let iframes = document.querySelectorAll('iframe');
  const len = iframes.length || 0;
  if (len <= 0) return;
  for (let i = 0; i < len; i++) {
    let win = iframes[i].contentWindow;
    let button = win.document.querySelector('#Embed');
    if (button) {
      button.style.display = 'none';
    }
  }
}

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
  console.log(options);

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
    Object.keys(data).map(key => {
      const newKey = key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
      result[newKey] = getHumpData(data[key]);
    });
    return result;
  }
  return data;
}

getHumpData({
  status: 1,
  msg: '登录成功',
  data: {
    account_token: 'AC_21f45023d884fc0015cec8b0e38e2dc0',
    user_list: [
      {
        user_id: 5,
        user_name: 'test1234',
      },
      {
        user_id: 6,
        user_name: 'test12345',
      },
      {
        user_id: 7,
        user_name: 'test123456',
      },
      {
        user_id: 8,
        user_name: '18368095040',
      },
    ],
  },
});
