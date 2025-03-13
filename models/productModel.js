const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');
const User = require('./User');

const Order = sequelize.define('Order', {
    Order_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    GroupOrder_ID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Order_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Order_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Total_Price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Order_status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    },
    Order_detail: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'orders',
    timestamps: true
});

// กำหนดความสัมพันธ์
Order.belongsTo(Product, { foreignKey: 'Product_ID' });
Order.belongsTo(User, { foreignKey: 'User_ID' });

module.exports = Order;