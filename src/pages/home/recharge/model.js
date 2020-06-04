import UserCenterApi from '../../../services/api/user_center';

export default {
  namespace: 'recharge',
  state: {
    coin: '',
    wallet: '',
    menus: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetMyWallet({ payload }, { call, put }) {
      const res = yield call(UserCenterApi.getMyWallet, payload);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { wallet: res.data && res.data.wallet } });
      }
      return res;
    },
  },
};
