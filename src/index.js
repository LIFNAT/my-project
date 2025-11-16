import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // 1. Import เข้ามา

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* 2. นำ BrowserRouter มาหุ้ม <App /> */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);