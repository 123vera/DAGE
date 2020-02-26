import AccountApi from '../../../services/api/account';

export default {
  namespace: 'password',
  state: {
    prefix: 86,
    phone: 18368095040 || undefined,
    code: undefined,
    password: '',
    passwordConfirm: '',
    captcha: '',
    captchaSrc: '',
    type: 'find_password',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetCaptcha(_, { call, put }) {
      const captchaSrc = yield call(AccountApi.getCaptcha, +new Date());
      yield put({ type: 'UpdateState', payload: { captchaSrc } });
    },

    * GetSmsCode({ payload }, { call, select }) {
      const state = yield select(state => state.password);
      const { prefix, phone, captcha } = state;
      return yield call(AccountApi.sendSmsCode, {
        prefix,
        phone,
        imgcode: captcha,
        type: 'findpassword',
      });
    },

    * FindPassword(_, { call, select }) {
      const state = yield select(state => state.password);
      return yield call(AccountApi.findPassword, {
        prefix: state.prefix,
        phone: state.phone,
        code: state.code,
        password: state.password,
        passwordConfirm: state.passwordConfirm,
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
