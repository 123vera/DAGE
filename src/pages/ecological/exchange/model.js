import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'exchange',
  state: {
    beforeCoins: [],
    afterCoins: [],

    beforeCoin: {
      value: 'usdt',
      label: 'USDT',
    },
    afterCoin: {
      value: 'did',
      label: 'DID',
    },
    balance: '',
    teams: [],
    initInfo: {},
    amount: '',
    code: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *ExchangeInit(_, { call, put, select }) {
      const { beforeCoin, afterCoin } = yield select(state => state.exchange);
      const res = yield call(AssetApi.exchangeInit, {
        currency1: beforeCoin.value,
        currency2: afterCoin.value,
      });
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: {
            balance: res.data.balance,
            teams: res.data.team,
            initInfo: res.data.exini,
          },
        });
      }
      return res;
    },
    *SubmitExchange(_, { call, select }) {
      const { beforeCoin, afterCoin, amount, code } = yield select(state => state.exchange);
      return yield call(AssetApi.submitExchange, {
        currency1: beforeCoin.value,
        currency2: afterCoin.value,
        amount,
        code,
      });
    },
  },
};
