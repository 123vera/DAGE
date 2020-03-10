import { UserApi } from '../../../services/api';

export default {
  namespace: 'register',
  state: {
    prefix: '',
    phone: '',
    code: '',
    password: '',
    passwordConfirm: '',
    captcha: '',
    captchaKey: +new Date(),
    captchaSrc: '',
    agree: false,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetCaptcha({ payload }, { call, put }) {
      const captchaKey = payload;
      const captchaSrc = yield call(UserApi.getCaptcha, captchaKey);
      yield put({ type: 'UpdateState', payload: { captchaSrc, captchaKey } });
    },

    * GetSmsCode({ payload }, { call, select }) {
      const captchaKey = yield select(state => state.register.captchaKey);
      return yield call(UserApi.sendSmsCode, payload, captchaKey);
    },

    * Register(_, { call, select }) {
      const register = yield select(state => state.register);
      const res = yield call(UserApi.existPhone, {
        prefix: register.prefix,
        phone: register.phone,
      });
      if (res.status !== 1) return res;
      return yield call(UserApi.register, {
        prefix: register.prefix,
        phone: register.phone,
        code: register.code,
        password: register.password,
        passwordConfirm: register.passwordConfirm,
      });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        // dispatch({ type: 'Test' });
      });
    },
  },
};
