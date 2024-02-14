import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
      <header>
        <div className="container">
          <div className="kiosk-content">
            <body>ยินดีต้อนรับ</body>
            <body><Link to="/page1"><button>กดเพื่อเริ่ม</button></Link></body>
          </div>
        </div>
      </header>
  );
}

export default Home;

