import { OtcApi } from '../../../services/api';

export default {
  namespace: 'alipay',
  state: {
    payName: '',
    realName: '',
    payImg: '',
    imgSrc: '',
    initInfo: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *AlipayInit(_, { call, put }) {
      const res = yield call(OtcApi.alipayInit);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { initInfo: res.data } });
      }
      return res;
    },
    *AlipayUpload(_, { call, select }) {
      const { payName, realName, payImg } = yield select(state => state.alipay);
      return yield call(OtcApi.alipayUpload, { payName, realName, payImg });
    },
  },
};
