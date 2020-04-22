import { OtcApi } from '../../../services/api';

export default {
  namespace: 'otcMining',
  state: {
    initInfo: {},
    count: '',
    coin: '',
    menus: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *OtcInit({ payload }, { call, put }) {
      let res;
      payload.type
        ? (res = yield call(OtcApi.otcInit, payload))
        : (res = yield call(OtcApi.otcInit));

      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { initInfo: res && res.data } });
      }
    },
    *OtcSubmit(_, { call, select }) {
      const { count, coin } = yield select(state => state.otcMining);
      return yield call(OtcApi.otcSubmit, { num: count, type: coin });
    },
  },
};
