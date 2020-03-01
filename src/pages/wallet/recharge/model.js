import { AssetApi } from '../../../services/api';

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
      const res = yield call(AssetApi.getAssetFlow, payload);
      console.log(res);
      return res;
    },
  },
};
