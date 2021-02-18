

// 安装jsonwebToken  颁发token
const jwt = require('jsonwebtoken')

// 私钥
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {

    const { id, name } = ctx.user;

    // 采用非对称加密生成token 颁发签名
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    const { name } = ctx.request.body;

    ctx.body = {
      id,
      name,
      token
    }

  }
}

module.exports  = new AuthController();