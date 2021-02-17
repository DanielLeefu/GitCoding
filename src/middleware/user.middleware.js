const errorTypes = require('../constants/error-types')

const service = require('../service/user.service');

const { md5Password } = require('../utils/password-handle')




// 验证用户密码中间件
const verifyUser = async (ctx, next) => {
  // 获取用户名密码
  const { name, password } = ctx.request.body;
  // 判断不能为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD)
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户这次有没有被注册过
  const result = await service.getUserByName(name);
  if (result.length) {
    const error = new Error(errorTypes.NAME_REBASE)
    return ctx.app.emit('error', error, ctx);
  }

  // 执行下一个(创建的)中间件
  await next();

}

// 对密码加密对中间件
const passwordHandle = async (ctx, next) => {

  const { password } = ctx.request.body;

  ctx.request.body.password = md5Password(password);
  await next();

}

module.exports = {
  verifyUser,
  passwordHandle
}