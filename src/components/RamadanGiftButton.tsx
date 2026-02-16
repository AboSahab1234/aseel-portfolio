'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RamadanGiftButton() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative max-w-4xl mx-auto"
        >
          {/* عناصر خلفية متحركة */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-[3rem] blur-3xl opacity-30 animate-pulse"></div>
          
          <Link href="/ramadan-gifts">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.98 }}
              className="relative bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl p-8 md:p-12 border-4 border-amber-300 hover:border-amber-500 transition-all cursor-pointer group"
            >
              {/* شريط علوية "جديد" */}
              <div className="absolute -top-5 -right-5 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg transform rotate-12 group-hover:rotate-6 transition">
                🆕 جديد
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* الأيقونة الرئيسية مع حركة */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-8xl md:text-9xl bg-gradient-to-br from-amber-400 to-orange-400 p-8 rounded-full text-white shadow-2xl"
                >
                  🎁
                </motion.div>

                <div className="text-center md:text-right">
                  <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-700 to-orange-700 mb-3">
                    جوائز رمضان 1446
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-700 mb-4">
                    10 جوائز حقيقية بانتظارك.. كل ما عليك هو اغتنام الشهر
                  </p>
                  
                  {/* شارات الجوائز السريعة */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                    <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">🔥 العتق من النار</span>
                    <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">🌙 ليلة القدر</span>
                    <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold">✨ الحسنة بـ 70</span>
                  </div>

                  {/* زر اضافي */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-l from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg group-hover:shadow-2xl transition">
                    <span>افتح العلبة</span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">←</span>
                  </div>
                </div>
              </div>

              {/* عناصر زخرفية صغيرة */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-amber-200 rounded-full blur-xl opacity-60"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-yellow-200 rounded-full blur-xl opacity-60"></div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}