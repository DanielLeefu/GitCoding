
const Koa = require('koa');

// 解析json
const bodyparser = require('koa-bodyparser')

const userRouter = require('../router/user.router');
const authRouter = require('../router/auth.router');

const errorHandler = require('./error-handle');

const useRoutes = require('../router')

const app = new Koa();

app.use(bodyparser());

//   注册路由
useRoutes(app)
// app.use(userRouter.routes());
// app.use(userRouter.allowedMethods());

// app.use(authRouter.routes());
// app.use(authRouter.allowedMethods());

app.on('error', errorHandler)
    

module.exports = app;