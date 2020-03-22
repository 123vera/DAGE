import { OtcApi } from '../../../services/api';

export default {
  namespace: 'otcMining',
  state: {
    initInfo: {},
    count: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *OtcInit(_, { call, put }) {
      const res = yield call(OtcApi.otcInit);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { initInfo: res.data } });
      }
    },
    *OtcSubmit(_, { call, select }) {
      const { count, initInfo } = yield select(state => state.otcMining);
      return yield call(OtcApi.otcSubmit, { num: count, type: initInfo.type });
    },
  },
};
