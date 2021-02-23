const connection = require('../app/database')

class UserService {

  async create(user) {
    console.log(user)
    const { name, password, email } = user;
    //  将用户数据保存到数据库
    const statement = `
     INSERT INTO users (name, password, email) VALUES (?, ?, ?);
    `
    const result = await connection.execute(statement, [name, password, email]);
    return result;
  }

  // 注册 
  async getUserByName(name, email) {
    const statement = `SELECT * FROM users WHERE name = ? || email = ?;`;
    const result = await connection.execute(statement, [name, email]);
    return result[0];
  }

  // 登陆
  async getUserByNames(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }

  async getUserEmail(email) {
    const statement = `SELECT * FROM users WHERE email = ?;`;
    const result = await connection.execute(statement, [email]);
    return result[0];
  }


  // 保存验证码以及邮箱
  async saveEmailInfo(emailInfo) {
    const {email, emailVerify, nowTime} = emailInfo;
    const statement = `SELECT * FROM emailverify WHERE email = ?;`;
    const result = await connection.execute(statement, [email]);
    if (!result[0].length) {
      // 插入
      const statement = `INSERT INTO emailverify (email, num, createTime) VALUES (?, ?, ?);`;
      const result = await connection.execute(statement, [email, emailVerify, nowTime]);
      return;
    } else {
      // 更新
      const statement = `UPDATE emailverify SET num = ?, createTime = ? WHERE email = ?;`;
      const result = await connection.execute(statement, [emailVerify, nowTime, email]);
      return;
    }
  }


  async getEmailverifyEmail(email, code) {
    const statement = `SELECT * FROM emailverify WHERE email = ? && num = ?;`;
    const result = await connection.execute(statement, [email, code]);
    // console.log(result[0], '---shujuku gueu')
    return result[0];
  }


}

module.exports = new UserService();