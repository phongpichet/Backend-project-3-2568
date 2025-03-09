const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// สมัครสมาชิก
exports.register = async (req, res) => {
    console.log("register")
    const { username, password, location, telephone } = req.body;
    let groupUser=2

    if (!username || !password || !location || !telephone) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (Username, Password, Location_ID, Telephone,Group_User) VALUES (?, ?, ?, ?,?)';
        db.query(sql, [username, hashedPassword, location, telephone,groupUser], (err, result) => {
            if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });
            res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ' });
        });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// เข้าสู่ระบบ
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err });

        if (results.length === 0) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'เข้าสู่ระบบสำเร็จ', token });
    });
};
