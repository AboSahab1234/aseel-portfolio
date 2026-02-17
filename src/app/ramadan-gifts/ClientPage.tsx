'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// تعريف نوع الجائزة
interface Prize {
  id: number;
  emoji: string;
  title: string;
  shortDesc: string;
  fullDesc: string | string[];
  evidence?: string;
  color: string;
  bgColor: string;
}

export default function RamadanGiftsPage() {
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

  // عبارات متغيرة عن رمضان
  const ramadanPhrases = [
    "أبواب الجنة مفتوحة",
    "أبواب النار مغلقة",
    "الشياطين مصفدة",
    "النافلة ب 70",
    "الدعاء مستجاب",
    "الحسنة ب70 ضعف",
    "العتق من النار كل يوم",
    "ليلة واحدة تساوي( 30 ألف) ليلة",
    "الصدقة بـ 700 ضعف",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ramadanPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ✅ التعديل هنا: بداية رمضان 17 فبراير 2026 الساعة 6 مساءً
  const ramadanStart = new Date('2026-02-17T18:00:00').getTime();
  // ✅ نهاية رمضان بعد 30 يومًا (19 مارس 2026 الساعة 6 مساءً)
  const ramadanEnd = new Date('2026-03-19T18:00:00').getTime();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // ✅ العداد المعدل
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      
      if (now < ramadanStart) {
        // قبل بدء رمضان
        setRamadanStarted(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else if (now >= ramadanStart && now <= ramadanEnd) {
        // نحن داخل رمضان: نحسب الوقت المتبقي حتى النهاية
        setRamadanStarted(true);
        const distance = ramadanEnd - now;
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        // انتهى رمضان
        setRamadanStarted(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // قائمة الجوائز
  const prizes: Prize[] = [
    {
      id: 1,
      emoji: '🔑',
      title: 'ثمانية مفاتيح من ذهب خالص',
      shortDesc: 'مجموعة مفاتيح أبواب الجنة الثمانية',
      fullDesc: [
        '🔑 باب الريان – للصائمين',
        '🔑 باب الصلاة',
        '🔑 باب الصدقة',
        '🔑 باب الجهاد',
        '🔑 باب الكاظمين الغيظ',
        '🔑 باب الراضين',
        '🔑 باب الذكر',
        '🔑 باب التوبة'
      ],
      evidence: '«إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ»',
      color: 'from-amber-700 to-yellow-600',
      bgColor: 'from-amber-900 to-yellow-800',
    },
    {
      id: 2,
      emoji: '🎟️',
      title: 'كوبون مغفرة شامل ١٠٠٪',
      shortDesc: 'بطاقة تصفير الذنوب مدى الحياة',
      fullDesc: 'هذه البطاقة الذهبية تمنحك فرصة نادرة لمسح جميع ذنوبك السابقة دفعة واحدة، وكأنك عدت إلى الدنيا في يوم ولادتك الأول. لا توجد أي استثناءات أو شروط خفية. فقط صم رمضان إيماناً واحتساباً، والبطاقة مفعلة تلقائياً. عرض خاص لشهر رمضان فقط.',
      evidence: '«مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ»',
      color: 'from-emerald-700 to-green-600',
      bgColor: 'from-emerald-900 to-green-800',
    },
    {
      id: 3,
      emoji: '🔒',
      title: 'تصفيد الشياطين',
      shortDesc: 'حزمة أمان شاملة لمدة 30 يوم',
      fullDesc: 'تخيل أن ألد أعدائك الذين يتربصون بك ليل نهار قد تم تقييدهم بالسلاسل وإلقاؤهم في سجن بعيد. الآن الطريق أمامك مفتوح، والأجواء نقية، والفرصة سانحة لتحقيق أعظم الانتصارات الروحية. هذه الحزمة تشمل تصفيد جميع الشياطين والمردة طوال الشهر الكريم.',
      evidence: '«وَصُفِّدَتِ الشَّيَاطِينُ»',
      color: 'from-blue-700 to-indigo-600',
      bgColor: 'from-blue-900 to-indigo-800',
    },
    {
      id: 4,
      emoji: '⭐',
      title: 'ليلة القدر - الليلة العظمى',
      shortDesc: 'ليلة واحدة تعادل عمراً كاملاً',
      fullDesc: 'هل تصدق أن ليلة واحدة يمكن أن تساوي أكثر من 83 سنة من العبادة؟ هذه هي ليلة القدر، الليلة التي تتنزل فيها الملائكة بالرحمة والمغفرة. من يقمها إيماناً واحتساباً يخرج من ذنوبه كيوم ولدته أمه. إنها فرصة العمر التي لا تعوض بكل الدنيا.',
      evidence: '«لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ»',
      color: 'from-purple-700 to-violet-600',
      bgColor: 'from-purple-900 to-violet-800',
    },
    {
      id: 5,
      emoji: '🔥',
      title: 'العتق من النار - سحب يومي',
      shortDesc: '70,000 بطاقة نجاة كل ليلة',
      fullDesc: 'كل ليلة من رمضان، يتم سحب 70,000 اسم من الذين سيعتقون من النار. الجائزة لا تقدر بثمن: إنها نجاة أبدية من العذاب. للمشاركة، كل ما عليك هو صيام النهار وقيام الليل ولو بركعات قليلة. قد تكون أنت الفائز الليلة.',
      evidence: '«إِنَّ لِلَّهِ عُتَقَاءَ مِنَ النَّارِ فِي كُلِّ لَيْلَةٍ»',
      color: 'from-red-700 to-rose-600',
      bgColor: 'from-red-900 to-rose-800',
    },
    {
      id: 6,
      emoji: '💰',
      title: 'الصدقة بـ 70 ضعف - استثمار أبدي',
      shortDesc: 'أرباح مضمونة 7000%',
      fullDesc: 'لو استثمرت درهماً واحداً في شركة تعدك بعائد 700 ضعف، أكنت تتردد؟ هذا هو عرض الصدقة في رمضان: درهم واحد يتحول إلى 700 درهم في ميزان حسناتك. بل إن الله يضاعف لمن يشاء. بادر ولو بشق تمرة، فربما كانت تلك التمرة سبباً في دخولك الجنة.',
      evidence: '«مَثَلُ الَّذِينَ يُنفِقُونَ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ»',
      color: 'from-teal-700 to-cyan-600',
      bgColor: 'from-teal-900 to-cyan-800',
    },
    {
      id: 7,
      emoji: '📖',
      title: 'ختمة قرآنية - نور لا ينطفئ',
      shortDesc: 'هدية تنير قبرك يوم الوحدة',
      fullDesc: 'هذا الكتاب ليس كأي كتاب. كل حرف تقرؤه بحسنة، والحسنة بعشر أمثالها. بل إن القرآن يأتي يوم القيامة شفيعاً لأصحابه، يقول: "يارب إني منعته النوم فشفعني فيه". تخيل أن لك شفيعاً بهذه القوة يوم لا ينفع مال ولا بنون. اقرأ ورداً يومياً واختم القرآن في رمضان.',
      evidence: '«اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي شَفِيعًا»',
      color: 'from-green-700 to-emerald-600',
      bgColor: 'from-green-900 to-emerald-800',
    },
    {
      id: 8,
      emoji: '🕌',
      title: 'صلاة التراويح - برنامج ليلي حصري',
      shortDesc: 'قيام الليل مع الإمام حتى الصباح',
      fullDesc: 'انضم إلى الملايين حول العالم في هذا البرنامج الروحي الفريد. من قام مع الإمام حتى ينصرف كتب له قيام ليلة كاملة. الليالي العشر الأواخر فيها ليلة القدر، فلا تحرم نفسك من هذه الجوائز العظيمة.',
      evidence: '«مَنْ قَامَ مَعَ الإِمَامِ حَتَّى يَنْصَرِفَ كُتِبَ لَهُ قِيَامُ لَيْلَةٍ»',
      color: 'from-indigo-700 to-blue-600',
      bgColor: 'from-indigo-900 to-blue-800',
    },
    {
      id: 9,
      emoji: '🤲',
      title: 'دعوة الصائم - الكنز المفقود',
      shortDesc: 'لحظة استجابة مضمونة',
      fullDesc: 'عندما تفطر بعد صيام يوم طويل، وأنت في حالة من الخشوع والضعف، تخرج من قلبك دعوة لا ترد. تخيل أن ملكاً عظيماً يقول لك: "سل تعط". ماذا ستسأل؟ الجنة؟ النجاة من النار؟ صلاح الأولاد؟ كل ذلك ممكن في لحظة. لا تفرط في هذه الدقائق الثمينة.',
      evidence: '«لِلصَّائِمِ عِنْدَ فِطْرِهِ دَعْوَةٌ مَا تُرَدُّ»',
      color: 'from-orange-700 to-amber-600',
      bgColor: 'from-orange-900 to-amber-800',
    },
    {
      id: 10,
      emoji: '💎',
      title: 'رفع الدرجات - شيك على بياض',
      shortDesc: 'للصابرين أجر بغير حساب',
      fullDesc: 'الصبر في رمضان له ثلاثة أنواع: الصبر على الطاعة (القيام والصيام)، والصبر عن المعصية (غض البصر واللسان)، والصبر على الأذى. هذا الصبر يرفع الدرجات بلا حدود، وكأنك تملك شيكاً على بياض من ملك الملوك. كم تريد من الدرجات؟ قل ما شئت، فهو أكرم الأكرمين.',
      evidence: '«إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ»',
      color: 'from-pink-700 to-fuchsia-600',
      bgColor: 'from-pink-900 to-fuchsia-800',
    },
  ];

  const togglePrize = (id: number) => {
    setOpenPrize(openPrize === id ? null : id);
  };

  const handleClaimPrize = (prize: Prize) => {
    setSelectedPrize(prize);
    setShowClaimModal(true);
  };

  const iconVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: {
      scale: [1, 1.15, 1],
      rotate: [0, 8, -8, 0],
      transition: { duration: 1.8, repeat: Infinity, repeatType: 'mirror' as const },
    },
    hover: {
      scale: 1.3,
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: [0, -5, 0],
      scale: 1.02,
      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.4)',
      transition: { duration: 0.3, y: { repeat: Infinity, duration: 0.8 } },
    },
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-green-900 to-green-700 flex items-center justify-center z-50">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-8xl text-white"
        >
          🎁
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-20 text-white text-2xl font-bold"
        >
          يتم تحضير هداياك...
        </motion.h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-sans" dir="rtl">
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
              className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-lg mx-4 border-4 border-amber-300 cursor-pointer"
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
              <p className="text-xl text-gray-600 mb-4">لا رسوم اشتراك .. لا أوراق .. لا تعقيدات .. الفرصة سانحة.</p>
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

      {/* النافذة المنبثقة لاستلام الجائزة - بدون شروط */}
      <AnimatePresence>
        {showClaimModal && selectedPrize && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border-2 border-amber-200"
            >
              <div className={`bg-gradient-to-r ${selectedPrize.color} p-6 text-white text-center`}>
                <span className="text-6xl mb-2 block">{selectedPrize.emoji}</span>
                <h3 className="text-2xl font-bold">{selectedPrize.title}</h3>
              </div>
              <div className="p-6 text-gray-700 space-y-4">
                <div>
                  <p className="font-semibold text-amber-700 mb-2">📅 موعد التسليم:</p>
                  <ul className="space-y-2 pr-4">
                    <li className="flex items-center gap-2"><span className="text-green-600">•</span><span><span className="font-medium">في العيد:</span> فرحة لا توصف.</span></li>
                    <li className="flex items-center gap-2"><span className="text-green-600">•</span><span><span className="font-medium">في القبر:</span> نور وفسحة.</span></li>
                    <li className="flex items-center gap-2"><span className="text-green-600">•</span><span><span className="font-medium">يوم القيامة:</span> تحت ظل العرش.</span></li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-sm">
                  <p className="text-blue-800 leading-relaxed">
                    لا تحتاج لذكر اسمك ولا رقم حسابك، فراعي المسابقة يعلم كل شيء، بيده كل شيء، وهو أكرم الأكرمين.
                  </p>
                </div>
                <p className="text-center text-gray-600 font-medium pt-2">الآن.. ابدأ العمل، فالجائزة بانتظارك.</p>
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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* القسم العلوي (كما هو) */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 relative"
        >
          {/* نجوم متحركة */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-300 text-2xl"
                initial={{ x: Math.random() * 1000 - 500, y: Math.random() * 200 - 100, opacity: 0 }}
                animate={{
                  x: [null, Math.random() * 100 - 50],
                  y: [null, Math.random() * 50 - 25],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              >
                {i % 2 === 0 ? '⭐' : '✨'}
              </motion.div>
            ))}
          </div>

          <motion.div
            animate={{ scale: [1, 1.07, 1], rotate: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="inline-block bg-gradient-to-r from-green-600 to-green-400 text-white px-8 py-4 rounded-full text-3xl font-bold shadow-lg mb-4"
          >
            🌙 مبارك عليكم الشهر 🌙
          </motion.div>

          <div className="relative mb-6">
            <div className="w-full h-2 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 rounded-full shadow-lg animate-pulse"></div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-amber-700 to-yellow-600 mt-2">
              🎉 العروض الرمضانية 🎉
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={phraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-2xl font-bold text-amber-600 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full inline-block shadow-md mb-6"
            >
              {ramadanPhrases[phraseIndex]}
            </motion.div>
          </AnimatePresence>

          {/* ✅ العداد المعدل مع عنوان جديد */}
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
            <motion.div
              animate={{ scale: [1, 1.02, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-300 rounded-2xl blur-xl"
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
                    <div key={key} className="bg-blue-950/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-blue-500 shadow-inner">
                      <span className="text-yellow-300 font-bold drop-shadow-[0_0_8px_rgba(255,255,0,0.8)]">{value}</span>
                      <span className="text-xs text-blue-200 block drop-shadow-md">
                        {key === 'days' ? 'يوم' : key === 'hours' ? 'ساعة' : key === 'minutes' ? 'دقيقة' : 'ثانية'}
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* شبكة الجوائز */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {prizes.map((prize) => (
            <motion.div
              key={prize.id}
              variants={cardVariants}
              initial="initial"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
              whileHover="hover"
              className={`relative bg-gradient-to-br ${prize.bgColor} rounded-2xl shadow-xl border border-gray-700 overflow-hidden cursor-pointer text-white`}
              onClick={() => togglePrize(prize.id)}
              style={{ boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{ background: ['radial-gradient(circle at 30% 30%, #fff, transparent)', 'radial-gradient(circle at 70% 70%, #fff, transparent)'] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              />
              <div className="p-5 relative z-10">
                <div className="flex items-start gap-3">
                  <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    className={`text-4xl bg-gradient-to-br ${prize.color} w-14 h-14 flex items-center justify-center rounded-xl shadow-lg text-white`}
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
                      onClick={(e) => { e.stopPropagation(); handleClaimPrize(prize); }}
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
          className="mt-16 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-3xl p-6 md:p-8 shadow-lg border border-green-100 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-200/30 to-emerald-200/30 blur-3xl"></div>
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              <Image src="/profile.jpg" alt="أصيل الصبري" fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-2xl font-bold text-green-800 mb-2">أصيل الصبري</h3>
              <p className="text-gray-700 mb-3 leading-relaxed">
                . تخيل لو كانت هذه العروض في مسابقة أرضية: لكانت ضجة إعلامية، وتذاكر بملايين الدولارات لكثرة المقبلين، عروض خيالية في هذا الشهر كل ما عليك هو المبادرة وإخلاص النية. إنها فرصة العمر حقاً، فلا تفرط فيها
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <Link href="/" className="text-green-700 hover:text-green-900 transition flex items-center gap-1"><span>🏠</span> الرئيسية</Link>
                <Link href="/blog" className="text-green-700 hover:text-green-900 transition flex items-center gap-1"><span>📝</span> المدونة</Link>
                <Link href="/tools" className="text-green-700 hover:text-green-900 transition flex items-center gap-1"><span>🛠️</span> الأدوات المجانية</Link>
                <Link href="/newsletter" className="text-green-700 hover:text-green-900 transition flex items-center gap-1"><span>📧</span> النشرة البريدية</Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              {/* ✅ رابط تحميل PDF باسم ramadan-plan.pdf */}
              <motion.a href="/ramadan-plan.pdf" download whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} className="block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  <div className="text-right"><div className="text-sm opacity-90">حمّل الآن</div><div className="text-xl">خطة اغتنام الشهر</div></div>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}