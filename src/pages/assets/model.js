import { UserApi, GameApi } from '../../services/api';

export default {
  namespace: 'assetsHome',
  state: {
    // list: [],
    // gameList: [],
    // totalAmount: '',
    // gameTotalAmount: '',
    userAssets: {},
    gameAssets: {},
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // * GetUserAssets(_, { call, put }) {
    //   const res = yield call(UserApi.getUserAssets);
    //   if (res && res.status === 1) {
    //     const totalAmount =
    //       res.data &&
    //       res.data.list.reduce((acc, cur) => {
    //         return acc + Number(cur.amount) * cur.price;
    //       }, 0);
    //
    //     yield put({ type: 'UpdateState', payload: { list: res.data.list, totalAmount } });
    //   }
    // },
    // * GetGameAssets(_, { call, put }) {
    //   const res = yield call(GameApi.getGameAssets);
    //   if (res && res.status === 1) {
    //     const { list } = res.data;
    //     const totalAmount = list.reduce((acc, cur) => acc + Number(cur.amount) * cur.price, 0);
    //     yield put({ type: 'UpdateState', payload: { list, totalAmount } });
    //   }
    // },
    * GetAssets(_, { call, put }) {
      const gameRes = yield call(GameApi.getGameAssets);
      if (gameRes.status === 1) {
        const { list } = gameRes.data;
        const total = list.reduce((acc, cur) => acc + Number(cur.amount) * cur.price, 0);
        const gameAssets = { list, total };
        yield put({ type: 'UpdateState', payload: { gameAssets } });
      }
      const userRes = yield call(UserApi.getUserAssets);
      if (userRes.status === 1) {
        const total = userRes.data.list.reduce((acc, cur) => {
          return acc + Number(cur.amount) * cur.price;
        }, 0);
        const userAssets = { list: userRes.data.list, total };
        yield put({ type: 'UpdateState', payload: { userAssets } });
      }
    },
  },
};

// function getGameAssets() {
//   return Promise.resolve({
//     'status': 1,
//     'msg': '操作成功',
//     'data': {
//       'list': [
//         {
//           'type': 'RC',
//           'amount': '0.00000000',
//           'price': 1,
//         },
//         {
//           'type': 'DGT',
//           'amount': '0.00000000',
//           'price': 1,
//         },
//       ],
//     },
//   });
// }
