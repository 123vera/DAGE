import { DgtApi } from '../../../../services/api';

export default {
  namespace: 'dgtWithdrawRecord',
  state: {
    type: 'usdt',
    hasMore: true,
    page: 1,
    row: 10,
    list: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetWithdrawRecord({ payload }, { call, select, put }) {
      const { type, page, row, list } = yield select(state => state.dgtWithdrawRecord);
      const res = yield call(DgtApi.dgtWithdrawRecord, { type, page, row });
      console.log(res)
      if (res.status === 1) {
        list.push(...res.data);
        yield put({
          type: 'UpdateState',
          payload: {
            list,
            page: page + 1,
            hasMore: row === res.data.length,
          },
        });
      }
      return res;
    },
  },
};

// async function getRecords(options) {
//   console.log(options)
//   const list = [];
//   for (let i = options.row; i > 0; i--) {
//     list.push({
//       'id': +new Date() + Math.random(),
//       'order': Math.floor(Math.random() * 1000000000),
//       'num': '10.00000000',
//       'remark': 'DAGE账户到游戏账户',
//       'addTime': 1586829784,
//       'status': Math.floor(Math.random() * 4),
//     });
//   }
//   return {
//     'status': 1,
//     'msg': '操作成功',
//     'data': {
//       'list': list,
//     },
//   };
// }
