// koa-bodyparser 解析json数据
const service = require('../service/user.service');

class UserController {
  async create(ctx, next) {
    
    // 获取用户请求传递对参数
    const user = ctx.request.body;

    // 查询数据 单独抽取
    const result = await service.create(user);

    // 返回数据
    ctx.body = '用户创建成功';
    
  }
}

module.exports = new UserController();