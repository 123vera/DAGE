import { AssetApi } from '../../../services/api';

export default {
  namespace: 'walletFlow',
  state: {
    coin: {},
    hasMore: true,
    page: 1,
    row: 10,
    balance: '',
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
      const { coin, page, row, list } = yield select(state => state.walletFlow);
      // const res = yield call(AssetApi.getAssetFlow);
      const res = yield call(AssetApi.getAssetFlow, {
        type: coin ? coin.value : '',
        page,
        row,
      });
      if (res.status === 1) {
        list.push(...res.data.list);
        yield put({
          type: 'UpdateState',
          payload: {
            balance: res.data.balance,
            list,
            typeList: res.data && res.data.typeList,
            page: page + 1,
            hasMore: row === res.data.list.length,
          },
        });
      }
      return res;
    },
  },
};
