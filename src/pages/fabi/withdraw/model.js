import { FabiApi } from '../../../services/api';

export default {
  namespace: 'fabiWithdraw',
  state: {
    balance: '',
    bankName: '',
    bankBranch: '',
    bankNo: '',
    name: '',
    num: '',
    code: '',
    initInfo: {},
    typeList: [], // 可提现币种列表
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetInitInfo(_, { call, put }) {
      const res = yield call(FabiApi.getDgtWithdrawInitInfo);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: { initInfo: res.data.type, typeList: res.data.typeList },
        });
      }
      return res;
    },

    *Withdraw(_, { call, select }) {
      const { bankName, bankBranch, bankNo, name, num, code } = yield select(
        state => state.fabiWithdraw,
      );
      return yield call(FabiApi.dgtWithdraw, { bankName, bankBranch, bankNo, name, num, code });
    },
  },
};
