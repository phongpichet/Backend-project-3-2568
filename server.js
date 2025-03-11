require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const myMiddleware = require('./middleware/myMiddleware');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require ('./routes/orderRoutes');
const { verifyToken, verifyAdmin } = require('./middleware/authMiddleware');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(myMiddleware);

app.use('/api/products', verifyToken, productRoutes); // ป้องกัน API /products
app.use('/api/orders', verifyToken, orderRoutes); // ป้องกัน API /orders
app.use('/api/admin', verifyToken, verifyAdmin, adminRoutes); // เฉพาะ Admin เท่านั้น
app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);

app.get('/', (req, res) => {
    res.send('Secondhand Shop API is running...');
});
// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
