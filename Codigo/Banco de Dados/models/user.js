// models/User.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('smartlockdb', 'postgres', 'senha1234', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  doorPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sincroniza o modelo com o banco de dados
User.sync();

module.exports = User;
