import { GameApi } from '../../../services/api';
import { PAGE_SIZE } from '../../../utils/constants';

export default {
  namespace: 'gameList',
  state: {
    type: '',
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
    * GetGameList(_, { call, select, put }) {
      const { type,page, row, list } = yield select(state => state.gameList);
      const res = yield call(GameApi.getGameList, { type,page, row });
      if (res.status === 1) {
        const newList = res.data.list;
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
