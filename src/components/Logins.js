import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// -------------------------------------------------------------
// ⬇️ Mock Database ⬇️
// -------------------------------------------------------------
const mockUsers = [
  { 
    id: 1, 
    username: 'admin', 
    password: '1234', 
    role: 'admin', 
    token: 'fake_jwt_admin_token_1234' 
  },
  { 
    id: 2, 
    username: 'user1', 
    password: '5678', 
    role: 'user', 
    token: 'fake_jwt_user_token_5678' 
  },
];
// -------------------------------------------------------------


export default function Logins() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault(); 
    setError('');

    try {
      // Logic การ Login... (ไม่เปลี่ยนแปลง)
      const foundUser = mockUsers.find(
        (user) => user.username === username && user.password === password
      );
      
      if (foundUser) {
        const userDataToStore = {
          id: foundUser.id,
          username: foundUser.username,
          role: foundUser.role,
          token: foundUser.token 
        };
        
        localStorage.setItem('user', JSON.stringify(userDataToStore));
        localStorage.setItem('authToken', userDataToStore.token);
        
        console.log(`Login สำเร็จ! User: ${foundUser.username} บันทึกข้อมูลลง LocalStorage แล้ว`);

        navigate('/home');

      } else {
        throw new Error('Username หรือ Password ไม่ถูกต้อง');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ'); 
    }
  };

  return (
    // ⬇️ ปรับปรุง Background สำหรับ Animation ⬇️
    <div className="
      min-h-screen flex items-center justify-center 
      
      /* 1. กำหนดขนาดของ Background ให้ใหญ่กว่าหน้าจอ */
      bg-gradient-to-r from-blue-400 via-indigo-500 to-pink-500 /* ⬅️ กำหนด 3 สีหลัก */
      bg-[size:400%_400%] /* ⬅️ ทำให้พื้นหลังใหญ่ขึ้น 4 เท่า */
      
      /* 2. เพิ่ม Animation Keyframes */
      animate-gradient-shift /* ⬅️ คลาสที่ต้องสร้างใน tailwind.config.js */

      /* 3. Dark Mode */
      dark:from-blue-500 dark:via-gray-800 dark:to-white
    ">

      {/* NOTE: ในโปรเจกต์จริง ต้องเพิ่มการตั้งค่านี้ในไฟล์ tailwind.config.js
        -------------------------------------------------------------
        module.exports = {
          theme: {
            extend: {
              animation: {
                'gradient-shift': 'gradient-shift 15s ease infinite',
              },
              keyframes: {
                'gradient-shift': {
                  '0%, 100%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                }
              }
            }
          }
        }
        -------------------------------------------------------------
      */}
      
      <form onSubmit={handleLogin} className="relative z-10 w-full max-w-sm rounded-xl bg-white p-8 shadow-2xl backdrop-blur-md dark:bg-gray-900/90 dark:text-gray-100">
        
        <div className="flex items-center justify-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600 dark:text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">Sign In</h2>
        </div>
        
        {/* Input: Username */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Username (ใช้: admin หรือ user1)</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white" 
            required
            placeholder="เช่น admin"
          />
        </div>
        
        {/* Input: Password */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Password (ใช้: 1234 หรือ 5678)</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
            placeholder="••••••••"
          />
        </div>

        {/* Error Message */}
        {error && <p className="mb-4 rounded-lg bg-red-100 p-3 text-sm font-medium text-red-700 dark:bg-red-900 dark:text-red-300">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit" 
          className="mt-4 w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-base font-semibold text-white transition duration-300 hover:bg-blue-700 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          เข้าสู่ระบบ
        </button>
        
        {/* Register Link */}
        <div className="mt-6 text-center text-sm">
            <p className="text-gray-600 dark:text-gray-400">
                ยังไม่มีบัญชี? 
                <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 ml-1 dark:text-blue-400 dark:hover:text-blue-500">
                    สมัครสมาชิก
                </Link>
            </p>
        </div>
        
      </form>
    </div>
  );
}