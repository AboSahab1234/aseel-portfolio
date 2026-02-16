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
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [ramadanStarted, setRamadanStarted] = useState(false);

  // حالة النافذة المنبثقة
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  // تاريخ بداية رمضان 1447 هـ - 19 فبراير 2026
  const ramadanStart = new Date('2026-02-19T00:00:00').getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = ramadanStart - now;

      if (distance < 0) {
        clearInterval(interval);
        setRamadanStarted(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowGiftBox(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // قائمة الجوائز العشر - بنصوص محسنة
  const prizes: Prize[] = [
    {
      id: 1,
      emoji: '🔑',
      title: 'ثمانية مفاتيح من ذهب',
      shortDesc: 'أبواب الجنة الثمانية تنتظرك',
      fullDesc: [
        'باب الريان – للصائمين الذين ظمئت حلوقهم في سبيل الله',
        'باب الصلاة – لمن كانت جبهتهم على الأرض خاشعة',
        'باب الصدقة – للباذلين ولو تمرة',
        'باب الجهاد – لمن جاهدوا أنفسهم في طاعة الله',
        'باب الكاظمين الغيظ – لمن كتموا غيظهم وهم يقدرون',
        'باب الراضين – الذين رضوا بالله رباً وبالإسلام ديناً',
        'باب الذكر – من لا تزال ألسنتهم رطبة بذكر الله',
        'باب التوبة – للعائدين من ذنوبهم كيوم ولدتهم أمهاتهم'
      ],
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ، وَغُلِّقَتْ أَبْوَابُ النَّارِ، وَصُفِّدَتِ الشَّيَاطِينُ»',
      color: 'from-amber-400 to-yellow-500',
      bgColor: 'from-amber-50 to-yellow-50',
    },
    {
      id: 2,
      emoji: '🎟️',
      title: 'كوبون مغفرة شامل ١٠٠٪',
      shortDesc: 'تصفير الذنوب في شهر واحد',
      fullDesc: 'هذا الكوبون لا يشترط منك إلا شيئاً واحداً: أن تصوم رمضان إيماناً واحتساباً. مقابل ذلك، ستمحى ذنوبك كلها، وكأنك خرجت من الدنيا بيضاء نقية كيوم ولدتك أمك. أي صفقة ربحها مثل هذه؟',
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا، غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ»',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      id: 3,
      emoji: '🔒',
      title: 'تصفيد الشياطين',
      shortDesc: 'الشياطين مصفدة.. فاغتنم',
      fullDesc: 'تخيل أن الأعداء الذين يوسوسون لك ليل نهار قد كُبِّلوا بالسلاسل، وأغلقت عليهم الأبواب. الآن الميدان خالٍ، والطريق مفتوح، والجو مهيأ لتحقيق أعظم الانتصارات. من منا سيترك هذه الفرصة الذهبية تفوته؟',
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ، وَغُلِّقَتْ أَبْوَابُ النَّارِ، وَصُفِّدَتِ الشَّيَاطِينُ»',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-50',
    },
    {
      id: 4,
      emoji: '⭐',
      title: 'ليلة القدر.. خير من ألف شهر',
      shortDesc: 'ليلة واحدة = 83 سنة من العمر',
      fullDesc: 'لو قيل لك: أمامك ليلة واحدة تستطيع فيها أن تكسب ما يعادل 83 سنة من الحسنات، أكنت تفرط فيها؟ هذه هي ليلة القدر، ليلة تتنزل فيها الملائكة، ويسلم فيها العباد حتى مطلع الفجر. لا تعوض بكل الدنيا.',
      evidence: 'قَالَ اللَّهُ تَعَالَى: {لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ}',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50',
    },
    {
      id: 5,
      emoji: '🔥',
      title: 'العتق من النار - سحب يومي',
      shortDesc: '70,000 فائز كل يوم',
      fullDesc: 'كل ليلة من رمضان، يختار الله سبعين ألف إنسان يعتقهم من النار. قد تكون أنت واحداً منهم، فقط إذا صمت النهار وقمت الليل ولو بركعات. تخيل أنك تغادر السجن بعد حكم مؤبد، كيف يكون شعورك؟',
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «إِنَّ لِلَّهِ عُتَقَاءَ مِنَ النَّارِ فِي كُلِّ لَيْلَةٍ مِنْ رَمَضَانَ»',
      color: 'from-red-400 to-rose-500',
      bgColor: 'from-red-50 to-rose-50',
    },
    {
      id: 6,
      emoji: '💰',
      title: 'الصدقة بـ ٧٠ ضعف',
      shortDesc: 'استثمار لا يعرف الخسارة',
      fullDesc: 'لو استثمرت درهماً واحداً في شركة تضمن لك أرباح 700 ضعف، أكنت تتردد؟ هذا هو حال الصدقة في رمضان، حبة تزرعها اليوم لتحصد سنابل كثيفة يوم القيامة. بادر ولو بشق تمرة، فربما كانت تلك التمرة سبباً في دخولك الجنة.',
      evidence: 'قَالَ اللَّهُ تَعَالَى: {مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ}',
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'from-teal-50 to-cyan-50',
    },
    {
      id: 7,
      emoji: '📖',
      title: 'ختمة قرآنية كاملة النور',
      shortDesc: 'القرآن شفيعك يوم القيامة',
      fullDesc: 'هذا الكتاب ليس كأي كتاب. كل حرف تقرؤه بحسنة، والحسنة بعشر أمثالها. تخيل أنك تختم القرآن في رمضان مرة أو أكثر، وتأتي يوم القيامة والقرآن يشفع لك، يقول: "يارب إني منعته النوم فشفعني فيه". أترضى أن تخسر هذه الشفاعة؟',
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «اقْرَءُوا الْقُرْآنَ فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ»',
      color: 'from-emerald-400 to-green-500',
      bgColor: 'from-emerald-50 to-green-50',
    },
    {
      id: 8,
      emoji: '🕌',
      title: 'صلاة التراويح',
      shortDesc: 'قيام الليل يمحو الذنوب',
      fullDesc: 'التراويح ليست مجرد صلاة نؤديها ثم ننام. إنها وقفة مع الله في جوف الليل، ترفع الدرجات، وتكفر السيئات، وتقربك من الرحمن. من قام مع الإمام حتى ينصرف كتب له قيام ليلة كاملة. أتحرم نفسك من هذا الأجر العظيم؟',
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «إِنَّهُ مَنْ قَامَ مَعَ الإِمَامِ حَتَّى يَنْصَرِفَ كُتِبَ لَهُ قِيَامُ لَيْلَةٍ»',
      color: 'from-indigo-400 to-blue-500',
      bgColor: 'from-indigo-50 to-blue-50',
    },
    {
      id: 9,
      emoji: '🤲',
      title: 'دعوة الصائم - لا ترد',
      shortDesc: 'ساعة استجابة عند الإفطار',
      fullDesc: 'عندما تفطر بعد صيام يوم شاق، وأنت في حالة من الخشوع والضعف، تخرج من قلبك دعوة لا ترد. تخيل أن ملكاً عظيماً يقول لك: "سل تعط". ماذا ستسأل؟ الجنة؟ النجاة من النار؟ صلاح الأولاد؟ كل ذلك ممكن في لحظة.',
      evidence: 'قَالَ رَسُولُ اللَّهِ ﷺ: «لِلصَّائِمِ عِنْدَ فِطْرِهِ دَعْوَةٌ مَا تُرَدُّ»',
      color: 'from-orange-400 to-amber-500',
      bgColor: 'from-orange-50 to-amber-50',
    },
    {
      id: 10,
      emoji: '💎',
      title: 'رفع الدرجات - شيك على بياض',
      shortDesc: 'للصابرين أجر بغير حساب',
      fullDesc: 'الصبر في رمضان أنواع: الصبر على الطاعة (القيام والصيام)، الصبر عن المعصية (غض البصر واللسان)، الصبر على الأذى. هذا الصبر يرفع الدرجات بلا حدود، كأنك تملك شيكاً على بياض من ملك الملوك. كم تريد؟ قل ما شئت، فهو أكرم الأكرمين.',
      evidence: 'قَالَ اللَّهُ تَعَالَى: {إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ}',
      color: 'from-pink-400 to-fuchsia-500',
      bgColor: 'from-pink-50 to-fuchsia-50',
    },
  ];

  const togglePrize = (id: number) => {
    setOpenPrize(openPrize === id ? null : id);
  };

  // دالة فتح النافذة المنبثقة
  const handleClaimPrize = (prize: Prize) => {
    setSelectedPrize(prize);
    setShowClaimModal(true);
  };

  // حركات الأيقونات
  const iconVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: { duration: 2, repeat: Infinity, repeatType: 'mirror' as const },
    },
    hover: {
      scale: 1.2,
      rotate: [0, 15, -15, 0],
      transition: { duration: 0.6 },
    },
  };

  const cardVariants = {
    initial: { y: 0 },
    hover: {
      y: [0, -8, 0],
      scale: 1.02,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      transition: { duration: 0.4, y: { repeat: Infinity, duration: 1 } },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-sans" dir="rtl">
      {/* علبة الهدايا الافتتاحية */}
      {showGiftBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-lg mx-4 border-4 border-amber-300"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-9xl mb-6"
            >
              🎁
            </motion.div>
            <h2 className="text-4xl font-bold text-green-800 mb-3">فرصة العمر قد لا تتكرر!</h2>
            <p className="text-xl text-gray-600 mb-4">لا رسوم اشتراك .. لا أوراق .. لا تعقيدات .. الفرصة سانحة، والجوائز تنتظر من يمد يديه بالدعاء والعمل.</p>
            <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full" />
          </motion.div>
        </div>
      )}

      {/* النافذة المنبثقة المخصصة */}
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
              {/* رأس النافذة */}
              <div className={`bg-gradient-to-r ${selectedPrize.color} p-6 text-white text-center`}>
                <span className="text-6xl mb-2 block">{selectedPrize.emoji}</span>
                <h3 className="text-2xl font-bold">{selectedPrize.title}</h3>
              </div>

              {/* جسم النافذة */}
              <div className="p-6 text-gray-700 space-y-4">
                <div className="text-center border-b border-amber-100 pb-3">
                  <p className="text-lg font-semibold text-green-700">🎁 استلمت جائزة</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl text-right">
                  <p className="text-amber-800 font-medium mb-2">📝 شروط الاستلام:</p>
                  <p className="text-gray-700">لا رسوم ولا تذاكر ولا تخصيص، ما عليك إلا تصلح النية وتستعين بالله.</p>
                </div>

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
                    لا تحتاج لذكر اسمك ولا رقم حسابك ولا عنوانك، فراعي المسابقة يعلم كل شيء، بيده كل شيء، وهو على كل شيء قدير، وهو أكرم الأكرمين.
                  </p>
                </div>

                <p className="text-center text-gray-600 font-medium pt-2">
                  الآن.. ابدأ العمل، فالجائزة بانتظارك.
                </p>
              </div>

              {/* زر الإغلاق */}
              <div className="p-4 bg-gray-50 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowClaimModal(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold shadow-md transition"
                >
                  ✨ تم الاستلام
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* الهيدر مع العداد المتوهج */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-3"
          >
            رمضان 1447 هـ
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-green-700 to-green-500 mb-3"
          >
            🎁 المسابقة الربانية الكبرى
          </motion.h1>

          {/* العداد المتوهج */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative inline-block mx-auto mb-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-2xl blur-xl"
            />

            <div className="relative bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 shadow-xl border border-amber-200">
              <p className="text-amber-800 font-bold mb-2">
                {ramadanStarted
                  ? '🌙 رمضان أهلاً وسهلاً! انطلقت المسابقة الكبرى'
                  : '⏳ الوقت المتبقي لبدء المسابقة'}
              </p>

              {ramadanStarted ? (
                <div className="text-2xl font-bold text-green-600">🎉 رمضان كريم 🎉</div>
              ) : (
                <motion.div
                  animate={{ y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="flex gap-2 justify-center text-2xl font-mono"
                >
                  <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-amber-300">
                    <span className="text-amber-600">{timeLeft.days}</span>
                    <span className="text-sm text-gray-500 block">يوم</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-amber-300">
                    <span className="text-amber-600">{timeLeft.hours}</span>
                    <span className="text-sm text-gray-500 block">ساعة</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-amber-300">
                    <span className="text-amber-600">{timeLeft.minutes}</span>
                    <span className="text-sm text-gray-500 block">دقيقة</span>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-amber-300">
                    <span className="text-amber-600">{timeLeft.seconds}</span>
                    <span className="text-sm text-gray-500 block">ثانية</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            لا رسوم اشتراك .. لا أوراق .. لا تعقيدات .. الفرصة سانحة، والجوائز تنتظر من يمد يديه بالدعاء والعمل.
          </motion.p>
        </div>

        {/* شبكة الجوائز */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {prizes.map((prize) => (
            <motion.div
              key={prize.id}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
              className={`relative bg-gradient-to-br ${prize.bgColor} rounded-2xl shadow-md border border-white/50 overflow-hidden cursor-pointer`}
              onClick={() => togglePrize(prize.id)}
              style={{ boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
            >
              {/* خلفية متحركة */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, #fff, transparent)',
                    'radial-gradient(circle at 80% 80%, #fff, transparent)',
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

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
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{prize.title}</h3>
                    <p className="text-sm text-gray-600">{prize.shortDesc}</p>
                  </div>

                  <motion.span
                    animate={{ rotate: openPrize === prize.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-amber-600 text-xl"
                  >
                    ▼
                  </motion.span>
                </div>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openPrize === prize.id ? 'auto' : 0,
                    opacity: openPrize === prize.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="border-t-2 border-amber-200 pt-4 mt-3">
                    {prize.evidence && (
                      <p className="text-amber-700 text-sm italic mb-2 pr-3 border-r-2 border-amber-400">
                        {prize.evidence}
                      </p>
                    )}

                    {/* عرض محتوى الجائزة */}
                    {Array.isArray(prize.fullDesc) ? (
                      <div className="space-y-2">
                        {prize.fullDesc.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                            <span className="text-amber-500 text-lg">🔑</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700 text-sm leading-relaxed">{prize.fullDesc}</p>
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
          className="mt-16 bg-gradient-to-r from-green-50 via-white to-green-50 rounded-3xl p-6 md:p-8 shadow-lg border border-green-100 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-200/30 to-emerald-200/30 blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
              <Image src="/profile.jpg" alt="أصيل الصبري" fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-2xl font-bold text-green-800 mb-2">أصيل الصبري</h3>
              <p className="text-gray-600 mb-3">
                تخيل لو كانت هذه الجوائز في مسابقة أرضية: لكانت ضجة إعلامية، وتذاكر بملايين الدولارات، وجوائز ترتفع قيمتها. لكنها حقيقية وأكبر مما تتخيل، وكل ما عليك هو الصيام والقيام وإخلاص النية. إنها فرصة العمر حقاً، فلا تفرط فيها.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <Link href="/" className="text-green-700 hover:text-green-900 transition flex items-center gap-1">
                  <span>🏠</span> الرئيسية
                </Link>
                <Link href="/blog" className="text-green-700 hover:text-green-900 transition flex items-center gap-1">
                  <span>📝</span> المدونة
                </Link>
                <Link href="/tools" className="text-green-700 hover:text-green-900 transition flex items-center gap-1">
                  <span>🛠️</span> الأدوات المجانية
                </Link>
                <Link href="/newsletter" className="text-green-700 hover:text-green-900 transition flex items-center gap-1">
                  <span>📧</span> النشرة البريدية
                </Link>
              </div>
            </div>
            <div className="flex-shrink-0">
              <motion.a
                href="/ramadan-plan.pdf"
                download
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="block bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  <div className="text-right">
                    <div className="text-sm opacity-90">حمّل الآن</div>
                    <div className="text-xl">خطة اغتنام الشهر</div>
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  );
}