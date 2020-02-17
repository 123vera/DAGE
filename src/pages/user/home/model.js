import * as HomeService from '@/services/api/home';

export default {
  namespace: 'userCenter',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *Test({ payload }, { call }) {
      const res = yield call(HomeService.getUserInfoStatus, payload);
      console.log(res);
    },
  },
  subscriptions: {},
};
