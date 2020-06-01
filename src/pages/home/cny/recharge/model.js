import AssetApi from '../../../../services/api/asset';

export default {
  namespace: 'cnyRecharge',
  state: {
    amount: '',
    amountOptions: [],
    minAmount: 0,
    maxAmount: 100000,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetRmbIni({ payload }, { call, put }) {
      const res = yield call(AssetApi.getRmbIni, payload);
      if (res.status === 1) {
        const { recommendnum, ratio, MIN, MAX } = res.data;
        const amountOptions = (recommendnum && recommendnum.split(',')) || [];
        yield put({
          type: 'UpdateState',
          payload: {
            ratio,
            amountOptions,
            amount: amountOptions[0],
            minAmount: Number(MIN),
            maxAmount: Number(MAX),
          },
        });
      }
    },
    *RmbRecharge(_, { call, select }) {
      const { amount } = yield select(state => state.cnyRecharge);
      return yield call(AssetApi.rmbRecharge, { num: amount });
    },
  },
};
