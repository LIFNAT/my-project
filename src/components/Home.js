// src/Home.js
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// -----------------------------------------------------------------
// ⬇️ NEW: Custom Hook สำหรับ Intersection Observer ⬇️
// -----------------------------------------------------------------
const useInView = (options) => {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // เมื่อ Section เข้ามาในมุมมอง (isIntersecting เป็น true)
      // เราตั้งให้เป็น true และหยุดการ Observe เพื่อให้ Fade In แค่ครั้งเดียว
      if (entry.isIntersecting) {
        setIntersecting(true);
        observer.unobserve(ref.current);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
};
// -----------------------------------------------------------------
// ⬆️ END: Custom Hook ⬆️
// -----------------------------------------------------------------


export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const heroImageRef = useRef(null);

  // ⬇️ NEW: ใช้ useInView สำหรับแต่ละ Section ⬇️
  // กำหนด threshold: 0.2 คือเมื่อ 20% ของ Section เข้ามาในมุมมองแล้ว
  const [productRef, productInView] = useInView({ threshold: 0.2 });
  const [promoRef, promoInView] = useInView({ threshold: 0.2 });
  const [talkRef, talkInView] = useInView({ threshold: 0.2 });
  const [launchRef, launchInView] = useInView({ threshold: 0.2 });
  // เพิ่ม ref สำหรับ Section ใหม่
  const [whyRef, whyInView] = useInView({ threshold: 0.2 }); 


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    } else {
      console.log('ยังไม่ได้ Login, เด้งกลับไปหน้า Login');
      navigate('/login');
    }
  }, [navigate]);

  // Scroll Handler สำหรับ Parallax Zoom Effect (จากโค้ดเดิม)
  const handleScroll = useCallback(() => {
    if (heroImageRef.current) {
      const scrollY = window.scrollY;
      const scaleFactor = 1 + scrollY * 0.0001; 
      const clampedScale = Math.min(scaleFactor, 1.15); 
      heroImageRef.current.style.transform = `scale(${clampedScale})`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
        <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  // Helper function เพื่อสร้างคลาสสำหรับ Fade In
  const getFadeClass = (isInView) => 
    `transition duration-1000 ease-out transform ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black dark:text-gray-100">
      
      {/* 1. Navigation Bar (เหมือนเดิม) */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-6">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 16 16">
              <path d="M11.182.008c..."/>
            </svg>
            <span className="text-xl font-semibold">Natty Web</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/profile" 
              className="hidden text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 sm:block"
            >
              โปรไฟล์
            </Link>
            <Link 
              to="/Cart" 
              className="hidden text-sm font-medium text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 sm:block"
            >
              ตระกร้า
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

      {/* 2. Main Content (ครอบเนื้อหาทั้งหมด) */}
      <main>
        
        {/* Hero Section (Parallax Zoom) */}
        <section className="relative flex h-screen items-center justify-center overflow-hidden text-white">
          <img 
            ref={heroImageRef} 
            src="https://i.pinimg.com/1200x/b6/18/1b/b6181bf23420bf83e5a4b01810894d70.jpg" 
            alt="Background"
            className="absolute left-0 top-0 h-full w-full object-cover transform-gpu scale-100 transition-none" 
            style={{ transform: 'scale(1)' }} 
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <p className="mb-4 text-5xl font-bold tracking-tight md:text-7xl">
              ยินดีต้อนรับสู่ Natty Web
            </p>
            <p className="mb-8 text-xl text-gray-200 md:text-2xl">
              ค้นพบโลกของเทคโนโลยีและจินตนาการไปพร้อมกับเรา
            </p>
            <a href="#products" className="rounded-full bg-white px-8 py-3 text-base font-semibold text-gray-900 transition hover:bg-gray-200">
              Explore Products
            </a>
          </div>
        </section>

        {/* 3. Product Grid (Fade In) */}
        <section 
          ref={productRef} 
          id="products" 
          className={`mx-auto max-w-7xl p-6 py-16 lg:px-8 ${getFadeClass(productInView)}`}
        >
          <h2 className="mb-12 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">New Releases</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            
            <div className="transform-gpu overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-900">
                <img src="https://www.ais.th/content/experience-fragments/ais/th/th_th/site/promotion/iphone17-vop-offer/iphone-17-device-coming-soon/_jcr_content/root/columncontrol_copy_c/content2/aiscontainer_v2_copy/aiscontainer_copy/aiscontainer_v2/image_copy_copy.coreimg.png/1757564233111/plp-iphone-17-pro.png" alt="iPhone" className="p-5 w-full h-60 object-contain" />
                <div className="p-6">
                    <h3 className="mb-2 text-2xl font-semibold">iPhone 17 Pro</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">The ultimate iPhone.</p>
                    <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Buy</button>
                </div>
            </div>
            <div className="transform-gpu overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-900">
                <img src="https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/mba-13inch-15inch.png" alt="MacBook" className="w-full h-60 object-contain" />
                <div className="p-6">
                    <h3 className="mb-2 text-2xl font-semibold">MacBook Air M4</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">Supercharged by M4.</p>
                    <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Learn more</button>
                </div>
            </div>
            <div className="transform-gpu overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-gray-900">
                <img src="https://www.ourfriday.co.uk/image/cache/catalog/Apple/apple-vision-pro-uk-1-2-800x800.png" alt="Vision Pro" className="w-full h-60 object-contain" />
                <div className="p-6">
                    <h3 className="mb-2 text-2xl font-semibold">Apple Vision Pro</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">Welcome to spatial computing.</p>
                    <button className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700">Buy</button>
                </div>
            </div>
            
          </div>
        </section>

        {/* 4. "สร้างฝัน" Promo Section (Fade In) */}
        <section 
          ref={promoRef}
          className={`mt-16 py-24 text-center ${getFadeClass(promoInView)}`}
        >
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <p className="text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
              สร้างฝันด้วย <span className="text-pink-400">จินตนาการ</span> และ <span className='text-blue-500'>เทคโนโลยี</span>
            </p>
          </div>
        </section>

        {/* 5. "How to talk" Image Section (Fade In) */}
        <section 
          ref={talkRef}
          className={`mx-auto max-w-7xl p-6 py-16 lg:px-8 ${getFadeClass(talkInView)}`}
        >
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            
            <div className="text-center md:text-left">
              <h3 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                เรียนรู้ วาดฝันไปด้วยกัน
              </h3>
              <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">
                ค้นหาตัวเองและเติมเต็มจินตนาการผ่านเทคโนโลยีที่ล้ำสมัย
              </p>
              <button className="rounded-full bg-blue-600 px-6 py-2.5 text-base font-medium text-white transition hover:bg-blue-700">
                อ่านเพิ่มเติม
              </button>
            </div>

            <div className='items-center'>
              <img 
                src="https://images.pexels.com/photos/1181715/pexels-photo-1181715.jpeg?cs=srgb&dl=pexels-divinetechygirl-1181715.jpg&fm=jpg" 
                alt="Feature article" 
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            
          </div>
        </section>
        
        {/* 6. "ปีใหม่ ของใหม่" Section (Fade In) */}
        <section 
          ref={launchRef}
          className={`mx-auto max-w-7xl p-6 py-24 text-center lg:px-8 ${getFadeClass(launchInView)}`}
        >
          <p className='text-6xl font-bold tracking-tight text-gray-900 dark:text-white md:text-8xl'>
            ปีใหม่<br />ของใหม่
          </p>
          <img 
            src="https://www.acs-dxb.com/uploads/2024/07/66a2c6f21c91b_1712319031126.png" 
            alt="iPhone 17 Launch" 
            className="mt-12 mx-auto w-full max-w-4xl rounded-2xl shadow-2xl"
          />
          <p className="mt-8 text-lg text-gray-600 dark:text-gray-400">
            เริ่มต้นปี 2026 ที่มาพร้อมฟีเจอร์สุดล้ำ
          </p>
          <button className="mt-6 rounded-full bg-blue-600 px-6 py-2.5 text-base font-medium text-white transition hover:bg-blue-700">
            สั่งซื้อล่วงหน้า
          </button>
        </section>

        {/* 7. ⬇️ NEW: "Why Natty Web" Feature Grid (Fade In) ⬇️ */}
        <section 
            ref={whyRef}
            className={`mx-auto max-w-7xl p-6 py-24 lg:px-8 ${getFadeClass(whyInView)}`}
        >
            <div className="text-center mb-16">
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    OUR CORE VALUES
                </p>
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
                    ทำไมต้อง Natty Web?
                </h2>
                <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
                    เรามุ่งมั่นที่จะนำเสนอประสบการณ์ที่ดีที่สุดสำหรับผู้ใช้งานทุกคน
                </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                
                {/* Feature 1 */}
                <div className="text-center p-6 rounded-xl  hover:shadow-2xl transition duration-300">
                    <div className="flex justify-center mb-4">
                        <svg className="h-10 w-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        Cloud-Powered
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        เข้าถึงข้อมูลและบริการได้อย่างรวดเร็วทุกที่ทุกเวลา ด้วยระบบคลาวด์ที่ทันสมัย
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="text-center p-6 rounded-xl  hover:shadow-2xl transition duration-300">
                    <div className="flex justify-center mb-4">
                        <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2zM4 16h16a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1a1 1 0 011-1z"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        User Privacy
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        ความปลอดภัยของข้อมูลส่วนบุคคลคือสิ่งที่เราให้ความสำคัญสูงสุด
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="text-center p-6 rounded-xl  hover:shadow-2xl transition duration-300">
                    <div className="flex justify-center mb-4">
                        <svg className="h-10 w-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l-2 1m2-1L9 3l3 3V19M12 19V6l2 1m-2-1l3 3V19M18 19V6l2 1m-2-1l-3 3V19M6 12h12"></path></svg>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                        Design Excellence
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        ประสบการณ์การใช้งานที่สวยงามและใช้งานง่าย (Intuitive UI/UX)
                    </p>
                </div>

            </div>
        </section>
        {/* ⬆️ END: "Why Natty Web" Feature Grid ⬆️ */}
        
      </main>

      {/* 8. Footer (เหมือนเดิม) */}
      <footer className="mt-16 border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
          <p>Copyright © 2025 My Apple Shop. All rights reserved.</p>
          <p className="mt-2">Inspired by Apple. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}