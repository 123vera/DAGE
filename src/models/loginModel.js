import Cookies from 'js-cookie';
import { UserApi } from '../services/api';

export default {
  namespace: 'login',
  state: {
    prefix: '',
    phone: undefined,
    password: '',

    userName: '',
    recommendCode: '',

    accountToken: '',
    userId: undefined,
    userList: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *Login(_, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(UserApi.login, {
        prefix: login.prefix,
        phone: login.phone,
        password: login.password,
      });
    },

    *GetUserList(_, { call, select, put }) {
      const login = yield select(state => state.login);
      const res = yield call(UserApi.getUserList, {
        accountToken: login.accountToken || Cookies.get('ACCOUNT_TOKEN'),
      });
      if (res.status === 1) {
        const userId = Number(Cookies.get('USER_ID'));
        const user = res.data.find(i => i.userId === userId) || res.data[0] || {};
        yield put({ type: 'UpdateState', payload: { userList: res.data, userId: user.userId } });
        Cookies.set('USER_ID', user.userId);
      }
      return res;
    },

    *SelectUser(_, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(UserApi.selectUser, {
        accountToken: login.accountToken || Cookies.get('ACCOUNT_TOKEN'),
        userId: login.userId,
      });
    },

    *AddUser({ _ }, { call, select }) {
      const login = yield select(state => state.login);
      return yield call(UserApi.addRole, {
        accountToken: login.accountToken || Cookies.get('ACCOUNT_TOKEN'),
        userName: login.userName,
        recommendCode: login.recommendCode,
      });
    },
  },
};
