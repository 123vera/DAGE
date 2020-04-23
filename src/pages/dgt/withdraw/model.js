export default {
  namespace: 'dgtWithdraw',
  state: {
    balance: '',
    bank: '',
    subBank: '',
    cardNum: '',
    userName: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetBalance(_, { call, put }) {
      const res = yield call(getBalance);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { balance: res.data.balance } });
      }
      return res;
    },

    *Withdraw(_, { call, select }) {
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
