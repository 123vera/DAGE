// import * as HomeService from '@/services/api/home';

export default {
  namespace: 'exchange',
  state: {
    amount: '',
    smsCode: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetUser({ payload }, { call, put }) {
      // const res = yield call(HomeService.GetUser, payload);
      // yield put({
      //   type: '',
      //   payload: {
      //     DID: res.data.DID,
      //     referralCode: res.data.referralCode,
      //   },
      // });
    },
  },
  subscriptions: {},
};
