import { GameApi } from '../../../services/api';

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
    * TransferInit(_, { call, put, select }) {
      const { transfer } = yield select(state => state.transfer);
      const res = yield call(GameApi.transferInit);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: {
            initInfo: res.data,
            type: (transfer === 'DToG' ? res.data.DAGECURRENCY : res.data.GAMECURRENCY)[0],
          },
        });
      }
    },
    * Transfer(_, { call, put, select }) {
      const { transfer, num, type } = yield select(state => state.transfer);
      return yield call(GameApi.transfer, { transfer, num, type });
    },
  },
};
