import { UserApi } from '../../services/api';

export default {
  namespace: 'assetsHome',
  state: {
    list: [],
    gameList: [],
    totalAmount: '',
    gameTotalAmount: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetUserAssets(_, { call, put }) {
      const res = yield call(UserApi.getUserAssets);
      if (res && res.status === 1) {
        const totalAmount =
          res.data &&
          res.data.list.reduce((acc, cur) => {
            return acc + Number(cur.amount) * cur.price;
          }, 0);

        console.log('totalAmount', totalAmount);
        yield put({ type: 'UpdateState', payload: { list: res.data.list, totalAmount } });
      }
    },
    * GetGameAssets(_, { call, put }) {
      const res = yield call(getGameAssets);
      if (res && res.status === 1) {
        const { list } = res.data;
        const totalAmount = list.reduce((acc, cur) => acc + Number(cur.amount) * cur.price, 0);
        yield put({ type: 'UpdateState', payload: { list, totalAmount } });
      }
    },
  },
};

function getGameAssets() {
  return Promise.resolve({
    'status': 1,
    'msg': '操作成功',
    'data': {
      'list': [
        {
          'type': 'RC',
          'amount': '0.00000000',
          'price': 1,
        },
        {
          'type': 'DGT',
          'amount': '0.00000000',
          'price': 1,
        },
      ],
    },
  });
}
