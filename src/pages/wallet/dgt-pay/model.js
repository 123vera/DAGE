import { UserApi } from '../../../services/api';

export default {
  namespace: 'dgtPay',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetMyWallet({ payload }, { call, put }) {
      // const res = yield call(UserApi.getMyWallet, payload);
      // if (res.status === 1) {
      //   yield put({ type: 'UpdateState', payload: { wallet: res.data.wallet } });
      // }
      // return res;
    },
  },
};
