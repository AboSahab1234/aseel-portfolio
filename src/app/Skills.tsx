'use client';

import { useState, useMemo } from "react";
import { siteConfig } from "@/constants/config";

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // دمج المهارات من مختلف الأقسام مع إضافة الألوان المناسبة
  const allTechnicalSkills = useMemo(() => {
    // التحقق من وجود البيانات في config
    if (!siteConfig?.skills?.technical) return [];
    
    return [
      ...(siteConfig.skills.technical[0]?.items || []).map(s => ({ 
        ...s, 
        color: 'from-blue-600 to-indigo-500' 
      })),
      ...(siteConfig.skills.technical[1]?.items || []).map(s => ({ 
        ...s, 
        color: 'from-emerald-600 to-teal-500' 
      })),
      ...(siteConfig.skills.technical[2]?.items || []).map(s => ({ 
        ...s, 
        color: 'from-orange-600 to-amber-500' 
      })),
    ];
  }, []);

  return (
    <section id="skills" className="py-24 bg-slate-50 relative overflow-hidden" dir="rtl">
      {/* خلفية جمالية */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* رأس القسم - محسن للـ SEO */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-blue-600 tracking-widest uppercase mb-3">
            القدرات والخبرات
          </h2>
          <div className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
             مهارات <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">أصيل الصبري</span> التقنية
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            نجمع بين قوة البرمجة الحديثة ودقة الإدارة التنظيمية لبناء حلول رقمية متكاملة تفوق التوقعات.
          </p>
        </div>

        {/* شبكة المهارات التقنية الملونة */}
        {allTechnicalSkills.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-20">
            {allTechnicalSkills.map((skill) => (
              <div
                key={skill.name}
                className="relative group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white text-2xl shadow-lg group-hover:rotate-12 transition-transform`}>
                    {skill.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-3xl font-black text-slate-800">{skill.level}%</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Proficiency</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {skill.name}
                </h3>
                
                {/* شريط التقدم الذكي */}
                <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <div 
                    className={`absolute top-0 right-0 h-full bg-gradient-to-l ${skill.color} transition-all duration-1000 ease-out`}
                    style={{ 
                      width: hoveredSkill === skill.name ? `${skill.level}%` : '10%' 
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-[10px] font-bold text-slate-400">
                  <span>أساسي</span>
                  <span>خبير</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* مهارات إضافية (Professional) - تزيد من طول الملف واحترافيته */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* المهارات الناعمة */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-blue-50">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <span className="text-blue-600">💎</span> مهارات احترافية
            </h3>
            <div className="flex flex-wrap gap-3">
              {(siteConfig.skills?.professional || []).map((pSkill, i) => (
                <span key={i} className="px-5 py-3 bg-blue-50 text-blue-700 rounded-2xl font-medium text-sm border border-blue-100 hover:bg-blue-600 hover:text-white transition-all cursor-default">
                  {pSkill}
                </span>
              ))}
            </div>
          </div>

          {/* اللغات */}
          <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-xl text-white">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="text-yellow-500">🌍</span> إتقان اللغات
            </h3>
            <div className="space-y-8">
              {(siteConfig.languages || []).map((lang, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-lg font-bold">{lang.name}</span>
                      <span className="mr-3 text-xs text-slate-400">{lang.level}</span>
                    </div>
                    <span className="text-blue-400 font-mono">{lang.proficiency}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${lang.proficiency}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}