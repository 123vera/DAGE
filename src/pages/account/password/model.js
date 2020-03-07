import UserApi from '../../../services/api/user';

export default {
  namespace: 'password',
  state: {
    prefix: 86,
    phone: undefined,
    code: '',
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
    * ClearInput(_, { put }) {
      yield put({
        type: 'UpdateState', payload: {
          phone: undefined,
          code: '',
          password: '',
          passwordConfirm: '',
          captcha: '',
        },
      });
    },

    * GetCaptcha(_, { call, put }) {
      const captchaSrc = yield call(UserApi.getCaptcha, +new Date());
      yield put({ type: 'UpdateState', payload: { captchaSrc } });
    },

    * GetSmsCode({ payload }, { call, select }) {
      const state = yield select(state => state.password);
      const { prefix, phone, captcha } = state;
      return yield call(UserApi.sendSmsCode, {
        prefix,
        phone,
        imgcode: captcha,
        type: 'findpassword',
      });
    },

    * FindPassword(_, { call, select }) {
      const state = yield select(state => state.password);
      return yield call(UserApi.findPassword, {
        prefix: state.prefix,
        phone: state.phone,
        code: state.code,
      });
    },

    * EditPassword(_, { call, select }) {
      const state = yield select(state => state.password);
      return yield call(UserApi.editPassword, {
        password: state.password,
        passwordConfirm: state.passwordConfirm,
      });
    },
  },
};
