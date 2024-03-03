const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();

// ให้ Express.js ใช้ middleware bodyParser เพื่อแปลงข้อมูลที่ส่งมาเป็น JSON
app.use(bodyParser.json());
// ให้ Express.js ใช้ middleware cors เพื่อจัดการ CORS
app.use(cors());

app.get('/hi', (req, res) => {
    res.send("Hello world");
});

// กำหนดเส้นทาง POST ที่ URL '/save-audio' เพื่อรับข้อมูลเสียงและบันทึกไฟล์
app.post('/save-audio', (req, res) => {
    const audioData = req.body.audio;

    // สร้างชื่อไฟล์จาก timestamp
    const filename = new Date().toISOString() + '.wav';

    // ระบุเส้นทางไปยังไฟล์ที่จะบันทึก
    const filePath = path.join(__dirname, 'src', 'audio', filename);

    // เขียนข้อมูลเสียงลงในไฟล์
    fs.writeFile(filePath, audioData, 'base64', (err) => {
        if (err) {
            console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', err);
            res.status(500).send('เกิดข้อผิดพลาดในการบันทึกไฟล์');
        } else {
            console.log('บันทึกไฟล์เสียงสำเร็จ:', filename);
            res.send('บันทึกไฟล์เสียงสำเร็จ');
        }
    });
});

// เริ่มเซิร์ฟเวอร์ที่พอร์ต 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`เซิร์ฟเวอร์เริ่มทำงานที่ http://localhost:${PORT}`);
});
