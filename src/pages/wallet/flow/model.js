export default {
  namespace: 'walletFlow',
  state: [],
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *Test2(_, { put }) {
      yield put({ type: 'Test2' });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        dispatch({ type: 'Test2' });
      });
    },
  },
};
