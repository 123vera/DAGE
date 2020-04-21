import { AssetApi } from '../../../services/api';

export default {
  namespace: 'walletFlow',
  state: {
    type: '',
    hasMore: true,
    page: 1,
    row: 10,
    balance: '',
    price: '',
    list: [],
    typeList: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetAssetFlow(_, { call, select, put }) {
      const { type, page, row, list } = yield select(state => state.walletFlow);
      const res = yield call(AssetApi.getAssetFlow, {
        type,
        page,
        row,
      });
      if (res.status === 1) {
        list.push(...res.data.list);
        yield put({
          type: 'UpdateState',
          payload: {
            balance: res.data.balance,
            type: type || res.data.typeList[0],
            list,
            // typeList: res.data && res.data.typeList,
            page: page + 1,
            hasMore: row === res.data.list.length,
          },
        });
      }
      return res;
    },
  },
};
