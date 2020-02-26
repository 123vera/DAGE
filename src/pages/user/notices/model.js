import { AsideApi } from '../../../services/api';
import { PAGE_SIZE } from '../../../utils/constants';

export default {
  namespace: 'notices',
  state: {
    noticesList: {
      items: [],
      pages: 0,
      pageIndex: 1,
    },
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * GetNoticelist({ payload }, { call, put }) {
      const res = yield call(AsideApi.getNoticeList, {
        page: payload.pageIndex,
        row: PAGE_SIZE,
      });
      // let noticesList = yield select(state => state.notices.noticesList);
      // if (res && res.data.length > 0) {
      //   noticesList.items = res && res.data;
      // }
      let list = {
        items: res && res.data,
        pageIndex: payload.pageIndex + 1,
      };

      yield put({
        type: 'UpdateState',
        payload: { noticesList: list },
      });
    },
  },
  subscriptions: {
    SetupHistory({ dispatch, history }) {
      history.listen(location => {
        // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
        dispatch({
          type: 'GetNoticelist',
          payload: {
            pageIndex: 1,
            row: PAGE_SIZE,
          },
        });
      });
    },
  },
};
