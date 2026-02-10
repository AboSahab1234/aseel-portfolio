'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: '🏠 الرئيسية' },
    { href: '#about', label: '👤 عني' },
    { href: '#experience', label: '💼 الخبرات' },
    { href: '#skills', label: '🛠️ المهارات' },
    { href: '#contact', label: '📞 تواصل' },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`} dir="rtl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* الشعار */}
            <Link 
              href="#home" 
              className="flex items-center space-x-3 space-x-reverse group"
              aria-label="الرئيسية"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110 ${
                scrolled ? 'shadow-lg' : 'shadow-xl'
              }`}>
                <span className="text-white font-bold text-xl">أ</span>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                 اصيل عبدالجليل الصبري
                </div>
                <div className={`text-sm transition-all ${
                  scrolled ? 'text-gray-600' : 'text-gray-500'
                }`}>
                  مطور ويب متخصص
                </div>
              </div>
            </Link>

            {/* روابط التنقل - شاشات كبيرة */}
            <div className="hidden md:flex items-center space-x-1 space-x-reverse">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300 group"
                  aria-label={item.label.replace(/[^\w\s]/gi, '')}
                >
                  {item.label}
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></span>
                </a>
              ))}
                <a 
                  href="https://wa.me/967781756747" 
                  target="_blank"
                  className="btn-primary mr-4"
                >
                  💬 واتساب
                </a>
            </div>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={isMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* قائمة الجوال */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
        isMenuOpen 
          ? 'opacity-100 visible' 
          : 'opacity-0 invisible'
      }`}>
        {/* خلفية معتمة */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        ></div>
        
        {/* القائمة المنزلقة */}
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            {/* رأس القائمة */}
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">أ</span>
                </div>
                <div>
                  <div className="font-bold text-gray-900">اصيل عبدالجليل</div>
                  <div className="text-sm text-gray-600">مطور ويب متخصص</div>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
                aria-label="إغلاق القائمة"
              >
                ✕
              </button>
            </div>

            {/* عناصر القائمة */}
            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <span className="font-medium">{item.label}</span>
                  <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              ))}
            </div>

            {/* زر التواصل في القائمة */}
            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <a href="#contact" className="w-full btn-primary block text-center">
                📨 تواصل معي
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}