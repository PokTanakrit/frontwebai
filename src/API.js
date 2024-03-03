const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const data = {
    PID: '', // รหัสผู้ป่วย
    answer: {
        ans1: null,
        ans2: null,
        ans3: null,
        ans4: null,
        ans5: null,
        ans6: null,
        ans7: null,
        ans8: null
    },
    audio: {
        audio1: null,
        audio2: null,
        audio3: null,
        audio4: null,
        audio5: null,
        audio6: null,
        audio7: null,
        audio8: null
    },
    datetime: '' // เวลา
};



app.use(bodyParser.json());
app.use(cors())

app.get('/hi', (req, res) => {
    res.send("Hello world");
});

// Define a route to handle GET requests for retrieving all answers
app.get('/data', (req, res) => {
    // ส่งคำตอบทั้งหมดกลับไปยังผู้ใช้
    res.json(data);
});

app.get('/audio', (req, res) => {
    res.json(data.audio);
});



// Define a route to handle POST requests for answering questions
app.use(express.json());

app.post('/answer', (req, res) => {
    if (!req.body || Object.keys(req.body).length !== 1) {
        return res.status(400).json({ error: "Invalid data format" });
    }
    
    const key = Object.keys(req.body)[0];
    if (!data.answer.hasOwnProperty(key)) {
        return res.status(400).json({ error: "Invalid key" });
    }

    data.answer[key] = req.body[key];
    
    res.json({ message: "Answer received successfully" });
});


app.post('/PID', (req, res) => {
    // ตรวจสอบว่าคำขอถูกส่งมาแล้วและมีข้อมูลที่ถูกต้องหรือไม่
    if (!req.body || !req.body.PID) {
        return res.status(400).json({ error: "Invalid data format or missing PID" });
    }
    
    // ตรวจสอบค่า PID ว่ามีข้อมูลหรือไม่ และกำหนดค่าให้กับข้อมูล data
    data.PID = req.body.PID;
    
    // ส่งข้อความยืนยันการรับ PID กลับไปยังผู้ใช้
    res.json({ message: "PID received successfully" });
});





// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

// node API.js