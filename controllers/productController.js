const db = require('../config/db');

// ดึงสินค้าทั้งหมด
exports.getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM Product';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json(results);
    });
};
// เพิ่มสินค้า
exports.addProduct = (req, res) => {
    const { User_ID, Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status } = req.body;

    if (!User_ID || !Product_name || !Price) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
    }

    const sql = 'INSERT INTO Product (User_ID, Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [User_ID, Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status], (err, result) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.status(201).json({ message: 'เพิ่มสินค้าสำเร็จ', productID: result.insertId });
    });
};

// แก้ไขสินค้า
exports.updateProduct = (req, res) => {
    const { Product_ID } = req.params;
    const { Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status } = req.body;

    const sql = 'UPDATE Product SET Product_name=?, Photo_ID=?, Catagory_ID=?, Product_amount=?, Details=?, Price=?, Product_status=? WHERE Product_ID=?';
    db.query(sql, [Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status, Product_ID], (err) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json({ message: 'แก้ไขสินค้าสำเร็จ' });
    });
};

// ลบสินค้า
exports.deleteProduct = (req, res) => {
    const { Product_ID } = req.params;

    const sql = 'DELETE FROM Product WHERE Product_ID = ?';
    db.query(sql, [Product_ID], (err) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json({ message: 'ลบสินค้าสำเร็จ' });
    });
};
