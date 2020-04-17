import { OtherApi } from '../../../services/api';

export default {
  namespace: 'notice',
  state: {
    content: '',
  },
  reducers: {
    UpdateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *GetNotice({ payload }, { call, put }) {
      const res = yield call(OtherApi.getNotice, payload);
      if (res.status === 1) {
        yield put({
          type: 'UpdateState',
          payload: { content: res.data && res.data.content },
        });
      }
      return res;
    },
  },
};
