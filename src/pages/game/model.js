import { GameApi } from '../../services/api';
import { Toast } from 'antd-mobile';

export default {
  namespace: 'game',
  state: {
    gameUrl: null,
    typelist: [],
    banner: '',
    imgList: [],
    dgtBalance: '--',
    rcBalance: '--',
    gameList: [],
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetRecommendgame(_, { call, put }) {
      const res = yield call(GameApi.getRecommendgame);
      if (res.status === 1) {
        const { banner, recommendlist } = res.data;

        yield put({
          type: 'UpdateState',
          payload: {
            banner,
            imgList: recommendlist,
          },
        });
      }
    },
    *GetTypelist(_, { call, put }) {
      const res = yield call(GameApi.getTypelist);
      if (res.status === 1) {
        const { typelist } = res.data;

        yield put({
          type: 'UpdateState',
          payload: {
            typelist,
          },
        });
      }
    },
    *GetGameList({ payload }, { call, put }) {
      const res = yield call(GameApi.getGameList, payload);
      if (res.status === 1) {
        const { dgt, rc, list } = res.data;

        yield put({
          type: 'UpdateState',
          payload: {
            dgtBalance: dgt,
            rcBalance: rc,
            gameList: list,
          },
        });
      }
    },
    *GetGameAddress({ payload }, { call, put }) {
      const res = yield call(GameApi.getGameAddress, payload);
      if (res.status === 1) {
        const { url } = res.data;

        yield put({
          type: 'UpdateState',
          payload: {
            gameUrl: url,
          },
        });

        url && (window.location.href = url);
      } else {
        res.msg && Toast.info(res.msg);
      }
    },
  },
};
