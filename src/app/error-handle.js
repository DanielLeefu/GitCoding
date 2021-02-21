const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {

  let status, message;
  switch (error.message) {
    case  errorTypes.NAME_OR_PASSWORD :
      status = 400;
      message = '用户名密码不能为空';
      break;
    case  errorTypes.NAME_REBASE :
        status = 409;
        message = '用户名已存在';
        break;
    case errorTypes.NAME_NOTHAS :
      status = 409;
      message = '用户不存在';
      break;
    case errorTypes.PASSWORDNOT :
      status = 409;
      message = '用户密码错误';
      break;
    case errorTypes.TOKENISEXIT:
      status = 401;
      message = 'token无效'
      break;
      case errorTypes.EMAILHAS:
        status = 409;
        message = '邮箱已经被注册'
        break;
        case errorTypes.EMAILNOTEXIT:
          status = 409;
          message = '邮箱格式错误'
          break;
    case errorTypes.EMAILERROR:
      status = 409;
      message = '验证码或邮箱错误'
      break;
      case errorTypes.EMAILTIME:
        status = 409;
        message = '验证码过期'
        break;
    default: 
      status = 404;
      message = 'NOT FOUND';
  }

  ctx.status = status;
  ctx.body = message;

}

module.exports = errorHandler;