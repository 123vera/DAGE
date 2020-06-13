import {HomeApi} from '../../../services/api';

export default {
  namespace: 'fabiRecord',
  state: {
    type: '',
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
    *RmbRechargeRecord(_, { call, select, put }) {
      const { page, row, list } = yield select(state => state.fabiRecord);
      const res = yield call(HomeApi.rmbRechargeRecord, {  page, row });
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
