import UserApi from '../../../services/api/user';

export default {
  namespace: 'promotion',
  state: {
    teamLevelOtc: 0,
    achievement: {},
    teamLevel: 0,
    teamCount: 0,
    recommendCount: 0,
    mystatus: null,
    page: 1,
    row: 10,
    hasMore: false,
    list: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetRecommendList(_, { call, select, put }) {
      const { page, list } = yield select(state => state.promotion);
      const res = yield call(UserApi.getRecommendList, { page });
      if (res && res.status === 1) {
        const {
          mystatus,
          achievement,
          recommendCount,
          teamCount,
          teamLevel,
          pageCount,
          currentPage,
          teamLevelOtc,
        } = res.data;
        list.push(...res.data.list);
        yield put({
          type: 'UpdateState',
          payload: {
            list,
            page: page + 1,
            hasMore: pageCount > currentPage,
            recommendCount,
            teamCount,
            teamLevel,
            achievement,
            mystatus,
            teamLevelOtc,
          },
        });
      }
      return res;
    },
  },
  subscriptions: {},
};
