import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'dgtRecharge',
  state: {
    amount: '',
    amountOptions: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetRmbIni({ payload }, { call, put }) {
      const res = yield call(AssetApi.getRmbIni, payload);
      if (res.status === 1) {
        const { recommendnum, ratio } = res.data;
        const amountOptions = recommendnum && recommendnum.split(',') || [];
        yield put({
          type: 'UpdateState',
          payload: { ratio, amountOptions, amount: amountOptions[0] },
        });
      }
    },
    * RmbRecharge({ payload }, { call, select }) {
      const { amount } = yield select(state => state.dgtRecharge);
      return yield call(AssetApi.rmbRecharge, { num: amount });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/wallet/dgt_recharge') {
          dispatch({ type: 'GetRmbIni' });
        }
      });
    },
  },
};
