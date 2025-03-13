const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ตรวจสอบเส้นทางให้ถูกต้อง

const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

module.exports = User;
