const jwt = require('jsonwebtoken');
const { PUBLIC_KEY } = require('../app/config');
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
  const result = await service.getUserByNames(name);
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

  // 将user写到ctx里面，用来颁发token的时候使用
  ctx.user = user;

  await next()
}


// 验证token是否有效
const verifyToken = async (ctx, next) => {

  // 获取token
  const authorization = ctx.headers.authorization;

  if (!authorization) {
    const error = new Error(errorTypes.TOKENISEXIT)
    return ctx.app.emit('error', error, ctx);
  }
  // 注意这里的 ‘Bearer ’
  const getToken = authorization.replace('Bearer ', '');
  // 验证token
  try {
    const result = jwt.verify(getToken, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })

    ctx.user = result;
    await next()

  } catch (err) {
    
    const error = new Error(errorTypes.TOKENISEXIT)
    return ctx.app.emit('error', error, ctx);
    
  }
}


module.exports = {
  verfiyLogin,
  verifyToken
}