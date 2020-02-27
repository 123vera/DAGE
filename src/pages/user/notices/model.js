import { OtherApi } from '../../../services/api';
import { PAGE_SIZE } from '../../../utils/constants';

export default {
  namespace: 'notices',
  state: {
    hasMore: true,
    noticesList: [],
    pageSize: PAGE_SIZE,
    pageIndex: 1,
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetNoticelist({ payload }, { call }) {
      return yield call(OtherApi.getNoticelist, {
        page: payload.pageIndex,
        row: PAGE_SIZE,
      });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        // dispatch({
        //   type: 'GetNoticelist',
        //   payload: {
        //     pageIndex: 1,
        //     row: PAGE_SIZE,
        //   },
        // });
      });
    },
  },
};
