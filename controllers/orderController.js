const { Order, Product, User } = require('../models');

// ดึงคำสั่งซื้อทั้งหมด
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll({
            include: [
                { model: Product, attributes: ['Product_name'] },
                { model: User, attributes: ['User_name'] }
            ]
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// ดึงคำสั่งซื้อเฉพาะของผู้ใช้
exports.getOrdersByUser = async (req, res) => {
    try {
        const { User_ID } = req.params;
        const orders = await Order.findAll({
            where: { User_ID },
            include: { model: Product, attributes: ['Product_name'] }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// สร้างคำสั่งซื้อ
exports.createOrder = async (req, res) => {
    try {
        const { GroupOrder_ID, Order_name, Order_amount, Product_ID, User_ID, Total_Price, Order_status, Order_detail } = req.body;

        if (!Order_name || !Order_amount || Product_ID == null || !User_ID || !Total_Price) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

        const order = await Order.create({
            GroupOrder_ID, Order_name, Order_amount, Product_ID, User_ID, Total_Price, Order_status, Order_detail
        });
        res.status(201).json({ message: 'สร้างคำสั่งซื้อสำเร็จ', orderID: order.Order_ID });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// แก้ไขสถานะคำสั่งซื้อ
exports.updateOrderStatus = async (req, res) => {
    try {
        const { Order_ID } = req.params;
        const { Order_status } = req.body;

        await Order.update({ Order_status }, { where: { Order_ID } });
        res.json({ message: 'อัปเดตสถานะคำสั่งซื้อสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// ลบคำสั่งซื้อ
exports.deleteOrder = async (req, res) => {
    try {
        const { Order_ID } = req.params;
        await Order.destroy({ where: { Order_ID } });
        res.json({ message: 'ลบคำสั่งซื้อสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};