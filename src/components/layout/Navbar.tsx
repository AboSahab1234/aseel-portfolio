'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/constants/config';

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

  // عناصر التنقل (تم إضافة رابط جوائز رمضان)
  const navItems = [
    { href: '#home', label: '🏠 الرئيسية' },
    { href: '#about', label: '👤 عني' },
    { href: '#experience', label: '💼 الخبرات' },
    { href: '#skills', label: '🛠️ المهارات' },
    { href: '#contact', label: '📞 تواصل' },
    // الرابط الجديد لصفحة رمضان
    { href: '/ramadan-gifts', label: '🎁 جوائز رمضان', isSpecial: true },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-3' 
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
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center transition-transform group-hover:rotate-6 ${
                scrolled ? 'shadow-lg' : 'shadow-xl'
              }`}>
                <span className="text-white font-bold text-xl">💻</span>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  {siteConfig?.site?.name || 'أصيل الصبري'}
                </div>
                <div className={`text-xs font-medium transition-all ${
                  scrolled ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {siteConfig?.bio?.summary || 'مطور ويب وحلول رقمية'}
                </div>
              </div>
            </Link>

            {/* روابط التنقل - شاشات كبيرة */}
            <div className="hidden md:flex items-center space-x-1 space-x-reverse">
              {navItems.map((item) => {
                // إذا كان الرابط خاصًا بصفحة رمضان، نعطيه تصميمًا مميزًا
                if (item.isSpecial) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="px-4 py-2 text-amber-600 hover:text-amber-700 font-bold rounded-lg hover:bg-amber-50 transition-all duration-300 group relative flex items-center gap-1"
                    >
                      <span className="text-xl">{item.label.split(' ')[0]}</span>
                      <span>{item.label.slice(2)}</span>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  );
                }
                // الروابط العادية (داخل الصفحة)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50/50 transition-all duration-300 group relative"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
              <a 
                href={siteConfig?.contact?.whatsapp?.link || 'https://wa.me/967781756747'}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 transition-all mr-4"
              >
                💬 واتساب
              </a>
            </div>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-gray-100 text-gray-700 hover:text-blue-600 transition-all"
              aria-label="فتح القائمة"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* قائمة الجوال */}
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        
        <div className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <span className="text-xl font-bold text-blue-600">القائمة</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-red-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                if (item.isSpecial) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center p-4 rounded-xl bg-amber-50 text-amber-700 font-bold transition-colors"
                    >
                      <span className="text-2xl ml-3">{item.label.split(' ')[0]}</span>
                      <span>{item.label.slice(2)}</span>
                    </Link>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-4 rounded-xl hover:bg-blue-50 text-gray-700 font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t pt-6">
              <a 
                href={siteConfig?.contact?.whatsapp?.link || 'https://wa.me/967781756747'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-600 text-white py-4 rounded-2xl flex items-center justify-center font-bold shadow-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                تواصل واتساب الآن
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}