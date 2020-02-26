import Cookies from 'js-cookie';
import { AccountApi } from '../services/api';

export default {
  namespace: 'login',
  state: {
    prefix: 86,
    phone: undefined,
    password: '',

    userName: '',
    recommendCode: '',

    accountToken: '',
    userId: undefined,
    userList: null,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *Login(_, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(AccountApi.login, {
        prefix: login.prefix,
        phone: login.phone,
        password: login.password,
      });
    },

    *SelectUser(_, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(AccountApi.selectUser, {
        accountToken: login.accountToken || Cookies.get('ACCOUNT_TOKEN'),
        userId: login.userId,
      });
    },

    *AddUser({ payload }, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(AccountApi.addRole, {
        accountToken: login.accountToken || Cookies.get('ACCOUNT_TOKEN'),
        userName: login.userName,
        recommendCode: login.recommendCode,
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
