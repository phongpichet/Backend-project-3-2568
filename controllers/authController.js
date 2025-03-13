const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// สมัครสมาชิกใหม่
exports.register = async (req, res) => {
    try {
        const { username, password, address, telephone } = req.body;
        const groupUser = 2; // ค่าเริ่มต้น

        if (!username || !password || !address || !telephone) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

        // เช็คว่ามีชื่อผู้ใช้งานนี้แล้วหรือยัง
        const existingUser = await User.findOne({ where: { Username: username } });
        if (existingUser) {
            return res.status(400).json({ message: 'ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว' });
        }

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        // สร้าง User ใหม่
        await User.create({
            Username: username,
            Password: hashedPassword,
            Address: address,
            Telephone: telephone,
            Group_User: groupUser
        });

        res.status(201).json({ message: 'สมัครสมาชิกสำเร็จ' });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};

// เข้าสู่ระบบ
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบ' });
        }

        // ค้นหาผู้ใช้
        const user = await User.findOne({ where: { Username: username } });
        if (!user) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        // สร้าง JWT Token
        const token = jwt.sign(
            { id: user.User_ID, username: user.Username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ message: 'เข้าสู่ระบบสำเร็จ', token });
    } catch (error) {
        res.status(500).json({ message: 'เกิดข้อผิดพลาด', error });
    }
};
