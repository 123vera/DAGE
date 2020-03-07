
export default {
  namespace: 'referralCode',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},
};
