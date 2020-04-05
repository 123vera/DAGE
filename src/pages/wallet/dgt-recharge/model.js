import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'dgtRecharge',
  state: {
    recommendnum: [],
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
        const { recommendnum } = res.data;
        yield put({ type: 'UpdateState', payload: { recommendnum: recommendnum.split(',') } });
      }
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
