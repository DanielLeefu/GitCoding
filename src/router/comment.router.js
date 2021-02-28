const Router = require('koa-router')

const { verifyToken } = require('../middleware/auth.middleware')

const { createComment, replyComment, deleteComment, updateComment } = require('../controller/comment.controller')

// 使用 koa-router 库 对路由划分
const commentRouter = new Router({prefix: '/comment'});


// 发表评论
commentRouter.post('/', verifyToken, createComment )

// 回复评论
commentRouter.post('/reply', verifyToken, replyComment)

// 更新评论
commentRouter.patch('/:commentId', verifyToken, updateComment)

// 修改评论
commentRouter.post('/remove', verifyToken, deleteComment)

module.exports = commentRouter;