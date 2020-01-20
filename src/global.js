import createLoading from 'dva-loading';
import { createBrowserHistory as createHistory } from 'history';
import dva from 'dva';

const app = dva({ history: createHistory });

app.use(createLoading()); // props.loading.global  全局loading状态
