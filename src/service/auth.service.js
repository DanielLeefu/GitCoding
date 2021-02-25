const connection = require('../app/database')

class AuthService {


  async checkMoment(updateMoment, userId) {
    try {
        const statement = `SELECT * FROM moment WHERE id = ? && user_id = ?;`;
        const [result] = await connection.execute(statement, [updateMoment, userId]);
        return result.length === 0 ? false: true;
    } catch (error) {
      console.log(error);
    }
    
  }

  async getUserByName(name, email) {
    const statement = `SELECT * FROM users WHERE name = ? || email = ?;`;
    const result = await connection.execute(statement, [name, email]);
    return result[0];
  }

  // 登陆
  // async getUserByNames(name) {
  //   const statement = `SELECT * FROM users WHERE name = ?;`;
  //   const result = await connection.execute(statement, [name]);
  //   return result[0];
  // }

 


}

module.exports = new AuthService();