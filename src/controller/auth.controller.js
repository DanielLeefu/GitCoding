

// 安装jsonwebToken  颁发token
const jwt = require('jsonwebtoken')

// 私钥
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const { id, name } = ctx.user;

    // 采用非对称加密生成token 颁发签名
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: '2 day'
    })

    ctx.body = {
      id,
      name,
      token,
      // message: '登陆成功'
    }
  }

  async success(ctx, next) {
    ctx.body = '验证成功'
  }

  

}

module.exports = new AuthController();