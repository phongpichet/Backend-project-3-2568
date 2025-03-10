const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllProducts); // ทุกคนเข้าถึงได้
router.post('/', verifyToken, addProduct); // ต้อง Login ก่อน
router.put('/:Product_ID', verifyToken, updateProduct); // ต้อง Login ก่อน
router.delete('/:Product_ID', verifyToken, deleteProduct); // ต้อง Login ก่อน

module.exports = router;
