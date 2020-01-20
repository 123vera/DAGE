import createLoading from 'dva-loading';
import dva from 'dva';
// export const dva = {
//   config: {
//     onError(err) {
//       err.preventDefault();
//     },
//   },
// };

const app = dva();

app.use(createLoading()); // props.loading.global  全局loading状态
