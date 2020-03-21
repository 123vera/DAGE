import { OtcApi } from '../../../../services/api';

export default {
  namespace: 'otcMiningDetail',
  state: {
    dgcTotal: '',
    didTotal: '',
    otcList: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * OtcDetail(_, { call, put }) {
      const res = yield call(OtcApi.otcDetail);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: {
            dgcTotal: res.data.dgctotal,
            didTotal: res.data.didtotal,
            otcList: res.data.otclist,
          },
        });
      }
    },
    * OtcSubmit(_, { call, put, select }) {
      const { count, initInfo } = yield select(state => state.otcMining);
      return yield call(OtcApi.otcSubmit, { num: count, type: initInfo.type });
    },
  },
};
