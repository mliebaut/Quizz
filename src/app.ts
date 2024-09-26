import Koa from 'koa';
import koaBody from 'koa-body';
import router from './routes/router'
import logger from 'koa-logger'
import authorization from "./middlewares/authorization";
import errorHandler from "./middlewares/errorHandler";

const app = new Koa();

app.use(errorHandler);
app.use(koaBody());
app.use(logger());
app.use(authorization);
app.use(router.routes()).use(router.allowedMethods());

export default app;
