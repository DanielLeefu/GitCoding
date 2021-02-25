const errorTypes = require('../constants/error-types')

const service = require('../service/auth.service');


const verifyPremission = async (ctx, next) => {

  const { updateMoment } = ctx.params
  const { id, name } = ctx.user;


  try {
    const result = await service.checkMoment(updateMoment, id)
    if (!result) throw new Error();
    await next()

  } catch (error) {
    console.log(error)
  }

 

}


module.exports = {
  verifyPremission
}