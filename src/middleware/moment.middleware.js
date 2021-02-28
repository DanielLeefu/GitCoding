const errorTypes = require('../constants/error-types')

const service = require('../service/auth.service');

// 当前用户有没有权限
const verifyPremission = async (ctx, next) => {

  const { momentId } = ctx.params
  const { id, name } = ctx.user;


  try {
    const result = await service.checkMoment(momentId, id)
    // 错误处理 TODO 
    if (!result) throw new Error();
    await next()

  } catch (error) {
    console.log(error)
  }

 

}


module.exports = {
  verifyPremission
}