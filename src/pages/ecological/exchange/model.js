import AssetApi from '../../../services/api/asset';

export default {
  namespace: 'exchange',
  state: {
    beforeCoins: [],
    afterCoins: [],
    teams: [],
    beforeCoin: '',
    afterCoin: '',
    balance: '',
    initInfo: {},
    amount: '',
    code: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
    UpdateBeforeCoinsState(state, { payload }) {
      const { teams } = payload;
      const coins = teams.map(team => team.split('_')[0]);
      const beforeCoins = Array.from(new Set(coins)).map(coin => ({
        value: coin,
        label: coin,
      }));
      return { ...state, beforeCoins };
    },
    UpdateAfterCoinsState(state, { payload }) {
      const { beforeCoin, afterCoin, teams } = payload;
      const filterTeams = teams.filter(team => team.split('_')[0] === beforeCoin);
      const afterCoins = filterTeams.map(team => ({
        value: team.split('_')[1],
        label: team.split('_')[1],
      }));
      console.log(afterCoins);
      return {
        ...state,
        afterCoins,
        afterCoin: afterCoin || afterCoins[0].value,
      };
    },
  },
  effects: {
    * ExchangeInit(_, { call, put, select }) {
      const { beforeCoin, afterCoin } = yield select(state => state.exchange);
      const res = yield call(AssetApi.exchangeInit, {
        currency1: beforeCoin,
        currency2: afterCoin,
      });
      if (res.status === 1) {
        const team = res.data.team[0];
        yield put({
          type: 'UpdateState',
          payload: {
            balance: res.data.balance,
            teams: res.data.team,
            initInfo: res.data.exini,
            beforeCoin: beforeCoin || team.split('_')[0],
            afterCoin: afterCoin || team.split('_')[1],
          },
        });
        yield put({
          type: 'UpdateBeforeCoinsState',
          payload: {
            teams: res.data.team,
          },
        });
        yield put({
          type: 'UpdateAfterCoinsState',
          payload: {
            teams: res.data.team,
            beforeCoin: beforeCoin || team.split('_')[0],
            afterCoin: afterCoin || team.split('_')[1],
          },
        });
      }
      return res;
    },
    * SubmitExchange(_, { call, select }) {
      const { beforeCoin, afterCoin, amount, code } = yield select(state => state.exchange);
      return yield call(AssetApi.submitExchange, {
        currency1: beforeCoin,
        currency2: afterCoin,
        amount,
        code,
      });
    },
  },
};
