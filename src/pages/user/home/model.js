export default {
  namespace: 'userCenter',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(() => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        // dispatch({ type: 'GetUser' });
      });
    },
  },
};
