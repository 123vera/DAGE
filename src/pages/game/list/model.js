export default {
  namespace: 'gameList',
  state: {
    list: [...Array.from({ length: 3 })],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
