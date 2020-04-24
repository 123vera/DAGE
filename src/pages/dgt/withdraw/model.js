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
      console.log(res);
      return res;
    },

    * Withdraw(_, { call, select }) {
      const { bank, subBank, cardNum, userName } = yield select(state => state.dgtWithdraw);
      return yield call(withdrawal, { bank, subBank, cardNum, userName });
    },
  },
};

async function getBalance() {
  return {
    status: 1,
    msg: '\u64cd\u4f5c\u6210\u529f',
    data: {
      balance: 21448,
    },
  };
}

async function withdrawal() {
  return {
    status: 1,
    msg: '提交成功',
    data: {},
  };
}
