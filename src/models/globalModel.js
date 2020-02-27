import UserApi from '../services/api/user';

export default {
  namespace: 'globalModel',
  state: {
    myInfo: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetMyInfo({ payload }, { call, put }) {
      const res = yield call(UserApi.getMyInfo, payload);
      if (res && res.status !== 1) return;
      yield put({
        type: 'UpdateState',
        payload: { myInfo: res && res.data },
      });
    },
  },

  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        console.log(location);
        const list = ['/home/user'];
        list.forEach(i => {
          if (location.pathname === i) {
            // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
            dispatch({ type: 'GetMyInfo' });
          }
        });
      });
    },
  },
};
