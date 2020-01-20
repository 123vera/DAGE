import createLoading from 'dva-loading';
import dva from 'dva';

const app = dva();

app.use(createLoading()); // props.loading.global  全局loading状态
