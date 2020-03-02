import { OtherApi } from '../../../services/api';
import { PAGE_SIZE } from '../../../utils/constants';

export default {
  namespace: 'notices',
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
    * GetNoticelist({ payload }, { call, select, put }) {
      const { page, row, list } = yield select(state => state.notices);
      const res = yield call(OtherApi.getNoticeList, { page, row });
      if (res.status === 1) {
        list.push(...res.data);
        yield put({
          type: 'UpdateState',
          payload: { list, page: page + 1, hasMore: row === res.data.length },
        });
      }
      console.log(res);
      return res;
    },
  },
};
