const sequelize = require('../config/database'); // Import sequelize

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();
console.log("Server is running...");

module.exports = { sequelize }; // ✅ ต้อง export ออกไปให้ server.js ใช้
