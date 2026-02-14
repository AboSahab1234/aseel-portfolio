'use client';

import { useState } from "react";
import { siteConfig } from "@/constants/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  // ربط الروابط الاجتماعية ببيانات الملف المركزي (تم إصلاح المسارات)
  const socialLinks = [
    { icon: '🐙', label: 'GitHub', href: siteConfig?.contact?.social?.github || '#' },
    { icon: '💼', label: 'LinkedIn', href: siteConfig?.contact?.social?.linkedin || '#' },
    { icon: '💬', label: 'WhatsApp', href: siteConfig?.contact?.whatsapp?.link || 'https://wa.me/967781756747' },
    { icon: '🐦', label: 'Twitter', href: siteConfig?.contact?.social?.twitter || '#' },
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
      alert(`شكراً للاشتراك يا مبدع! سيصلك كل جديد من أصيل الصبري على: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-950 to-gray-900 text-white pt-20 pb-10 border-t border-gray-800" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الجزء العلوي - توزيع المعلومات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* هوية أصيل الصبري الرقمية */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-xl transform -rotate-3">
                <span className="text-2xl font-bold text-white">أ</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight">
                  {siteConfig?.site?.fullName || 'أصيل الصبري'}
                </h3>
                <p className="text-blue-400 text-sm font-medium">
                  {siteConfig?.site?.jobTitle || 'مطور ويب وحلول رقمية'}
                </p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm lg:text-base">
              {siteConfig?.bio?.summary || 'مطور ويب متكامل'} نهدف إلى تقديم أفضل الحلول البرمجية لخدمة المجتمع اليمني وتطوير الأنظمة التقنية.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-11 h-11 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-blue-500 hover:bg-blue-600/10 flex items-center justify-center text-xl transition-all duration-300 hover:-translate-y-1"
                  title={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* التنقل السريع */}
          <div className="lg:mr-10">
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              روابط سريعة
            </h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-blue-500 transition-all duration-300 group-hover:w-4"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* قنوات التواصل المباشرة */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              قنوات التواصل
            </h4>
            <div className="space-y-5">
              <a href={siteConfig?.contact?.primary?.link || 'tel:+967781756747'} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  📞
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">
                  {siteConfig?.contact?.primary?.value || '+967 781756747'}
                </span>
              </a>
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                  📍
                </div>
                <span className="text-gray-400">
                  {siteConfig?.contact?.address?.fullAddress || 'مأرب، اليمن'}
                </span>
              </div>
              <a href={siteConfig?.contact?.whatsapp?.link || 'https://wa.me/967781756747'} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                  ✉️
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors">تواصل مباشر</span>
              </a>
            </div>
          </div>

          {/* النشرة البريدية المطورة */}
          <div>
            <h4 className="text-lg font-bold mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
              ابقَ على اطلاع
            </h4>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              اشترك في النشرة البريدية ليصلك جديد مشاريع وأفكار أصيل الصبري التقنية.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="بريدك الإلكتروني"
                className="w-full px-5 py-4 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all text-white"
                required
              />
              <button
                type="submit"
                className="mt-3 w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-95"
              >
                اشترك الآن
              </button>
            </form>
          </div>
        </div>

        {/* سطر الحقوق السفلي */}
        <div className="pt-10 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm">
              جميع الحقوق محفوظة © {currentYear} <span className="text-white font-bold">{siteConfig?.site?.fullName || 'أصيل الصبري'}</span>
            </p>
            <p className="text-xs text-gray-600 mt-2">
               تم التطوير باستخدام Next.js 14 - النسخة البرمجية المستقرة
            </p>
          </div>
          
          <div className="flex gap-8">
             <div className="text-center">
                <div className="text-xl font-bold text-blue-500">99%</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Performance</div>
             </div>
             <div className="text-center">
                <div className="text-xl font-bold text-purple-500">SEO</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Optimized</div>
             </div>
             <div className="text-center">
                <div className="text-xl font-bold text-green-500">SSL</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest">Secured</div>
             </div>
          </div>
        </div>
      </div>
    </footer>
  );
}