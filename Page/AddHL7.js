import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import './Page.css';
import axios from 'axios'; 

function Addhl7() {
    const [userId, setUserId] = useState(''); // สร้าง state สำหรับเก็บข้อมูลผู้ใช้
    const [SYS , setSYS] = useState('') //ความดันสูงสุด
    const [DIA , setDIA] = useState('') //ความดันต่ำสุด
    const [PUL , setPUL] = useState('') //อัตราการเต้นของหัวใจ
    const handleConfirm = () => {
        console.log(userId); 
    
        axios.post('http://127.0.0.1:5000/addhl7', {
            PID: userId,
            SYS: SYS,
            DIA: DIA,
            PUL: PUL
        })
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };
    const handleCancel = () => {
        setUserId('');
        setSYS('');
        setDIA('');
        setPUL('');
    }

    return (
        <div>
            <header className="flex-container">
                <div className="circle blue"><span>1</span></div> 
                <div className="circle white"><span>2</span></div> 
                <div className="circle white"><span>3</span></div> 
            </header>
            <body>
                <div className='panelmain'>
                    <div className="panelcontainer"> 
                        <div style={{ color: '#062D62' }}>เพิ่มข้อมูลHL7</div>
                        <div className="paneldisplay">
                            <div style={{ position: 'relative', left: '15px' }}>PID:<input className="input-field" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="PID" /> </div>
                            <div style={{ position: 'relative', left: '15px' }}>ความดันสูงสุด:<input className="input-field" type="text" value={SYS} onChange={(e) => setSYS(e.target.value)} placeholder="ความดันสูงสุด" /></div>
                            <div style={{ position: 'relative', left: '15px' }}>ความดันต่ำสุด:<input className="input-field" type="text" value={DIA} onChange={(e) => setDIA(e.target.value)} placeholder="ความดันต่ำสุด" /></div>
                            <div style={{ position: 'relative', left: '15px' }}>อัตราการเต้นของหัวใจ:<input className="input-field" type="text" value={PUL} onChange={(e) => setPUL(e.target.value)} placeholder="อัตราการเต้นของหัวใจ" /></div>
                        </div>
                        <div className="center-container">
                            <div className="button-container">
                            </div>
                            <div style={{ margin: '20px' }}>
                                <button onClick={handleCancel} style={{ background: '#ff5b5b'  }}>ยกเลิก</button>
                                <span className="button-gap"></span>
                                <span className="button-gap"></span>
                                <Link to="/page2"><button onClick={handleConfirm} style={{ background: '#C1FF72'  }}>ยืนยัน</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    );
}

export default Addhl7;
