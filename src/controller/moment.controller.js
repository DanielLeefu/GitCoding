// koa-bodyparser 解析json数据
const service = require('../service/moment.service');

class MomentController {
  async create(ctx, next) {
    
    // 获取用户请求的id
    // 直接从上一步的验证token里面拿到
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    const result = await service.create(userId, content);

    // 返回数据
    ctx.body = '动态创建成功';
    
  }

  async momentDetail(ctx, next) {
    
    // ?name='lll' query

    // 获取用户请求的id
    const momentId = ctx.params.momentId;

    const result = await service.momentDetail(momentId);

    // 返回数据
    ctx.body = {
      data: result,
      message: '获取一条动态详情成功'
    }

  }

  async momentList(ctx, next) {
    const { pageNumber, pageSize } = ctx.request.body;

    const result = await service.momentList(pageNumber, pageSize);

    // 返回数据
    ctx.body = {
      data: result,
      message: '获取动态成功'
    }
  }

}

module.exports = new MomentController();