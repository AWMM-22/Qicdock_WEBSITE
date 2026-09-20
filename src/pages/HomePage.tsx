import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Car, Smartphone, Check, RefreshCw, Zap, Star, Eye, CreditCard, Wind, MonitorSmartphone, Lightbulb, Layers, Home, BatteryCharging, Plus, ArrowRight, Facebook, Twitter, Instagram, Truck, ShieldCheck, CheckCircle2, Sparkles, Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackPageView } from '../lib/analytics';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import tableStandImg from '../assets/images/table_stand_mount.webp';
import wallStandImg from '../assets/images/wall_stand_mount.webp';
import combinedImg from '../assets/images/3in1 copy.webp';
import RotatingHeadline from '../components/RotatingHeadline';

export default function HomePage() {
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollMarquee = (direction: 'left' | 'right') => {
    if (marqueeContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      marqueeContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const smartCombos = [
    {
      id: 'ultimate-kit',
      title: 'Ultimate All-in-One Kit',
      subtitle: 'Every Mount Included',
      tag: 'Best Value',
      isFlagship: true,
      img: combinedImg,
      features: [
        'Charger (₹1,999) + 5 Mounts',
        'Desk, Wall, Vent, Rear Seat, Pad'
      ],
      regularPrice: 'Regular ₹3,694',
      salePrice: '₹2,594',
      savings: 'SAVE ₹1,100',
      link: '/category/all-in-one',
      cta: 'Get Ultimate Kit'
    },
    {
      id: 'car-combo',
      title: 'Car Combo Bundle',
      subtitle: 'Front & Rear Vehicle Charging',
      tag: 'Cockpit Ready',
      isFlagship: false,
      img: centerMountImg,
      features: [
        '1x Qicdock Core Charger',
        'Console Pad + Vent Clip + Headrest'
      ],
      regularPrice: 'Regular ₹2,996',
      salePrice: '₹2,346',
      savings: 'SAVE ₹650',
      link: '/category/car-combo',
      cta: 'Get Car Pack'
    },
    {
      id: 'home-office',
      title: 'Home & Office Combo',
      subtitle: 'Desk & Wall Mount Package',
      tag: 'Workstation Setup',
      isFlagship: false,
      img: tableStandImg,
      features: [
        '1x Qicdock Core Charger',
        'Weighted Stand + Magnetic Wall Base'
      ],
      regularPrice: 'Regular ₹2,697',
      salePrice: '₹2,247',
      savings: 'SAVE ₹450',
      link: '/category/home-office',
      cta: 'Get Workstation'
    },
    {
      id: 'dual-charger',
      title: 'Dual Charger Mega Pack',
      subtitle: 'For Home & Car Setups',
      tag: 'Special Value',
      isFlagship: false,
      img: combinedImg,
      features: [
        '2x Qicdock Core Chargers',
        'All 5 Universal Mount Bases'
      ],
      regularPrice: 'Regular ₹5,693',
      salePrice: '₹4,293',
      savings: 'SAVE ₹1,400',
      link: '/category/all-in-one',
      cta: 'Get Mega Bundle'
    }
  ];

  useEffect(() => {
    trackPageView('Home');
  }, []);

  return (
    <>
      {/* Hero Section */}
      <main className="relative flex flex-col justify-start md:justify-center items-center overflow-hidden min-h-[calc(100svh-4rem)] sm:min-h-[calc(100vh-5rem)] pt-1 sm:pt-2 md:pt-3 pb-8 sm:pb-12 md:pb-16">
        
        {/* Abstract Background Curves */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <svg viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover" preserveAspectRatio="none">
            {/* Generate multiple dense parallel sine waves */}
            {Array.from({ length: 25 }).map((_, i) => (
              <path 
                key={i} 
                d={`M-100,${100 + i * 30} C300,${-50 + i * 30} 500,${350 + i * 30} 900,${200 + i * 30} C1300,${50 + i * 30} 1500,${250 + i * 30} 1600,${200 + i * 30}`} 
                stroke="#0A1E3F" 
                strokeWidth="4" 
              />
            ))}
          </svg>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-start md:justify-between items-center h-full gap-3 md:gap-8 mt-1 sm:mt-2 md:my-auto pt-0.5 sm:pt-1 md:pt-2">
          
          {/* Left Column (Desktop Only) */}
          <div className="hidden md:flex flex-col justify-center w-1/2 z-20 md:pr-4 lg:pr-10 pt-0">
            {/* Huge Stacked Text with Framer Motion Dynamic Rotating Words */}
            <div className="flex flex-col mb-8 lg:mb-10">
              <RotatingHeadline
                layout="stacked"
                align="left"
                staticText="Designed to"
                staticTextClassName="text-[6.5vw] lg:text-[80px] xl:text-[95px] leading-[1.0] font-['Anton'] text-[#0A1E3F] uppercase tracking-tight"
                dynamicTextClassName="text-[6.5vw] lg:text-[80px] xl:text-[95px] leading-[1.0] font-['Anton'] tracking-tight"
                gradientClassName="text-[#0A1E3F]"
              />
            </div>

            {/* Small Images Row */}
            <div className="flex gap-4 lg:gap-6 max-w-[420px] mb-8">
              <div className="rounded-none border-2 border-[#0A1E3F]/40 p-0 bg-[#FAF7F0] aspect-[4/3] w-1/2 shadow-lg relative group overflow-hidden">
                <div className="w-full h-full overflow-hidden">
                  <img src={tableStandImg} alt="Workspace mounting" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
              <div className="rounded-none border-2 border-[#0A1E3F]/40 p-0 bg-[#FAF7F0] aspect-[4/3] w-1/2 shadow-lg relative group overflow-hidden">
                <div className="w-full h-full overflow-hidden">
                  <img src={airVentImg} alt="Car mounting" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
                </div>
              </div>
            </div>
            
            {/* Action button - brought down */}
            <div className="mt-2 lg:mt-4">
              <Link to="/categories" className="inline-flex items-center justify-center bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-sm uppercase tracking-widest px-10 py-4 rounded-none shadow-xl shadow-[#0A1E3F]/20 transition-all hover:-translate-y-1">
                Explore Categories
              </Link>
            </div>
          </div>

          {/* Right/Center Image & Mobile Layout */}
          <div className="flex-1 w-full md:w-1/2 flex flex-col items-center justify-center relative z-30">
            
            {/* Mobile Title Stack with Framer Motion Dynamic Rotating Words */}
            <div className="md:hidden flex flex-col items-center text-center w-full mb-3">
              <RotatingHeadline
                layout="stacked"
                align="center"
                staticText="Designed to"
                staticTextClassName="text-[12.5vw] xs:text-[46px] leading-[1.05] font-['Anton'] text-[#0A1E3F] tracking-tight uppercase"
                dynamicTextClassName="text-[12.5vw] xs:text-[46px] leading-[1.05] font-['Anton'] tracking-tight"
                gradientClassName="text-[#0A1E3F]"
              />
            </div>

            {/* Hero Image with increased height and presence */}
            <img 
              src={centerMountTransparentImg} 
              alt="QicDock Stand" 
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="w-[88%] sm:w-[78%] md:w-[95%] lg:w-[90%] xl:w-[82%] max-w-[360px] sm:max-w-[440px] md:max-w-none max-h-[44vh] sm:max-h-[50vh] md:max-h-[540px] lg:max-h-[600px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] md:drop-shadow-[-30px_30px_60px_rgba(0,0,0,0.8)] transform -rotate-[8deg] md:-rotate-[12deg] pointer-events-none my-2 md:my-0" 
            />
            
            {/* Mobile-Only Subtitle and Button - brought down with proper spacing */}
            <div className="md:hidden flex flex-col items-center text-center mt-6 sm:mt-8 z-30">
              <Link
                to="/categories"
                className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-none shadow-lg shadow-[#0A1E3F]/20 transition-all active:scale-95"
              >
                Explore Categories
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Integrated Solutions Section */}
      <section className="bg-[#F4F0E6] text-[#0A1E3F] w-full py-16 md:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8 md:space-y-12 max-w-2xl w-full">
            <h2 className="text-3xl md:text-[40px] leading-tight font-medium tracking-tight text-[#0A1E3F]">
              Integrated Solutions for <span className="text-[#0A1E3F]">Every Space</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-6 sm:gap-y-10">
              {/* Feature 1 */}
              <div className="space-y-3 sm:space-y-4 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-4 sm:p-5 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
                <div className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300">
                  <Smartphone className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] stroke-[2]" />
                </div>
                <h3 className="text-sm sm:text-[18px] font-semibold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">On-Desk Adaptability</h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-[15px]">
                  From a simple phone stand to a full workstation, the desk base adapts to your needs.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-3 sm:space-y-4 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-4 sm:p-5 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
                <div className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300">
                  <Car className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] stroke-[2]" />
                </div>
                <h3 className="text-sm sm:text-[18px] font-semibold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">Seamless Car &amp; Wall Integration</h3>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-[15px]">
                  Easily transition from desk to car with specialized vents and wall mounts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 w-full flex justify-end">
            <div className="w-full max-w-[650px] rounded-none overflow-hidden bg-[#111] aspect-[16/9] lg:aspect-[1.8] relative shadow-2xl border-2 border-[#0A1E3F]/40">
               <img 
                 src={combinedImg} 
                 alt="Combined solutions" 
                 loading="lazy"
                 decoding="async"
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="bg-[#F4F0E6] w-full py-24 px-4 md:px-10 relative overflow-hidden border-t border-[#111]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-16 relative z-20">
            <h2 className="text-4xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
              THE <span className="text-[#0A1E3F]">QICDOCK</span> CONFIGURATOR
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium">
              High-resolution charging module, or dynamically changes on click
            </p>
          </div>

          {/* Main Stage */}
          <div className="relative w-full max-w-[1000px] mx-auto mt-6 md:mt-16">
            
            {/* MOBILE VIEW ONLY: The Dynamic Bento Box (Asymmetric Grid) */}
            <div className="block md:hidden">
              <div className="grid grid-cols-2 gap-3">
                
                {/* 1. HERO BENTO CARD: 25W Qi2 Core Engine (Span 2 Cols) */}
                <div className="col-span-2 bg-[#FAF7F0] border-2 border-[#0A1E3F] rounded-none p-4 shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase bg-[#0A1E3F] text-[#F4F0E6]">
                      <Sparkles className="w-3 h-3 text-[#F4F0E6]" />
                      25W Core Engine
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 border border-emerald-200">
                      <Zap className="w-3 h-3 text-emerald-600" />
                      Qi2 Fast Wireless
                    </span>
                  </div>

                  <div className="flex items-center gap-3.5">
                    <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                      <img 
                        src={centerMountTransparentImg} 
                        alt="Qicdock Core Module" 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-md"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-['Anton'] text-lg text-[#0A1E3F] uppercase tracking-wide leading-tight">
                        ONE CORE. EVERY DOCK.
                      </h3>
                      <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                        Hot-swappable magnetic puck clicks seamlessly into car vents, console trays, desk stands, and wall brackets.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-[#EBE5D9] text-[#0A1E3F]">
                          Neodymium Lock
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 bg-[#EBE5D9] text-[#0A1E3F]">
                          360° Rotate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. FLAGSHIP BENTO CARD: All in One Combo (Span 2 Cols) */}
                <Link 
                  to="/category/all-in-one" 
                  className="col-span-2 bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 active:border-[#0A1E3F] rounded-none shadow-sm hover:shadow-md transition-all active:scale-[0.99] group overflow-hidden flex flex-col"
                >
                  <div className="w-full h-44 sm:h-48 relative overflow-hidden bg-transparent">
                    <img 
                      src={combinedImg} 
                      alt="All in one combo" 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
                        Most Popular
                      </span>
                      <span className="text-[10px] font-bold text-white bg-emerald-700 px-2 py-0.5">Save ₹1,100</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-['Anton'] text-lg text-[#0A1E3F] uppercase tracking-wide leading-tight group-hover:text-[#152B52] transition-colors">
                      ALL IN ONE COMBO
                    </h4>
                    <p className="text-[11px] text-gray-600 mt-0.5 line-clamp-1">
                      Car Cockpit + Desk Stand + Bedside Wall Kit
                    </p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-base font-['Anton'] text-[#0A1E3F]">From ₹2,594</span>
                      <span className="text-xs text-gray-400 line-through">₹3,694</span>
                      <span className="ml-auto text-xs font-bold text-[#0A1E3F] inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                        Configure <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>

                {/* 3. VERTICAL BENTO CARD: Car Combo (Span 1 Col) */}
                <Link 
                  to="/category/car-combo" 
                  className="col-span-1 bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 active:border-[#0A1E3F] rounded-none shadow-sm flex flex-col justify-between group transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div>
                    <div className="w-full h-36 relative overflow-hidden bg-transparent">
                      <img 
                        src={centerMountImg} 
                        alt="Car combo" 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 flex items-center justify-between w-[calc(100%-16px)]">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/95 text-blue-900 border border-blue-200">
                          Cockpit
                        </span>
                        <Car className="w-3.5 h-3.5 text-[#0A1E3F] bg-white/95 p-0.5" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-xs text-[#0A1E3F] group-hover:text-[#152B52] transition-colors leading-tight">
                        Car Combo
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                        Vent + Headrest + Console
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2DAC8] flex items-baseline justify-between">
                    <span className="font-['Anton'] text-sm text-[#0A1E3F]">From ₹2,346</span>
                    <ArrowRight className="w-3 h-3 text-[#0A1E3F]" />
                  </div>
                </Link>

                {/* 4. VERTICAL BENTO CARD: Home & Office (Span 1 Col) */}
                <Link 
                  to="/category/home-office" 
                  className="col-span-1 bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 active:border-[#0A1E3F] rounded-none shadow-sm flex flex-col justify-between group transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div>
                    <div className="w-full h-36 relative overflow-hidden bg-transparent">
                      <img 
                        src={tableStandImg} 
                        alt="Home and office Combo" 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 flex items-center justify-between w-[calc(100%-16px)]">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/95 text-purple-900 border border-purple-200">
                          Workstation
                        </span>
                        <Home className="w-3.5 h-3.5 text-[#0A1E3F] bg-white/95 p-0.5" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-xs text-[#0A1E3F] group-hover:text-[#152B52] transition-colors leading-tight">
                        Home & Office
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                        Desk Stand + Wall Dock
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2DAC8] flex items-baseline justify-between">
                    <span className="font-['Anton'] text-sm text-[#0A1E3F]">From ₹2,247</span>
                    <ArrowRight className="w-3 h-3 text-[#0A1E3F]" />
                  </div>
                </Link>

                {/* 5. VERTICAL BENTO CARD: Vehicle Specific (Span 1 Col) */}
                <Link 
                  to="/category/vehicle-specific" 
                  className="col-span-1 bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 active:border-[#0A1E3F] rounded-none shadow-sm flex flex-col justify-between group transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div>
                    <div className="w-full h-36 relative overflow-hidden bg-transparent">
                      <img 
                        src={airVentImg} 
                        alt="Vehicle Specific" 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 flex items-center justify-between w-[calc(100%-16px)]">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/95 text-emerald-900 border border-emerald-200">
                          OEM Fit
                        </span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#0A1E3F] bg-white/95 p-0.5" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-xs text-[#0A1E3F] group-hover:text-[#152B52] transition-colors leading-tight">
                        Vehicle Specific
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                        Fronx, Baleno, Swift, 3XO...
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2DAC8] flex items-baseline justify-between">
                    <span className="font-['Anton'] text-sm text-[#0A1E3F]">₹2,098 Flat</span>
                    <ArrowRight className="w-3 h-3 text-[#0A1E3F]" />
                  </div>
                </Link>

                {/* 6. VERTICAL BENTO CARD: Universal Charging Pad (Span 1 Col) */}
                <Link 
                  to="/category/individual" 
                  className="col-span-1 bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 active:border-[#0A1E3F] rounded-none shadow-sm flex flex-col justify-between group transition-all active:scale-[0.98] overflow-hidden"
                >
                  <div>
                    <div className="w-full h-36 relative overflow-hidden bg-transparent">
                      <img 
                        src={centerMountImg} 
                        alt="Universal car charging pad" 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-2 left-2 flex items-center justify-between w-[calc(100%-16px)]">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-white/95 text-[#0A1E3F] border border-[#0A1E3F]/20">
                          Any Car
                        </span>
                        <BatteryCharging className="w-3.5 h-3.5 text-[#0A1E3F] bg-white/95 p-0.5" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-bold text-xs text-[#0A1E3F] group-hover:text-[#152B52] transition-colors leading-tight">
                        Universal Pad
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-1">
                        Grip Dash & Center Console
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pb-3 pt-1 border-t border-[#E2DAC8] flex items-baseline justify-between">
                    <span className="font-['Anton'] text-sm text-[#0A1E3F]">₹2,098</span>
                    <ArrowRight className="w-3 h-3 text-[#0A1E3F]" />
                  </div>
                </Link>

                {/* 7. FOOTER BENTO STRIP: Stand-Alone Mounts & Brackets (Span 2 Cols) */}
                <Link 
                  to="/category/stand-alone" 
                  className="col-span-2 bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 active:border-[#0A1E3F] rounded-none shadow-sm flex items-center justify-between group transition-all active:scale-[0.99] overflow-hidden"
                >
                  <div className="w-24 h-24 flex-shrink-0 relative overflow-hidden bg-transparent">
                    <img 
                      src={wallStandImg} 
                      alt="Modular mounts" 
                      loading="lazy" 
                      decoding="async" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <div className="flex-1 min-w-0 p-3">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#EBE5D9] text-[#0A1E3F]">
                        Modular Mounts
                      </span>
                      <span className="text-[10px] font-bold text-gray-600">From ₹299</span>
                    </div>
                    <h4 className="font-bold text-xs text-[#0A1E3F] group-hover:text-[#152B52] transition-colors">
                      Stand-Alone Brackets & Bases
                    </h4>
                    <p className="text-[10px] text-gray-500 truncate">
                      Extra vent clips, desk stands & flush wall plates
                    </p>
                  </div>
                  <div className="w-7 h-7 bg-[#EBE5D9] flex items-center justify-center text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#F4F0E6] transition-colors flex-shrink-0 mr-3">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>

              </div>
            </div>

            {/* DESKTOP VIEW ONLY: The 3-Column Connector Stage */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center relative z-10">
              
              {/* Left Column */}
              <div className="flex flex-col gap-6 md:gap-8 items-center md:items-end">
                {/* 1. All in One */}
                <Link to="/category/all-in-one" className="flex flex-col items-center md:items-end group cursor-pointer w-full sm:w-auto">
                  <div className="flex items-center gap-0 w-full sm:w-auto justify-center md:justify-end">
                    <div className="w-[42vw] sm:w-[190px] md:w-[200px] aspect-video rounded-none border-2 border-[#0A1E3F]/40 group-hover:border-[#0A1E3F] bg-transparent shadow-lg transition-colors relative z-10 overflow-hidden">
                      <img src={combinedImg} alt="All in one" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="hidden md:flex w-8 h-8 rounded-none border border-[#0A1E3F]/40 bg-[#FAF7F0] items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] group-hover:border-[#0A1E3F] transition-colors relative z-20">
                      <Layers className="w-4 h-4 relative z-10 bg-[#FAF7F0]" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-left rotate-[18deg]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-[#0A1E3F] mt-2 md:mr-[48px] lg:mr-[56px] group-hover:text-[#0A1E3F] transition-colors">All in one</span>
                </Link>
                
                {/* 2. Car Combo */}
                <Link to="/category/car-combo" className="flex flex-col items-center md:items-end group cursor-pointer w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center gap-0 w-full sm:w-auto justify-center md:justify-end">
                    <div className="w-[42vw] sm:w-[190px] md:w-[200px] aspect-video rounded-none border-2 border-[#0A1E3F]/40 group-hover:border-[#0A1E3F] bg-transparent shadow-lg transition-colors relative z-10 overflow-hidden">
                      <img src={centerMountImg} alt="Car combo" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="hidden md:flex w-8 h-8 rounded-none border border-[#0A1E3F]/40 bg-[#FAF7F0] items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] group-hover:border-[#0A1E3F] transition-colors relative z-20">
                      <Car className="w-4 h-4 relative z-10 bg-[#FAF7F0]" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-full w-6 md:w-12 lg:w-16 h-[1px] bg-[#555] -z-10 origin-left rotate-[-2deg]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-[#0A1E3F] mt-2 md:mr-[48px] lg:mr-[56px] group-hover:text-[#0A1E3F] transition-colors">Car combo</span>
                </Link>

                {/* 3. Home and office Combo */}
                <Link to="/category/home-office" className="flex flex-col items-center md:items-end group cursor-pointer w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center gap-0 w-full sm:w-auto justify-center md:justify-end">
                    <div className="w-[42vw] sm:w-[190px] md:w-[200px] aspect-video rounded-none border-2 border-[#0A1E3F]/40 group-hover:border-[#0A1E3F] bg-transparent shadow-lg transition-colors relative z-10 overflow-hidden">
                      <img src={tableStandImg} alt="Home and office Combo" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="hidden md:flex w-8 h-8 rounded-none border border-[#0A1E3F]/40 bg-[#FAF7F0] items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] group-hover:border-[#0A1E3F] transition-colors relative z-20">
                      <Home className="w-4 h-4 relative z-10 bg-[#FAF7F0]" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-left rotate-[-20deg]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-[#0A1E3F] mt-2 md:mr-[48px] lg:mr-[56px] group-hover:text-[#0A1E3F] transition-colors text-center max-w-[140px] md:max-w-full">Home & Office Combo</span>
                </Link>
              </div>

              {/* Center Column */}
              <div className="flex flex-col items-center justify-center relative py-10 md:py-0">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#0A1E3F] blur-[70px] opacity-25 rounded-full mix-blend-screen pointer-events-none"></div>
                  <img 
                    src={centerMountTransparentImg} 
                    alt="Core Module" 
                    loading="lazy" 
                    decoding="async" 
                    className="w-[220px] md:w-[320px] object-contain relative z-10 drop-shadow-[0_0_20px_rgba(4,217,255,0.5)]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start">
                {/* 4. Car Charger */}
                <Link to="/category/vehicle-specific" className="flex flex-col items-center md:items-start group cursor-pointer w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center gap-0 flex-row-reverse md:flex-row w-full sm:w-auto justify-center md:justify-start">
                    <div className="hidden md:flex w-8 h-8 rounded-none border border-[#0A1E3F]/40 bg-[#FAF7F0] items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] group-hover:border-[#0A1E3F] transition-colors relative z-20">
                      <Zap className="w-4 h-4 relative z-10 bg-[#FAF7F0]" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-right rotate-[-18deg]">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="w-[42vw] sm:w-[190px] md:w-[200px] aspect-video rounded-none border-2 border-[#0A1E3F]/40 group-hover:border-[#0A1E3F] bg-transparent shadow-lg transition-colors relative z-10 overflow-hidden">
                      <img src={airVentImg} alt="Car Charger" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-[#0A1E3F] mt-2 md:ml-[48px] lg:ml-[56px] group-hover:text-[#0A1E3F] transition-colors">Car Charger</span>
                </Link>
                
                {/* 5. Universal car charging pad */}
                <Link to="/category/individual" className="flex flex-col items-center md:items-start group cursor-pointer w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center gap-0 flex-row-reverse md:flex-row w-full sm:w-auto justify-center md:justify-start">
                    <div className="hidden md:flex w-8 h-8 rounded-none border border-[#0A1E3F]/40 bg-[#FAF7F0] items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] group-hover:border-[#0A1E3F] transition-colors relative z-20">
                      <BatteryCharging className="w-4 h-4 relative z-10 bg-[#FAF7F0]" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-6 md:w-12 lg:w-16 h-[1px] bg-[#555] -z-10 origin-right rotate-[2deg]">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="w-[42vw] sm:w-[190px] md:w-[200px] aspect-video rounded-none border-2 border-[#0A1E3F]/40 group-hover:border-[#0A1E3F] bg-transparent shadow-lg transition-colors relative z-10 overflow-hidden">
                      <img src={centerMountImg} alt="Universal car charging pad" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-[#0A1E3F] mt-2 md:ml-[48px] lg:ml-[56px] group-hover:text-[#0A1E3F] transition-colors text-center max-w-[140px] md:max-w-full">Universal Charging Pad</span>
                </Link>

                {/* 6. Only stand */}
                <Link to="/category/stand-alone" className="flex flex-col items-center md:items-start group cursor-pointer w-full sm:w-auto mt-4 sm:mt-0">
                  <div className="flex items-center gap-0 flex-row-reverse md:flex-row w-full sm:w-auto justify-center md:justify-start">
                    <div className="hidden md:flex w-8 h-8 rounded-none border border-[#0A1E3F]/40 bg-[#FAF7F0] items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] group-hover:border-[#0A1E3F] transition-colors relative z-20">
                      <MonitorSmartphone className="w-4 h-4 relative z-10 bg-[#FAF7F0]" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-right rotate-[20deg]">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="w-[42vw] sm:w-[190px] md:w-[200px] aspect-video rounded-none border-2 border-[#0A1E3F]/40 group-hover:border-[#0A1E3F] bg-transparent shadow-lg transition-colors relative z-10 overflow-hidden">
                      <img src={wallStandImg} alt="Only stand" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-[#0A1E3F] mt-2 md:ml-[48px] lg:ml-[56px] group-hover:text-[#0A1E3F] transition-colors">Only Stand</span>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Compatibility & Car Assistant Section */}
      <section id="compatibility" className="bg-[#F4F0E6] w-full py-8 md:py-12 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Interactive Assistant Launch Banner */}
          <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F] rounded-none p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="space-y-2 text-center md:text-left z-10">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-none uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                AI-Guided Model Matcher
              </div>
              <h3 className="text-2xl sm:text-3xl font-['Anton'] text-[#0A1E3F] uppercase">
                Need Help Matching Your Car?
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm max-w-xl">
                Chat with our assistant to match your exact console cavity and add the 25W Qi2 wireless dock directly to cart in seconds!
              </p>
            </div>

            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('openCarFinderChatbot'));
              }}
              className="z-10 whitespace-nowrap bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] px-6 py-4 rounded-none text-xs sm:text-sm font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2.5 cursor-pointer transform hover:scale-105"
            >
              <span>Launch Car Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* Best Value Combos Section */}
      <section className="bg-[#EBE5D9] w-full py-16 md:py-24 border-t border-[#0A1E3F]/20 relative overflow-hidden">
        {/* Ambient Navy subtle backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#0A1E3F]/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-8 md:mb-12 flex flex-col items-center">
            <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 px-4 py-2 rounded-none backdrop-blur-sm inline-block shadow-sm">
              SAVE UP TO ₹1,400 WITH BUNDLES
            </span>
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase mt-2">
              Smart Combos. <span className="text-[#0A1E3F] relative inline-block">
                Bigger Savings.
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A1E3F]/40 to-transparent" />
              </span>
            </h2>
            <p className="text-[#1A2C4F] text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium">
              Unlock instant discounts on mounts and accessories when you buy them together.
            </p>

            {/* Interactive Control Pill with Navy Blue theme */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-[#FAF7F0] border border-[#D6CDB8] shadow-sm text-[11px] font-semibold text-[#0A1E3F]">
                <span className={`w-2 h-2 rounded-full ${isMarqueePaused ? 'bg-amber-500' : 'bg-[#0A1E3F] animate-pulse'}`} />
                <span>{isMarqueePaused ? 'Motion Paused' : 'Continuous Horizontal Glide'}</span>
                <span className="text-gray-500 font-normal hidden sm:inline">• Hover cards to pause</span>
              </div>

              {/* Pause / Play Toggle */}
              <button
                onClick={() => setIsMarqueePaused(prev => !prev)}
                className="p-1.5 rounded-none bg-[#FAF7F0] border border-[#D6CDB8] hover:border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] transition-all duration-200 shadow-sm cursor-pointer"
                title={isMarqueePaused ? "Resume Motion" : "Pause Motion"}
                aria-label={isMarqueePaused ? "Resume Motion" : "Pause Motion"}
              >
                {isMarqueePaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>

              {/* Scroll Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleScrollMarquee('left')}
                  className="p-1.5 rounded-none bg-[#FAF7F0] border border-[#D6CDB8] hover:border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] transition-all duration-200 shadow-sm cursor-pointer"
                  title="Scroll Left"
                  aria-label="Scroll Left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleScrollMarquee('right')}
                  className="p-1.5 rounded-none bg-[#FAF7F0] border border-[#D6CDB8] hover:border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] transition-all duration-200 shadow-sm cursor-pointer"
                  title="Scroll Right"
                  aria-label="Scroll Right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Marquee Track */}
        <div className="relative w-full overflow-hidden">
          {/* Edge Vignette / Gradient Masks for smooth entry & exit */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-r from-[#EBE5D9] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-l from-[#EBE5D9] to-transparent z-20 pointer-events-none" />

          {/* Scrollable Container with Continuous Conveyor */}
          <div 
            ref={marqueeContainerRef}
            className="overflow-x-auto no-scrollbar py-4 px-4 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            <div 
              className={`flex gap-5 sm:gap-6 w-max ${isMarqueePaused ? '' : 'animate-combo-marquee'}`}
              onMouseEnter={() => setIsMarqueePaused(true)}
              onMouseLeave={() => setIsMarqueePaused(false)}
            >
              {/* Render 2 duplicate sets for smooth infinite loop */}
              {[...smartCombos, ...smartCombos].map((combo, idx) => {
                return (
                  <div
                    key={`${combo.id}-${idx}`}
                    className={`w-[290px] sm:w-[320px] md:w-[335px] shrink-0 bg-[#FAF7F0] rounded-none p-4 md:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 group shadow-sm hover:shadow-[0_20px_45px_rgba(10,30,63,0.22)] ${
                      combo.isFlagship 
                        ? 'border-2 border-[#0A1E3F]' 
                        : 'border border-[#D6CDB8] hover:border-[#0A1E3F]'
                    }`}
                  >
                    {/* Top Navy Accent Shimmer on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A1E3F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <div className="relative z-10 flex flex-col">
                      <div className="mb-3">
                        <span 
                          className={`text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-none mb-1.5 inline-block transition-colors ${
                            combo.isFlagship
                              ? 'bg-[#0A1E3F] text-[#FAF7F0] shadow-sm'
                              : 'bg-[#0A1E3F]/10 border border-[#0A1E3F]/20 text-[#0A1E3F]'
                          }`}
                        >
                          {combo.tag}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-[#0A1E3F] leading-snug group-hover:text-[#0A1E3F] transition-colors">
                          {combo.title}
                        </h3>
                        <p className="text-[#1A2C4F] text-[11px] font-medium">{combo.subtitle}</p>
                      </div>

                      {/* Image container edge-to-edge with no padding */}
                      <div className="h-44 sm:h-48 w-full bg-transparent rounded-none border border-[#E2DAC8] mb-3.5 flex items-center justify-center overflow-hidden p-0 relative group-hover:border-[#0A1E3F]/40 transition-colors">
                        <img 
                          src={combo.img} 
                          alt={combo.title} 
                          loading="lazy" 
                          decoding="async" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>

                      {/* Feature specs with Navy Checkmarks */}
                      <div className="space-y-1.5 mb-4 text-xs">
                        {combo.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-[#1A2C4F]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0A1E3F] shrink-0 mt-0.5" />
                            <span className="leading-tight font-medium text-[11.5px]">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-[#E2DAC8] relative z-10">
                      <div className="flex items-baseline justify-between mb-2.5">
                        <div>
                          <span className="text-gray-500 line-through text-xs block font-medium">{combo.regularPrice}</span>
                          <span className="text-xl sm:text-2xl font-['Anton'] text-[#0A1E3F] tracking-wide leading-none">{combo.salePrice}</span>
                        </div>
                        <span className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803d] text-[9px] font-bold px-2 py-1 rounded-none uppercase tracking-wider">
                          {combo.savings}
                        </span>
                      </div>
                      <Link 
                        to={combo.link} 
                        className="w-full bg-[#0A1E3F] hover:bg-[#152B52] active:scale-98 text-[#FAF7F0] transition-all duration-200 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs flex items-center justify-center shadow-md text-center group-hover:shadow-[0_4px_16px_rgba(10,30,63,0.35)]"
                      >
                        {combo.cta}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#F4F0E6] w-full py-24 px-4 md:px-10 border-t border-[#111]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
              How <span className="text-[#0A1E3F]">QICDOCK</span> Works
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Four simple steps from selection to effortless daily wireless charging.
            </p>
          </div>

          {/* Steps Grid - 2 rows x 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            
            {/* Step 1 */}
            <div className="bg-[#FAF7F0] rounded-none border-2 border-[#0A1E3F]/40 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#0A1E3F] transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#E2DAC8] opacity-50 z-0 select-none">
                01
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-none bg-[#0A1E3F]/10 border border-[#0A1E3F]/30 flex items-center justify-center text-[#0A1E3F] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#0A1E3F] uppercase tracking-wider mb-1.5 sm:mb-3">Choose Your Car</h3>
                <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Select your vehicle Make, Model, and Year in our compatibility tool.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF7F0] rounded-none border-2 border-[#0A1E3F]/40 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#0A1E3F] transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#E2DAC8] opacity-50 z-0 select-none">
                02
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-none bg-[#0A1E3F]/10 border border-[#0A1E3F]/30 flex items-center justify-center text-[#0A1E3F] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#0A1E3F] uppercase tracking-wider mb-1.5 sm:mb-3">Select Your Dock</h3>
                <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Pick OEM Car-Specific Docks, Universal Mats, or Custom Requests.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF7F0] rounded-none border-2 border-[#0A1E3F]/40 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#0A1E3F] transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#E2DAC8] opacity-50 z-0 select-none">
                03
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-none bg-[#0A1E3F]/10 border border-[#0A1E3F]/30 flex items-center justify-center text-[#0A1E3F] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#0A1E3F] uppercase tracking-wider mb-1.5 sm:mb-3">Easy Install</h3>
                <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Plug-and-play setup in under 2 minutes with zero wire cutting or tools.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF7F0] rounded-none border-2 border-[#0A1E3F]/40 p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#0A1E3F] transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#E2DAC8] opacity-50 z-0 select-none">
                04
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-none bg-[#0A1E3F]/10 border border-[#0A1E3F]/30 flex items-center justify-center text-[#0A1E3F] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-[#0A1E3F] uppercase tracking-wider mb-1.5 sm:mb-3">Drive & Charge</h3>
                <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Drop your smartphone onto the dock and enjoy instant 25W wireless power.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#F4F0E6] w-full py-24 px-4 md:px-10 border-t border-[#111]">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
              Got Questions? <span className="text-[#0A1E3F]">We Have Answers.</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Everything you need to know about compatibility, installation, and delivery.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Which cars are compatible with QICDOCK?",
                a: "QICDOCK Universal chargers work with most vehicles. For our Car Specific Docks, we support a wide range of modern vehicles. Please use our 'Find Your Car' compatibility engine to see options specifically engineered for your make and model."
              },
              {
                q: "How do I know which charger fits my car?",
                a: "Simply navigate to our homepage and use the Vehicle Compatibility Engine. Select your car's make, model, and year, and we will show you the exact QICDOCK solutions designed to fit your console seamlessly."
              },
              {
                q: "Does QICDOCK support fast wireless charging?",
                a: "Yes! All QICDOCK core modules support high-output 25W fast wireless charging for compatible devices, including Apple MagSafe and Qi2 standard devices."
              },
              {
                q: "Does the charger require professional installation or wire cutting?",
                a: "No professional installation is required. Our docks are designed for a 2-minute plug-and-play setup. They run directly off your car's existing USB or 12V ports with zero wire cutting."
              },
              {
                q: "Will my phone slip off during hard braking or cornering?",
                a: "Not at all. Our docks utilize advanced non-slip silicone surfaces and, for MagSafe/Qi2 models, strong magnetic arrays to ensure your device stays perfectly aligned and secure even under hard acceleration or cornering."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 rounded-none group overflow-hidden transition-colors hover:border-[#0A1E3F] [&_summary::-webkit-details-marker]:hidden">
                <summary className="p-6 flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-[#0A1E3F] font-medium text-[15px] group-hover:text-[#0A1E3F] transition-colors pr-8">{faq.q}</h3>
                  <div className="relative w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-600 group-hover:text-[#0A1E3F] transition-colors">
                    <Plus className="w-5 h-5 absolute transition-transform duration-300 group-open:rotate-45" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-[#E2DAC8] pt-4 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Hidden on mobile */}
      <section className="hidden md:block bg-[#F4F0E6] w-full relative overflow-hidden border-t border-[#111]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#F4F0E6] via-[#F4F0E6]/80 to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto py-16 md:py-24 px-4 md:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#0A1E3F] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">
              Automotive Interior
            </span>
            <p className="text-gray-600 text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
              Find a charging solution engineered specifically around the way you drive. Zero messy cables, zero compromise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('openCarFinderChatbot'));
                }}
                className="bg-[#0A1E3F] text-[#F4F0E6] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-[#152B52] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                FIND YOUR CAR
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link 
                to="/categories" 
                className="bg-transparent border border-[#0A1E3F] text-[#0A1E3F] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-[#152B52] hover:text-[#F4F0E6] transition-colors flex items-center justify-center gap-2"
              >
                SHOP UNIVERSAL
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Badges strip */}
        <div className="border-t border-b border-[#E2DAC8] bg-[#FAF7F0] py-6 relative z-10">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-center gap-8 md:gap-20">
            <div className="flex items-center gap-3 justify-center">
              <Truck className="w-6 h-6 text-[#0A1E3F]" />
              <div className="text-left">
                <p className="text-[#0A1E3F] font-bold text-sm">Free Express Shipping</p>
                <p className="text-gray-600 text-xs">On all India orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="w-6 h-6 text-[#0A1E3F]" />
              <div className="text-left">
                <p className="text-[#0A1E3F] font-bold text-sm">1 Year Warranty</p>
                <p className="text-gray-600 text-xs">Instant hardware replacement guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#0A1E3F]" />
              <div className="text-left">
                <p className="text-[#0A1E3F] font-bold text-sm">100% Fit Guarantee</p>
                <p className="text-gray-600 text-xs">Guaranteed vehicle compatibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </>
  );
}
