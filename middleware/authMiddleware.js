const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware ตรวจสอบ Token
exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'กรุณาเข้าสู่ระบบ' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // แนบข้อมูล user ไปกับ request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token ไม่ถูกต้อง' });
    }
};

// Middleware ตรวจสอบสิทธิ์ Admin
exports.verifyAdmin = (req, res, next) => {
    if (!req.user || req.user.Group_User !== 'admin') {
        return res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึง' });
    }
    next();
};
