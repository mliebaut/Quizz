import Koa  from 'koa';
import koaBody from 'koa-body';
import router from './routes/router'
import logger from 'koa-logger'

const app = new Koa();

app.use(koaBody());
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

export default app;
