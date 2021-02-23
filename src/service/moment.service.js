

const connection = require('../app/database')

class MomentService { 

  async create(userId, content) {
    const statement = `INSERT INTO moment (content, user_id) VALUES (?, ?);`;
    const result = await connection.execute(statement, [content, userId]);
    return result[0]
  }

  async momentDetail(momentId) {
    const statement = `SELECT moment.id id, moment.content content, moment.createTime createTime, moment.updateTime updateTime,
    JSON_OBJECT("id", users.id, "name", users.name) user
    FROM moment
    LEFT JOIN
    users ON moment.user_id = users.id WHERE moment.id = ?`;
    const [result] = await connection.execute(statement, [momentId]);

    return result[0]
  }

  async momentList(pageNumber, pageSize) {
    console.log(pageNumber, pageSize)
    const statement = `SELECT moment.id id, moment.content content, moment.createTime createTime, moment.updateTime updateTime,
    JSON_OBJECT("id", users.id, "name", users.name) user
    FROM moment
    LEFT JOIN
    users ON moment.user_id = users.id 
    LIMIT ?, ?;`;
    const [result] = await connection.execute(statement, [pageNumber, pageSize]);
    console.log(result, '---->result')
    return result
  }

}

module.exports = new MomentService();


/*
CREATE TABLE IF NOT EXISTS moment (
	id INT PRIMARY KEY AUTO_INCREMENT,
	content VARCHAR(1000) NOT NUll,
	user_id INT NOT NULL,
	createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY(user_id) REFERENCES users(id)
	
);

*/
