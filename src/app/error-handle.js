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
        message = '用户已存在';
        break;
    case errorTypes.NAME_NOTHAS :
      status = 409;
      message = '用户不存在';
      break;
    case errorTypes.PASSWORDNOT :
      status = 409;
      message = '用户密码错误';
      break;
    default: 
      status = 404;
      message = 'NOT FOUND';
  }

  ctx.status = status;
  ctx.body = message;

}

module.exports = errorHandler;