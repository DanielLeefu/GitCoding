const Router = require('koa-router');
// 使用 koa-router 库 对路由划分
const authRouter = new Router();

const { login, success } = require('../controller/auth.controller'); 

const { verfiyLogin,verifyToken } = require('../middleware/auth.middleware')



authRouter.post('/login', verfiyLogin, login)

// 测试token成功
authRouter.get('/testtoken', verifyToken, success)




module.exports = authRouter;