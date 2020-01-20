import { actionCreatorFactory } from 'dva-model-creator';
// import { PageHomeModel } from '@/interfaces/type';

const actionCreator = actionCreatorFactory('pageHome');
const UpdateState = actionCreator('UpdateState');
const Test = actionCreator('Test');

export default {
  UpdateState,
  Test,
};
