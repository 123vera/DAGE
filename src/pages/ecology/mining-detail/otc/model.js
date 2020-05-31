import { OtcApi } from '../../../../services/api';

export default {
  namespace: 'otcMiningDetail',
  state: {
    dgcTotal: '',
    didTotal: '',
    otcList: [],
    hasMore: true,
    page: 1,
    row: 10,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *OtcDetail(_, { call, put, select }) {
      const { page, row, otcList } = yield select(state => state.otcMiningDetail);
      const res = yield call(OtcApi.otcDetail, { type: 'mining', page });
      if (res.status === 1) {
        res.data.list && otcList.push(...res.data.list);

        yield put({
          type: 'UpdateState',
          payload: {
            dgcTotal: res.data.rewardSumDgc,
            didTotal: res.data.rewardSumDid,
            otcList: res.data.list,
            page: page + 1,
            hasMore: row === res.data.list.length,
          },
        });
      }
      return res;
    },
    *OtcSubmit(_, { call, select }) {
      const { count, initInfo } = yield select(state => state.otcMining);
      return yield call(OtcApi.otcSubmit, { num: count, type: initInfo.type });
    },
  },
};
