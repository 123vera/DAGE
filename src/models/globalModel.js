export default {
  namespace: 'globalModel',
  state: [],
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *Test({ payload }, { call }) {
      const res = yield call();
      console.log(res);
    },
  },
};
