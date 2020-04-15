export default {
  namespace: 'game',
  state: {
    gameList: [...Array.from({ length: 3 })],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {},
};
