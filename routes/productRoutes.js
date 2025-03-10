const express = require('express');
const { getAllProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.post('/', addProduct);
router.put('/:Product_ID', updateProduct);
router.delete('/:Product_ID', deleteProduct);

module.exports = router;
