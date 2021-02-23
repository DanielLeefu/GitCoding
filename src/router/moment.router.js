const Router = require('koa-router');

// 使用 koa-router 库 对路由划分
const momentRouter = new Router({prefix: '/moment'});

const { create, momentDetail, momentList } = require('../controller/moment.controller')

// verifyUser 中间件 用来验证
const { verifyToken } = require('../middleware/auth.middleware')

// 创建动态
momentRouter.post('/', verifyToken, create)

// 获取所有动态列表 TODO 分页
momentRouter.post('/list', momentList)

// 获取该用户所有动态 TODO 分页

// 获取一条动态 (详情)
momentRouter.get('/:momentId', momentDetail)


module.exports = momentRouter;