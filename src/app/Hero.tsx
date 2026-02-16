'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/constants/config";

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [imageError, setImageError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const roles = ['مطور ويب', 'مصمم واجهات', 'منشئ محتويات', 'مبرمج', 'خريج علوم حاسوب'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1500;
    const timeout = setTimeout(() => {
      const currentRole = roles[roleIndex];
      if (!isDeleting && charIndex < currentRole.length) {
        setTypedText(currentRole.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setTypedText(currentRole.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((roleIndex + 1) % roles.length);
      }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex, roles]);

  const createFallbackImage = () => (
    <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl border-4 border-white shadow-2xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="text-6xl font-bold mb-2">A</div>
        <div className="text-xl font-semibold">Aseel</div>
      </div>
    </div>
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50/30 via-white/50 to-purple-50/30 backdrop-blur-sm pt-20"
      dir="rtl"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* ترتيب عمودي: الصورة في الأعلى ثم النص */}
        <div className="flex flex-col items-center text-center">
          {/* الصورة في الأعلى */}
          <div className="mb-8">
            <div
              className="relative group flex flex-col items-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {!imageError ? (
                <>
                  <div className="relative overflow-hidden bg-transparent">
                    <Image
                      src="/profile.jpg"
                      alt={siteConfig.site?.fullName || "أصيل الصبري"}
                      width={384}
                      height={384}
                      className={`
                        w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96
                        object-cover border-4 border-white shadow-2xl
                        transition-all duration-1000 ease-out
                        ${isHovering ? 'scale-105 filter grayscale-0 brightness-110' : 'scale-100 filter grayscale brightness-95'}
                        rounded-2xl
                      `}
                      onLoad={() => console.log('✅ تم تحميل الصورة بنجاح')}
                      onError={() => {
                        console.log('❌ فشل تحميل الصورة - جاري عرض البديل');
                        setImageError(true);
                      }}
                      priority
                    />
                    <div
                      className={`absolute inset-0 transition-all duration-700 ${
                        isHovering ? 'shadow-[inset_0_0_20px_rgba(59,130,246,0.2)]' : 'shadow-none'
                      } pointer-events-none`}
                    ></div>
                  </div>

                  <div
                    className={`mt-6 text-center transition-all duration-500 ${
                      isHovering ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-800 mb-1">Aseel Abduljalil</div>
                    <div className="text-sm text-gray-500 mb-1">Graduate of Saba Region University</div>
                    <div className="text-base text-gray-600 mt-2 flex items-center justify-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span className="font-medium">Full Stack Developer</span>
                      <span className="text-blue-500">•</span>
                    </div>
                  </div>

                  <div
                    className={`absolute top-4 right-4 transition-all duration-500 ${
                      isHovering ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-green-600 text-sm">👁️</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {createFallbackImage()}
                  <div
                    className={`mt-6 text-center transition-all duration-500 ${
                      isHovering ? 'opacity-100 translate-y-0' : 'opacity-90 translate-y-2'
                    }`}
                  >
                    <div className="text-2xl font-bold text-gray-800 mb-1">Aseel Abduljalil</div>
                    <div className="text-sm text-gray-500 mb-1">Graduate of Saba Region University</div>
                    <div className="text-base text-gray-600 mt-2 flex items-center justify-center gap-2">
                      <span className="text-blue-500">•</span>
                      <span className="font-medium">Full Stack Developer</span>
                      <span className="text-blue-500">•</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* النص الرئيسي */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 rounded-full text-sm font-semibold mb-4 backdrop-blur-md border border-white/20">
              👋 مرحباً بكم في موقعي
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
            أنا <span className="gradient-text">اصيل عبدالجليل</span>
          </h1>

          <div className="h-12 mb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700">
              <span className="text-blue-600">{typedText}</span>
              <span className="mr-2 inline-block w-1 h-8 bg-blue-600 animate-pulse"></span>
            </h2>
          </div>

          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            {siteConfig.bio?.summary || "مطور ويب متكامل من اليمن"}
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600">سنوات خبرة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">9+</div>
              <div className="text-gray-600">مشروع مكتمل</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
              <div className="text-gray-600">رضا عملاء</div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={siteConfig.contact.whatsapp.link || "https://wa.me/967781756747"}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              💬 تواصل على واتساب
            </a>
            <a href="#experience" className="btn-secondary">
              📂 استعرض أعمالي
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <a href="#about" className="animate-bounce">
          <div className="w-10 h-16 border border-blue-500/30 rounded-full flex justify-center backdrop-blur-sm">
            <div className="w-1 h-4 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </a>
      </div>
    </section>
  );
}