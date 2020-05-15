export default {
  namespace: 'fabiPay',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
