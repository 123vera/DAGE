import * as HomeService from '@/services/api/home';

export default {
  namespace: 'login',
  state: {
    prefix: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *Test({ payload }, { call }) {
      const res = yield call(HomeService.getUserInfoStatus, payload);
      console.log(res);
    },
    *Test2({ payload }, { call, put }) {
      yield put({ type: 'Test' });
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