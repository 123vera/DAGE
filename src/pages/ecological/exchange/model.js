import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'exchange',
  state: {
    amount: '',
    smsCode: '',
    balance: '',
    team: [],
    exini: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *SetExchangeInit({ payload }, { call, put }) {
      const res = yield call(AssetApi.setExchangeInit, payload);
      console.log(res);
      yield put({
        type: '',
        payload: {
          balance: res.data.balance,
          exini: res.data.exini,
          team: res.data.team,
        },
      });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(() => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        dispatch({ type: 'SetExchangeInit' });
      });
    },
  },
};
