const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
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

// Hook para criptografar senhas
User.beforeCreate(async (user) => {
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
  user.doorPassword = await bcrypt.hash(user.doorPassword, saltRounds);
});

module.exports = User;
