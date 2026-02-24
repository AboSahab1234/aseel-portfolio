'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  fullDesc: string | string[]; // يمكن أن يكون نصاً أو مصفوفة للأبواب
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
  const [showGiftBox, setShowGiftBox] = useState(false);
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
  const [contentIndex, setContentIndex] = useState(0); // 0: آية, 1: حديث
  const [ayatIndex, setAyatIndex] = useState(0);
  const [hadithIndex, setHadithIndex] = useState(0);
  const [tasbeehCount, setTasbeehCount] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentJuz, setCurrentJuz] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState({ hours: 0, minutes: 0 });

  const prizesRef = useRef<HTMLDivElement>(null);

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
  // قائمة الجوائز (نصوص مؤثرة مع أبواب الجنة كمصفوفة)
  // ------------------------------------------------------------
  const prizes: Prize[] = [
    {
      id: 1,
      emoji: '🔑',
      title: 'مفاتيح الجنة الثمانية',
      shortDesc: 'بكل باب مفتاح من ذهب',
      fullDesc: [
        'باب الريان – للصائمين الذين ظمئت حلوقهم في سبيل الله',
        'باب الصلاة – لمن كانت جبهتهم على الأرض خاشعة',
        'باب الصدقة – للباذلين ولو تمرة',
        'باب الجهاد – لمن جاهدوا أنفسهم في طاعة الله',
        'باب الكاظمين الغيظ – لمن كتموا غيظهم وهم يقدرون',
        'باب الراضين – الذين رضوا بالله رباً وبالإسلام ديناً',
        'باب الذكر – من لا تزال ألسنتهم رطبة بذكر الله',
        'باب التوبة – للعائدين من ذنوبهم كيوم ولدتهم أمهاتهم',
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
      fullDesc: 'هذا الكوبون لا يشترط عليك سوى أن تصوم رمضان إيمانًا واحتسابًا. مقابل ذلك، ستمحى جميع ذنوبك السابقة، وكأنك خرجت من الدنيا بيضاء نقية. إنها صفقة لا تعوض، فمن منا لا يحب أن يبدأ صفحة جديدة مع الله؟',
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
      fullDesc: 'تخيل أن ألد أعدائك، الذي يوسوس لك ليل نهار، قد تم تقييده بالسلاسل وإلقاؤه في سجن بعيد طوال الشهر. الطريق الآن مفتوح، والجو مهيأ لتحقيق أعظم الانتصارات الروحية. من منا سيترك هذه الفرصة تفوته؟',
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
      fullDesc: 'ليلة واحدة تعادل عبادة أكثر من 83 سنة. لو قيل لك: أمامك ليلة واحدة تستطيع فيها أن تكسب ما يعادل عمراً كاملاً من الحسنات، أكنت تفرط فيها؟ هذه هي ليلة القدر، ليلة تتنزل فيها الملائكة، ويسلم فيها العباد حتى مطلع الفجر. لا تعوض بكل الدنيا.',
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
      fullDesc: 'كل ليلة في رمضان، يختار الله سبعين ألف إنسان يعتقهم من النار. قد تكون أنت واحداً منهم، فقط إذا صمت النهار وقمت الليل ولو بركعات قليلة. تخيل أن تسمع صوتاً ينادي: "يا فلان، لقد عفونا عنك، ادخل الجنة".',
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
      fullDesc: 'لو استثمرت درهماً واحداً في شركة تعدك بعائد 7000%، أكنت تتردد؟ هذا هو حال الصدقة في رمضان: درهم واحد يتحول إلى 700 درهم في ميزان حسناتك. بل إن الله يضاعف لمن يشاء. بادر ولو بشق تمرة، فربما كانت تلك التمرة سبباً في دخولك الجنة.',
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
      fullDesc: 'هذا الكتاب ليس كأي كتاب. كل حرف تقرؤه بحسنة، والحسنة بعشر أمثالها. بل إن القرآن يأتي يوم القيامة شفيعاً لأصحابه، يقول: "يارب إني منعته النوم فشفعني فيه". تخيل أن لك شفيعاً بهذه القوة يوم لا ينفع مال ولا بنون.',
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
      fullDesc: 'التراويح ليست مجرد صلاة نؤديها ثم ننام. إنها وقفة مع الله في جوف الليل، ترفع الدرجات، وتكفر السيئات، وتقربك من الرحمن. من قام مع الإمام حتى ينصرف كتب له قيام ليلة كاملة. هل تبحث عن طريقة لختم القرآن في صلاتك؟ هذه هي.',
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
      fullDesc: 'عندما تفطر بعد صيام يوم طويل، وأنت في حالة من الخشوع والضعف، تخرج من قلبك دعوة لا ترد. تخيل أن ملكاً عظيماً يقول لك: "سل تعط". ماذا ستسأل؟ الجنة؟ النجاة من النار؟ صلاح الأولاد؟ كل ذلك ممكن في لحظة. لا تفرط في هذه الدقائق الثمينة.',
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
      fullDesc: 'الصبر في رمضان له ثلاثة أنواع: الصبر على الطاعة (القيام والصيام)، والصبر عن المعصية (غض البصر واللسان)، والصبر على الأذى. هذا الصبر يرفع الدرجات بلا حدود، وكأنك تملك شيكاً على بياض من ملك الملوك. كم تريد من الدرجات؟ قل ما شئت، فهو أكرم الأكرمين.',
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
      fullDesc: 'من فطر صائماً كان له مثل أجره. تخيل أنك تشارك في أجر صيام كل من أفطرت عنده! يمكنك دعوة صديق أو التبرع لإفطار جماعي. قد تكون سبباً في دخول شخص الجنة بسبب كفالة إفطاره.',
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
      fullDesc: 'الاعتكاف سنة في العشر الأواخر، وفيه تحري ليلة القدر والانقطاع عن الدنيا. حتى لو لم تستطع اعتكاف الأيام كلها، فاحرص على ساعات في المسجد، فقد تدرك ليلة القدر وأنت في طاعة.',
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
  const totalRamadanHours = 30 * 24;

  // ------------------------------------------------------------
  // المؤثرات
  // ------------------------------------------------------------
  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setLoading(false), 800);
    const giftTimer = setTimeout(() => setShowGiftBox(true), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(giftTimer);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      if (now < ramadanStart) {
        setRamadanStarted(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setDaysPassed(0);
        setTimeElapsed({ hours: 0, minutes: 0 });
        setProgressPercentage(0);
      } else if (now >= ramadanStart && now <= ramadanEnd) {
        setRamadanStarted(true);
        const distance = ramadanEnd - now;
        const passed = now - ramadanStart;
        
        const passedHours = Math.floor(passed / (1000 * 60 * 60));
        const passedMinutes = Math.floor((passed % (1000 * 60 * 60)) / (1000 * 60));
        setTimeElapsed({ hours: passedHours, minutes: passedMinutes });
        
        const progress = (passedHours / totalRamadanHours) * 100;
        setProgressPercentage(Math.min(progress, 100));
        
        const passedDays = Math.floor(passed / (1000 * 60 * 60 * 24));
        setDaysPassed(passedDays);
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
        setProgressPercentage(100);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
    setTasbeehCount((prev) => prev + 1);
  }, []);

  const resetTasbeeh = useCallback(() => {
    setTasbeehCount(0);
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

  const scrollToPrizes = () => {
    prizesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const stars = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 6 + Math.random() * 10,
      emoji: i % 3 === 0 ? '⭐' : i % 3 === 1 ? '✨' : '🌟',
    }));
  }, []);

  // ------------------------------------------------------------
  // شاشة التحميل
  // ------------------------------------------------------------
  if (loading || !isMounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-7xl text-white"
        >
          🎁
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-20 text-white text-xl font-bold"
        >
          يتم تحضير هداياك...
        </motion.div>
      </div>
    );
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-purple-50 font-sans text-gray-900 overflow-x-hidden"
      dir="rtl"
    >
      {/* خلفية متحركة */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute text-yellow-500 text-lg"
            initial={{ x: `${star.left}%`, y: `${star.top}%`, opacity: 0 }}
            animate={{
              x: `${star.left + (Math.random() * 5 - 2.5)}%`,
              y: `${star.top + (Math.random() * 5 - 2.5)}%`,
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ duration: star.duration, repeat: Infinity }}
          >
            {star.emoji}
          </motion.div>
        ))}
      </div>

      {/* النوافذ المنبثقة (نفسها) */}
      <AnimatePresence>
        {showGiftBox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowGiftBox(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white text-gray-900 rounded-3xl p-6 text-center shadow-2xl max-w-md mx-4 border-4 border-amber-300 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ y: [0, -8, 0], rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-7xl mb-3"
              >
                🎁
              </motion.div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">فرصة العمر قد لا تتكرر!</h2>
              <p className="text-gray-600 mb-3 text-sm">
                لا رسوم .. لا أوراق .. الفرصة سانحة.
              </p>
              <button
                onClick={() => setShowGiftBox(false)}
                className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-full font-bold shadow-md text-sm"
              >
                افتح الهدية
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClaimModal && selectedPrize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white text-gray-900 rounded-2xl shadow-xl max-w-sm w-full overflow-hidden border-2 border-amber-200"
            >
              <div className={`bg-gradient-to-r ${selectedPrize.color} p-4 text-white text-center`}>
                <span className="text-4xl mb-1 block">{selectedPrize.emoji}</span>
                <h3 className="text-lg font-bold">{selectedPrize.title}</h3>
              </div>
              <div className="p-4 text-gray-700 space-y-2 text-sm">
                <div>
                  <p className="font-semibold text-amber-700 mb-1">📅 موعد التسليم:</p>
                  <ul className="space-y-1 pr-3">
                    <li className="flex items-center gap-1 text-xs"><span className="text-green-600">•</span><span><span className="font-medium">في العيد:</span> فرحة لا توصف.</span></li>
                    <li className="flex items-center gap-1 text-xs"><span className="text-green-600">•</span><span><span className="font-medium">في القبر:</span> نور وفسحة.</span></li>
                    <li className="flex items-center gap-1 text-xs"><span className="text-green-600">•</span><span><span className="font-medium">يوم القيامة:</span> تحت ظل العرش.</span></li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg text-xs">
                  <p className="text-blue-800">راعي المسابقة يعلم كل شيء، وهو أكرم الأكرمين.</p>
                </div>
                <p className="text-center text-gray-600 font-medium pt-1 text-xs">الآن ابدأ العمل، فالجائزة بانتظارك.</p>
              </div>
              <div className="p-3 bg-gray-50 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowClaimModal(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-1.5 rounded-full font-bold shadow-md text-sm"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="bg-white text-gray-900 rounded-2xl p-5 text-center shadow-xl max-w-sm mx-4 border-4 border-amber-300"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-green-800 mb-2">شارك الأجر</h3>
              <p className="text-gray-600 mb-3 text-sm">الدال على الخير كفاعله، انسخ الرابط وأرسله</p>
              <div className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg mb-2">
                <input
                  type="text"
                  value={typeof window !== 'undefined' ? window.location.href : ''}
                  readOnly
                  className="bg-transparent flex-1 text-left text-gray-600 outline-none text-xs"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('تم نسخ الرابط');
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-2 py-1 rounded-lg text-xs"
                >
                  نسخ
                </button>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1.5 rounded-full text-sm"
              >
                إغلاق
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الحاوية الرئيسية */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* القسم العلوي */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-xl md:text-2xl font-bold text-green-700 mb-2"
          >
            🌙 مبارك عليكم الشهر 🌙
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={contentIndex === 0 ? `ayat-${ayatIndex}` : `hadith-${hadithIndex}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="bg-white/80 backdrop-blur-sm p-3 rounded-lg mb-3 border-r-4 border-amber-400 text-right max-w-xl mx-auto shadow-sm"
            >
              <p className="text-amber-800 text-xs md:text-sm leading-relaxed">
                {contentIndex === 0 ? ayat[ayatIndex] : hadiths[hadithIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* شريط التقدم الدقيق */}
        <div className="relative max-w-md mx-auto mb-6">
          <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600"
              style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.6)' }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -top-5 text-xs font-bold text-white bg-green-600 px-2 py-0.5 rounded-full"
            style={{ left: `calc(${progressPercentage}% - 20px)` }}
          >
            {Math.round(progressPercentage)}%
          </motion.div>
          <div className="text-xs text-gray-500 mt-1 text-center">
            مضى {timeElapsed.hours} ساعة و {timeElapsed.minutes} دقيقة
          </div>
        </div>

        {/* العروض الرمضانية */}
        <div className="relative mb-3">
          <motion.div
            animate={{ scale: [1, 1.02, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-full h-1.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-700 to-yellow-600 mt-1">
            🎉 العروض الرمضانية 🎉
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={phraseIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-bold text-amber-600 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block shadow-sm mb-3"
          >
            {ramadanPhrases[phraseIndex]}
          </motion.div>
        </AnimatePresence>

        {/* العداد الرئيسي - مع توهج قوي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative inline-block mx-auto mb-4 w-full max-w-lg"
        >
          {/* طبقات توهج متعددة */}
          <motion.div
            animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-2xl blur-xl"
          />
          <motion.div
            animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-300 rounded-2xl blur-lg"
          />
          <motion.div
            animate={{ scale: [1, 1.01, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-md"
          />
          
          <div className="relative bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 rounded-2xl p-5 shadow-2xl border border-amber-400">
            <p className="text-amber-300 font-bold text-center mb-2 text-sm drop-shadow-lg">⏳ الوقت المتبقي من رمضان</p>
            {!ramadanStarted ? (
              <div className="text-xl font-bold text-white animate-pulse text-center">🌙 رمضان على الأبواب...</div>
            ) : timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 ? (
              <div className="text-xl font-bold text-white animate-pulse text-center">✨ انتهت فرصة رمضان</div>
            ) : (
              <motion.div
                animate={{ y: [0, -1, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex gap-2 justify-center text-xl font-mono"
              >
                {Object.entries(timeLeft).map(([key, value]) => (
                  <div key={key} className="bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-amber-500 shadow-inner">
                    <span className="text-yellow-300 font-bold text-xl drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]">{value}</span>
                    <span className="text-[10px] text-amber-200 block drop-shadow-md">{key === 'days' ? 'يوم' : key === 'hours' ? 'ساعة' : key === 'minutes' ? 'دقيقة' : 'ثانية'}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* قسم التسبيح */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="text-left">
            <div className="text-2xl font-bold text-green-800">{tasbeehCount * 70}</div>
            <div className="text-xs text-gray-700">في رمضان</div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTasbeeh}
            className="relative cursor-pointer"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg border-3 border-yellow-300"
              style={{ boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)' }}
            >
              <span className="text-2xl font-bold text-white drop-shadow">{tasbeehCount}</span>
            </div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-amber-700 text-xs font-medium bg-white px-2 py-0.5 rounded-full shadow">
              سبح
            </div>
          </motion.div>

          <div className="text-right">
            <div className="text-2xl font-bold text-purple-900">{tasbeehCount * 60000}</div>
            <div className="text-xs text-gray-700">في ليلة القدر</div>
          </div>
        </div>

        {tasbeehCount > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetTasbeeh}
            className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full mb-4 mx-auto block"
          >
            إعادة تعيين
          </motion.button>
        )}

        {/* عنوان جوائز رمضان */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-4 cursor-pointer group"
          onClick={scrollToPrizes}
        >
          <div className="relative inline-block">
            <motion.h3
              animate={{ scale: [1, 1.05, 1], textShadow: ['0 0 10px #f59e0b', '0 0 20px #f59e0b', '0 0 10px #f59e0b'] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-600 via-yellow-500 to-amber-600"
            >
              ✨ جوائز رمضان ✨
            </motion.h3>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-amber-600 text-2xl"
            >
              ↓
            </motion.div>
          </div>
          <p className="text-xs text-gray-500 mt-3">اضغط لاستعراض الجوائز</p>
        </motion.div>

        {/* شبكة الجوائز العمودية الكبيرة */}
        <div ref={prizesRef} className="flex flex-col gap-4 mt-6">
          {prizes.map((prize) => (
            <motion.div
              key={prize.id}
              variants={cardVariants}
              initial="initial"
              whileInView="inView"
              whileHover="hover"
              viewport={{ once: true, amount: 0.1 }}
              className={`relative bg-gradient-to-br ${prize.bgColor} rounded-xl shadow-lg border border-gray-600 overflow-hidden cursor-pointer text-white`}
              onClick={() => togglePrize(prize.id)}
              style={{ boxShadow: `0 5px 15px -5px rgba(0,0,0,0.5), 0 0 10px rgba(251, 191, 36, 0.2)` }}
            >
              <div className="p-4 relative z-10">
                <div className="flex items-start gap-3">
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className={`text-3xl bg-gradient-to-br ${prize.color} w-12 h-12 flex items-center justify-center rounded-lg shadow-md text-white`}
                    style={{ boxShadow: `0 0 8px ${prize.glowColor}` }}
                  >
                    {prize.emoji}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-white mb-1 leading-tight">{prize.title}</h3>
                    <p className="text-sm text-gray-200 leading-tight">{prize.shortDesc}</p>
                  </div>
                  <motion.span
                    animate={{ rotate: openPrize === prize.id ? 180 : 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-amber-300 text-lg"
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
                  <div className="border-t border-amber-400 pt-3 mt-2">
                    {prize.evidence && (
                      <p className="text-amber-300 text-xs italic mb-2 pr-2 border-r-2 border-amber-400">
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-full text-sm font-semibold transition shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClaimPrize(prize);
                      }}
                    >
                      استلم الجائزة
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* التذييل */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 bg-white/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-green-100 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-100/50 to-amber-100/50 blur-xl" />
          <div className="flex flex-col md:flex-row items-center gap-3 relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} className="relative flex-shrink-0">
              <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white shadow-md">
                <Image src="/profile.jpg" alt="أصيل الصبري" width={64} height={64} className="object-cover" />
              </div>
            </motion.div>
            <div className="flex-1 text-center md:text-right">
              <motion.h3 animate={{ scale: [1, 1.01, 1] }} className="text-lg font-bold text-green-800 mb-1">
                أصيل الصبري
              </motion.h3>
              <p className="text-gray-600 mb-1 text-xs leading-relaxed max-w-md mx-auto md:mx-0">
                تخيل لو كانت هذه العروض في مسابقة أرضية: لكانت ضجة إعلامية، وتذاكر بملايين الدولارات لكثرة المقبلين، عروض خيالية في هذا الشهر كل ما عليك هو المبادرة وإخلاص النية. إنها فرصة العمر حقاً، فلا تفرط فيها.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 text-xs">
                <Link href="/" className="text-green-700 hover:text-green-800 transition">🏠 الرئيسية</Link>
                <Link href="/blog" className="text-green-700 hover:text-green-800 transition">📝 المدونة</Link>
                <Link href="/tools" className="text-green-700 hover:text-green-800 transition">🛠️ الأدوات</Link>
                <Link href="/newsletter" className="text-green-700 hover:text-green-800 transition">📧 النشرة</Link>
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
                className="block bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-1.5 px-3 rounded-lg shadow-md border border-yellow-300 text-xs"
              >
                <div className="flex items-center gap-1">
                  <span className="text-base animate-bounce">📋</span>
                  <span>خطة الشهر</span>
                </div>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={sharePage}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold py-1.5 px-3 rounded-lg shadow-md flex items-center justify-center gap-1 text-xs"
              >
                <span className="text-base">📤</span>
                <span>شارك الأجر</span>
              </motion.button>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}