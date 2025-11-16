import React, { useState, useEffect, useCallback } from 'react'; // ⬅️ เพิ่ม useState, useEffect, useCallback
import { useNavigate, Link } from 'react-router-dom';

// -------------------------------------------------------------
// ⬇️ Mock Data: รายการสินค้าในตะกร้าสินค้า ⬇️
// -------------------------------------------------------------
const mockCartItems = [
  {
    id: 101,
    name: 'iPhone 17 Pro',
    price: 49900,
    quantity: 1,
    image: 'https://cdn.pixabay.com/photo/2016/03/27/19/43/iphone-1282121_1280.jpg',
  },
  {
    id: 102,
    name: 'MacBook Air M4 (15-inch)',
    price: 54900,
    quantity: 1,
    image: 'https://cdn.pixabay.com/photo/2014/05/02/21/50/home-336214_1280.jpg',
  },
  {
    id: 103,
    name: 'Apple Vision Pro',
    price: 125000,
    quantity: 1,
    image: 'https://cdn.pixabay.com/photo/2023/12/12/03/10/apple-vision-pro-8444760_1280.png',
  },
];
// -------------------------------------------------------------


export default function Cart() { // ⬅️ เปลี่ยนชื่อเป็น export default function Cart()
  const navigate = useNavigate();
  // ⬇️ State สำหรับผู้ใช้และสินค้าในตะกร้า
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(mockCartItems);
  
  // -------------------------------------------------------------
  // ⬇️ Logic การจัดการผู้ใช้ (Authentication Check) ⬇️
  // -------------------------------------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      // หากไม่มีข้อมูลผู้ใช้ ให้เด้งไปหน้า Login
      console.log('User not logged in, redirecting to login.');
      // navigate('/login'); // *ควร uncomment บรรทัดนี้ในโปรเจกต์จริง*
    }
  }, [navigate]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/');
  }, [navigate]);
  // -------------------------------------------------------------


  // ⬇️ Logic สำหรับจัดการตะกร้าสินค้า ⬇️
  
  // คำนวณราคารวมทั้งหมด
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );
  const shippingFee = 0; // สมมติว่าค่าส่งฟรี
  const totalAmount = subtotal + shippingFee;

  // ฟังก์ชันลบสินค้า
  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  // ฟังก์ชันเพิ่ม/ลดจำนวน (จำลอง)
  const handleQuantityChange = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) } // จำนวนต้อง >= 1
          : item
      )
    );
  };
  
  // หากยังโหลดข้อมูลผู้ใช้ไม่เสร็จ
  if (!user) {
    // ในโปรเจกต์จริงควรตรวจสอบ user.role เพื่อแสดง Nav bar ที่เหมาะสม
    // แต่เพื่อความสมบูรณ์ในการแสดงผลโค้ดตัวอย่างนี้ เราจะให้แสดง Cart ไปก่อน
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
      
      {/* 1. Navigation Bar (นำมาจาก Home.js) */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          <div className="flex items-center space-x-2">
            <Link to="/home" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
                {/* SVG path ถูกย่อไว้ */}
                <path d="M11.182.008c..."/> 
              </svg>
              <span className="text-xl font-semibold dark:text-white">Natty Web</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/profile" 
              className="text-sm font-medium text-gray-600 transition hover:text-blue-700 dark:text-gray-300 dark:hover:text-blue-400"
            >
              โปรไฟล์
            </Link>
            <Link 
              to="/cart" 
              className="text-sm font-bold text-blue-600 dark:text-blue-400" // เน้นสีตระกร้าเมื่ออยู่หน้านี้
            >
              ตะกร้า ({cartItems.length})
            </Link>
            {user && ( // แสดงชื่อผู้ใช้ถ้า Login แล้ว
              <span className="hidden text-sm text-gray-600 dark:text-gray-300 sm:block">
                สวัสดี, {user.username}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="rounded-full bg-gray-200 px-4 py-1.5 text-sm font-medium text-gray-800 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Main Content: ตะกร้าสินค้า */}
      <div className="max-w-7xl mx-auto p-6 lg:p-12">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          <i className="fa-solid fa-cart-shopping mr-3"></i>ตะกร้าสินค้า ({cartItems.length})
        </h1>
        
        {cartItems.length === 0 ? (
          // ตะกร้าว่างเปล่า
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
            <p className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">ตะกร้าของคุณว่างเปล่า</p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">เริ่มเลือกสินค้าที่คุณชื่นชอบตอนนี้เลย!</p>
            <Link 
              to="/home" 
              className="rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition hover:bg-blue-700"
            >
              กลับไปหน้าแรก
            </Link>
          </div>
        ) : (
          // ตะกร้ามีสินค้า
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* 2.1 รายการสินค้า (ซ้าย) */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 transition duration-300 hover:shadow-lg">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-contain mr-6 rounded-lg border dark:border-gray-700"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.name}</h2>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                      ฿{item.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">รวม: ฿{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                  
                  {/* Quantity Control */}
                  <div className="flex items-center space-x-2 border rounded-full p-1 dark:border-gray-700 mr-4">
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="w-8 h-8 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      -
                    </button>
                    <span className="font-medium text-gray-900 dark:text-white w-4 text-center">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="w-8 h-8 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition"
                    title="ลบสินค้า"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* 2.2 สรุปการสั่งซื้อ (ขวา) */}
            <div className="lg:col-span-1 h-fit sticky top-24">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold mb-4 border-b pb-3 text-gray-900 dark:text-white dark:border-gray-700">
                  สรุปการสั่งซื้อ
                </h3>
                
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <div className="flex justify-between">
                    <span>ยอดรวม (Subtotal):</span>
                    <span className="font-semibold">฿{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง:</span>
                    <span className="font-semibold text-green-500">{shippingFee === 0 ? 'ฟรี' : `฿${shippingFee.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-dashed pt-4 mt-4 text-xl font-bold text-gray-900 dark:text-white">
                    <span>ยอดชำระทั้งหมด:</span>
                    <span className="text-blue-600 dark:text-blue-400">฿{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  className="mt-6 w-full rounded-full bg-green-600 py-3 text-base font-semibold text-white transition hover:bg-green-700 shadow-md"
                  onClick={() => alert(`ยืนยันการสั่งซื้อรวม ฿${totalAmount.toLocaleString()}!`)}
                >
                  ดำเนินการชำระเงิน
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}