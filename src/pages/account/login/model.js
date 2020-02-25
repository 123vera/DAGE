import { AccountApi } from '../../../services/api';

export default {
  namespace: 'login',
  state: {
    prefix: 86,
    phone: undefined,
    password: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * Login({ payload }, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(AccountApi.login, {
        prefix: login.prefix,
        phone: login.phone,
        password: login.password,
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
