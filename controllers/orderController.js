const db = require('../config/db');

// ดึงคำสั่งซื้อทั้งหมด
exports.getAllOrders = (req, res) => {
    const sql = `
        SELECT o.*, p.Product_name, u.User_name 
        FROM \`orders\` o
        JOIN Product p ON o.Product_ID = p.Product_ID
        JOIN User u ON o.User_ID = u.User_ID
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json(results);
    });
};

// ดึงคำสั่งซื้อเฉพาะของผู้ใช้
exports.getOrdersByUser = (req, res) => {
    const { User_ID } = req.params;
    const sql = `
        SELECT o.*, p.Product_name 
        FROM \`orders\` o
        JOIN Product p ON o.Product_ID = p.Product_ID
        WHERE o.User_ID = ?
    `;
    db.query(sql, [User_ID], (err, results) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json(results);
    });
};

// สร้างคำสั่งซื้อ
exports.createOrder = (req, res) => {
    const { GroupOrder_ID, Order_name, Order_amount, Product_ID, User_ID, Total_Price, Order_status, Order_detail } = req.body;

    
    if (!Order_name || !Order_amount || (Product_ID==null) || !User_ID || !Total_Price) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ'});
    }

    const sql = `
        INSERT INTO \`orders\` (GroupOrder_ID, Order_name, Order_amount, Product_ID, User_ID, Total_Price, Order_status, Order_detail)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [GroupOrder_ID, Order_name, Order_amount, Product_ID, User_ID, Total_Price, Order_status, Order_detail], (err, result) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.status(201).json({ message: 'สร้างคำสั่งซื้อสำเร็จ', orderID: result.insertId });
    });
};

// แก้ไขสถานะคำสั่งซื้อ
exports.updateOrderStatus = (req, res) => {
    const { Order_ID } = req.params;
    const { Order_status } = req.body;

    const sql = 'UPDATE `orders` SET Order_status = ? WHERE Order_ID = ?';
    db.query(sql, [Order_status, Order_ID], (err) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json({ message: 'อัปเดตสถานะคำสั่งซื้อสำเร็จ' });
    });
};

// ลบคำสั่งซื้อ
exports.deleteOrder = (req, res) => {
    const { Order_ID } = req.params;

    const sql = 'DELETE FROM `orders` WHERE Order_ID = ?';
    db.query(sql, [Order_ID], (err) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
        res.json({ message: 'ลบคำสั่งซื้อสำเร็จ' });
    });
};
