import { UserApi } from '../../services/api';

export default {
  namespace: 'assetsHome',
  state: {},
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetUserInfo(_, { call, put }) {
      const res = yield call(UserApi.getMyInfo);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { userInfo: res.data } });
      }
      return res;
    },
  },
};
