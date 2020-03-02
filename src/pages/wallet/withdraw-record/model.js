import { AssetApi } from '../../../services/api';

export default {
  namespace: 'withdrawRecord',
  state: {
    type: 'dgt',
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
    * GetWithdrawRecord({ payload }, { call, select, put }) {
      const { type, page, row, list } = yield select(state => state.withdrawRecord);
      const res = yield call(AssetApi.getWithdrawRecord, { type, page, row });
      if (res.status === 1) {
        list.push(...res.data);
        yield put({
          type: 'UpdateState',
          payload: { list, page: page + 1, hasMore: row === res.data.length },
        });
      }
      return res;
    },
  },
};
