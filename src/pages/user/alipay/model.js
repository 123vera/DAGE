import { OtcApi } from '../../../services/api';

export default {
  namespace: 'alipay',
  state: {
    payName: '',
    realName: '',
    payImg: '',
    imgSrc: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *AlipayInit(_, { call }) {
      return yield call(OtcApi.alipayInit);
    },
    *AlipayUpload(_, { call, select }) {
      const { payName, realName, payImg } = yield select(state => state.alipay);
      console.log(payImg);
      return yield call(OtcApi.alipayUpload, { payName, realName, payImg });
    },
  },
};
