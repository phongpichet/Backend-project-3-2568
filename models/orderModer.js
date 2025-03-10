const db = require('./db');

const createOrder = async (groupOrderId, orderName, orderAmount, productId, userId, totalPrice, orderStatus, orderDetail) => {
    const sql = `INSERT INTO \`Order\` 
        (GroupOrder_ID, Order_name, Order_amount, Product_ID, User_ID, Total_Price, Order_status, Order_detail) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [groupOrderId, orderName, orderAmount, productId, userId, totalPrice, orderStatus, orderDetail]);
    return result;
};

const getAllOrders = async () => {
    const sql = 'SELECT * FROM `Order`';
    const [rows] = await db.execute(sql);
    return rows;
};

const getOrderById = async (orderId) => {
    const sql = 'SELECT * FROM `Order` WHERE Order_ID = ?';
    const [rows] = await db.execute(sql, [orderId]);
    return rows[0];
};

const updateOrderStatus = async (orderId, orderStatus) => {
    const sql = 'UPDATE `Order` SET Order_status = ? WHERE Order_ID = ?';
    const [result] = await db.execute(sql, [orderStatus, orderId]);
    return result;
};

const deleteOrder = async (orderId) => {
    const sql = 'DELETE FROM `Order` WHERE Order_ID = ?';
    const [result] = await db.execute(sql, [orderId]);
    return result;
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    deleteOrder
};
