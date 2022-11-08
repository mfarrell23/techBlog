const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
//.env variables
console.log('this is my db name ' + process.env.DB_NAME)
if (process.env.blogdb_URL) {
  sequelize = new Sequelize(process.env.blogdb_URL);
} else {
  sequelize = new Sequelize(
  // console.log(process.env.JAWSDB_URL)
  // if (process.env.JAWSDB_URL !== undefined) {
  //   sequelize = new Sequelize(process.env.JAWSDB_URL);
  // } else {
  //   sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: 3306,
      }
    );
}

module.exports = sequelize;

