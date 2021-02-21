const errorTypes = require('../constants/error-types')

const service = require('../service/user.service');

const { md5Password } = require('../utils/password-handle')

const nodemailer = require("nodemailer");


// 验证用户密码中间件
const verifyUser = async (ctx, next) => {
  // 获取用户名密码
  const { name, password, email, code } = ctx.request.body;
  // console.log(ctx, ctx.state.emailInfo, '----ctx')
  
  // 判断不能为空
  if (!name || !password || name === '' || password === '' || code === '' || email === '') {
    const error = new Error(errorTypes.NAME_OR_PASSWORD)
    return ctx.app.emit('error', error, ctx);
  }

  // 判断用户这次有没有被注册过
  const result = await service.getUserByName(name, email);
  if (result.length) {
    const error = new Error(errorTypes.NAME_REBASE)
    return ctx.app.emit('error', error, ctx);
  }

  // 判断输入的验证码和邮箱是不是正确的
 const resultEmail = await service.getEmailverifyEmail(email, code)
 
 if (!resultEmail.length) {
   // email 验证码错误
  const error = new Error(errorTypes.EMAILERROR)
  return ctx.app.emit('error', error, ctx);
}
const hasverifyTime = resultEmail[0].createTime
const nowdata = new Date().getTime()
const algoData = new Date(hasverifyTime).getTime()
const isNotEffect = (nowdata - algoData) > 1000 * 60 * 5
if (isNotEffect) {
  const error = new Error(errorTypes.EMAILTIME)
  return ctx.app.emit('error', error, ctx);
}

  // 执行下一个(创建的)中间件
  await next();

}

// 验证用户邮箱
const verifyEmail = async(ctx, next) => {
  
  const { email } = ctx.request.body;
  // 判断邮箱有没有被注册过
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isReady = reg.test(email);
  if (!isReady) {
    const error = new Error(errorTypes.EMAILNOTEXIT)
    return ctx.app.emit('error', error, ctx);
  }
  const result = await service.getUserEmail(email);
  if (result.length) {
    const error = new Error(errorTypes.EMAILHAS)
    return ctx.app.emit('error', error, ctx);
  }

  await next()

}

// 对密码加密对中间件
const passwordHandle = async (ctx, next) => {

  const { password } = ctx.request.body;

  ctx.request.body.password = md5Password(password);
  await next();

}

const getEmailVerify = async (ctx, next) => {
  // 获取请求的邮箱
  const { email } = ctx.request.body;
  function random(max,min){
    return Math.round(Math.random()*(max-min)+min);
  }
  // 发送验证码
  const randomMath = random(1000, 9999)
  const ToEmail = email;

  async function main() {
    let transporter = nodemailer.createTransport({
      host: "smtp.163.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
      user: 'gitcoding@163.com',
      pass: 'EUMOVKRRGYBBXBIB',
      },
    });

    await transporter.sendMail({
      from: '"GitCoding" <gitcoding@163.com>',
      to: ToEmail, 
      subject: "欢迎注册GitCoding", 
      html: `欢迎注册GitCoding, 您的邮箱验证码是:<b>${randomMath}</b> 有效时间5分钟,若不是本人操作请忽略`, 
      // attachments: [{
      //   // 当前目录下的文件
      //   // "filename" : "fujie.js",
      //   // "path": './index.js'
      // }]
    });
  }

  try {
    await main()
    
    const emailVerify = randomMath
    // ctx.state.
    const emailInfo = {
      email,
      emailVerify,
      nowTime: new Date()
    }

    // 将验证码信息保存数据库，用来注册的时候判断以及是否过期
    await service.saveEmailInfo(emailInfo);

    ctx.body = '验证码发送成功'

  } catch (err) {
    console.log(err)
  }
}


module.exports = {
  verifyUser,
  passwordHandle,
  verifyEmail,
  getEmailVerify
}