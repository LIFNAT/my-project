import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Logins from './components/Logins'; // 1. Import หน้าที่สร้างไว้
import Home from './components/Home'; 
import Profile from './components/Profile'; 
import Cart from './components/Cart'; 
 // 1. Import หน้าที่สร้างไว้
import './App.css';

function App() {
  return (
    <div className="App">
      {/* 3. สร้างเมนูสำหรับกดเปลี่ยนหน้า */}
      

      {/* 4. กำหนดว่า URL ไหน จะให้แสดง Component อะไร */}
      <Routes>
        <Route path="/" element={<Logins />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;