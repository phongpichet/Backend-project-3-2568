require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require ('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/products',productRoutes);
app.use('/api/orders',orderRoutes);

app.get('/', (req, res) => {
    res.send('Secondhand Shop API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
