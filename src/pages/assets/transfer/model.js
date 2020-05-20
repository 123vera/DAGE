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
    *TransferInit(_, { call, put, select }) {
      const { transfer, type } = yield select(state => state.transfer);
      const res = yield call(GameApi.transferInit);
      if (res.status === 1) {
        // 获取当前币种类型列表
        const typeList = transfer === 'DToG' ? res.data.DAGECURRENCY : res.data.GAMECURRENCY
        // const typeI = Itype
        //   ? Itype
        //   : (transfer === 'DToG' ? res.data.DAGECURRENCY : res.data.GAMECURRENCY)[0];
        yield put({
          type: 'UpdateState',
          payload: {
            initInfo: res && res.data,
            type: typeList.includes(type) ? type: typeList[0],
          },
        });
      }
    },
    *Transfer({ payload }, { call }) {
      const res = yield call(GameApi.transfer, payload);
      return res;
    },
  },
};
