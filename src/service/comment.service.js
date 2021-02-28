const connection = require('../app/database')

class CommentService {
  // 创建评论
  async createComment(momentId, content, id) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`;
    const result = await connection.execute(statement, [momentId, content, id]);
    return result[0]
  }

  // 回复评论
  async replyComment(momentId, content, commentId, id) {
    const statement = `INSERT INTO comment (moment_id, content, comment_id, user_id) VALUES (?, ?, ? ,?);`;
    const result = await connection.execute(statement, [momentId, content, commentId, id]);
    return result[0]
  }


  // 修改评论
  async updateComment(content, commentId) {
    const statement = `UPDATE comment SET content = ? WHERE id = ? ;`;
    const result = await connection.execute(statement, [content, commentId]);
    return result[0]
  }

  // 删除评论
  async deleteComment(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const result = await connection.execute(statement, [commentId]);
    return result[0]
  }

}

module.exports = new CommentService()