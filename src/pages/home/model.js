import * as HomeService from '@/services/api/home';
import { DvaModelBuilder, actionCreatorFactory } from 'dva-model-creator';
// import pageHomeAction from '@/actions/home';

const actionCreator = actionCreatorFactory('pageHome');
const UpdateState = actionCreator('UpdateState');
const Test = actionCreator('Test');

const pageHomeModel = {
  signStatus: null, // 签约结果
  showSignResult: false, // 默认不显示签约弹窗
};
// const { UpdateState, Test } = pageHomeAction;

const model = new DvaModelBuilder(pageHomeModel, 'pageHome')
  .case(UpdateState, (state, payload) => ({ ...state, ...payload }))
  .takeEvery(Test, function*({ payload }, { call }) {
    const res = yield call(HomeService.getUserInfoStatus, payload);
    console.log(res);
  })
  .subscript(function setUp({ dispatch, history }) {
    history.listen(() => {
      dispatch({
        type: 'Test',
        payload: {},
      });
    });
  })
  .build();

export default model;

// export default {
//   namespace: 'pageHome',
//   state: [],
//   reducers: {
//     UpdateState(state, { payload }) {
//       return { ...state, ...payload };
//     },
//   },
//   effects: {
//     *Test({ payload }, { call }) {
//       const res = yield call(HomeService.getUserInfoStatus, payload);
//       console.log(res);
//     },
//   },
//   subscriptions: {
//     SetupHistory({ dispatch, history }) {
//       history.listen(location => {
//         // 这里可以获取当前变化的history路径以及参数，hash所有值，这样就可以在路由地址变化后做处理
//         dispatch({
//           type: 'Test',
//           payload: {},
//         });
//       });
//     },
//   },
// };
