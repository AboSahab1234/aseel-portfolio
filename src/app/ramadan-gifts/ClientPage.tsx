'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// ------------------------------------------------------------
// تعريف الأنواع
// ------------------------------------------------------------
interface Prize {
  id: number;
  emoji: string;
  title: string;
  shortDesc: string;
  fullDesc: string | string[];
  evidence?: string;
  color: string;
  bgColor: string;
  glowColor: string;
}

// ------------------------------------------------------------
// المكون الرئيسي
// ------------------------------------------------------------
export default function RamadanGiftsPage() {
  // ------------------------------------------------------------
  // حالات (State)
  // ------------------------------------------------------------
  const [openPrize, setOpenPrize] = useState<number | null>(null);
  const [showGiftBox, setShowGiftBox] = useState(true);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [ramadanStarted, setRamadanStarted] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [hadithIndex, setHadithIndex] = useState(0);
  const [ayatIndex, setAyatIndex] = useState(0);
  const [tasbeehCount, setTasbeehCount] = useState(0); // عداد التسبيح الموحد
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentJuz, setCurrentJuz] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // ------------------------------------------------------------
  // بيانات ثابتة
  // ------------------------------------------------------------
  const hadiths = [
    '«مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ» (متفق عليه)',
    '«إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ» (متفق عليه)',
    '«لِلصَّائِمِ فَرْحَتَانِ: فَرْحَةٌ عِنْدَ فِطْرِهِ، وَفَرْحَةٌ عِنْدَ لِقَاءِ رَبِّهِ» (متفق عليه)',
    '«مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ» (متفق عليه)',
    '«الصِّيَامُ جُنَّةٌ مِنَ النَّارِ» (أحمد والنسائي)',
    '«مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ» (الترمذي)',
    '«عُمْرَةٌ فِي رَمَضَانَ تَقْضِي حَجَّةً مَعِي» (متفق عليه)',
  ];

  const ayat = [
    '﴿شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ﴾ [البقرة: 185]',
    '﴿وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ﴾ [غافر: 60]',
    '﴿إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ * وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ * لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾ [القدر: 1-3]',
    '﴿وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ﴾ [البقرة: 186]',
    '﴿إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ﴾ [الزمر: 10]',
  ];

  const ramadanPhrases = [
    'أبواب الجنة مفتوحة',
    'أبواب النار مغلقة',
    'الشياطين مصفدة',
    'النافلة بسبعين',
    'الدعاء مستجاب',
    'الحسنة بعشر أمثالها',
    'العتق من النار كل يوم',
    'ليلة القدر خير من ألف شهر',
    'الصدقة بـ 700 ضعف',
  ];

  // ------------------------------------------------------------
  // قائمة الجوائز (كما هي)
  // ------------------------------------------------------------
  const prizes: Prize[] = [
    {
      id: 1,
      emoji: '🔑',
      title: 'مفاتيح الجنة الثمانية',
      shortDesc: 'بكل باب مفتاح من ذهب',
      fullDesc: [
        'باب الريان للصائمين',
        'باب الصلاة',
        'باب الصدقة',
        'باب الجهاد',
        'باب الكاظمين الغيظ',
        'باب الراضين',
        'باب الذكر',
        'باب التوبة',
      ],
      evidence: '«إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ»',
      color: 'from-amber-700 to-yellow-600',
      bgColor: 'from-amber-900 to-yellow-800',
      glowColor: 'amber-400',
    },
    {
      id: 2,
      emoji: '🎟️',
      title: 'كوبون مغفرة شامل',
      shortDesc: 'تصفير الذنوب في شهر',
      fullDesc: 'من صام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه، وكأنه خرج من الدنيا بلا خطيئة.',
      evidence: '«مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ»',
      color: 'from-emerald-700 to-green-600',
      bgColor: 'from-emerald-900 to-green-800',
      glowColor: 'green-400',
    },
    {
      id: 3,
      emoji: '🔒',
      title: 'تصفيد الشياطين',
      shortDesc: 'حزمة أمان مدتها 30 يومًا',
      fullDesc: 'في رمضان تُصفَّد الشياطين فلا تستطيع الوسوسة كما في غيره، فهي فرصة ذهبية للتوبة والإقلاع عن المعاصي.',
      evidence: '«وَصُفِّدَتِ الشَّيَاطِينُ»',
      color: 'from-blue-700 to-indigo-600',
      bgColor: 'from-blue-900 to-indigo-800',
      glowColor: 'blue-400',
    },
    {
      id: 4,
      emoji: '🌙',
      title: 'ليلة القدر',
      shortDesc: 'خير من 83 سنة و4 أشهر',
      fullDesc: 'ليلة القدر تساوي عبادة أكثر من 83 سنة، من حُرمها فقد حُرم الخير كله.',
      evidence: '«لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ»',
      color: 'from-purple-700 to-violet-600',
      bgColor: 'from-purple-900 to-violet-800',
      glowColor: 'purple-400',
    },
    {
      id: 5,
      emoji: '🔥',
      title: 'العتق من النار',
      shortDesc: '70,000 يعتقون كل ليلة',
      fullDesc: 'كل ليلة في رمضان، يختار الله سبعين ألفًا يعتقهم من النار، اجعل اسمك في القائمة بصالح الأعمال.',
      evidence: '«إِنَّ لِلَّهِ عُتَقَاءَ مِنَ النَّارِ فِي كُلِّ لَيْلَةٍ»',
      color: 'from-red-700 to-rose-600',
      bgColor: 'from-red-900 to-rose-800',
      glowColor: 'red-400',
    },
    {
      id: 6,
      emoji: '💰',
      title: 'الصدقة بـ 70 ضعفًا',
      shortDesc: 'أضعاف مضاعفة',
      fullDesc: 'الصدقة في رمضان تضاعف أضعافًا كثيرة، حتى أن الحسنة بعشر أمثالها إلى سبعمائة ضعف.',
      evidence: '«مَثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ»',
      color: 'from-teal-700 to-cyan-600',
      bgColor: 'from-teal-900 to-cyan-800',
      glowColor: 'teal-400',
    },
    {
      id: 7,
      emoji: '📖',
      title: 'ختم القرآن',
      shortDesc: 'نور في القبر وشفيع يوم القيامة',
      fullDesc: 'من قرأ حرفًا من كتاب الله فله به حسنة، والحسنة بعشر أمثالها، والقرآن يشفع لأصحابه.',
      evidence: '«اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ»',
      color: 'from-green-700 to-emerald-600',
      bgColor: 'from-green-900 to-emerald-800',
      glowColor: 'green-400',
    },
    {
      id: 8,
      emoji: '🕌',
      title: 'صلاة التراويح',
      shortDesc: 'قيام رمضان',
      fullDesc: 'من قام مع الإمام حتى ينصرف كُتب له قيام ليلة كاملة، وهي سنة مؤكدة.',
      evidence: '«مَنْ قَامَ مَعَ الإِمَامِ حَتَّى يَنْصَرِفَ كُتِبَ لَهُ قِيَامُ لَيْلَةٍ»',
      color: 'from-indigo-700 to-blue-600',
      bgColor: 'from-indigo-900 to-blue-800',
      glowColor: 'indigo-400',
    },
    {
      id: 9,
      emoji: '🤲',
      title: 'دعوة الصائم',
      shortDesc: 'لا ترد',
      fullDesc: 'لِلصَّائِمِ عِنْدَ فِطْرِهِ دَعْوَةٌ مَا تُرَدُّ، فاغتنم هذه الدقائق الثمينة.',
      evidence: '«لِلصَّائِمِ عِنْدَ فِطْرِهِ دَعْوَةٌ مَا تُرَدُّ»',
      color: 'from-orange-700 to-amber-600',
      bgColor: 'from-orange-900 to-amber-800',
      glowColor: 'orange-400',
    },
    {
      id: 10,
      emoji: '💎',
      title: 'رفع الدرجات',
      shortDesc: 'للصابرين أجر بلا حساب',
      fullDesc: 'الصبر على الطاعة وعن المعصية في رمضان يرفع الدرجات بلا حدود.',
      evidence: '«إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ»',
      color: 'from-pink-700 to-fuchsia-600',
      bgColor: 'from-pink-900 to-fuchsia-800',
      glowColor: 'pink-400',
    },
    {
      id: 11,
      emoji: '🍽️',
      title: 'إفطار صائم',
      shortDesc: 'مثل أجره دون نقصان',
      fullDesc: 'من فطر صائمًا كان له مثل أجره، وهي فرصة عظيمة للدعوة والصدقة.',
      evidence: '«مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ»',
      color: 'from-yellow-700 to-amber-600',
      bgColor: 'from-yellow-900 to-amber-800',
      glowColor: 'yellow-400',
    },
    {
      id: 12,
      emoji: '🧎',
      title: 'الاعتكاف',
      shortDesc: 'الخلوة مع الله',
      fullDesc: 'الاعتكاف سنة في العشر الأواخر، وفيه تحري ليلة القدر والانقطاع عن الدنيا.',
      evidence: '«كَانَ رَسُولُ اللَّهِ يَعْتَكِفُ الْعَشْرَ الأَوَاخِرَ»',
      color: 'from-stone-700 to-gray-600',
      bgColor: 'from-stone-900 to-gray-800',
      glowColor: 'stone-400',
    },
  ];

  // ------------------------------------------------------------
  // التواريخ المهمة
  // ------------------------------------------------------------
  const ramadanStart = new Date('2026-02-17T18:00:00').getTime();
  const ramadanEnd = new Date('2026-03-19T18:00:00').getTime();

  // ------------------------------------------------------------
  // المؤثرات: تحديث العدادات
  // ------------------------------------------------------------
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      if (now < ramadanStart) {
        setRamadanStarted(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setDaysPassed(0);
      } else if (now >= ramadanStart && now <= ramadanEnd) {
        setRamadanStarted(true);
        const distance = ramadanEnd - now;
        const passed = now - ramadanStart;
        const passedDays = Math.floor(passed / (1000 * 60 * 60 * 24));
        setDaysPassed(passedDays);
        setProgressPercentage((passedDays / 30) * 100);
        setCurrentJuz(Math.min(Math.ceil(passedDays * 1.2), 30));

        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setRamadanStarted(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // تبديل الآيات كل 8 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setAyatIndex((prev) => (prev + 1) % ayat.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // تبديل الأحاديث كل 10 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setHadithIndex((prev) => (prev + 1) % hadiths.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // تبديل العبارات كل 3 ثوانٍ
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ramadanPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------------------------
  // دوال التفاعل
  // ------------------------------------------------------------
  const togglePrize = (id: number) => setOpenPrize(openPrize === id ? null : id);

  const handleClaimPrize = (prize: Prize) => {
    setSelectedPrize(prize);
    setShowClaimModal(true);
  };

  // دالة التسبيح الجديدة: تزيد العداد وتعيده بعد 33
  const handleTasbeeh = useCallback(() => {
    setTasbeehCount((prev) => (prev + 1) % 34); // 0-33
  }, []);

  const sharePage = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'جوائز رمضان',
        text: 'فرصة العمر في رمضان، جوائز حقيقية بانتظارك',
        url: window.location.href,
      });
    } else {
      setShowShareModal(true);
    }
  }, []);

  // ------------------------------------------------------------
  // متغيرات الحركة
  // ------------------------------------------------------------
  const iconVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 2, repeat: Infinity, repeatType: 'mirror' as const },
    },
    hover: {
      scale: 1.4,
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    initial: { y: 0, opacity: 0.8 },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: '0 30px 60px -15px rgba(0,0,0,0.5), 0 0 30px rgba(255,215,0,0.3)',
      transition: { duration: 0.3 },
    },
    inView: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const downloadButtonVariants = {
    animate: {
      x: [0, -8, 8, -8, 8, 0],
      y: [0, -4, 4, -4, 4, 0],
      rotate: [0, -3, 3, -3, 3, 0],
      scale: [1, 1.03, 1],
      transition: { duration: 0.8, repeat: Infinity, repeatType: 'loop' as const },
    },
    hover: { scale: 1.15, y: -5 },
    tap: { scale: 0.95 },
  };

  // ------------------------------------------------------------
  // شاشة التحميل
  // ------------------------------------------------------------
  if (loading || !isMounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-8xl text-white"
        >
          🎁
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-20 text-white text-2xl font-bold"
        >
          يتم تحضير هداياك...
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="absolute bottom-10 w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  // ------------------------------------------------------------
  // التصميم الرئيسي
  // ------------------------------------------------------------
  return (
    <main
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 font-sans text-white overflow-x-hidden"
      dir="rtl"
    >
      {/* خلفية متحركة */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-30 animate-pulse" />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-20 w-32 h-32 text-yellow-200 text-8xl opacity-20"
        >
          🌙
        </motion.div>
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white text-xl"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 5 + Math.random() * 10, repeat: Infinity }}
          >
            {i % 3 === 0 ? '⭐' : i % 3 === 1 ? '✨' : '🌟'}
          </motion.div>
        ))}
      </div>

      {/* نافذة فرصة العمر */}
      <AnimatePresence>
        {showGiftBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setShowGiftBox(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white text-gray-900 rounded-3xl p-10 text-center shadow-2xl max-w-lg mx-4 border-4 border-amber-300 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-9xl mb-6"
              >
                🎁
              </motion.div>
              <h2 className="text-4xl font-bold text-green-800 mb-3">فرصة العمر قد لا تتكرر!</h2>
              <p className="text-xl text-gray-600 mb-4">
                لا رسوم اشتراك .. لا أوراق .. لا تعقيدات .. الفرصة سانحة.
              </p>
              <button
                onClick={() => setShowGiftBox(false)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold shadow-lg"
              >
                افتح الهدية
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نافذة استلام الجائزة */}
      <AnimatePresence>
        {showClaimModal && selectedPrize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white text-gray-900 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-amber-200"
            >
              <div className={`bg-gradient-to-r ${selectedPrize.color} p-6 text-white text-center`}>
                <motion.span animate={{ scale: [1, 1.2, 1] }} className="text-6xl mb-2 block">
                  {selectedPrize.emoji}
                </motion.span>
                <h3 className="text-2xl font-bold">{selectedPrize.title}</h3>
              </div>
              <div className="p-6 text-gray-700 space-y-4">
                <div>
                  <p className="font-semibold text-amber-700 mb-2">📅 موعد التسليم:</p>
                  <ul className="space-y-2 pr-4">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span><span className="font-medium">في العيد:</span> فرحة لا توصف.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span><span className="font-medium">في القبر:</span> نور وفسحة.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">•</span>
                      <span><span className="font-medium">يوم القيامة:</span> تحت ظل العرش.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-sm">
                  <p className="text-blue-800 leading-relaxed">
                    لا تحتاج لذكر اسمك ولا رقم حسابك، فراعي المسابقة يعلم كل شيء، بيده كل شيء، وهو أكرم الأكرمين.
                  </p>
                </div>
                <p className="text-center text-gray-600 font-medium pt-2">
                  الآن.. ابدأ العمل، فالجائزة بانتظارك.
                </p>
              </div>
              <div className="p-4 bg-gray-50 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowClaimModal(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold shadow-md"
                >
                  ✨ تم الاستلام
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* نافذة المشاركة */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white text-gray-900 rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4 border-4 border-amber-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-green-800 mb-4">شارك الصفحة</h3>
              <p className="text-gray-600 mb-6">انسخ الرابط وأرسله لأصدقائك</p>
              <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-xl mb-4">
                <input
                  type="text"
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  readOnly
                  className="bg-transparent flex-1 text-left text-gray-600 outline-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('تم نسخ الرابط');
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  نسخ
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-full"
              >
                إغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
        {/* شريط التقدم (اختياري - يمكن إزالته أيضاً) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative h-4 bg-gray-700 rounded-full mb-8 overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-green-400 via-amber-400 to-green-400"
            style={{ boxShadow: '0 0 20px rgba(74, 222, 128, 0.8)' }}
          />
        </motion.div>

        {/* القسم العلوي */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 relative"
        >
          {/* نجوم متحركة */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-3xl"
                initial={{ x: Math.random() * 800 - 400, y: Math.random() * 200 - 100, opacity: 0 }}
                animate={{
                  x: [null, Math.random() * 100 - 50],
                  y: [null, Math.random() * 50 - 25],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              >
                {i % 3 === 0 ? '⭐' : i % 3 === 1 ? '✨' : '🌟'}
              </motion.div>
            ))}
          </div>

          {/* عنوان الترحيب */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="inline-block bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 rounded-full text-3xl font-bold shadow-2xl mb-4"
          >
            🌙 مبارك عليكم الشهر 🌙
          </motion.div>

          {/* مكان الآيات المتناوبة */}
          <AnimatePresence mode="wait">
            <motion.div
              key={ayatIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm p-5 rounded-xl mb-4 border-r-4 border-amber-400 text-right max-w-3xl mx-auto"
            >
              <p className="text-amber-200 text-lg leading-relaxed">{ayat[ayatIndex]}</p>
            </motion.div>
          </AnimatePresence>

          {/* مكان الأحاديث المتناوبة */}
          <AnimatePresence mode="wait">
            <motion.div
              key={hadithIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm p-5 rounded-xl mb-6 border-r-4 border-green-400 text-right max-w-3xl mx-auto"
            >
              <p className="text-green-200 text-lg leading-relaxed">{hadiths[hadithIndex]}</p>
            </motion.div>
          </AnimatePresence>

          {/* شريط العروض الرمضانية */}
          <div className="relative mb-6">
            <motion.div
              animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-full shadow-lg"
            />
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-400 to-yellow-400 mt-2">
              🎉 العروض الرمضانية 🎉
            </h2>
          </div>

          {/* العبارات المتغيرة */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-amber-300 bg-black/20 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-md mb-6"
            >
              {ramadanPhrases[phraseIndex]}
            </motion.div>
          </AnimatePresence>

          {/* العداد الرئيسي المتوهج */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative inline-block mx-auto mb-6 w-full max-w-md"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-2xl"
            />
            <div className="relative bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-4 shadow-xl border border-blue-700">
              <p className="text-amber-300 font-bold text-center mb-2 drop-shadow-lg">
                ⏳ الوقت المتبقي من رمضان
              </p>

              {!ramadanStarted ? (
                <div className="text-2xl font-bold text-white animate-pulse text-center">
                  🌙 رمضان على الأبواب...
                </div>
              ) : timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                <div className="text-2xl font-bold text-white animate-pulse text-center">
                  ✨ انتهت فرصة رمضان، تقبل الله منا ومنك
                </div>
              ) : (
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex gap-2 justify-center text-2xl font-mono"
                >
                  {Object.entries(timeLeft).map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-blue-950/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-500 shadow-inner"
                    >
                      <span className="text-yellow-300 font-bold drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]">
                        {value}
                      </span>
                      <span className="text-xs text-blue-200 block drop-shadow-md">
                        {key === 'days' ? 'يوم' : key === 'hours' ? 'ساعة' : key === 'minutes' ? 'دقيقة' : 'ثانية'}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* سبحة بسيطة: عداد أنيق قابل للنقر */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTasbeeh}
              className="relative cursor-pointer"
            >
              {/* دائرة التسبيح المتوهجة */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl border-4 border-yellow-300"
                style={{ boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)' }}
              >
                <span className="text-4xl font-bold text-white drop-shadow-lg">
                  {tasbeehCount}
                </span>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300 opacity-50"
              />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-amber-300 text-sm font-medium">
                اضغط للتسبيح
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* شبكة الجوائز */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {prizes.map((prize) => (
            <motion.div
              key={prize.id}
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              className={`relative bg-gradient-to-br ${prize.bgColor} rounded-2xl shadow-xl border border-gray-700 overflow-hidden cursor-pointer text-white`}
              onClick={() => togglePrize(prize.id)}
              style={{ boxShadow: `0 20px 40px -15px rgba(0,0,0,0.5), 0 0 20px rgba(251, 191, 36, 0.3)` }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 30% 30%, #fff, transparent)',
                    'radial-gradient(circle at 70% 70%, #fff, transparent)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
              />
              <div className="p-5 relative z-10">
                <div className="flex items-start gap-3">
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className={`text-4xl bg-gradient-to-br ${prize.color} w-14 h-14 flex items-center justify-center rounded-xl shadow-lg text-white`}
                    style={{ boxShadow: `0 0 15px ${prize.glowColor}` }}
                  >
                    {prize.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white mb-1">{prize.title}</h3>
                    <p className="text-sm text-gray-200">{prize.shortDesc}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: openPrize === prize.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-amber-300 text-xl"
                  >
                    ▼
                  </motion.span>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: openPrize === prize.id ? 'auto' : 0, opacity: openPrize === prize.id ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t-2 border-amber-400 pt-4 mt-3">
                    {prize.evidence && (
                      <p className="text-amber-300 text-sm italic mb-2 pr-3 border-r-2 border-amber-400">
                        {prize.evidence}
                      </p>
                    )}
                    {Array.isArray(prize.fullDesc) ? (
                      <div className="space-y-2">
                        {prize.fullDesc.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-100">
                            <span className="text-amber-400 text-lg">🔑</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-100 text-sm leading-relaxed">{prize.fullDesc}</p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-3 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaimPrize(prize);
                      }}
                    >
                      🎁 استلم الجائزة
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* التذييل */}
        <motion.footer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-500/10 to-amber-500/10 blur-3xl" />
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl">
                <Image src="/profile.jpg" alt="أصيل الصبري" width={112} height={112} className="object-cover" />
              </div>
            </motion.div>
            <div className="flex-1 text-center md:text-right">
              <motion.h3 animate={{ scale: [1, 1.02, 1] }} className="text-2xl font-bold text-white mb-2">
                أصيل الصبري
              </motion.h3>
              <p className="text-gray-300 mb-3 leading-relaxed">
                تخيل لو كانت هذه العروض في مسابقة أرضية: لكانت ضجة إعلامية، وتذاكر بملايين
                الدولارات لكثرة المقبلين، عروض خيالية في هذا الشهر كل ما عليك هو المبادرة وإخلاص
                النية. إنها فرصة العمر حقاً، فلا تفرط فيها.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <Link href="/" className="text-amber-300 hover:text-amber-400 transition flex items-center gap-1">
                  <span>🏠</span> الرئيسية
                </Link>
                <Link href="/blog" className="text-amber-300 hover:text-amber-400 transition flex items-center gap-1">
                  <span>📝</span> المدونة
                </Link>
                <Link href="/tools" className="text-amber-300 hover:text-amber-400 transition flex items-center gap-1">
                  <span>🛠️</span> الأدوات المجانية
                </Link>
                <Link href="/newsletter" className="text-amber-300 hover:text-amber-400 transition flex items-center gap-1">
                  <span>📧</span> النشرة البريدية
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <motion.a
                href="/ramadan-plan.pdf"
                download
                variants={downloadButtonVariants}
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl border-2 border-yellow-300"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl animate-bounce">📋</span>
                  <div className="text-right">
                    <div className="text-sm opacity-90">حمّل الآن</div>
                    <div className="text-xl">خطة اغتنام الشهر</div>
                  </div>
                </div>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sharePage}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                <span className="text-xl">📤</span>
                <span>شارك الصفحة</span>
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}