import UserApi from '../services/api/user';

export default {
  namespace: 'globalModel',
  state: {
    myInfo: {},
    captcha: '',
    captchaSrc: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetCaptcha({ payload }, { call, put }) {
      const captchaSrc = yield call(UserApi.getCaptcha, +new Date());
      yield put({ type: 'UpdateState', payload: { captchaSrc } });
    },

    * GetSmsCode({ payload = {} }, { call, select }) {
      const { myInfo, captcha } = yield select(state => state.globalModel);
      return yield call(UserApi.sendSmsCode, {
        prefix: payload.prefix || myInfo.phonePrefix,
        phone: payload.phone || myInfo.phoneNo,
        imgcode: captcha,
        type: payload.type,
      });
    },

    * GetMyInfo({ payload }, { call, put }) {
      const res = yield call(UserApi.getMyInfo, payload);
      if (res && res.status !== 1) return;
      yield put({
        type: 'UpdateState',
        payload: { myInfo: res && res.data },
      });
    },
  },

  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        const list = ['/home/user', '/wallet/recharge', '/wallet/withdraw'];
        list.forEach(i => {
          if (location.pathname.includes(i)) {
            // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
            dispatch({ type: 'GetMyInfo' });
          }
        });
      });
    },
  },
};
