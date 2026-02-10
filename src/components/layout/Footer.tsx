'use client';

import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const socialLinks = [
    { icon: '🐙', label: 'GitHub', href: 'https://github.com/AboSahabHezam' },
    { icon: '💼', label: 'LinkedIn', href: '#' },
    { icon: '🐦', label: 'Twitter', href: '#' },
    { icon: '📷', label: 'Instagram', href: '#' },
  ];

  const quickLinks = [
    { label: 'الرئيسية', href: '#home' },
    { label: 'عني', href: '#about' },
    { label: 'الخبرات', href: '#experience' },
    { label: 'المهارات', href: '#skills' },
    { label: 'التواصل', href: '#contact' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`شكراً للاشتراك! سيصلك كل جديد على: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* الجزء العلوي */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* معلومات الموقع */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-xl font-bold">أ</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">اصيل عبدالجليل</h3>
                <p className="text-gray-400 text-sm">نافذتي إلى العالم</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              موقعي الشخصي لعرض مهاراتي وخبراتي في تطوير الويب، ومشاركة معرفتي مع العالم.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 rounded-xl bg-gray-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 flex items-center justify-center text-xl transition-all hover:scale-110"
                  title={social.label}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* روابط سريعة */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative pb-3">
              روابط سريعة
              <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                    aria-label={link.label}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">←</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* معلومات التواصل */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative pb-3">
              تواصل معي
              <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full"></span>
            </h4>
            <div className="space-y-4">
              <a href="tel:+967781756747" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  📞
                </div>
                <div>
                  <div className="font-medium">+967 781756747</div>
                  <div className="text-sm text-gray-400">اتصل بي</div>
                </div>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  📍
                </div>
                <div>
                  <div className="font-medium">مأرب / حي الشركة</div>
                  <div className="text-sm text-gray-400">الموقع</div>
                </div>
              </div>
              <a href="mailto:" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500 transition-colors">
                  ✉️
                </div>
                <div>
                  <div className="font-medium">أرسل بريداً</div>
                  <div className="text-sm text-gray-400">اضغط هنا</div>
                </div>
              </a>
            </div>
          </div>

          {/* النشرة البريدية */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative pb-3">
              النشرة البريدية
              <span className="absolute bottom-0 right-0 w-12 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"></span>
            </h4>
            <p className="text-gray-300 mb-6">
              اشترك لتصلك آخر التحديثات والمقالات التقنية
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500"
                  required
                  aria-label="البريد الإلكتروني للاشتراك"
                />
                <button
                  type="submit"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                  aria-label="اشتراك"
                >
                  اشتراك
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                لن نشارك بريدك مع أي طرف ثالث
              </p>
            </form>
          </div>
        </div>

        {/* خط فاصل */}
        <div className="border-t border-gray-700 my-8"></div>

        {/* حقوق النشر */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © {currentYear} <span className="text-white font-semibold">اصيل عبدالجليل</span>. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              مصمم ومطور بكل ❤️ باستخدام Next.js, React, و Tailwind CSS
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
              شروط الاستخدام
            </a>
            <div className="flex items-center gap-2 text-gray-500">
              <span>🔄 تم التحديث اليوم</span>
            </div>
          </div>
        </div>

        {/* إحصائيات صغيرة */}
        <div className="mt-8 pt-6 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">99.9%</div>
            <div className="text-gray-400 text-sm">سرعة التحميل</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">100%</div>
            <div className="text-gray-400 text-sm">تجاوبية</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-400">SEO</div>
            <div className="text-gray-400 text-sm">مُحسّن</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">HTTPS</div>
            <div className="text-gray-400 text-sm">آمن</div>
          </div>
        </div>
      </div>
    </footer>
  );
}