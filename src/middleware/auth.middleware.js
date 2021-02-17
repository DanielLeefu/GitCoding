const errorTypes = require('../constants/error-types')

const service = require('../service/user.service');

const { md5Password } = require('../utils/password-handle')

const verfiyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  // 判断 用户名密码是否为空
  if (!name || !password || name === '' || password === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD)
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户是不是存在
  const result = await service.getUserByName(name);
  // 数据库查到对信息
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.NAME_NOTHAS)
    return ctx.app.emit('error', error, ctx);
  }

  // 密码是否正确
  if (md5Password(password) !== user.password )  {
    const error = new Error(errorTypes.PASSWORDNOT)
    return ctx.app.emit('error', error, ctx);
  }


  await next()
}

module.exports = {
  verfiyLogin
}