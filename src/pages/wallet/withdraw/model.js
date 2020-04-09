import { AssetApi } from '../../../services/api';

export default {
  namespace: 'withdraw',
  state: {
    menus: [],
    coin: '',
    initInfo: {},
    walletTo: '',
    // walletTo: '0x17e3e0189447416d412a3d92a240a06178a98c3d',
    amount: '',
    code: '',
    captcha: '',
    walletType: undefined,
    serviceCharge: undefined,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *WithdrawInit({ payload }, { call, put }) {
      const res = yield call(AssetApi.withdrawInit, { type: payload.coin });
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { initInfo: res.data, coin: payload.coin } });
      }
      return res;
    },

    *Withdraw(_, { call, select }) {
      const { coin, walletTo, amount, code } = yield select(state => state.withdraw);
      return yield call(AssetApi.submitWithdrawal, {
        type: coin,
        walletTo,
        amount,
        code,
      });
    },

    *GetServiceCharge(_, { call, select, put }) {
      const { coin, walletTo } = yield select(state => state.withdraw);
      const res = yield call(AssetApi.getServiceCharge, {
        address: walletTo,
        // currency:'USDT' , // coin.value
        currency: coin.value,
      });
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: {
            walletType: res.data.type,
            serviceCharge: res.data.serviceCharge,
          },
        });
      }
    },
  },
};
