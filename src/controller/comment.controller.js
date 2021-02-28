const service = require('../service/comment.service')

class CommentController {

  async createComment(ctx, next) {
    const {momentId, content} = ctx.request.body
    const { id } = ctx.user;
    const result = await service.createComment(momentId, content, id);

    ctx.body = '创建评论成功'

  }

  async replyComment(ctx, next) {
    // commentID, 这条回复是回复哪一条评论的
    // momentid 哪一条动态下的评论
    const {momentId, content, commentId} = ctx.request.body
    const { id } = ctx.user;
    const result = await service.replyComment(momentId, content, commentId, id);

    ctx.body = '回复评论成功'

  }

  async updateComment(ctx, next) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body;
    const result = await service.updateComment(content, commentId);

    ctx.body = '修改评论成功'

  }


  async deleteComment(ctx, next) {
    const { commentId } = ctx.params
    const result = await service.deleteComment(commentId);

    ctx.body = '删除评论成功'

  }

}

module.exports = new CommentController()