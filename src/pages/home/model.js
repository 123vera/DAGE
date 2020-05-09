import { UserApi, OtherApi, GameApi } from '../../services/api';
import OtcApi from '../../services/api/otc';

export default {
  namespace: 'wallet',
  state: {
    userInfo: {},
    notice: {},
    reward: {},
    teamreward: 0, //昨日团队收益
    surplus: 0, // 正在挖矿
    // currency: {}, // 当前选择要购买矿机的币种
    certification: '', // 支付宝认证结果
  },
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
    *ActivateRole(_, { call }) {
      return yield call(UserApi.activateRole);
    },
    *GetNotice(_, { call, put }) {
      const res = yield call(OtherApi.getNoticeList, { page: 1, row: 1 });
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: { notice: res.data[0] },
        });
      }
      return res;
    },
    *AlipayInit(_, { call, put }) {
      const res = yield call(OtcApi.alipayInit);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { certification: res.data.status } });
      }
      return res;
    },
    *GetRewardAndAurplus(_, { call, put }) {
      const res = yield call(GameApi.getRewardAndAurplus);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: {
            teamreward: res.data && res.data.yestodayTeamreward,
            surplus: res.data && res.data.surplus,
          },
        });
      }
    },
    *OtcDetail(_, { call, put }) {
      const res = yield call(OtcApi.otcDetail, { type: 'mining', page: 1 });
      if (res.status === 1) {
        const reward = {
          dgc: res.data.rewardSumDgc,
          did: res.data.rewardSumDid,
        };

        yield put({
          type: 'UpdateState',
          payload: { reward },
        });
      }
      return res;
    },
  },
};
