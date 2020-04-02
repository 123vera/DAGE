import { UserApi } from '../../services/api';

export default {
  namespace: 'assetsHome',
  state: {
    list: [],
    totalAmount: null,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetUserAssets(_, { call, put }) {
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
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/home/assets') {
          dispatch({ type: 'GetUserAssets' });
        }
      });
    },
  },
};
