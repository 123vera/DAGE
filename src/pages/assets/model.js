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
    *GetAssets(_, { call, put }) {
      const gameRes = yield call(GameApi.getGameAssets);
      if (gameRes.status === 1) {
        const { list } = gameRes.data;
        const total = list.reduce((acc, cur) => {
          return acc + Number(cur.price) * Number(cur.amount);
        }, 0);
        const gameAssets = { list, total };

        yield put({ type: 'UpdateState', payload: { gameAssets } });
      }
      const userRes = yield call(UserApi.getUserAssets);
      if (userRes.status === 1) {
        const total =
          userRes.data &&
          userRes.data.list.reduce((acc, cur) => {
            // if (Number(cur.amount) === 0) {
            //   return acc + 0;
            // } else {
            // console.log(Number(cur.amount) === 0 ? 0 : Number(cur.price) / Number(cur.amount));
            return acc + Number(cur.price) * Number(cur.amount);
            // }
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
