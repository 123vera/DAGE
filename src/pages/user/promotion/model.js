import UserApi from '../../../services/api/user';

export default {
  namespace: 'promotion',
  state: {
    teamLevel: null,
    page: 1,
    row: 10,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // getRecommendList
    *GetNoticeList(_, { call, select, put }) {
      const { page } = yield select(state => state.promotion);
      const res = yield call(UserApi.getRecommendList, { page });
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: { teamLevel: res.data.teamLevel },
        });
      }
      return res;
    },
  },
  subscriptions: {},
};
