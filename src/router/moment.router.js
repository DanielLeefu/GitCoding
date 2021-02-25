const Router = require('koa-router');

// 使用 koa-router 库 对路由划分
const momentRouter = new Router({prefix: '/moment'});

const { create, momentDetail, momentList, updateMoment } = require('../controller/moment.controller')

// verifyUser 中间件 用来验证
const { verifyToken } = require('../middleware/auth.middleware')
const { verifyPremission } = require('../middleware/moment.middleware')

// 创建动态
momentRouter.post('/', verifyToken, create)

// 获取所有动态列表 TODO 分页
momentRouter.post('/list', momentList)


// 获取一条动态 (详情)
momentRouter.get('/:momentId', momentDetail)

// 修改动态
momentRouter.patch('/:updateMoment', verifyToken, verifyPremission, updateMoment)

// 删除动态 delete

// 获取该用户所有动态 TODO 分页



module.exports = momentRouter;