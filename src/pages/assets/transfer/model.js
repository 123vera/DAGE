import { UserApi, GameApi } from '../../../services/api';

export default {
  namespace: 'transfer',
  state: {
    initInfo: {},
    transfer: 'DToG', // DToG：dage到游戏，GToD：游戏到dage
    num: '',
    type: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * TransferInit(_, { call, put }) {
      const res = yield call(GameApi.transferInit);
      if (res.status === 1) {
        yield put({ type: 'UpdateState', payload: { initInfo: res.data } });
      }
    },
    * Transfer(_, { call, put, select }) {
      const { transfer, num, type } = yield select(state => state.transfer);
      return yield call(GameApi.transfer, { transfer, num, type });
    },
  },
};
