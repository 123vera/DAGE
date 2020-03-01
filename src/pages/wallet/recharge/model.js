import { AssetApi, UserApi } from '../../../services/api';

export default {
  namespace: 'recharge',
  state: {
    coin: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetAssetFlow({ payload }, { call }) {
      return yield call(AssetApi.getAssetFlow, payload);
    },

    * GetMyWallet({ payload }, { call }) {
      const res = yield call(UserApi.getMyWallet, payload);
      console.log(res);
      return res;
    },
  },
};
