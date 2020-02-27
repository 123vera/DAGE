import { UserApi } from '../../services/api';

export default {
  namespace: 'wallet',
  state: {
    userInfo: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetUserInfo(_, { call, put }) {
      const res = yield call(UserApi.getMyInfo);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { userInfo: res.data } });
      }
      return res;
    },
    *Test2(_, { put }) {
      yield put({ type: 'Test' });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        dispatch({ type: 'Test' });
      });
    },
  },
};
