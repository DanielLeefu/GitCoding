const Router = require('koa-router');
// 使用 koa-router 库 对路由划分
const authRouter = new Router();

const { login } = require('../controller/auth.controller'); 

const { verfiyLogin } = require('../middleware/auth.middleware')



authRouter.post('/login', verfiyLogin, login)



module.exports = authRouter;