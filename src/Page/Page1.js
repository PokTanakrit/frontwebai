import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Keyboard from './Keyboard'; // เรียกใช้ Component ของคีย์บอร์ด
import './form.css';
import './Page.css';
function Page1() {
    const [userId, setUserId] = useState(''); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้

    // เมื่อมีการเปลี่ยนแปลงใน userId ให้แสดงผลลัพธ์
    const handleInputChange = (input) => {
        if (input === 'Backspace') {
            // Remove the last character from the userId
            setUserId(prevUserId => prevUserId.slice(0, -1));
        } else {
            // Concatenate the input with the current userId and update the state
            setUserId(prevUserId => prevUserId + input);
        }
    };

    return (
        <div>
            <header style={{ textAlign: 'center' }}>หมายเลขบัตรประชาชน</header>
            {/* ใช้ input เพื่อแสดงผลข้อมูลผู้ใช้ */}
            <input
                type="text"
                value={userId}
            />
             <Link to="/page2"><button>ยืนยัน</button></Link>  
            {/* เรียกใช้ Component ของคีย์บอร์ดและส่งฟังก์ชัน handleInputChange ไป */}
            <Keyboard handleKeyClick={handleInputChange} />
        </div>
    );
}

export default Page1;
