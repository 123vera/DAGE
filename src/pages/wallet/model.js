import { UserApi, OtherApi } from '../../services/api';

export default {
  namespace: 'wallet',
  state: {
    userInfo: {},
    notice: {},
    reward: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetUserInfo(_, { call, put }) {
      const res = yield call(UserApi.getMyInfo);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { userInfo: res.data } });
      }
      return res;
    },
    * ActivateRole(_, { call }) {
      return yield call(UserApi.activateRole);
    },
    * GetNotice({ payload }, { call, select, put }) {
      const res = yield call(OtherApi.getNoticeList, { page: 1, row: 1 });
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: { notice: res.data[0] },
        });
      }
      return res;
    },

  },
};
