import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'dgtRecord',
  state: {
    type: 'DGT',
    page: 1,
    row: 10,
    list: [],
    hasMore: true,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * RmbRechargeRecord(_, { call, select, put }) {
      const { type, page, row, list } = yield select(state => state.dgtRecord);
      const res = yield call(AssetApi.rmbRechargeRecord, { type, page, row });
      if (res.status === 1) {
        list.push(...res.data);
        yield put({
          type: 'UpdateState',
          payload: {
            list,
            page: page + 1,
            hasMore: row === res.data.length,
          },
        });
      }
      return res;
    },
  },
};
