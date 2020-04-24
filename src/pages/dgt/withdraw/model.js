import { DgtApi } from '../../../services/api';

export default {
  namespace: 'dgtWithdraw',
  state: {
    balance: '',
    bankName: '中国银行',
    bankBranch: '上海支行',
    bankNo: '1234554321',
    name: '不想说',
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
    * GetInitInfo(_, { call, put }) {
      const res = yield call(DgtApi.getDgtWithdrawInitInfo);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: { initInfo: res.data.type, typeList: res.data.typeList },
        });
      }
      return res;
    },

    * Withdraw(_, { call, select }) {
      const { bankName, bankBranch, bankNo, name, num, code } = yield select(state => state.dgtWithdraw);
      return yield call(DgtApi.dgtWithdraw, { bankName, bankBranch, bankNo, name, num, code });
    },
  },
};
