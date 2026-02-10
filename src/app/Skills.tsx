'use client';

import { useState } from "react";

export default function Skills() {
  const skills = [
    { name: 'Next.js', level: 90, color: 'from-gray-800 to-gray-900', icon: '⚡' },
    { name: 'React', level: 85, color: 'from-blue-500 to-cyan-400', icon: '⚛️' },
    { name: 'TypeScript', level: 80, color: 'from-blue-600 to-blue-400', icon: '📘' },
    { name: 'Tailwind CSS', level: 95, color: 'from-teal-500 to-cyan-400', icon: '🎨' },
    { name: 'MySQL', level: 75, color: 'from-orange-500 to-yellow-400', icon: '🗄️' },
    { name: 'إدارة قواعد البيانات', level: 80, color: 'from-purple-500 to-pink-400', icon: '💾' },
    { name: 'التصميم والتخطيط', level: 85, color: 'from-pink-500 to-rose-400', icon: '🎯' },
    { name: 'إعداد التقارير', level: 90, color: 'from-green-500 to-emerald-400', icon: '📊' },
    { name: 'Microsoft Office', level: 95, color: 'from-red-500 to-orange-400', icon: '💼' },
    { name: 'حل المشكلات التقنية', level: 88, color: 'from-indigo-500 to-purple-400', icon: '🔧' },
  ];

  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-white to-gray-50" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* العنوان مع تأثير */}
        <div className="text-center mb-16 fade-in">
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-full font-semibold mb-4">
            🛠️ المهارات التقنية
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            مهاراتي <span className="gradient-text">وخبراتي</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            مجموعة المهارات التي اكتسبتها خلال رحلتي المهنية والتعليمية
          </p>
        </div>

        {/* شبكة المهارات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`card-hover bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 ${
                hoveredSkill === index ? 'transform scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white text-2xl`}>
                  {skill.icon}
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  {skill.level}%
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {skill.name}
              </h3>
              
              {/* شريط التقدم */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: hoveredSkill === index ? `${skill.level}%` : '0%',
                    transitionDelay: hoveredSkill === index ? '0.2s' : '0s'
                  }}
                ></div>
              </div>
              
              <div className="mt-4 flex justify-between text-sm text-gray-500">
                <span>مبتدئ</span>
                <span>متوسط</span>
                <span>متقدم</span>
                <span>خبير</span>
              </div>
            </div>
          ))}
        </div>

        {/* قسم اللغات */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-10 border border-blue-100">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              🌍 اللغات
            </h3>
            <p className="text-gray-600">
              لغات التواصل التي أتقنها
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🇸🇦</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">العربية</h4>
                    <p className="text-gray-500">اللغة الأم</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full font-bold text-lg">
                  ممتاز
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full w-full"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center">
                    <span className="text-3xl">🇺🇸</span>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">الإنجليزية</h4>
                    <p className="text-gray-500">لغة ثانية</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full font-bold text-lg">
                  جيد جداً
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}