import * as HomeService from '@/services/api/home';
import { AccountApi } from '../../../services/api';

export default {
  namespace: 'register',
  state: {
    prefix: 86,
    phone: 18368095040 || undefined,
    code: undefined,
    password: '',
    passwordConfirm: '',
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
    * Test({ payload }, { call }) {
      const res = yield call(HomeService.getUserInfoStatus, payload);
      console.log(res);
    },

    * GetCaptcha({ payload }, { call, put }) {
      const captchaKey = payload;
      const captchaSrc = yield call(AccountApi.getCaptcha, captchaKey);
      yield put({ type: 'UpdateState', payload: { captchaSrc, captchaKey } });
    },

    * GetSmsCode({ payload }, { call, select }) {
      const captchaKey = yield select(state => state.register.captchaKey);
      return yield call(AccountApi.sendSmsCode, payload, captchaKey);
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
