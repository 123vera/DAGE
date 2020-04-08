export default {
  namespace: 'dgtPay',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
