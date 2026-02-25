'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import Hero from "./Hero";
import Skills from "./Skills";
import RamadanGiftButton from '@/components/RamadanGiftButton';

export default function Home() {
  const [visibleSection, setVisibleSection] = useState<string>('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // --- كيانك الرقمي (Entity Graph) - محدث ---
  const entityGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://aseel-portfolio-eight.vercel.app/#person",
        "name": [
          "أصيل عبدالجليل أحمد الصبري", // ✅ الاسم الثلاثي الكامل
          "اصيل الصبري",
          "Aseel Al-Sabri",
          "اصيل عبدالجليل"
        ],
        "alternateName": "Aseel",
        "url": "https://aseel-portfolio-eight.vercel.app",
        "image": {
          "@type": "ImageObject",
          "@id": "https://aseel-portfolio-eight.vercel.app/#profile-image",
          "url": "https://github.com/AboSahab1234.png", // ✅ رابط GitHub المباشر
          "contentUrl": "https://github.com/AboSahab1234.png",
          "caption": "أصيل عبدالجليل الصبري - مهندس برمجيات وإداري", // ✅ وصف محدث
          "copyrightNotice": "© 2026 أصيل الصبري. جميع الحقوق محفوظة.",
          "creditText": "تصوير: أصيل الصبري",
          "license": "https://creativecommons.org/licenses/by/4.0/",
          "creator": {
            "@type": "Person",
            "name": "اصيل الصبري"
          }
        },
        "jobTitle": "Software Engineer & Manager", // ✅ مسمى وظيفي جديد
        "worksFor": {
          "@type": "Organization",
          "name": "مستقل"
        },
        "sameAs": [
          "https://github.com/AboSahab1234",
          "https://www.linkedin.com/in/aseelalsabri",
        ],
        "alumniOf": {
          "@type": "CollegeOrUniversity",
          "name": "جامعة إقليم سبأ"
        },
        "knowsAbout": [
          "Next.js", "React", "TypeScript", "Tailwind CSS", "MySQL",
          "Project Management", // ✅ كلمات مفتاحية إدارية
          "Technical Leadership",
          "Engineering Excellence",
          "Full-Stack Solutions"
        ],
        "description": "مهندس برمجيات ومدير مشاريع تقنية يمني، خريج علوم حاسوب، متخصص في تطوير المواقع الحديثة وإدارة الفرق التقنية." // ✅ وصف محدث
      },
      {
        "@type": "WebSite",
        "@id": "https://aseel-portfolio-eight.vercel.app/#website",
        "url": "https://aseel-portfolio-eight.vercel.app",
        "name": "أصيل الصبري | مهندس برمجيات ومدير",
        "publisher": { "@id": "https://aseel-portfolio-eight.vercel.app/#person" }
      }
    ]
  };

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setVisibleSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ تحديث بيانات الخبرات (أيقونات جديدة وتصحيح التاريخ)
  const experiences = [
    {
      period: "أغسطس 2023 - ديسمبر 2025",
      title: "هندسة البرمجيات وإدارة المشاريع", // ✅ عنوان محدث
      description: "تصميم وبرمجة المواقع باستخدام Next.js و MySQL، وإدارة فرق التطوير، والمشاركة في بناء بوابة الجامعة الإلكترونية.",
      icon: "🛠️", // ✅ أيقونة تعبر عن الهندسة والإدارة
      color: "from-blue-500 to-cyan-500",
      achievements: [
        "تصميم وبرمجة مواقع متكاملة باستخدام Next.js و React",
        "بناء وتطوير قواعد بيانات MySQL وتحسين أدائها",
        "المشاركة في تطوير بوابة الجامعة الإلكترونية",
        "إدارة فريق صغير من المطورين وتوزيع المهام",
        "تحسين أداء المواقع وسرعة التحميل"
      ]
    },
    {
      period: "2019 - 2026", // ✅ تم تصحيح التاريخ
      title: "إدارة المكاتب والتخطيط الإداري", // ✅ عنوان محدث
      description: "أعمال التصميم والتخطيط، إنشاء وإعداد وإدارة البيانات والتقارير، تصميم وطباعة منشورات إعلانية وتوعوية.",
      icon: "📊", // ✅ أيقونة تعبر عن الإدارة
      color: "from-purple-500 to-pink-500",
      achievements: [
        "تصميم وتخطيط الحملات الإعلانية",
        "إدارة قواعد البيانات والإحصاءات",
        "تصميم المنشورات والمواد التوعوية",
        "تنظيم الأرشيف الإلكتروني والورقي"
      ]
    }
  ];

  const education = [
    {
      degree: "بكالوريوس علوم حاسوب",
      university: "جامعة إقليم سبأ",
      period: "2025 - 2024",
      description: "تخصص في تطوير البرمجيات وقواعد البيانات، مع مشاريع عملية في تطوير الويب.",
      icon: "🎓",
      color: "from-green-500 to-emerald-500"
    },
    {
      degree: "الثانوية العامة - علمي",
      university: "مدرسة عقبة",
      period: "2012 - 2013",
      description: "تخرجت بتفوق مع تركيز على المواد العلمية والرياضيات.",
      icon: "📚",
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const contactInfo = [
    {
      icon: "📱",
      title: "الهاتف",
      value: "+967 781756747",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      action: "tel:+967781756747"
    },
    {
      icon: "📍",
      title: "الموقع",
      value: "مأرب / حي الشركة",
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
      action: "https://maps.google.com"
    },
    {
      icon: "👤",
      title: "GitHub",
      value: "AboSahabHezam",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      action: "https://github.com/AboSahabHezam"
    },
    {
      icon: "📧",
      title: "البريد الإلكتروني",
      value: "أرسل رسالة",
      color: "bg-gradient-to-r from-orange-500 to-yellow-500",
      action: "mailto:"
    }
  ];

  return (
    <>
      <Script
        id="entity-graph"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraph) }}
      />

      <div className="min-h-screen">
        {/* مؤشر التقدم (بدون تغيير) */}
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <div className="flex flex-col items-center gap-4">
            {['home', 'about', 'skills', 'experience', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`relative group transition-all duration-300 ${
                  visibleSection === section ? 'scale-110' : 'hover:scale-110'
                }`}
                aria-label={`انتقل إلى قسم ${section}`}
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  visibleSection === section 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
                    : 'bg-gray-300 group-hover:bg-blue-400'
                }`}></div>
                <span className="absolute left-6 top-1/2 transform -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {section === 'home' ? 'الرئيسية' :
                   section === 'about' ? 'عني' :
                   section === 'skills' ? 'المهارات' :
                   section === 'experience' ? 'الخبرات' : 'التواصل'}
                </span>
              </a>
            ))}
          </div>
        </div>

        <section id="home">
          <Hero />
        </section>

        <RamadanGiftButton />

        {/* قسم نبذة عني (بدون تغيير) */}
        <section id="about" className="section-padding bg-gradient-to-b from-white/80 to-gray-50/80 backdrop-blur-sm" dir="rtl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-in">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 rounded-full font-semibold mb-6 backdrop-blur-md border border-white/20">
                👤 المسيرة التعليمية
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                التعليم <span className="gradient-text">والشهادات</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                رحلتي التعليمية التي شكلت أساس معرفتي ومهاراتي
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-500 card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${edu.color} flex items-center justify-center text-white text-2xl`}>
                      {edu.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <h4 className="text-2xl font-bold text-gray-900">{edu.degree}</h4>
                        <span className="px-4 py-2 bg-gray-100/80 text-gray-700 rounded-full text-sm font-semibold">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-lg font-medium text-blue-600 mb-3">{edu.university}</p>
                      <p className="text-gray-600">{edu.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-200/50 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold gradient-text mb-3">100%</div>
                <div className="text-gray-600">جودة العمل</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-200/50 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold gradient-text mb-3">24/7</div>
                <div className="text-gray-600">تواصل دائم</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-200/50 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold gradient-text mb-3">⚡</div>
                <div className="text-gray-600">سرعة تنفيذ</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl text-center border border-gray-200/50 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold gradient-text mb-3">🎯</div>
                <div className="text-gray-600">دقة في التفاصيل</div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <Skills />
        </section>

        {/* قسم الخبرات المهنية - محدث */}
        <section id="experience" className="section-padding bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm" dir="rtl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-in">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 text-orange-600 rounded-full font-semibold mb-6 backdrop-blur-md border border-white/20">
                💼 رحلتي المهنية
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                الخبرات <span className="gradient-text">العملية</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                مسيرتي المهنية التي تجمع بين الهندسة والإدارة
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500/50 to-purple-500/50 hidden lg:block"></div>
              
              <div className="space-y-16">
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    className={`relative ${index % 2 === 0 ? 'lg:pr-1/2 lg:pl-12' : 'lg:pl-1/2 lg:pr-12'}`}
                  >
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 border-4 border-white shadow-lg hidden lg:block"></div>
                    
                    <div 
                      className={`bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-xl border border-gray-100/50 transform transition-all duration-700 hover:scale-[1.02] card-hover ${
                        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                      }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      <div className="flex items-start gap-8">
                        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${exp.color} flex items-center justify-center text-3xl`}>
                          {exp.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                            <h3 className="text-3xl font-bold text-gray-900">{exp.title}</h3>
                            <span className="px-6 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-600 rounded-full font-bold">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-gray-600 text-lg">{exp.description}</p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <h4 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                          <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">✓</span>
                          أبرز المهام والإنجازات
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {exp.achievements.map((achievement, idx) => (
                            <div 
                              key={idx}
                              className="flex items-start gap-3 p-4 bg-gray-50/50 rounded-xl hover:bg-blue-50/50 transition-colors group"
                            >
                              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mt-1">
                                <span className="text-white text-sm">✓</span>
                              </div>
                              <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* قسم الاتصال (بدون تغيير) */}
        <section id="contact" className="section-padding bg-gradient-to-br from-blue-50/50 via-white/60 to-purple-50/50 backdrop-blur-sm" dir="rtl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 fade-in">
              <span className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-600 rounded-full font-semibold mb-6 backdrop-blur-md border border-white/20">
                📞 هيا نتواصل
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                تواصل <span className="gradient-text">معي</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                لنتعاون معاً في بناء شيء مميز. أنا هنا للإجابة على استفساراتك
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8">
                    معلومات التواصل
                  </h3>
                  
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <a
                        key={index}
                        href={info.action}
                        target={info.action.includes('http') ? '_blank' : undefined}
                        rel={info.action.includes('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center gap-6 p-6 rounded-2xl bg-gray-50/50 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 group border border-gray-200/30"
                      >
                        <div className={`w-16 h-16 rounded-xl ${info.color} flex items-center justify-center text-2xl text-white`}>
                          {info.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold text-gray-900 mb-1">
                            {info.title}
                          </div>
                          <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                            {info.value}
                          </div>
                        </div>
                        <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                          →
                        </div>
                      </a>
                    ))}
                  </div>

                  <div className="mt-12 p-8 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-2xl border border-green-200/30">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">⏰</span>
                      أوقات الاستجابة
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">سرعة الرد</span>
                        <span className="font-semibold text-green-600">أقل من 4 ساعات</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">التوافر</span>
                        <span className="font-semibold text-gray-900">24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-3xl p-10 text-white backdrop-blur-sm border border-white/10">
                  <h3 className="text-3xl font-bold mb-2">أرسل رسالة</h3>
                  <p className="text-gray-300 mb-8">
                    املأ النموذج وسأرد عليك في أقرب وقت
                  </p>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-300 mb-2">الاسم الكامل</label>
                        <input
                          type="text"
                          className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                          placeholder="اسمك الكريم"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-2">البريد الإلكتروني</label>
                        <input
                          type="email"
                          className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                          placeholder="example@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">الموضوع</label>
                      <input
                        type="text"
                        className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 backdrop-blur-sm"
                        placeholder="ما هو موضوع رسالتك؟"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-2">الرسالة</label>
                      <textarea
                        rows={6}
                        className="w-full px-6 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-500 resize-none backdrop-blur-sm"
                        placeholder="اكتب رسالتك هنا..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary text-lg py-5 rounded-xl"
                    >
                      إرسال الرسالة
                    </button>
                  </form>

                  <p className="text-gray-400 text-sm mt-6 text-center">
                    ⚡ ستصلك رسالة تأكيد في غضون دقائق
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* زر العودة للأعلى */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 left-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 z-40 ${
            visibleSection !== 'home' ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          aria-label="العودة إلى الأعلى"
        >
          ↑
        </button>
      </div>
    </>
  );
}