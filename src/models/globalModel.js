import UserApi from '../services/api/user';
import AssetApi from '../services/api/asset';

export default {
  namespace: 'globalModel',
  state: {
    myInfo: {},
    captcha: '',
    captchaSrc: '',
    coinTeams: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetCaptcha({ _ }, { call, put }) {
      const captchaSrc = yield call(UserApi.getCaptcha, +new Date());
      yield put({ type: 'UpdateState', payload: { captchaSrc } });
    },

    *GetSmsCode({ payload = {} }, { call, select }) {
      const { myInfo, captcha } = yield select(state => state.globalModel);
      return yield call(UserApi.sendSmsCode, {
        prefix: payload.prefix || myInfo.phonePrefix,
        phone: payload.phone || myInfo.phoneNo,
        imgcode: captcha,
        type: payload.type,
      });
    },

    *GetMyInfo({ payload }, { call, put }) {
      const res = yield call(UserApi.getMyInfo, payload);
      if (res && res.status !== 1) return;
      yield put({
        type: 'UpdateState',
        payload: { myInfo: res && res.data },
      });
    },

    *ExchangeInit({ _ }, { call, put }) {
      const res = yield call(AssetApi.exchangeInit);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: {
            coinTeams: res.data.team,
          },
        });
      }
      return res;
    },
  },

  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        const list = [
          '/home/wallet',
          '/home/user',
          '/wallet/recharge',
          '/wallet/withdraw',
          '/exchange',
          '/reset_password/verify',
          '/referral_code',
          // '/wallet/reward-detail',
        ];
        list.forEach(i => {
          if (location.pathname === i) {
            // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
            dispatch({ type: 'GetMyInfo' });
          }
        });
      });
    },
  },
};
