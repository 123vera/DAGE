import { UserApi, OtherApi, HomeApi } from '../../services/api';
import OtcApi from '../../services/api/otc';

export default {
  namespace: 'wallet',
  state: {
    userInfo: {},
    notice: {},
    reward: {},
    certification: '', // 支付宝认证结果
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
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
    * AlipayInit(_, { call, put }) {
      const res = yield call(OtcApi.alipayInit);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { certification: res.data.status } });
      }
      return res;
    },
    * GetGameReward(_, { call, put }) {
      const res = yield call(HomeApi.getGameReward);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { reward: res.data } });
      }
      return res;
    },
  },
};
