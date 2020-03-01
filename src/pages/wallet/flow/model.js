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
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetAssetFlow({ payload }, { call }) {
      const res = yield call(AssetApi.getAssetFlow, payload);
      console.log(res);
      return res;
    },
  },
};
