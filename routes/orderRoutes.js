const express = require('express');
const { getAllOrders, getOrdersByUser, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const router = express.Router();

router.get('/', getAllOrders); // ดึงคำสั่งซื้อทั้งหมด
router.get('/:User_ID', getOrdersByUser); // ดึงคำสั่งซื้อของผู้ใช้
router.post('/', createOrder); // สร้างคำสั่งซื้อ
router.put('/:Order_ID', updateOrderStatus); // แก้ไขสถานะคำสั่งซื้อ
router.delete('/:Order_ID', deleteOrder); // ลบคำสั่งซื้อ

module.exports = router;
