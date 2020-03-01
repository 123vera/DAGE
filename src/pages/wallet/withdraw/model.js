import { AssetApi } from '../../../services/api';
// import UserApi from '../../../services/api/user';

export default {
  namespace: 'withdraw',
  state: {
    coin: {},
    initInfo: {},
    walletTo: '',
    amount: undefined,
    code: undefined,
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
  },
};
