// import GameApi from '../../../services/api/game';

export default {
  namespace: 'gameList',
  state: {
    list: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // *GetGamelist({ payload }, { call, put }) {
    //   const res = yield call(GameApi.getGamelist, payload);
    //   if (res.status === 1) {
    //     const { list } = res.data;
    //     yield put({
    //       type: 'UpdateState',
    //       payload: {
    //         list,
    //       },
    //     });
    //   }
    // },
  },
};
