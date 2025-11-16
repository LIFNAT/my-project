import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // ⬅️ เพิ่ม Link

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // สร้างข้อมูลอุปกรณ์ตัวอย่างเพื่อใช้ในการแสดงผล
  const userDevices = [
    { name: "iPhone 15 Pro", location: "Thailand", date: "Active now", icon: "mobile" },
    { name: "MacBook Pro M3", location: "Thailand", date: "Last used 2 days ago", icon: "laptop" },
    { name: "iPad Air", location: "Thailand", date: "Last used 5 hours ago", icon: "tablet" },
  ];

  // -----------------------------------------------------------------
  // ⬇️ Logic: การจัดการผู้ใช้ (Authentication Check) ⬇️
  // -----------------------------------------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      // ⬅️ เพิ่มข้อมูล Email และ Role จำลองหากไม่มี (สมมติว่าเป็น admin)
      setUser({
        ...userData,
        email: 'user@example.com', 
        role: userData.role || 'admin' // ใช้ role ที่มีอยู่ หรือ 'admin' เป็นค่า default
      });
    } else {
      console.log('User not logged in, redirecting to login.');
      // navigate('/login'); // *ควร uncomment บรรทัดนี้ในโปรเจกต์จริง*
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading profile...</p>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // ⬇️ ส่วน UI ที่ปรับปรุงใหม่ให้สวยงาม ⬇️
  // -----------------------------------------------------------------

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-gray-100">
      
      {/* 1. Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          <div className="flex items-center space-x-2">
            <Link to="/home" className="flex items-center space-x-2"> {/* ⬅️ เพิ่ม Link to="/home" */}
              {/* ⬇️ เปลี่ยน SVG Icon เป็น Icon บ้าน/โลโก้ที่สมบูรณ์ หรือลบ path เดิมที่ถูกย่อทิ้ง ⬇️ */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5 text-blue-600 dark:text-blue-400" viewBox="0 0 16 16">
                 <path d="M8 0a.5.5 0 0 0-.5.5v12.293l-2.646-2.647a.5.5 0 0 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0-.708-.708L8.5 12.793V.5A.5.5 0 0 0 8 0z"/> 
              </svg>
              <span className="text-xl font-semibold dark:text-white">Natty Web</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/profile" 
              className="hidden text-sm font-bold text-blue-600 dark:text-blue-400 sm:block" // ⬅️ เน้นสี เพราะอยู่หน้านี้
            >
              โปรไฟล์
            </Link>
            <Link 
              to="/cart" // ⬅️ เปลี่ยนเป็นตัวพิมพ์เล็ก
              className="hidden text-sm font-medium text-gray-600 transition hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400 sm:block"
            >
              ตะกร้า
            </Link>
            <span className="hidden text-sm text-gray-600 dark:text-gray-300 sm:block">
              สวัสดี, {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Main Content: Profile Dashboard */}
      <main className="mx-auto max-w-7xl p-6 py-12 lg:px-8">
        
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl">บัญชี</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            จัดการข้อมูลส่วนตัว, การรักษาความปลอดภัย, และอุปกรณ์ที่ใช้งานอยู่
          </p>
        </header>

        {/* Layout: Two Columns for Profile and Devices */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          
          {/* Column 1: Profile & Security (2/3 width on md) */}
          <div className="md:col-span-2 space-y-10">
            
            {/* Section 1: Personal Information Card */}
            <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900 md:p-10">
              <h2 className="mb-8 flex items-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                <svg className="mr-3 h-7 w-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                รายละเอียดโปรไฟล์
              </h2>
              
              {/* Profile Details Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                
                {/* Detail Item: Username */}
                <div className="pb-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ชื่อ</label>
                  <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-gray-200">{user.username}</p>
                </div>
                
                {/* Detail Item: Role */}
                <div className="pb-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ระดับผู้ใช้งาน</label>
                  <p className="mt-1 text-xl font-semibold capitalize text-green-600 dark:text-green-400">{user.role}</p>
                </div>

                {/* Detail Item: User ID */}
                <div className="pb-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">User ID</label>
                  <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-gray-200">{user.id}</p>
                </div>

                {/* Detail Item: Email (ตัวอย่าง) */}
                <div className="pb-2">
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">อีเมล</label>
                  {/* ⬅️ ใช้ user.email ที่ถูกกำหนดใน useEffect */}
                  <p className="mt-1 text-xl font-semibold text-gray-800 dark:text-gray-200">{user.email}</p> 
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 border-t border-gray-100 pt-6 dark:border-gray-800">
                <button
                  onClick={() => alert('ฟังก์ชันแก้ไขข้อมูลส่วนตัวยังไม่พร้อมใช้งาน!')}
                  className="rounded-full bg-blue-600 px-6 py-2 text-base font-medium text-white transition hover:bg-blue-700"
                >
                  แก้ไขข้อมูล
                </button>
                <button
                  onClick={() => alert('ฟังก์ชันเปลี่ยนรหัสผ่านยังไม่พร้อมใช้งาน!')}
                  className="rounded-full bg-gray-200 px-6 py-2 text-base font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </div>
            </div>

            {/* Section 2: Security & Logs Card (ตัวอย่าง) */}
            <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900 md:p-10">
              <h2 className="mb-6 flex items-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                <svg className="mr-3 h-7 w-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                ความปลอดภัยของบัญชี
              </h2>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="font-medium">Two-Factor Authentication</span>
                  <span className="text-green-500 font-semibold">Enabled</span>
                </li>
                <li className="flex justify-between items-center py-2 border-b dark:border-gray-700">
                  <span className="font-medium">Recent Login Location</span>
                  <span>Bangkok, Thailand</span>
                </li>
                <li className="flex justify-between items-center py-2">
                  <span className="font-medium">Last Password Change</span>
                  <span>2 months ago</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Column 2: My Devices (1/3 width on md) */}
          <div className="md:col-span-1">
            <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900 h-fit sticky top-24"> {/* ⬅️ เพิ่ม h-fit sticky top-24 */}
              <h2 className="mb-6 flex items-center text-2xl font-bold text-gray-900 dark:text-gray-100">
                <svg className="mr-2 h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                My Devices
              </h2>
              
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
                อุปกรณ์ที่กำลังใช้งานบัญชีนี้อยู่
              </p>
              
              {/* Device List */}
              <div className="space-y-4">
                {userDevices.map((device, index) => (
                  <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-b-0 last:pb-0 dark:border-gray-800">
                    
                    {/* Device Icon */}
                    <div className="flex-shrink-0">
                      {device.icon === 'mobile' && (
                        // iPhone SVG Icon
                        <svg className="h-7 w-7 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                      )}
                      {device.icon === 'laptop' && (
                        // Laptop SVG Icon
                        <svg className="h-7 w-7 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1l-.75-3M3 17h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                      )}
                      {device.icon === 'tablet' && (
                        // Tablet SVG Icon
                        <svg className="h-7 w-7 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M3 8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path></svg>
                      )}
                    </div>
                    
                    {/* Device Info */}
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{device.name}</p>
                      <p className={`text-sm ${device.date === 'Active now' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                        {device.date} - {device.location}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
              
              {/* Button to manage devices */}
              <button
                onClick={() => alert('ฟังก์ชันจัดการอุปกรณ์ทั้งหมด!')}
                className="mt-6 w-full rounded-full bg-gray-100 py-2 text-sm font-medium text-blue-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                Sign out of all devices
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Footer */}
      <footer className="mt-16 border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          <p>Copyright © 2025 My Apple Shop. All rights reserved.</p>
          <p className="mt-2">Inspired by Apple. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}