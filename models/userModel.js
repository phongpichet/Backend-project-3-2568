const db = require('./db');

const createUser = async (username, password, address, telephone, groupUser) => {
    const sql = 'INSERT INTO User (User_name, Password_name, Address, Telephone, Group_User) VALUES (?, ?, ?, ?, ?)';
    const [result] = await db.execute(sql, [username, password, address, telephone, groupUser]);
    return result;
};

const getUserByUsername = async (username) => {
    const sql = 'SELECT * FROM User WHERE User_name = ?';
    const [rows] = await db.execute(sql, [username]);
    return rows[0]; // คืนค่าเฉพาะ user ที่พบ
};

const getUserById = async (userId) => {
    const sql = 'SELECT * FROM User WHERE User_ID = ?';
    const [rows] = await db.execute(sql, [userId]);
    return rows[0]; // คืนค่าเฉพาะ user ที่พบ
};

const updateUser = async (userId, username, address, telephone) => {
    const sql = 'UPDATE User SET User_name = ?, Address = ?, Telephone = ? WHERE User_ID = ?';
    const [result] = await db.execute(sql, [username, address, telephone, userId]);
    return result;
};

const deleteUser = async (userId) => {
    const sql = 'DELETE FROM User WHERE User_ID = ?';
    const [result] = await db.execute(sql, [userId]);
    return result;
};

module.exports = {
    createUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser
};
