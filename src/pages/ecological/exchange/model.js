import AssetApi from '../../../services/api/asset';
import UserApi from '../../../services/api/user';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'exchange',
  state: {
    amount: '',
    smsCode: '',
    balance: '',
    team: [],
    exini: {},
    captcha: '',
    captchaKey: +new Date(),
    captchaSrc: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetCaptcha({ payload }, { call, put }) {
      const captchaKey = payload;
      const captchaSrc = yield call(UserApi.getCaptcha, captchaKey);
      yield put({ type: 'UpdateState', payload: { captchaSrc, captchaKey } });
    },
    *GetSmsCode({ payload }, { call, select }) {
      const captchaKey = yield select(state => state.exchange.captchaKey);
      return yield call(UserApi.sendSmsCode, payload, captchaKey);
    },
    *SetExchangeInit({ payload }, { call, put }) {
      const res = yield call(AssetApi.setExchangeInit, payload);
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      yield put({
        type: 'UpdateState',
        payload: {
          balance: res.data && res.data.balance,
          exini: res.data && res.data.exini,
          team: res.data && res.data.team,
          amount: '',
          smsCode: '',
          captcha: '',
        },
      });
    },
    *SubmitExchange({ payload }, { call }) {
      yield call(AssetApi.submitExchange, payload);
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(() => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        dispatch({ type: 'SetExchangeInit' });
        dispatch({ type: 'GetCaptcha' });
      });
    },
  },
};
