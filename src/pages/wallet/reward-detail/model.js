import { AssetApi } from '../../../services/api';

export default {
  namespace: 'rewardDetail',
  state: {
    hasMore: true,
    page: 1,
    row: 10,
    list: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetReward({ payload }, { call, select, put }) {
      const { page, row, list } = yield select(state => state.rewardDetail);
      const res = yield call(AssetApi.getRewardList, { page, row });
      if (res.status === 1) {
        list.push(...res.data.list);
        yield put({
          type: 'UpdateState',
          payload: {
            list,
            page: page + 1,
            hasMore: row === res.data.list.length,
          },
        });
      }
      return res;
    },
  },
};
