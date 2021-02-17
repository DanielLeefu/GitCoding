// dotenv 库  将根目录下面的东西加载到环境变量 在process.env里面
const dotenv = require('dotenv')

dotenv.config();

// console.log(process.env);
// console.log(process.env.APP_PORT);

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;