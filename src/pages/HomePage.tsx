import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Car, Smartphone, Check, RefreshCw, Zap, Star, Eye, CreditCard, Wind, MonitorSmartphone, Lightbulb, Layers, Home, BatteryCharging, Plus, ArrowRight, Facebook, Twitter, Instagram, Truck, ShieldCheck, CheckCircle2, Sparkles, Play, Pause, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import { trackPageView } from '../lib/analytics';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.webp';
import sharedHeroImg from '../assets/images/shared image.jpg';
import airVentImg from '../assets/images/air_vent_mount.webp';
import airVentJpg from '../assets/images/air_vent_mount.jpg';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import headrestMountJpg from '../assets/images/headrest_mount.jpg';
import tableStandImg from '../assets/images/table_stand_mount.webp';
import tableStandJpg from '../assets/images/table_stand_mount.jpg';
import wallStandImg from '../assets/images/wall_stand_mount.webp';
import wallStandJpg from '../assets/images/wall_stand_mount.jpg';
import m3Webp from '../assets/images/m3.webp';
import leftCarMountImg from '../assets/images/left_car_mount_1788721155876.webp';
import rightCarMountImg from '../assets/images/right_car_mount_1788721169113.webp';
import combinedImg from '../assets/images/3in1 copy.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import ertigaImg from '../assets/images/Ertiga.webp';
import swiftDzireImg from '../assets/images/Dzire and Swift.webp';
import threeXoImg from '../assets/images/3XO.webp';
import universalPadImg from '../assets/images/Universal_.webp';
import RotatingHeadline from '../components/RotatingHeadline';

interface CategoryItem {
  id: string;
  title: string;
  tag: string;
  desc: string;
  price: string;
  originalPrice?: string;
  badge: string;
  img: string;
  link: string;
  cta: string;
}

export default function HomePage() {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [playingCategories, setPlayingCategories] = useState<Record<string, boolean>>({});
  const marqueeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleCategory = (id: string) => {
    setOpenCategoryId(prev => (prev === id ? null : id));
  };

  const togglePlay = (id: string) => {
    setPlayingCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScrollDrawer = (id: string, direction: 'left' | 'right') => {
    const container = marqueeRefs.current[id];
    if (container) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const categoryTabs = [
    { id: 'vehicle-specific', name: 'Vehicle Specific Docks', path: '/category/vehicle-specific' },
    { id: 'home-office', name: 'Home & Office Combo', path: '/category/home-office' },
    { id: 'all-in-one', name: 'All In One Combo', path: '/category/all-in-one' },
    { id: 'car-combo', name: 'Car Combo Kit', path: '/category/car-combo' },
    { id: 'individual', name: 'Individual Chargers', path: '/category/individual' },
    { id: 'stand-alone', name: 'Stand-Alone Mounts', path: '/category/stand-alone' },
  ];

  const categoryProductsMap: Record<string, CategoryItem[]> = {
    'vehicle-specific': [
      {
        id: 'fronx',
        title: 'Maruti Suzuki Fronx 25W Dock',
        tag: 'Fronx 2023-25',
        desc: 'Custom console tray fast wireless charging dock with MagSafe hold.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'Best Seller',
        img: fronxEtcImg,
        link: '/product/fronx',
        cta: 'View Fronx Dock'
      },
      {
        id: 'ertiga',
        title: 'Maruti Suzuki Ertiga 25W Dock',
        tag: 'Ertiga 2019-25',
        desc: 'Cooled console cavity integration with high-traction silicone.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'High Demand',
        img: ertigaImg,
        link: '/product/ertiga',
        cta: 'View Ertiga Dock'
      },
      {
        id: 'swift',
        title: 'Maruti Suzuki Swift (4th Gen) Dock',
        tag: 'Swift 2024-25',
        desc: 'Contoured dashboard console tray 25W magnetic pad.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'Latest Gen',
        img: swiftDzireImg,
        link: '/product/swift',
        cta: 'View Swift Dock'
      },
      {
        id: '3xo',
        title: 'Mahindra XUV 3XO 25W Dock',
        tag: '3XO 2024-25',
        desc: 'Center console tray dock tailored specifically for XUV 3XO cockpit.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'New Arrival',
        img: threeXoImg,
        link: '/product/3xo',
        cta: 'View 3XO Dock'
      },
      {
        id: 'baleno',
        title: 'Maruti Suzuki Baleno 25W Dock',
        tag: 'Baleno 2022-25',
        desc: 'Direct drop-in console cavity 25W wireless charging pad.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'OEM Direct',
        img: fronxEtcImg,
        link: '/product/baleno',
        cta: 'View Baleno Dock'
      },
      {
        id: 'taisor',
        title: 'Toyota Cruiser Taisor 25W Dock',
        tag: 'Taisor 2024-25',
        desc: 'Dashboard console OEM-fit 25W fast wireless dock.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'New Release',
        img: fronxEtcImg,
        link: '/product/taisor',
        cta: 'View Taisor Dock'
      },
      {
        id: 'glanza',
        title: 'Toyota Glanza 25W Dock',
        tag: 'Glanza 2022-25',
        desc: 'Lower gear storage 25W rapid magnetic charging tray.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'Direct Fit',
        img: fronxEtcImg,
        link: '/product/glanza',
        cta: 'View Glanza Dock'
      },
      {
        id: 'dzire',
        title: 'Maruti Suzuki Dzire 25W Dock',
        tag: 'Dzire 2020-25',
        desc: 'Custom console pocket 25W magnetic charging hub.',
        price: '₹2,349',
        originalPrice: '₹3,449',
        badge: 'OEM Fit',
        img: swiftDzireImg,
        link: '/product/dzire',
        cta: 'View Dzire Dock'
      },
      {
        id: 'universal',
        title: 'Universal Automotive Charging Pad',
        tag: 'Universal Fit',
        desc: 'High-friction nano-suction silicone 25W pad for any car dashboard or console.',
        price: '₹2,098',
        originalPrice: '₹3,299',
        badge: 'All Vehicles',
        img: universalPadImg,
        link: '/product/universal',
        cta: 'View Universal Pad'
      }
    ],
    'home-office': [
      {
        id: 'ho-combo',
        title: 'Desk & Wall Workstation Combo',
        tag: 'Workstation Pack',
        desc: 'Weighted metal desk stand + magnetic flush wall base bundle.',
        price: 'From ₹2,247',
        originalPrice: '₹2,697',
        badge: 'Save ₹450',
        img: tableStandImg,
        link: '/category/home-office',
        cta: 'Explore Workstation'
      },
      {
        id: 'table-stand-prod',
        title: 'QicDock Table Stand with 25W Charger',
        tag: 'Desktop Setup',
        desc: 'Upright desktop phone stand with 25W Qi2 rapid magnetic charging.',
        price: '₹2,148',
        originalPrice: '₹2,398',
        badge: 'Best Seller',
        img: tableStandImg,
        link: '/product/table-stand',
        cta: 'View Table Stand'
      },
      {
        id: 'wall-stand-prod',
        title: 'QicDock Wall Stand with 25W Charger',
        tag: 'Bedside & Wall',
        desc: 'Flush wall mount phone stand with 25W magnetic charging pad.',
        price: '₹2,098',
        originalPrice: '₹2,298',
        badge: 'Space Saving',
        img: wallStandImg,
        link: '/product/wall-stand',
        cta: 'View Wall Stand'
      },
      {
        id: 'dual-room',
        title: 'Dual Desk & Bedside Setup',
        tag: 'Complete Room',
        desc: 'Full home & office power ecosystem with multiple mounting bases.',
        price: '₹2,499',
        originalPrice: '₹3,199',
        badge: 'Save ₹700',
        img: combinedImg,
        link: '/category/home-office',
        cta: 'Explore Setup'
      }
    ],
    'all-in-one': [
      {
        id: 'ultimate-kit',
        title: 'Ultimate All-in-One Kit',
        tag: 'Flagship Bundle',
        desc: '1x 25W Qi2 Core Charger + 5 Mounts for Car, Desk & Bedside.',
        price: 'From ₹2,594',
        originalPrice: '₹3,694',
        badge: 'Save ₹1,100',
        img: combinedImg,
        link: '/category/all-in-one',
        cta: 'Get Ultimate Kit'
      },
      {
        id: 'dual-charger-pack',
        title: 'Dual Charger Mega Pack',
        tag: 'Mega Bundle',
        desc: '2x 25W Qi2 Core Chargers + All 5 Universal Mount Bases.',
        price: 'From ₹4,293',
        originalPrice: '₹5,693',
        badge: 'Save ₹1,400',
        img: combinedImg,
        link: '/category/all-in-one',
        cta: 'Get Mega Bundle'
      },
      {
        id: 'travel-ecosystem',
        title: 'Complete Modular Travel Kit',
        tag: 'Travel Pack',
        desc: 'Seamless wireless transition between vehicle cockpit, office desk and hotel room.',
        price: 'From ₹2,899',
        originalPrice: '₹3,999',
        badge: 'Save ₹1,100',
        img: centerMountImg,
        link: '/category/all-in-one',
        cta: 'Explore Kit'
      }
    ],
    'car-combo': [
      {
        id: 'car-combo-3in1',
        title: 'Car Combo 3-in-1 Bundle',
        tag: 'Cockpit Ready',
        desc: 'Console Pad + 360° Air Vent Clip + Rear Passenger Headrest Clamp.',
        price: 'From ₹2,346',
        originalPrice: '₹2,996',
        badge: 'Save ₹650',
        img: centerMountImg,
        link: '/category/car-combo',
        cta: 'Get Car Pack'
      },
      {
        id: 'front-rear-pack',
        title: 'Front & Rear Passenger Pack',
        tag: 'Family Drive',
        desc: 'Dual charging setup for front cockpit driver and rear seat entertainment.',
        price: 'From ₹2,449',
        originalPrice: '₹3,149',
        badge: 'Save ₹700',
        img: headrestMountImg,
        link: '/category/car-combo',
        cta: 'Get Passenger Pack'
      },
      {
        id: 'vent-console-pack',
        title: 'Air Vent + Console Dual Mount',
        tag: 'Driver Pack',
        desc: 'Switch effortlessly between AC vent eye-level navigation and console drop-in.',
        price: 'From ₹2,199',
        originalPrice: '₹2,799',
        badge: 'Save ₹600',
        img: airVentImg,
        link: '/category/car-combo',
        cta: 'Get Driver Pack'
      }
    ],
    'individual': [
      {
        id: 'ind-wall',
        title: 'QicDock Wall Stand with 25W Charger',
        tag: 'Wall Stand',
        desc: 'Charging Pad + Wall Mount Phone Stand | Space saving dock for home & office.',
        price: '₹2,098',
        originalPrice: '₹2,298',
        badge: 'Space Saving',
        img: wallStandImg,
        link: '/product/wall-stand',
        cta: 'View Wall Stand'
      },
      {
        id: 'ind-table',
        title: 'QicDock Table Stand with 25W Charger',
        tag: 'Table Stand',
        desc: 'Charging Pad + Desktop Phone Stand | Upright dock for work desk & bedside.',
        price: '₹2,148',
        originalPrice: '₹2,398',
        badge: 'Desk Stand',
        img: tableStandImg,
        link: '/product/table-stand',
        cta: 'View Table Stand'
      },
      {
        id: 'ind-vent',
        title: 'QicDock Air Vent Stand with 25W Charger',
        tag: 'Car Vent Mount',
        desc: 'Charging Pad + Car Vent Phone Mount | Wireless charging dock for car navigation.',
        price: '₹2,098',
        originalPrice: '₹2,298',
        badge: 'For Navigation',
        img: airVentImg,
        link: '/product/air-vent-stand',
        cta: 'View Air Vent Stand'
      },
      {
        id: 'ind-rear',
        title: 'QicDock Rear Passenger Seat Stand',
        tag: 'Headrest Mount',
        desc: 'Charging Pad + Back Seat Phone Mount | Car charging dock for rear passengers.',
        price: '₹2,148',
        originalPrice: '₹2,398',
        badge: 'Back Seat',
        img: headrestMountImg,
        link: '/product/rear-passenger-stand',
        cta: 'View Rear Stand'
      },
      {
        id: 'ind-univ',
        title: 'Universal Automotive Charging Pad',
        tag: 'Universal Pad',
        desc: 'High-grip anti-slip 25W wireless charging pad for any car console or dashboard.',
        price: '₹2,098',
        originalPrice: '₹3,299',
        badge: 'Universal Fit',
        img: universalPadImg,
        link: '/product/universal',
        cta: 'View Universal Pad'
      }
    ],
    'stand-alone': [
      {
        id: 'sa-vent',
        title: 'Air Vent 360° Holder Base',
        tag: 'Vent Base',
        desc: 'Steel-core vent blade clamp with lockable 360° rotating ball socket.',
        price: '₹299',
        originalPrice: '₹499',
        badge: 'Dashboard',
        img: airVentImg,
        link: '/category/stand-alone',
        cta: 'Buy Mount (₹299)'
      },
      {
        id: 'sa-table',
        title: 'Weighted Aluminum Table Stand Base',
        tag: 'Workstation',
        desc: 'Solid CNC aluminum desk pedestal with rubberized non-slip base.',
        price: '₹399',
        originalPrice: '₹599',
        badge: 'Desk Base',
        img: tableStandImg,
        link: '/category/stand-alone',
        cta: 'Buy Mount (₹399)'
      },
      {
        id: 'sa-wall',
        title: 'Flush Wall & Nightstand Magnetic Base',
        tag: 'Wall Base',
        desc: 'Low-profile magnetic dock plate with damage-free 3M VHB adhesive.',
        price: '₹299',
        originalPrice: '₹499',
        badge: 'Bedside',
        img: wallStandImg,
        link: '/category/stand-alone',
        cta: 'Buy Mount (₹299)'
      },
      {
        id: 'sa-rear',
        title: 'Rear Seat Headrest Clamp Base',
        tag: 'Headrest Base',
        desc: 'Dual-bracket headrest post mount giving rear passengers easy access.',
        price: '₹399',
        originalPrice: '₹599',
        badge: 'Rear Row',
        img: headrestMountImg,
        link: '/category/stand-alone',
        cta: 'Buy Mount (₹399)'
      },
      {
        id: 'sa-pad',
        title: 'Car Console Charging Pad Base',
        tag: 'Pad Base',
        desc: 'High-friction silicone console mat with cable guide channel.',
        price: '₹299',
        originalPrice: '₹499',
        badge: 'Console Fit',
        img: centerMountImg,
        link: '/category/stand-alone',
        cta: 'Buy Mount (₹299)'
      },
      {
        id: 'sa-gan',
        title: '45W GaN Dual USB-C Fast Car Charger',
        tag: 'Power Adapter',
        desc: 'High-density miniature 12V socket plug supporting PD 3.0 and PPS.',
        price: '₹499',
        originalPrice: '₹799',
        badge: 'Fast Power',
        img: centerMountImg,
        link: '/category/stand-alone',
        cta: 'Buy Charger (₹499)'
      }
    ]
  };

  useEffect(() => {
    trackPageView('Home');
  }, []);

  return (
    <>
      {/* Hero Section */}
      <main className="relative flex flex-col justify-center items-center overflow-hidden min-h-[calc(100svh-4.5rem)] sm:min-h-[calc(100vh-5rem)] pt-3 pb-16 sm:pt-6 sm:pb-12 md:pt-8 md:pb-14">
        
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

        {/* Foreground Content - Centered Layout with tight spacing */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center justify-center text-center">
          
          {/* Centered Headline in 1 line with dynamic rotating words - positioned more upward */}
          <div className="flex flex-col items-center justify-center text-center w-full -mt-2 sm:-mt-4 md:-mt-6 mb-3 sm:mb-5 md:mb-6 px-2 z-20">
            <RotatingHeadline
              layout="inline"
              align="center"
              staticText="Designed to"
              words={['Charge', 'Mount', 'Drive', 'Adapt', 'Align', 'Power']}
              staticTextClassName="text-[9.5vw] xs:text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[108px] leading-[1.0] font-['Anton'] text-[#0A1E3F] tracking-tight uppercase whitespace-nowrap text-center"
              dynamicTextClassName="text-[9.5vw] xs:text-[48px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[108px] leading-[1.0] font-['Anton'] tracking-tight whitespace-nowrap text-center"
              gradientClassName="text-[#0A1E3F]"
            />
          </div>

          {/* Redesigned Bento Card Theme Grid */}
          <div className="w-full max-w-[460px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px] mx-auto grid grid-cols-2 gap-2.5 sm:gap-3.5 relative z-30 mt-1 sm:mt-2 mb-4 sm:mb-6">
            
            {/* Card 1: PRODUCT CLOSEUP (Span 2 Columns - Edge-to-Edge Flush Cover) */}
            <Link
              to="/product/pad-base"
              className="col-span-2 relative group overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D6CDB8] hover:border-[#0A1E3F] bg-[#FAF7F0] shadow-[0_8px_25px_rgba(10,30,63,0.08)] hover:shadow-[0_14px_35px_rgba(10,30,63,0.18)] transition-all duration-300 aspect-[2.1/1] sm:aspect-[2.2/1] p-0 m-0 block cursor-pointer"
            >
              <img 
                src={m3Webp} 
                alt="Product Closeup" 
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none" 
              />
              <div className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-10 pointer-events-none">
                <span className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#0A1E3F]/15 text-[#0A1E3F] font-bold text-[9px] sm:text-[11px] uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-md shadow-sm">
                  Product Closeup
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Link>

            {/* Card 2: HEADREST MOUNT (Middle Left) */}
            <Link
              to="/product/rear-passenger-stand"
              className="col-span-1 relative group overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D6CDB8] hover:border-[#0A1E3F] bg-[#FAF7F0] shadow-[0_8px_25px_rgba(10,30,63,0.08)] hover:shadow-[0_14px_35px_rgba(10,30,63,0.18)] transition-all duration-300 aspect-[4/3] sm:aspect-square block cursor-pointer"
            >
              <img 
                src={headrestMountJpg} 
                alt="Headrest Mount" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none" 
              />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 pointer-events-none">
                <span className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#0A1E3F]/15 text-[#0A1E3F] font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm">
                  Headrest Mount
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Card 3: DESK & HOME SETUP (Middle Right) */}
            <Link
              to="/product/table-stand"
              className="col-span-1 relative group overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D6CDB8] hover:border-[#0A1E3F] bg-[#FAF7F0] shadow-[0_8px_25px_rgba(10,30,63,0.08)] hover:shadow-[0_14px_35px_rgba(10,30,63,0.18)] transition-all duration-300 aspect-[4/3] sm:aspect-square block cursor-pointer"
            >
              <img 
                src={tableStandJpg} 
                alt="Desk & Home Setup" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none" 
              />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 pointer-events-none">
                <span className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#0A1E3F]/15 text-[#0A1E3F] font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm">
                  Desk & Home Setup
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Card 4: DASHBOARD MOUNT (Bottom Left) */}
            <Link
              to="/product/universal"
              className="col-span-1 relative group overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D6CDB8] hover:border-[#0A1E3F] bg-[#FAF7F0] shadow-[0_8px_25px_rgba(10,30,63,0.08)] hover:shadow-[0_14px_35px_rgba(10,30,63,0.18)] transition-all duration-300 aspect-[4/3] sm:aspect-square block cursor-pointer"
            >
              <img 
                src={wallStandJpg} 
                alt="Dashboard Mount" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none" 
              />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 pointer-events-none">
                <span className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#0A1E3F]/15 text-[#0A1E3F] font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm">
                  Dashboard Mount
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            {/* Card 5: IN-CAR VENT MOUNT (Bottom Right) */}
            <Link
              to="/product/air-vent-stand"
              className="col-span-1 relative group overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#D6CDB8] hover:border-[#0A1E3F] bg-[#FAF7F0] shadow-[0_8px_25px_rgba(10,30,63,0.08)] hover:shadow-[0_14px_35px_rgba(10,30,63,0.18)] transition-all duration-300 aspect-[4/3] sm:aspect-square block cursor-pointer"
            >
              <img 
                src={airVentJpg} 
                alt="In-Car Vent Mount" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none" 
              />
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 pointer-events-none">
                <span className="bg-[#FAF7F0]/90 backdrop-blur-md border border-[#0A1E3F]/15 text-[#0A1E3F] font-bold text-[8px] sm:text-[10px] uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-sm">
                  In-Car Vent Mount
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Centered Action Button with clear margin so it never collides with floating buttons */}
          <div className="flex flex-col items-center justify-center text-center mt-3 sm:mt-5 mb-2 sm:mb-4 z-30 w-full px-4">
            <Link
              to="/categories"
              className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#FAF7F0] font-bold text-xs sm:text-sm uppercase tracking-widest px-8 sm:px-10 py-3.5 sm:py-4 rounded-full shadow-xl shadow-[#0A1E3F]/25 transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center cursor-pointer border border-[#FAF7F0]/20"
            >
              Explore Categories
            </Link>
          </div>

        </div>
      </main>

      {/* Shop By Categories Section with halved top padding */}
      <section className="bg-[#EBE5D9] w-full pt-8 sm:pt-10 md:pt-12 pb-16 md:pb-24 border-t border-[#0A1E3F]/20 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-10 md:mb-14 flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase mt-2">
              Shop By <span className="text-[#0A1E3F] relative inline-block">
                Categories
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A1E3F]/40 to-transparent" />
              </span>
            </h2>
            <p className="text-[#1A2C4F] text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-medium">
              Need just a stand, a charger or the whole setup? Find what fits your space, your car and your everyday.
            </p>
          </div>

          {/* Six Horizontal Category Accordion List */}
          <div className="flex flex-col gap-4 max-w-5xl mx-auto">
            {categoryTabs.map((tab) => {
              const isOpen = openCategoryId === tab.id;
              const products = categoryProductsMap[tab.id] || [];
              const isPlaying = !!playingCategories[tab.id];

              return (
                <div 
                  key={tab.id}
                  className="w-full transition-all duration-300 rounded-none overflow-hidden"
                >
                  {/* Category Button Bar */}
                  <button
                    onClick={() => toggleCategory(tab.id)}
                    aria-expanded={isOpen}
                    className={`w-full flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 rounded-none border-2 transition-all duration-300 text-left group cursor-pointer shadow-sm ${
                      isOpen
                        ? 'bg-[#0A1E3F] text-[#FAF7F0] border-[#0A1E3F] shadow-[0_8px_25px_rgba(10,30,63,0.25)]'
                        : 'bg-[#FAF7F0] text-[#0A1E3F] border-[#D6CDB8] hover:border-[#0A1E3F] hover:bg-[#FAF7F0]'
                    }`}
                  >
                    <div className="flex items-center gap-2 sm:gap-4 flex-nowrap shrink-0 min-w-0">
                      <span className="font-bold text-xs sm:text-base md:text-lg uppercase tracking-wider font-['Ubuntu'] whitespace-nowrap">
                        {tab.name}
                      </span>
                      <span className={`text-[9px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 rounded-none uppercase tracking-wider whitespace-nowrap shrink-0 ${
                        isOpen 
                          ? 'bg-[#FAF7F0]/15 text-[#FAF7F0] border border-[#FAF7F0]/30' 
                          : 'bg-[#0A1E3F]/10 text-[#0A1E3F] border border-[#0A1E3F]/15'
                      }`}>
                        {products.length} Items
                      </span>
                    </div>

                    {/* Right Side Arrow Button - Rotates Down when Open, Right when Closed */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider hidden sm:inline opacity-80">
                        {isOpen ? 'Close' : 'View Docks'}
                      </span>
                      <span
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ease-in-out ${
                          isOpen
                            ? 'bg-[#FAF7F0] text-[#0A1E3F] border-[#FAF7F0] shadow-sm rotate-90'
                            : 'bg-[#0A1E3F]/10 text-[#0A1E3F] border-[#0A1E3F]/20 group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] group-hover:border-[#0A1E3F] rotate-0 group-hover:translate-x-0.5'
                        }`}
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </span>
                    </div>
                  </button>

                  {/* Horizontal Animation Drawer - Appears Directly Below the Clicked Button */}
                  {isOpen && (
                    <div className="bg-[#FAF7F0] border-2 border-t-0 border-[#0A1E3F] p-4 sm:p-6 shadow-xl animate-drawer-expand origin-top">
                      {/* Control Bar inside Drawer */}
                      <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#E2DAC8]">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0A1E3F]">
                          <span className="w-2 h-2 rounded-full bg-[#0A1E3F] animate-pulse" />
                          <span>{tab.name} Catalog</span>
                        </div>

                        {/* Drawer Carousel Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => togglePlay(tab.id)}
                            className="p-1.5 rounded-none bg-[#F4F0E6] border border-[#D6CDB8] hover:border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] transition-all duration-200 shadow-sm cursor-pointer"
                            title={isPlaying ? "Pause Motion" : "Play Motion"}
                            aria-label={isPlaying ? "Pause Motion" : "Play Motion"}
                          >
                            {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                          </button>

                          <button
                            onClick={() => handleScrollDrawer(tab.id, 'left')}
                            className="p-1.5 rounded-none bg-[#F4F0E6] border border-[#D6CDB8] hover:border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] transition-all duration-200 shadow-sm cursor-pointer"
                            title="Scroll Left"
                            aria-label="Scroll Left"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleScrollDrawer(tab.id, 'right')}
                            className="p-1.5 rounded-none bg-[#F4F0E6] border border-[#D6CDB8] hover:border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] transition-all duration-200 shadow-sm cursor-pointer"
                            title="Scroll Right"
                            aria-label="Scroll Right"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Horizontal Moving Marquee Track for This Category */}
                      <div className="relative w-full overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF7F0] to-transparent z-20 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF7F0] to-transparent z-20 pointer-events-none" />

                        <div 
                          ref={(el) => (marqueeRefs.current[tab.id] = el)}
                          className="overflow-x-auto no-scrollbar py-3 px-2 sm:px-4 cursor-grab active:cursor-grabbing"
                        >
                          <div 
                            className={`flex gap-5 sm:gap-6 w-max ${isPlaying ? 'animate-combo-marquee' : ''}`}
                            onMouseEnter={() => {
                              if (isPlaying) togglePlay(tab.id);
                            }}
                          >
                            {[...products, ...products].map((product, idx) => (
                              <Link
                                key={`${product.id}-${idx}`}
                                to={product.link}
                                className="w-[280px] sm:w-[310px] md:w-[325px] shrink-0 bg-[#F4F0E6] rounded-none p-4 md:p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5 group shadow-sm hover:shadow-[0_15px_35px_rgba(10,30,63,0.18)] border border-[#D6CDB8] hover:border-[#0A1E3F] block"
                              >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0A1E3F] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                                <div className="relative z-10 flex flex-col">
                                  <div className="mb-3">
                                    <span className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-none mb-1.5 inline-block bg-[#0A1E3F]/10 border border-[#0A1E3F]/20 text-[#0A1E3F]">
                                      {product.tag}
                                    </span>
                                    <h3 className="text-sm sm:text-base font-bold text-[#0A1E3F] leading-snug group-hover:text-[#0A1E3F] transition-colors line-clamp-2">
                                      {product.title}
                                    </h3>
                                    <p className="text-[#1A2C4F] text-[11px] font-medium line-clamp-2 mt-1">{product.desc}</p>
                                  </div>

                                  <div className="w-full h-44 bg-transparent rounded-none border border-[#E2DAC8] mb-3.5 flex items-center justify-center overflow-hidden p-0 relative group-hover:border-[#0A1E3F]/40 transition-colors">
                                    <img 
                                      src={product.img} 
                                      alt={product.title} 
                                      loading="lazy" 
                                      decoding="async" 
                                      className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500" 
                                    />
                                  </div>
                                </div>

                                <div className="mt-auto pt-3 border-t border-[#E2DAC8] relative z-10">
                                  <div className="flex items-baseline justify-between mb-2.5">
                                    <div>
                                      {product.originalPrice && (
                                        <span className="text-gray-500 line-through text-xs block font-medium">{product.originalPrice}</span>
                                      )}
                                      <span className="text-xl font-['Anton'] text-[#0A1E3F] tracking-wide leading-none">{product.price}</span>
                                    </div>
                                    <span className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#15803d] text-[9px] font-bold px-2 py-1 rounded-none uppercase tracking-wider">
                                      {product.badge}
                                    </span>
                                  </div>
                                  <div 
                                    className="w-full bg-[#0A1E3F] group-hover:bg-[#152B52] active:scale-98 text-[#FAF7F0] transition-all duration-200 py-2.5 rounded-none font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 shadow-md text-center group-hover:shadow-[0_4px_16px_rgba(10,30,63,0.35)]"
                                  >
                                    <span>{product.cta}</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Direct Explore Link Button */}
                      <div className="mt-5 pt-4 border-t border-[#E2DAC8] text-center flex justify-center">
                        <Link
                          to={tab.path}
                          className="inline-flex items-center justify-center gap-2.5 bg-[#0A1E3F] hover:bg-[#152B52] active:scale-95 text-[#FAF7F0] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-none shadow-md transition-all group"
                        >
                          <span>Explore All in {tab.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Master Categories Page Link */}
          <div className="mt-12 text-center flex justify-center px-4 relative z-10">
            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-3 bg-[#0A1E3F] hover:bg-[#152B52] active:scale-95 text-[#FAF7F0] font-bold text-xs sm:text-sm uppercase tracking-widest px-8 sm:px-10 py-4 rounded-none shadow-xl shadow-[#0A1E3F]/20 transition-all group"
            >
              <span>Find your Qicdock</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
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
                Need help matching your Qicdock Wireless Dock?
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
            <div className="space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                Our everyday spaces are filled with things that make life more complicated than they need to be. Wires, separate accessories, multiple mounts and products that solve one problem while creating another.
              </p>
              <p>
                QicDock was created to make things simpler. We wanted to bring together functionality, convenience and a premium feel without making everyday charging unnecessarily complicated or expensive.
              </p>
            </div>
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
            <h2 className="text-3xl md:text-5xl leading-tight font-['Anton'] tracking-tight text-[#0A1E3F] uppercase">
              Integrated Solutions for <span className="text-[#0A1E3F]">Every Space</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="space-y-3 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-6 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
              <div className="w-12 h-12 rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300 mb-2">
                <Smartphone className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">Home + Office Versatility</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Designed for both home and office setups. Switch QICDOCK between the wall mount and desk stand for convenient wireless charging wherever you work, relax or unwind.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="space-y-3 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-6 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
              <div className="w-12 h-12 rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300 mb-2">
                <Car className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">Seamless Automotive Fit</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Take the same QICDOCK charger on the road. Switch between the AC vent, console dock and rear-seat mount for a setup that fits every journey.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="space-y-3 border-2 border-[#0A1E3F]/40 hover:border-[#0A1E3F] p-6 rounded-none bg-[#FAF7F0] shadow-sm transition-all duration-300 hover:shadow-[0_10px_25px_rgba(10,30,63,0.1)] group">
              <div className="w-12 h-12 rounded-none bg-[#0A1E3F]/10 flex items-center justify-center border border-[#0A1E3F]/25 text-[#0A1E3F] group-hover:bg-[#0A1E3F] group-hover:text-[#FAF7F0] transition-colors duration-300 mb-2">
                <Zap className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] tracking-wide text-[#0A1E3F]">Smarter Thermal Design</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                Designed for better heat management, QICDOCK places the PCB circuitry in the end connector rather than inside the main charging body, helping reduce heat around the charging pad during use.
              </p>
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
