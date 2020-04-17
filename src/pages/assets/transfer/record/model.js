import { PAGE_SIZE } from '../../../../utils/constants';
import { GameApi } from '../../../../services/api';

export default {
  namespace: 'transferRecord',
  state: {
    hasMore: true,
    list: [],
    page: 1,
    row: PAGE_SIZE,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetTransferRecord(_, { call, select, put }) {
      const { page, row, list } = yield select(state => state.transferRecord);
      const res = yield call(GameApi.getTransferRecord, { page, row });
      if (res.status === 1) {
        const newList = res.data.transferlist;

        list.push(...newList);
        yield put({
          type: 'UpdateState',
          payload: { list, page: page + 1, hasMore: row === newList.length },
        });
      }
      return res;
    },
  },
};
