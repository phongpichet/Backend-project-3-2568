const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // เชื่อมต่อกับ database
const User = require('./User'); // Import User model
const Photo = require('./Photo'); // Import Photo model
const Category = require('./Category'); // Import Category model

const Product = sequelize.define('Product', {
    Product_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    User_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'User_ID'
        }
    },
    Product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Photo_ID: {
        type: DataTypes.INTEGER,
        references: {
            model: Photo,
            key: 'Photo_ID'
        }
    },
    Catagory_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'Catagory_ID'
        }
    },
    Product_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Details: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Product_status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Product',
    timestamps: false
});

module.exports = Product;