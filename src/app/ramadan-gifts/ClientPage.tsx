'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
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
  const [contentIndex, setContentIndex] = useState(0);
  const [ayatIndex, setAyatIndex] = useState(0);
  const [hadithIndex, setHadithIndex] = useState(0);
  const [tasbeehCount, setTasbeehCount] = useState(0);
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
  // قائمة الجوائز
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
    // محاكاة تحميل سريع جداً (أقل من ثانية)
    const timer = setTimeout(() => setLoading(false), 400);
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

  // تناوب المحتوى: آية ثم حديث (كل 6 ثوانٍ)
  useEffect(() => {
    const interval = setInterval(() => {
      setContentIndex((prev) => (prev + 1) % 2);
      if (contentIndex === 0) {
        setHadithIndex((prev) => (prev + 1) % hadiths.length);
      } else {
        setAyatIndex((prev) => (prev + 1) % ayat.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [contentIndex, ayat.length, hadiths.length]);

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

  const handleTasbeeh = useCallback(() => {
    setTasbeehCount((prev) => (prev + 1) % 34);
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
      scale: [1, 1.15, 1],
      rotate: [0, 8, -8, 0],
      transition: { duration: 1.8, repeat: Infinity, repeatType: 'mirror' as const },
    },
    hover: {
      scale: 1.3,
      rotate: [0, 12, -12, 0],
      transition: { duration: 0.3 },
    },
  };

  const cardVariants = {
    initial: { y: 0, opacity: 0.8 },
    hover: {
      y: -5,
      scale: 1.02,
      boxShadow: '0 20px 40px -12px rgba(0,0,0,0.5), 0 0 20px rgba(255,215,0,0.3)',
      transition: { duration: 0.2 },
    },
    inView: { y: 0, opacity: 1, transition: { duration: 0.4 } },
  };

  const downloadButtonVariants = {
    animate: {
      x: [0, -5, 5, -5, 5, 0],
      y: [0, -2, 2, -2, 2, 0],
      scale: [1, 1.02, 1],
      transition: { duration: 0.6, repeat: Infinity, repeatType: 'loop' as const },
    },
    hover: { scale: 1.1, y: -3 },
    tap: { scale: 0.95 },
  };

  // نجوم متحركة - تقليل العدد إلى 12
  const stars = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 8,
      emoji: i % 3 === 0 ? '⭐' : i % 3 === 1 ? '✨' : '🌟',
    }));
  }, []);

  // ------------------------------------------------------------
  // شاشة التحميل الفورية مع رسالة جذابة
  // ------------------------------------------------------------
  if (loading || !isMounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-green-800 to-teal-900 flex flex-col items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-8xl text-white mb-6"
        >
          🌙
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white text-center px-4 mb-4"
        >
          رمضان شهر الخير والبركات
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-amber-200 text-center px-4 max-w-md"
        >
          جوائز حقيقية تنتظرك.. لا تفوّت الفرصة
        </motion.p>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
          className="absolute bottom-10 w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 font-sans text-gray-900 overflow-x-hidden"
      dir="rtl"
    >
      {/* خلفية متحركة - نجوم أقل */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10 animate-pulse" />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-20 w-24 h-24 text-yellow-300 text-6xl opacity-10"
        >
          🌙
        </motion.div>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-yellow-300 text-xl"
            initial={{ x: `${star.left}%`, y: `${star.top}%`, opacity: 0 }}
            animate={{
              x: `${star.left + (Math.random() * 10 - 5)}%`,
              y: `${star.top + (Math.random() * 10 - 5)}%`,
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{ duration: star.duration, repeat: Infinity }}
          >
            {star.emoji}
          </motion.div>
        ))}
      </div>

      {/* النوافذ المنبثقة (نفسها) - اختصاراً لم نكررها */}
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
              className="bg-white text-gray-900 rounded-3xl p-8 text-center shadow-2xl max-w-lg mx-4 border-4 border-amber-300 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl mb-4"
              >
                🎁
              </motion.div>
              <h2 className="text-3xl font-bold text-green-800 mb-3">فرصة العمر قد لا تتكرر!</h2>
              <p className="text-lg text-gray-600 mb-4">
                لا رسوم اشتراك .. لا أوراق .. لا تعقيدات .. الفرصة سانحة.
              </p>
              <button
                onClick={() => setShowGiftBox(false)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-bold shadow-lg"
              >
                افتح الهدية
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <div className={`bg-gradient-to-r ${selectedPrize.color} p-5 text-white text-center`}>
                <motion.span animate={{ scale: [1, 1.1, 1] }} className="text-5xl mb-1 block">
                  {selectedPrize.emoji}
                </motion.span>
                <h3 className="text-xl font-bold">{selectedPrize.title}</h3>
              </div>
              <div className="p-5 text-gray-700 space-y-3">
                <div>
                  <p className="font-semibold text-amber-700 mb-2">📅 موعد التسليم:</p>
                  <ul className="space-y-1 pr-4">
                    <li className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">•</span>
                      <span><span className="font-medium">في العيد:</span> فرحة لا توصف.</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">•</span>
                      <span><span className="font-medium">في القبر:</span> نور وفسحة.</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <span className="text-green-600">•</span>
                      <span><span className="font-medium">يوم القيامة:</span> تحت ظل العرش.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl text-sm">
                  <p className="text-blue-800 leading-relaxed">
                    لا تحتاج لذكر اسمك ولا رقم حسابك، فراعي المسابقة يعلم كل شيء.
                  </p>
                </div>
                <p className="text-center text-gray-600 font-medium pt-1 text-sm">
                  الآن.. ابدأ العمل، فالجائزة بانتظارك.
                </p>
              </div>
              <div className="p-4 bg-gray-50 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowClaimModal(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-full font-bold shadow-md text-sm"
                >
                  ✨ تم الاستلام
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
              className="bg-white text-gray-900 rounded-3xl p-6 text-center shadow-2xl max-w-md mx-4 border-4 border-amber-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-green-800 mb-3">شارك الأجر</h3>
              <p className="text-gray-600 mb-4">انسخ الرابط وأرسله لأصدقائك لتنال الأجر</p>
              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-xl mb-3">
                <input
                  type="text"
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  readOnly
                  className="bg-transparent flex-1 text-left text-gray-600 outline-none text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('تم نسخ الرابط');
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-lg text-sm"
                >
                  نسخ
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-full text-sm"
              >
                إغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        {/* القسم العلوي الجديد */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          {/* عنوان "مبارك عليكم الشهر" بحجم أصغر */}
          <motion.div
            animate={{ scale: [1, 1.02, 1], textShadow: ['0 0 5px #4ade80', '0 0 15px #4ade80', '0 0 5px #4ade80'] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-2xl md:text-3xl font-bold text-green-800 mb-3"
          >
            🌙 مبارك عليكم الشهر 🌙
          </motion.div>

          {/* منطقة تناوب الآيات والأحاديث */}
          <AnimatePresence mode="wait">
            <motion.div
              key={contentIndex === 0 ? `ayat-${ayatIndex}` : `hadith-${hadithIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="bg-white/80 backdrop-blur-sm p-4 rounded-xl mb-5 border-r-4 border-amber-400 text-right max-w-2xl mx-auto shadow-md"
            >
              <p className="text-gray-700 text-base leading-relaxed">
                {contentIndex === 0 ? ayat[ayatIndex] : hadiths[hadithIndex]}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* شريط التقدم مع النسبة المئوية */}
          <div className="relative max-w-2xl mx-auto mb-6">
            <div className="relative h-5 bg-gray-300 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"
                style={{ boxShadow: '0 0 15px rgba(34, 197, 94, 0.8)' }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute left-0 top-0 -mt-1 text-sm font-bold text-white bg-green-600 px-2 py-0.5 rounded-full"
              style={{ left: `calc(${progressPercentage}% - 25px)` }}
            >
              {Math.round(progressPercentage)}%
            </motion.div>
          </div>
        </motion.div>

        {/* بقية المحتوى */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          {/* شريط العروض الرمضانية */}
          <div className="relative mb-4">
            <motion.div
              animate={{ scale: [1, 1.01, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-full h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-full shadow-lg"
            />
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-700 to-yellow-600 mt-1">
              🎉 العروض الرمضانية 🎉
            </h2>
          </div>

          {/* العبارات المتغيرة */}
          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xl font-bold text-amber-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full inline-block shadow-md mb-4"
            >
              {ramadanPhrases[phraseIndex]}
            </motion.div>
          </AnimatePresence>

          {/* العداد الرئيسي */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative inline-block mx-auto mb-5 w-full max-w-md"
          >
            <motion.div
              animate={{ scale: [1, 1.03, 1], opacity: [0.4, 0.6, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-2xl blur-xl"
            />
            <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-blue-200">
              <p className="text-blue-800 font-bold text-center mb-1 text-sm drop-shadow">
                ⏳ الوقت المتبقي من رمضان
              </p>
              {!ramadanStarted ? (
                <div className="text-xl font-bold text-blue-600 animate-pulse text-center">
                  🌙 رمضان على الأبواب...
                </div>
              ) : timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
                <div className="text-xl font-bold text-green-600 animate-pulse text-center">
                  ✨ انتهت فرصة رمضان
                </div>
              ) : (
                <motion.div
                  animate={{ y: [0, -1, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex gap-1 justify-center text-xl font-mono"
                >
                  {Object.entries(timeLeft).map(([key, value]) => (
                    <div key={key} className="bg-blue-50 px-2 py-1 rounded-lg border border-blue-200 shadow-sm">
                      <span className="text-blue-700 font-bold">
                        {value}
                      </span>
                      <span className="text-[10px] text-blue-500 block">
                        {key === 'days' ? 'يوم' : key === 'hours' ? 'ساعة' : key === 'minutes' ? 'دقيقة' : 'ثانية'}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* سبحة مصغرة */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTasbeeh}
              className="relative cursor-pointer"
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl border-3 border-amber-300"
                style={{ boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)' }}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  {tasbeehCount}
                </span>
              </div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-amber-600 text-xs font-medium">
                اضغط للتسبيح
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* شبكة الجوائز - مصغرة */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
          {prizes.map((prize) => (
            <motion.div
              key={prize.id}
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              className={`relative bg-gradient-to-br ${prize.bgColor} rounded-xl shadow-lg border border-gray-700 overflow-hidden cursor-pointer text-white`}
              onClick={() => togglePrize(prize.id)}
              style={{ boxShadow: `0 10px 20px -10px rgba(0,0,0,0.5), 0 0 10px rgba(251, 191, 36, 0.2)` }}
            >
              <div className="p-2 relative z-10">
                <div className="flex items-start gap-1">
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className={`text-2xl bg-gradient-to-br ${prize.color} w-8 h-8 flex items-center justify-center rounded-lg shadow-md text-white`}
                    style={{ boxShadow: `0 0 8px ${prize.glowColor}` }}
                  >
                    {prize.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-xs text-white mb-0.5 leading-tight">{prize.title}</h3>
                    <p className="text-[10px] text-gray-200 leading-tight">{prize.shortDesc}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: openPrize === prize.id ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-amber-300 text-sm"
                  >
                    ▼
                  </motion.span>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: openPrize === prize.id ? 'auto' : 0, opacity: openPrize === prize.id ? 1 : 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-amber-400 pt-2 mt-1">
                    {prize.evidence && (
                      <p className="text-amber-300 text-[10px] italic mb-1 pr-2 border-r-2 border-amber-400">
                        {prize.evidence}
                      </p>
                    )}
                    {Array.isArray(prize.fullDesc) ? (
                      <div className="space-y-1">
                        {prize.fullDesc.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1 text-[10px] text-gray-100">
                            <span className="text-amber-400 text-xs">🔑</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-100 text-[10px] leading-relaxed">{prize.fullDesc}</p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-1 px-2 rounded-full text-[10px] font-semibold transition shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaimPrize(prize);
                      }}
                    >
                      🎁 استلم
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* التذييل المحسن مع سهم متحرك */}
        <motion.footer
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 bg-white/80 backdrop-blur-lg rounded-2xl p-4 md:p-6 shadow-xl border border-white/20 relative overflow-hidden"
        >
          {/* سهم متحرك يشير إلى الأسفل */}
          <motion.div
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-2xl text-amber-500"
          >
            ↓
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-tr from-green-200/30 to-amber-200/30 blur-2xl" />
          <div className="flex flex-col md:flex-row items-center gap-4 relative z-10">
            <motion.div whileHover={{ scale: 1.05, rotate: 3 }} className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-white shadow-lg">
                <Image src="/profile.jpg" alt="أصيل الصبري" width={80} height={80} className="object-cover" />
              </div>
            </motion.div>
            <div className="flex-1 text-center md:text-right">
              <motion.h3 animate={{ scale: [1, 1.01, 1] }} className="text-xl font-bold text-green-800 mb-1">
                أصيل الصبري
              </motion.h3>
              <p className="text-gray-600 mb-2 text-xs leading-relaxed max-w-md mx-auto md:mx-0">
                تخيل لو كانت هذه العروض في مسابقة أرضية: لكانت ضجة إعلامية، وتذاكر بملايين الدولارات. إنها فرصة العمر حقاً، فلا تفرط فيها.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs">
                <Link href="/" className="text-green-600 hover:text-green-800 transition flex items-center gap-1">
                  <span>🏠</span> الرئيسية
                </Link>
                <Link href="/blog" className="text-green-600 hover:text-green-800 transition flex items-center gap-1">
                  <span>📝</span> المدونة
                </Link>
                <Link href="/tools" className="text-green-600 hover:text-green-800 transition flex items-center gap-1">
                  <span>🛠️</span> الأدوات
                </Link>
                <Link href="/newsletter" className="text-green-600 hover:text-green-800 transition flex items-center gap-1">
                  <span>📧</span> النشرة
                </Link>
              </div>
            </div>
            <div className="flex flex-row md:flex-col gap-2 flex-shrink-0">
              <motion.a
                href="/ramadan-plan.pdf"
                download
                variants={downloadButtonVariants}
                animate="animate"
                whileHover="hover"
                whileTap="tap"
                className="block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg border border-amber-300 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl animate-bounce">📋</span>
                  <span>خطة الشهر</span>
                </div>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sharePage}
                className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <span className="text-lg">📤</span>
                <span className="hidden sm:inline">شارك الأجر</span>
                <span className="sm:hidden">شارك</span>
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}