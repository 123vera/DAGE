import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'dgtRecord',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *RmbRecharge({ payload }, { call, select }) {
      // const { amount } = yield select(state => state.dgtRecharge);
      // return yield call(AssetApi.rmbRecharge, { num: amount });
    },
  },
};
