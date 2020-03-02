import { AssetApi } from '../../../services/api';

export default {
  namespace: 'withdraw',
  state: {
    coin: {},
    initInfo: {},
    walletTo: '0x17e3e0189447416d412a3d92a240a06178a98c3d',
    amount: '',
    code: '',
    serviceCharge: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * WithdrawInit(_, { call, select, put }) {
      const { coin } = yield select(state => state.withdraw);
      const res = yield call(AssetApi.withdrawInit, { type: coin.value });
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { initInfo: res.data } });
      }
    },
    * Withdraw(_, { call, select }) {
      const { coin, walletTo, amount, code } = yield select(state => state.withdraw);
      console.log(coin);
      return yield call(AssetApi.submitWithdrawal, {
        type: coin.value,
        walletTo,
        amount,
        code,
      });
    },
    // * GetServiceCharge(_, { call, select, put }) {
    //   const { coin, walletTo } = yield select(state => state.withdraw);
    //   const res = yield call(AssetApi.getServiceCharge, {
    //     address: walletTo,
    //     currency: 'dgt' || coin.value,
    //   });
    //   if (res.status === 1) {
    //     yield put({ type: 'UpdateState', payload: { serviceCharge: res.data.serviceCharge } });
    //   }
    // },
  },
};
