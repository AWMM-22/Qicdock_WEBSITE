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
  const [isCategoryMarqueePaused, setIsCategoryMarqueePaused] = useState(false);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const categoryMarqueeContainerRef = useRef<HTMLDivElement>(null);

  const handleScrollMarquee = (direction: 'left' | 'right') => {
    if (marqueeContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      marqueeContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollCategoryMarquee = (direction: 'left' | 'right') => {
    if (categoryMarqueeContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      categoryMarqueeContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categoriesList = [
    {
      id: 'vehicle-specific',
      title: 'Vehicle Specific Docks',
      tag: '100% OEM Fit',
      desc: 'Precision molded for Fronx, Baleno, Swift, Ertiga, 3XO & more.',
      price: '₹2,098',
      originalPrice: '₹3,299',
      badge: 'OEM Direct',
      img: airVentImg,
      link: '/category/vehicle-specific',
      cta: 'Find My Car'
    },
    {
      id: 'home-office',
      title: 'Home & Office Combo',
      tag: 'Workstation',
      desc: 'Weighted metal desk stand + magnetic flush wall plate.',
      price: 'From ₹2,247',
      originalPrice: '₹2,697',
      badge: 'Save ₹450',
      img: tableStandImg,
      link: '/category/home-office',
      cta: 'Explore Desk'
    },
    {
      id: 'all-in-one',
      title: 'All In One Combo',
      tag: 'Flagship Bundle',
      desc: 'Car cockpit + desk workstation + bedside wall dock kit.',
      price: 'From ₹2,594',
      originalPrice: '₹3,694',
      badge: 'Save ₹1,100',
      img: combinedImg,
      link: '/category/all-in-one',
      cta: 'Explore Combo'
    },
    {
      id: 'car-combo',
      title: 'Car Combo Kit',
      tag: 'Cockpit Kit',
      desc: 'Vent clip + console tray pad + rear headrest bracket.',
      price: 'From ₹2,346',
      originalPrice: '₹2,996',
      badge: 'Save ₹650',
      img: centerMountImg,
      link: '/category/car-combo',
      cta: 'Explore Kit'
    },
    {
      id: 'individual',
      title: 'Universal Charging Pad',
      tag: 'Universal Pad',
      desc: 'High-grip anti-slip 25W wireless charging pad for any car.',
      price: '₹2,098',
      originalPrice: '₹2,999',
      badge: 'Universal',
      img: centerMountImg,
      link: '/category/individual',
      cta: 'Explore Pad'
    },
    {
      id: 'stand-alone',
      title: 'Stand-Alone Mounts',
      tag: 'Modular Bases',
      desc: 'Individual vent clips, desk stands & magnetic wall bases.',
      price: 'From ₹299',
      originalPrice: '₹599',
      badge: 'Accessories',
      img: wallStandImg,
      link: '/category/stand-alone',
      cta: 'Explore Mounts'
    }
  ];

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
                words={['Charge', 'Mount', 'Drive', 'Adapt', 'Align', 'Connect', 'Power']}
                staticTextClassName="text-[6.5vw] lg:text-[80px] xl:text-[95px] leading-[1.0] font-['Anton'] text-[#0A1E3F] uppercase tracking-tight"
                dynamicTextClassName="text-[6.5vw] lg:text-[80px] xl:text-[95px] leading-[1.0] font-['Anton'] tracking-tight"
                gradientClassName="text-[#0A1E3F]"
              />
            </div>
            
            {/* Action button */}
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
                words={['Charge', 'Mount', 'Drive', 'Adapt', 'Align', 'Connect', 'Power']}
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
            
            {/* Mobile-Only Subtitle and Button */}
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

      {/* Shop By Categories Section - Horizontal Glide Theme */}
      <section className="bg-[#EBE5D9] w-full py-16 md:py-24 border-t border-[#0A1E3F]/20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-8 md:mb-12 flex flex-col items-center">
            <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 px-4 py-2 rounded-none backdrop-blur-sm inline-block shadow-sm">
              EXPLORE OUR ECOSYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase mt-2">
              Shop By <span className="text-[#0A1E3F] relative inline-block">
                Categories
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A1E3F]/40 to-transparent" />
              </span>
            </h2>
            <p className="text-[#1A2C4F] text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium">
              From modular all-in-one kits to vehicle-specific molded docks and workstation stands.
            </p>
          </div>
        </div>

        {/* Horizontal Moving Marquee Track for Categories */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-r from-[#EBE5D9] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-28 bg-gradient-to-l from-[#EBE5D9] to-transparent z-20 pointer-events-none" />

          <div 
            ref={categoryMarqueeContainerRef}
            className="overflow-x-auto no-scrollbar py-4 px-4 sm:px-8 cursor-grab active:cursor-grabbing"
          >
            <div 
              className={`flex gap-5 sm:gap-6 w-max ${isCategoryMarqueePaused ? '' : 'animate-combo-marquee'}`}
              onMouseEnter={() => setIsCategoryMarqueePaused(true)}
              onMouseLeave={() => setIsCategoryMarqueePaused(false)}
            >
              {[...categoriesList, ...categoriesList].map((category, idx) => (
                <Link
                  key={`${category.id}-${idx}`}
                  to={category.link}
                  className="w-[290px] sm:w-[320px] md:w-[335px] shrink-0 bg-[#FAF7F0] rounded-none p-4 md:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-2 group shadow-sm hover:shadow-[0_20px_45px_rgba(10,30,63,0.22)] border border-[#D6CDB8] hover:border-[#0A1E3F] block"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A1E3F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col">
                    <div className="mb-3">
                      <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-none mb-1.5 inline-block bg-[#0A1E3F]/10 border border-[#0A1E3F]/20 text-[#0A1E3F]">
                        {category.tag}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-[#0A1E3F] leading-snug group-hover:text-[#0A1E3F] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[#1A2C4F] text-[11px] font-medium line-clamp-2 mt-0.5">{category.desc}</p>
                    </div>

                    <div className="w-full h-48 bg-transparent rounded-none border border-[#E2DAC8] mb-3.5 flex items-center justify-center overflow-hidden p-0 relative group-hover:border-[#0A1E3F]/40 transition-colors">
                      <img 
                        src={category.img} 
                        alt={category.title} 
                        loading="lazy" 
                        decoding="async" 
                        className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-3 border-t border-[#E2DAC8] relative z-10">
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div>
                        {category.originalPrice && (
                          <span className="text-gray-500 line-through text-xs block font-medium">{category.originalPrice}</span>
                        )}
                        <span className="text-xl sm:text-2xl font-['Anton'] text-[#0A1E3F] tracking-wide leading-none">{category.price}</span>
                      </div>
                      <span className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803d] text-[9px] font-bold px-2 py-1 rounded-none uppercase tracking-wider">
                        {category.badge}
                      </span>
                    </div>
                    <div 
                      className="w-full bg-[#0A1E3F] group-hover:bg-[#152B52] active:scale-98 text-[#FAF7F0] transition-all duration-200 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-md text-center group-hover:shadow-[0_4px_16px_rgba(10,30,63,0.35)]"
                    >
                      <span>{category.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow Button Below Horizontal Animation taking to Categories Page */}
        <div className="mt-8 md:mt-12 text-center flex justify-center px-4 relative z-10">
          <Link
            to="/categories"
            className="inline-flex items-center justify-center gap-3 bg-[#0A1E3F] hover:bg-[#152B52] active:scale-95 text-[#FAF7F0] font-bold text-xs sm:text-sm uppercase tracking-widest px-8 sm:px-10 py-4 rounded-none shadow-xl shadow-[#0A1E3F]/20 transition-all group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
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

      {/* About Us Highlight Section */}
      <section className="bg-[#FAF7F0] w-full py-16 md:py-20 px-4 md:px-10 border-t border-[#0A1E3F]/20">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="space-y-4 max-w-2xl text-center lg:text-left">
            <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 px-3.5 py-1.5 rounded-none inline-block">
              ABOUT QICDOCK
            </span>
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
              PRECISION WIRELESS. <span className="text-[#0A1E3F]">ZERO CABLE CLUTTER.</span>
            </h2>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              We engineer modular 25W Qi2 wireless charging systems designed to transition effortlessly between your vehicle, office workstation, and bedside. Built with aerospace-grade neodymium magnets and precision OEM molded bases.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1E3F]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1E3F]">
                <Zap className="w-4 h-4 text-[#0A1E3F]" />
                <span>25W Qi2 Fast Wireless</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0A1E3F]">
                <CheckCircle2 className="w-4 h-4 text-[#0A1E3F]" />
                <span>1-Year Instant Replacement</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center shrink-0">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] px-8 py-4 rounded-none font-bold uppercase tracking-widest text-xs sm:text-sm shadow-xl shadow-[#0A1E3F]/20 transition-all hover:-translate-y-0.5"
            >
              <span>Learn More About Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Integrated Solutions Section (Clean, without side image) - Positioned below About QicDock */}
      <section className="bg-[#F4F0E6] text-[#0A1E3F] w-full py-16 md:py-20 px-4 sm:px-6 lg:px-10 border-t border-[#0A1E3F]/15">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center space-y-3 mb-12 max-w-3xl mx-auto">
            <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 px-4 py-2 rounded-none inline-block">
              ENGINEERED ECOSYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-['Anton'] tracking-tight text-[#0A1E3F] uppercase">
              Integrated Solutions for <span className="text-[#0A1E3F]">Every Space</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              One universal 25W Qi2 charging engine designed to transition effortlessly between your vehicle cockpit, office desk, and wall.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="space-y-3 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-6 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
              <div className="w-12 h-12 rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300 mb-2">
                <Smartphone className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">On-Desk Adaptability</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                From a minimal phone stand to a full ergonomic workstation dock, the heavy aluminum base keeps your workspace wire-free.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-6 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
              <div className="w-12 h-12 rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300 mb-2">
                <Car className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">Seamless Automotive Fit</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Custom molded to fit your car console cavity or secure air vents with zero vibration, zero loose wires, and plug-and-play ease.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-6 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
              <div className="w-12 h-12 rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300 mb-2">
                <Zap className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">25W Qi2 Thermal Architecture</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Advanced heat dissipation and magnetic auto-alignment ensure optimal charging speeds without overheating your smartphone.
              </p>
            </div>
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
                      <div className="w-full h-48 bg-transparent rounded-none border border-[#E2DAC8] mb-3.5 flex items-center justify-center overflow-hidden p-0 relative group-hover:border-[#0A1E3F]/40 transition-colors">
                        <img 
                          src={combo.img} 
                          alt={combo.title} 
                          loading="lazy" 
                          decoding="async" 
                          className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500" 
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
