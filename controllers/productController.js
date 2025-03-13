const { Product } = require('../models');

// ดึงสินค้าทั้งหมด
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// เพิ่มสินค้า
exports.addProduct = async (req, res) => {
    try {
        const { User_ID, Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status } = req.body;

        if (!User_ID || !Product_name || !Price) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

        const product = await Product.create({
            User_ID, Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status
        });

        res.status(201).json({ message: 'เพิ่มสินค้าสำเร็จ', productID: product.Product_ID });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// แก้ไขสินค้า
exports.updateProduct = async (req, res) => {
    try {
        const { Product_ID } = req.params;
        const { Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status } = req.body;

        const product = await Product.update(
            { Product_name, Photo_ID, Catagory_ID, Product_amount, Details, Price, Product_status },
            { where: { Product_ID } }
        );

        if (product[0] === 0) return res.status(404).json({ message: 'ไม่พบสินค้า' });

        res.json({ message: 'แก้ไขสินค้าสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// ลบสินค้า
exports.deleteProduct = async (req, res) => {
    try {
        const { Product_ID } = req.params;

        const deleted = await Product.destroy({ where: { Product_ID } });

        if (!deleted) return res.status(404).json({ message: 'ไม่พบสินค้า' });

        res.json({ message: 'ลบสินค้าสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};
