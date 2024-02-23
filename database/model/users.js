const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      isNumeric: {
        msg: 'Phone must be a valid number.',
      },
    },
  },
  location: {
    type: DataTypes.FLOAT(10, 8),
    allowNull: true,
  },
});

module.exports = User;
