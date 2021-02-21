const Router = require('koa-router');

// 使用 koa-router 库 对路由划分
const userRouter = new Router({prefix: '/users'});

const { create } = require('../controller/user.controller')

// verifyUser 中间件 用来验证
const { verifyUser, passwordHandle, verifyEmail, getEmailVerify } = require('../middleware/user.middleware')

userRouter.post('/', verifyUser, passwordHandle, create)

// 获取验证码
userRouter.post('/emailVerify', verifyEmail, getEmailVerify)

module.exports = userRouter;