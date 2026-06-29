'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Settings, 
  Wallet, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Star, 
  Gift, 
  Copy, 
  ExternalLink, 
  Smartphone, 
  Laptop, 
  Server, 
  ChevronRight, 
  CheckCircle2, 
  TrendingUp, 
  Edit3,
  Sparkles,
  RefreshCw,
  Eye,
  Info
} from 'lucide-react';

export default function HoneygainLanding() {
  // Safe extraction of default referral link
  const defaultRefLink = process.env.NEXT_PUBLIC_HONEYGAIN_REF_LINK || 'https://r.honeygain.me/VADIM_REFERRAL';
  
  // State for the referral link
  const [referralLink, setReferralLink] = useState(defaultRefLink);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [tempLink, setTempLink] = useState(defaultRefLink);
  const [isCopied, setIsCopied] = useState(false);
  
  // Interactive Earning Calculator States
  const [trafficGB, setTrafficGB] = useState(10); // GB per day
  const [devicesCount, setDevicesCount] = useState(2); // active devices
  const [contentDelivery, setContentDelivery] = useState(true); // content delivery toggle
  const [cdHours, setCdHours] = useState(4); // content delivery hours per day
  
  // Load from local storage if available (client-side only)
  useEffect(() => {
    const savedLink = localStorage.getItem('honeygain_ref_link');
    if (savedLink) {
      const handle = setTimeout(() => {
        setReferralLink(savedLink);
        setTempLink(savedLink);
      }, 0);
      return () => clearTimeout(handle);
    }
  }, []);

  const saveReferralLink = () => {
    let cleanLink = tempLink.trim();
    if (cleanLink && !cleanLink.startsWith('http://') && !cleanLink.startsWith('https://')) {
      cleanLink = 'https://' + cleanLink;
    }
    if (cleanLink) {
      setReferralLink(cleanLink);
      localStorage.setItem('honeygain_ref_link', cleanLink);
      setIsEditingLink(false);
      // Trigger a temporary visual feedback
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const resetReferralLink = () => {
    setReferralLink(defaultRefLink);
    setTempLink(defaultRefLink);
    localStorage.removeItem('honeygain_ref_link');
    setIsEditingLink(false);
  };

  // Honeygain earning formula:
  // - 3 credits per 10MB shared ($3 per 10GB shared = $0.30 per GB)
  // - Content Delivery: 6 credits per hour ($0.06 per hour)
  // - Referral income: we display typical referral bonus estimates
  const calculateMonthlyEarnings = () => {
    const trafficEarnings = trafficGB * 0.30 * 30; // 30 days
    const cdEarnings = contentDelivery ? (cdHours * 0.06 * 30) * devicesCount : 0;
    const deviceMultiplier = Math.min(1 + (devicesCount - 1) * 0.15, 2.0); // adding devices scales earnings up to a limit
    
    const baseEarnings = (trafficEarnings + cdEarnings) * deviceMultiplier;
    return Math.round(baseEarnings + 3); // adding the $3 signup bonus for the visual calculation
  };

  const monthlyTotal = calculateMonthlyEarnings();
  const yearlyTotal = Math.round((monthlyTotal - 3) * 12 + 3);

  // Stats cards data
  const stats = [
    {
      label: 'Средний доход',
      value: '$5 – $20',
      period: 'в месяц',
      description: 'Чистый пассивный заработок при фоновом режиме работы на 2-3 устройствах.',
      icon: TrendingUp,
      color: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
    },
    {
      label: 'Стартовый бонус',
      value: '$3.00',
      period: 'на баланс сразу',
      description: 'Мгновенный приветственный бонус при регистрации по реферальной ссылке.',
      icon: Gift,
      color: 'from-amber-500/10 to-yellow-500/10 border-amber-500/20'
    },
    {
      label: 'Доход от друзей',
      value: '+ 10%',
      period: 'пожизненно',
      description: 'Получайте стабильные 10% от ежедневного заработка каждого приглашенного реферала.',
      icon: Globe,
      color: 'from-blue-500/10 to-indigo-500/10 border-blue-500/20'
    }
  ];

  // Steps data
  const steps = [
    {
      step: 'Шаг 1',
      title: 'Скачай приложение',
      desc: 'Установите официальный клиент Honeygain для Windows, macOS, Android, iOS или Linux за считанные секунды.',
      icon: Download,
      accent: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    {
      step: 'Шаг 2',
      title: 'Установи и забудь',
      desc: 'Запустите приложение и войдите в систему. Оно работает тихо на фоне, делясь только свободным интернетом.',
      icon: Settings,
      accent: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    {
      step: 'Шаг 3',
      title: 'Получай деньги',
      desc: 'Баланс начисляется автоматически. Выводите заработанное на PayPal или мгновенно в криптовалюте JumpToken.',
      icon: Wallet,
      accent: 'bg-teal-500/10 text-teal-400 border-teal-500/30'
    }
  ];

  // Testimonials
  const reviews = [
    {
      name: 'Алексей К.',
      role: 'Студент, Москва',
      rating: 5,
      avatar: 'АК',
      review: 'Сначала отнесся скептически, но Honeygain реально платит! Установил на домашний ПК и старый Android-телефон, который всегда лежит дома. За месяц капает около $15 пассивом — как раз хватает на оплату интернета и мобильной связи. Однозначно рекомендую!',
      date: '2 недели назад'
    },
    {
      name: 'Мария Д.',
      role: 'Фрилансер, Казань',
      rating: 5,
      avatar: 'МД',
      review: 'У меня безлимитный гигабитный интернет, который простаивает 90% времени. С Honeygain я монетизирую этот ресурс абсолютно без усилий. Приложение не тормозит компьютер, работает незаметно. Бонус $3 на старте очень порадовал, минималка набралась быстро.',
      date: '1 месяц назад'
    },
    {
      name: 'Дмитрий В.',
      role: 'IT-специалист, Минск',
      rating: 5,
      avatar: 'ДВ',
      review: 'Проверил трафик через сниффер — действительно, никаких конфиденциальных данных Honeygain не передает, только обычные веб-запросы от проверенных компаний (SEO, анализ цен). Работает безопасно. Вывожу сразу на кошелек JumpToken с нулевой комиссией.',
      date: '3 дня назад'
    }
  ];

  // Simulation of live shared traffic ticking
  const [liveBytes, setLiveBytes] = useState(142.84);
  const [liveCredits, setLiveCredits] = useState(42.85);
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveBytes(prev => +(prev + Math.random() * 0.15).toFixed(2));
      setLiveCredits(prev => +(prev + Math.random() * 0.045).toFixed(4));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden selection:bg-[#17B169] selection:text-white pb-6">
      {/* Background Decorative Mesh Elements consistent with Bento theme */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-100/50 via-slate-50 to-transparent z-0" />

      {/* STICKY HEADER WITH REFERRAL LINK CUSTOMIZER */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-slate-200/80 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3" id="logo-container">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#17B169] to-[#149558] shadow-md shadow-green-100">
                <span className="font-bold text-white text-xl">🐝</span>
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <span className="font-bold text-slate-900 tracking-tight block text-base sm:text-lg">Honeygain</span>
                <span className="text-[10px] text-[#17B169] font-bold tracking-widest uppercase block -mt-1">Партнерская сеть</span>
              </div>
            </div>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center space-x-8 text-sm text-slate-600 font-semibold">
              <a href="#how-it-works" className="hover:text-[#17B169] transition-colors">Как это работает</a>
              <a href="#calculator" className="hover:text-[#17B169] transition-colors flex items-center gap-1">
                Калькулятор <span className="text-[9px] bg-green-100 text-[#17B169] px-1.5 py-0.5 rounded font-mono font-bold">LIVE</span>
              </a>
              <a href="#safety" className="hover:text-[#17B169] transition-colors">Безопасность</a>
              <a href="#reviews" className="hover:text-[#17B169] transition-colors">Отзывы</a>
            </nav>

            {/* Quick action / customizer toggle */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsEditingLink(!isEditingLink)}
                className={`flex items-center gap-1.5 text-xs px-3.5 py-2 rounded-xl border transition-all ${
                  isEditingLink 
                    ? 'bg-slate-900 border-slate-800 text-amber-400' 
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
                }`}
                title="Настроить свою реферальную ссылку"
                id="link-settings-btn"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-medium">Своя ссылка</span>
              </button>

              <a 
                href={referralLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#17B169] hover:bg-[#149558] active:translate-y-0.5 transition-all rounded-xl shadow-lg shadow-green-200 border-b-2 border-[#128a52]"
                id="header-cta-btn"
              >
                <span>Получить $3</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Link Editor Slide-down Drawer */}
        <AnimatePresence>
          {isEditingLink && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-slate-100 border-b border-slate-200"
              id="ref-link-drawer"
            >
              <div className="max-w-3xl mx-auto px-4 py-4 sm:py-6">
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 p-4 rounded-2xl mb-4">
                  <Info className="w-5 h-5 text-[#17B169] shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Настройка реферала:</strong> Введите вашу личную ссылку Honeygain ниже. Все кнопки призыва к действию (CTA) на этой странице мгновенно перенастроятся на вашу ссылку. Параметры сохранятся на вашем компьютере.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={tempLink}
                      onChange={(e) => setTempLink(e.target.value)}
                      placeholder="Вставьте ссылку, например: https://r.honeygain.me/YOUR_CODE"
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#17B169] placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={saveReferralLink}
                      className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#17B169] hover:bg-[#149558] text-white text-sm font-bold rounded-xl transition-colors border-b-2 border-[#128a52]"
                    >
                      Сохранить
                    </button>
                    <button 
                      onClick={resetReferralLink}
                      className="px-3.5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 text-xs rounded-xl transition-colors"
                      title="Сбросить на оригинал"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <span>Активная ссылка для перехода:</span>
                    <code className="text-[#17B169] font-bold truncate bg-white border border-slate-200 px-1.5 py-0.5 rounded max-w-[240px] sm:max-w-md">
                      {referralLink}
                    </code>
                  </div>
                  {isCopied && (
                    <span className="text-[#17B169] font-bold shrink-0 animate-bounce">
                      ✨ Ссылка обновлена!
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* HERO SECTION - REWRITTEN INTO BENTO GRID ASYMMETRIC TILES */}
      <section className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 flex items-center" id="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Bento Block 1: Main Hero Brand Message (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 shadow-xs rounded-3xl p-6 sm:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 opacity-60" />
              
              <div className="space-y-6">
                {/* Promotion Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-[#17B169] text-xs sm:text-sm font-bold">
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Приветственный бонус при регистрации</span>
                  <span className="bg-[#17B169] text-white px-2 py-0.5 rounded-full text-[10px] font-black">+$3</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.15]">
                  Твой интернет <br className="hidden sm:inline" />
                  может <span className="text-[#17B169]">приносить деньги.</span> <br />
                  Узнай как.
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed font-normal">
                  Установи приложение Honeygain, делись неиспользуемым трафиком и зарабатывай от <strong className="text-[#17B169] font-bold">$5 в месяц</strong>, даже не открывая приложение. Абсолютно безопасно и без каких-либо личных вложений.
                </p>
              </div>

              {/* Action Buttons & Badges */}
              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href={referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto relative group overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-black text-white bg-[#17B169] hover:bg-[#149558] rounded-2xl transition-all shadow-xl shadow-green-200 border-b-4 border-[#128a52] active:translate-y-1"
                    id="hero-main-cta"
                  >
                    <span className="relative z-10">ПОЛУЧИТЬ $3 НА СТАРТ</span>
                    <ChevronRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a 
                    href="#how-it-works"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-2xl transition-all"
                  >
                    <span>Как это работает?</span>
                  </a>
                </div>

                {/* Simple Badges styled with Bento theme details */}
                <div className="pt-6 grid grid-cols-3 gap-3 border-t border-slate-100 text-left">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#17B169] shrink-0" />
                    <span className="text-xs text-slate-500 font-medium">100% Пассив</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#17B169] shrink-0" />
                    <span className="text-xs text-slate-500 font-medium">Без вложений</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#17B169] shrink-0" />
                    <span className="text-xs text-slate-500 font-medium">Полный контроль</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Block 2: Live Network Visualizer (5 cols) styled as Premium Light Bento Card */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 text-slate-900 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-100/30 blur-3xl rounded-full" />
              
              {/* Visual Glass Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-[#17B169] rounded-full animate-ping" />
                  <span className="text-xs text-slate-500 font-mono font-bold tracking-wider uppercase">ОБМЕН ТРАФИКОМ (LIVE)</span>
                </div>
                <div className="bg-green-50 px-2.5 py-1 rounded-lg border border-green-100/50">
                  <span className="text-[10px] text-[#17B169] font-mono font-bold tracking-wider">CONNECT: SECURE</span>
                </div>
              </div>

              {/* Micro Network Activity Simulation */}
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 flex items-center gap-1.5 font-bold">
                      <Smartphone className="w-4 h-4 text-[#17B169]" />
                      Смартфон (Android)
                    </span>
                    <span className="text-[#17B169] font-mono font-bold">Раздает</span>
                  </div>
                  {/* Fake Loading Progress bar */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['40%', '65%', '55%', '80%', '40%'] }}
                      transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
                      className="h-full bg-[#17B169] rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold font-mono">
                    <span>Передано: {(liveBytes * 0.4).toFixed(2)} MB</span>
                    <span>Доход: +${(liveCredits * 0.4).toFixed(3)}</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-150 p-4 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 flex items-center gap-1.5 font-bold">
                      <Laptop className="w-4 h-4 text-[#17B169]" />
                      Компьютер (Windows)
                    </span>
                    <span className="text-[#17B169] font-mono font-bold">Раздает</span>
                  </div>
                  {/* Fake Loading Progress bar */}
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      animate={{ width: ['20%', '45%', '35%', '60%', '20%'] }}
                      transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                      className="h-full bg-emerald-500 rounded-full" 
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500 font-semibold font-mono">
                    <span>Передано: {(liveBytes * 0.6).toFixed(2)} MB</span>
                    <span>Доход: +${(liveCredits * 0.6).toFixed(3)}</span>
                  </div>
                </div>
              </div>

              {/* Total Stats Block */}
              <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider">Всего роздано</span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{liveBytes.toFixed(2)} MB</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block font-bold uppercase tracking-wider">Наш баланс</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-500 font-mono">+${(liveCredits + 3).toFixed(2)}</span>
                </div>
              </div>

              {/* Bottom detail */}
              <div className="flex items-center gap-2.5 bg-amber-50/50 border border-dashed border-amber-200 p-3.5 rounded-2xl">
                <span className="text-lg">🎁</span>
                <p className="text-[10px] text-slate-600 leading-normal font-medium">
                  Стартовые $3 зачислены! Копите баланс и выводите его удобным вам способом без ограничений.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - ALIGNED TO BENTO CARD GRID */}
      <section className="py-16 sm:py-24 border-t border-slate-200/60 bg-slate-100/40" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="text-xs text-[#17B169] font-bold uppercase tracking-widest block">ИНСТРУКЦИЯ</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              Зарабатывай в <span className="text-[#17B169]">3 простых шага</span>
            </h2>
            <div className="w-16 h-1 bg-[#17B169] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
              Honeygain превращает простаивающие сетевые ресурсы в реальную прибыль. Просто следуйте шагам:
            </p>
          </div>

          {/* Three Steps Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="group bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  id={`step-card-${idx}`}
                >
                  <div className="space-y-6">
                    {/* Icon and tag with bento colors */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 rounded-2xl bg-green-50 text-[#17B169] border border-green-100/50">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-extrabold uppercase tracking-widest">{item.step}</span>
                    </div>

                    {/* Text content */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-[#17B169] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Micro label footer */}
                  <div className="mt-8 pt-4 border-t border-slate-100 flex items-center text-[11px] text-slate-400 font-mono gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#17B169]" />
                    <span>Автоматически в фоне</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA under steps */}
          <div className="mt-10 text-center">
            <a 
              href={referralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#17B169] hover:text-[#149558] font-bold transition-all hover:translate-x-1"
              id="steps-cta"
            >
              <span>Зарегистрироваться и получить $3 прямо сейчас</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </section>

      {/* DETAILED EARNINGS & INTERACTIVE CALCULATOR BENTO BLOCK */}
      <section className="py-16 sm:py-24 border-t border-slate-200/60" id="calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="text-xs text-[#17B169] font-bold uppercase tracking-widest block">ПРОГНОЗ ДОХОДА</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              Реальные цифры заработка
            </h2>
            <div className="w-16 h-1 bg-[#17B169] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Ознакомьтесь с тарифными ставками партнерской сети и воспользуйтесь калькулятором для оценки личного пассивного дохода.
            </p>
          </div>

          {/* Stats Cards Bento Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              // determine specific border and accent classes from index
              const borderAccent = idx === 0 ? 'border-emerald-200' : idx === 1 ? 'border-amber-200' : 'border-blue-200';
              const textAccent = idx === 0 ? 'text-[#17B169]' : idx === 1 ? 'text-amber-500' : 'text-blue-500';
              const bgAccent = idx === 0 ? 'bg-green-50' : idx === 1 ? 'bg-amber-50' : 'bg-blue-50';

              return (
                <div 
                  key={idx}
                  className={`bg-white border ${borderAccent} rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs flex flex-col justify-between`}
                  id={`stat-card-${idx}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-slate-400 font-bold uppercase tracking-wider">{item.label}</span>
                    <div className={`p-2 rounded-xl ${bgAccent}`}>
                      <Icon className={`w-4 h-4 ${textAccent}`} />
                    </div>
                  </div>
                  <div>
                    <span className={`text-2xl sm:text-4xl font-black block tracking-tight ${textAccent}`}>{item.value}</span>
                    <span className="text-xs text-slate-400 font-mono font-semibold block mt-1">{item.period}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* BENTO CALCULATOR PANEL - LIGHT BACKDROP CONTROLS & DARK RESULTS TILE */}
          <div className="border border-slate-200 shadow-xl rounded-3xl overflow-hidden bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column - Controls (8 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-10 space-y-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs text-[#17B169] font-bold uppercase tracking-widest">ИНТЕРАКТИВ</span>
                  <h3 className="text-lg sm:text-2xl font-black text-slate-900">Рассчитайте ваш примерный пассивный заработок</h3>
                </div>

                {/* Slider 1: Traffic Shared */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-bold">Делиться трафиком в день (GB):</span>
                    <span className="text-[#17B169] font-black font-mono text-lg">{trafficGB} GB</span>
                  </div>
                  <input 
                    type="range" 
                    min="2" 
                    max="50" 
                    step="1"
                    value={trafficGB}
                    onChange={(e) => setTrafficGB(Number(e.target.value))}
                    className="w-full accent-[#17B169] h-2 bg-slate-100 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold font-mono">
                    <span>2 GB/день</span>
                    <span>25 GB/день</span>
                    <span>50 GB/день</span>
                  </div>
                </div>

                {/* Slider 2: Device Count */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-700 font-bold">Активные устройства с разных IP:</span>
                    <span className="text-[#17B169] font-black font-mono text-lg">
                      {devicesCount} {devicesCount === 1 ? 'устройство' : devicesCount < 5 ? 'устройства' : 'устройств'}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="5" 
                    step="1"
                    value={devicesCount}
                    onChange={(e) => setDevicesCount(Number(e.target.value))}
                    className="w-full accent-[#17B169] h-2 bg-slate-100 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-semibold font-mono">
                    <span>1 девайс</span>
                    <span>3 девайса</span>
                    <span>5 девайсов</span>
                  </div>
                </div>

                {/* Toggle: Content Delivery */}
                <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">Доставка контента (Content Delivery)</span>
                        <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[9px] font-bold font-mono">БОНУС</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Дополнительное вознаграждение за стабильное распределение трафика для мультимедийных трансляций.
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setContentDelivery(!contentDelivery)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        contentDelivery ? 'bg-[#17B169]' : 'bg-slate-300'
                      }`}
                      id="content-delivery-toggle"
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        contentDelivery ? 'translate-x-5' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>

                  {contentDelivery && (
                    <div className="space-y-3 pt-3 border-t border-slate-200">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-medium">Часов раздачи контента в сутки:</span>
                        <span className="text-amber-600 font-bold font-mono">{cdHours} ч.</span>
                      </div>
                      <input 
                        type="range" 
                        min="1" 
                        max="24" 
                        step="1"
                        value={cdHours}
                        onChange={(e) => setCdHours(Number(e.target.value))}
                        className="w-full accent-amber-500 h-1.5 bg-slate-200 rounded-lg cursor-pointer appearance-none"
                      />
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-slate-400 leading-relaxed">
                  * Данные калькулятора основаны на базовом тарифе Honeygain. Доход увеличивается при использовании большего количества уникальных сетевых IP-адресов.
                </div>
              </div>

              {/* Right Column - Results Display (5 cols) in Bento style Dark design */}
              <div className="lg:col-span-5 p-6 sm:p-10 bg-slate-900 text-white flex flex-col justify-between space-y-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-2xl rounded-full" />
                
                <div className="space-y-6 relative z-10">
                  <div>
                    <span className="text-xs text-slate-400 block uppercase tracking-widest font-mono font-bold">РАСЧЕТНЫЙ ПАССИВ</span>
                    <div className="flex items-baseline space-x-1 mt-2">
                      <span className="text-4xl sm:text-5xl font-black text-[#17B169] tracking-tight">${monthlyTotal}</span>
                      <span className="text-slate-300 font-bold text-base">/ месяц</span>
                    </div>
                    <span className="text-xs text-slate-400 leading-none block mt-1.5 font-medium">
                      (включает приветственный бонус $3.00)
                    </span>
                  </div>

                  {/* Progressive Projection */}
                  <div className="space-y-3 border-t border-slate-800 pt-5">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Прогноз за 12 месяцев:</span>
                      <span className="text-white font-extrabold font-mono text-base">${yearlyTotal}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Бонус за регистрацию:</span>
                      <span className="text-amber-400 font-extrabold font-mono">+$3.00 на счет</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Эквивалент пользы:</span>
                      <span className="text-[#17B169] font-bold">Покроет подписку на интернет и ТВ</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  <a 
                    href={referralLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full relative group inline-flex items-center justify-center gap-1.5 px-6 py-4 text-base font-black text-white bg-[#17B169] hover:bg-[#149558] rounded-2xl transition-all shadow-lg shadow-green-900/30 border-b-2 border-[#128a52]"
                    id="calc-cta-btn"
                  >
                    <span>Забрать бонус $3 и начать</span>
                    <ExternalLink className="w-4.5 h-4.5" />
                  </a>
                  <p className="text-center text-[11px] text-slate-400 font-medium">
                    Доход зависит от твоего интернета и региона
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SAFETY & TRANSPARENCY SECTION - INCORPORATING BENTO DESIGNS */}
      <section className="py-16 sm:py-24 border-t border-slate-200/60 bg-slate-100/40 relative" id="safety">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Visual Security Flow Bento block */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="border border-slate-200 bg-white rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-xs">
                
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-50 text-[#17B169] rounded-xl border border-green-100/50">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">Архитектура Безопасности</h3>
                    <p className="text-[11px] text-slate-400 font-bold">Как это устроено технически</p>
                  </div>
                </div>

                {/* Architecture Steps visual flow */}
                <div className="space-y-4 pt-2">
                  <div className="flex gap-3 text-xs items-start">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono flex items-center justify-center shrink-0 text-[10px] font-bold">1</div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 block">Шифрование данных</span>
                      <p className="text-slate-500 text-[11px] leading-relaxed">Все данные передаются только в зашифрованном виде (SSL/TLS). Никакой провайдер или третья сторона не смогут перехватить трафик.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs items-start">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono flex items-center justify-center shrink-0 text-[10px] font-bold">2</div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 block">Полная изоляция приложения</span>
                      <p className="text-slate-500 text-[11px] leading-relaxed">Приложение работает в изолированной «песочнице». У программы абсолютно нет доступа к вашим фотографиям, контактам, сообщениям или паролям.</p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-xs items-start">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white font-mono flex items-center justify-center shrink-0 text-[10px] font-bold">3</div>
                    <div className="space-y-1">
                      <span className="font-bold text-slate-800 block">Проверенные корпоративные партнеры</span>
                      <p className="text-slate-500 text-[11px] leading-relaxed">Клиентами Honeygain являются исключительно авторитетные компании из списка Fortune 500, использующие прокси для SEO-мониторинга и защиты брендов.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
                  <Lock className="w-5 h-5 text-amber-500 shrink-0" />
                  <span className="text-[11px] text-slate-500 leading-normal">
                    Конфиденциальность пользователя — главный приоритет. Регулируется законами ЕС о защите данных GDPR.
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Text & Badges Bento Card content */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs text-[#17B169] font-bold uppercase tracking-widest block">ЗАЩИТА ДАННЫХ</span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
                  Твои данные под надежной защитой
                </h2>
                <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                  Honeygain ценит доверие пользователей. Приложение использует исключительно неиспользуемую пропускную способность вашего интернет-канала и никогда не собирает личную или конфиденциальную информацию.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex gap-3 items-start">
                  <div className="p-2 bg-green-50 text-[#17B169] rounded-lg shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Никакого сбора файлов</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1">Приложение не имеет доступа к вашей памяти, галерее, контактам или дискам.</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex gap-3 items-start">
                  <div className="p-2 bg-green-50 text-[#17B169] rounded-lg shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Шифрование трафика</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1">Вся передаваемая информация на 100% зашифрована сквозными протоколами.</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex gap-3 items-start">
                  <div className="p-2 bg-green-50 text-[#17B169] rounded-lg shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Умное распределение</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1">Приложение не забивает роутер и не снижает общую скорость соединения.</p>
                  </div>
                </div>

                <div className="p-4 bg-white border border-slate-200 rounded-2xl flex gap-3 items-start">
                  <div className="p-2 bg-green-50 text-[#17B169] rounded-lg shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Антивирусный контроль</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-1">Код приложения регулярно проверяется всеми ведущими антивирусами на безопасность.</p>
                  </div>
                </div>
              </div>

              <div>
                <a 
                  href={referralLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-sm font-bold text-white rounded-xl transition-all shadow-sm"
                  id="safety-cta-btn"
                >
                  <span>Начать зарабатывать безопасно</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SOCIAL PROOF & TESTIMONIALS */}
      <section className="py-16 sm:py-24 border-t border-slate-200/60" id="reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
            <span className="text-xs text-[#17B169] font-bold uppercase tracking-widest block">СОЦИАЛЬНОЕ ДОКАЗАТЕЛЬСТВО</span>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900">
              Что говорят пользователи
            </h2>
            <div className="w-16 h-1 bg-[#17B169] mx-auto rounded-full" />
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              Уже миллионы пользователей по всему миру используют Honeygain для создания дополнительного пассивного дохода. Вот реальные отзывы некоторых из них.
            </p>
          </div>

          {/* Testimonial Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-all duration-300"
                id={`review-card-${idx}`}
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center space-x-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    «{item.review}»
                  </p>
                </div>

                {/* User Info block */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-[#17B169] border border-green-200 flex items-center justify-center font-bold text-sm">
                    {item.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <span className="text-[11px] text-slate-400 font-semibold">{item.role}</span>
                  </div>
                  <span className="ml-auto text-[10px] text-slate-400 font-mono">{item.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Trustpilot-like badge simulation */}
          <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-3 border border-slate-200 bg-white p-5 rounded-2xl max-w-2xl mx-auto shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-semibold">Рейтинг на независимых площадках:</span>
              <div className="flex items-center space-x-0.5 bg-green-50 text-[#17B169] border border-green-100 px-2 py-0.5 rounded text-xs font-bold font-mono">
                <span>★ 4.8 / 5</span>
              </div>
            </div>
            <span className="hidden sm:inline text-slate-300">|</span>
            <div className="text-xs text-slate-500 font-medium">
              Более <strong className="text-slate-800">100,000+</strong> отзывов в магазинах приложений и форумах.
            </div>
          </div>

        </div>
      </section>

      {/* FINAL COMPACT CTA BLOCK - COMPLYING TO BENTO THEME BACKGROUND COLOR AND CTA DESIGN */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10" id="final-cta">
        <div className="bg-[#17B169] rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between shadow-xl shadow-green-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full" />
          
          <div className="text-white text-center lg:text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-white rounded-full text-xs font-bold uppercase tracking-wider">
              <Gift className="w-4 h-4 animate-bounce" />
              <span>Ограниченное предложение</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Начни зарабатывать прямо сейчас
            </h2>

            <p className="text-green-50 text-sm sm:text-base leading-relaxed">
              Присоединяйся к миллионам пользователей и получай свой первый приветственный <strong className="font-extrabold text-white">$3 бонус</strong> на баланс сразу после регистрации!
            </p>
          </div>

          <div className="mt-8 lg:mt-0 shrink-0 text-center space-y-3">
            <a 
              href={referralLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-[#17B169] hover:bg-slate-50 px-8 py-4.5 rounded-xl font-black text-base sm:text-lg transition-all shadow-md uppercase active:translate-y-0.5"
              id="final-cta-btn"
            >
              <span>Регистрация и $3 бонус</span>
              <ExternalLink className="w-4.5 h-4.5 ml-2" />
            </a>
            <p className="text-[11px] text-green-100 block">
              * Бонус зачисляется автоматически при регистрации по нашей ссылке.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-slate-200/80 bg-slate-100 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <span className="text-xl">🐝</span>
              <span className="font-bold text-slate-800 text-base">Honeygain Partner Program</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">Как это работает</a>
              <span>•</span>
              <a href="#calculator" className="hover:text-slate-900 transition-colors">Калькулятор</a>
              <span>•</span>
              <a href="#safety" className="hover:text-slate-900 transition-colors">Безопасность</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-slate-400">
            <div>
              <span className="font-medium text-slate-500">© 2026. Все права защищены.</span>
            </div>
            
            <div className="max-w-md text-center sm:text-right leading-relaxed text-[10px] text-slate-400">
              Дисклеймер: Данный сайт является независимым партнерским ресурсом для привлечения рефералов. Название бренда Honeygain, логотип и товарные знаки принадлежат их законным правообладателям.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
