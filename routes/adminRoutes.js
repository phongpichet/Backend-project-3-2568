const express = require('express');
const router = express.Router();

// ตัวอย่าง API ที่เฉพาะ Admin เข้าถึงได้
router.get('/dashboard', (req, res) => {
    res.json({ message: 'Welcome to Admin Dashboard' });
});

module.exports = router;
