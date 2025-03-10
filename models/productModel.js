const db = require('./db');

const createProduct = async (userId, productName, photoId, categoryId, amount, details, price, status) => {
    const sql = `INSERT INTO Product 
        (User_ID, Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.execute(sql, [userId, productName, photoId, categoryId, amount, details, price, status]);
    return result;
};

const getAllProducts = async () => {
    const sql = 'SELECT * FROM Product';
    const [rows] = await db.execute(sql);
    return rows;
};

const getProductById = async (productId) => {
    const sql = 'SELECT * FROM Product WHERE Product_ID = ?';
    const [rows] = await db.execute(sql, [productId]);
    return rows[0];
};

const updateProduct = async (productId, productName, categoryId, amount, details, price, status) => {
    const sql = `UPDATE Product 
        SET Product_name = ?, Catagory_ID = ?, Product_amount = ?, Details = ?, Price = ?, Product_status = ? 
        WHERE Product_ID = ?`;
    const [result] = await db.execute(sql, [productName, categoryId, amount, details, price, status, productId]);
    return result;
};

const deleteProduct = async (productId) => {
    const sql = 'DELETE FROM Product WHERE Product_ID = ?';
    const [result] = await db.execute(sql, [productId]);
    return result;
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
