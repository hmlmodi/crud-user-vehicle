const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT || 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging in development mode
});


module.exports = sequelize;
