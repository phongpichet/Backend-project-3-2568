const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    User_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    User_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Address: {
        type: DataTypes.STRING
    },
    Telephone: {
        type: DataTypes.STRING
    },
    Group_User: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'User',
    timestamps: false
});

module.exports = User;
