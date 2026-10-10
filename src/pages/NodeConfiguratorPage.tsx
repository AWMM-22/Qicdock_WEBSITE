import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  ShoppingBag, 
  Plus, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  X,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Zap,
  CheckCircle2,
  Video,
  Upload,
  Play,
  Star,
  Wind,
  ThermometerSnowflake,
  Smartphone,
  Layers,
  Award
} from 'lucide-react';
import { addToCart, getCartItems } from '../lib/cart';

// Real asset imports
import allInOneComboImg from '../assets/images/all_in_1combo.png';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import dzireSwiftImg from '../assets/images/Dzire and Swift.webp';
import dzireSwiftPng from '../assets/images/Dzire and Swift.png';
import ertigaImg from '../assets/images/Ertiga.webp';
import xuv3xoImg from '../assets/images/3XO.webp';
import combinedImg from '../assets/images/3in1 copy.webp';
import combined1Img from '../assets/images/combined-1.png';

// CAR MODEL OPTIONS
interface CarOption {
  id: string;
  name: string;
  brand: string;
  yearRange: string;
  trayFit: string;
  imgThumb: string;
  plateImg: string;
  price: number;
  mrp: number;
}

const CAR_OPTIONS: CarOption[] = [
  {
    id: 'universal',
    name: 'Universal',
    brand: 'Universal Fit',
    yearRange: 'All Cars & Models',
    trayFit: 'Center Console Fit',
    imgThumb: dzireSwiftPng,
    plateImg: dzireSwiftPng,
    price: 2335,
    mrp: 3007
  },
  {
    id: 'fronx',
    name: 'Fronx',
    brand: 'Maruti Suzuki',
    yearRange: '2023 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: 'baleno',
    name: 'Baleno',
    brand: 'Maruti Suzuki',
    yearRange: '2022 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: 'swift',
    name: 'Swift',
    brand: 'Maruti Suzuki',
    yearRange: '2024 - 2025',
    trayFit: 'Center Slot Fit',
    imgThumb: dzireSwiftImg,
    plateImg: dzireSwiftImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: 'dzire',
    name: 'Dzire',
    brand: 'Maruti Suzuki',
    yearRange: '2024 - 2025',
    trayFit: 'Center Slot Fit',
    imgThumb: dzireSwiftImg,
    plateImg: dzireSwiftImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: 'ertiga',
    name: 'Ertiga',
    brand: 'Maruti Suzuki',
    yearRange: '2019 - 2025',
    trayFit: 'Cup-Holder Slot',
    imgThumb: ertigaImg,
    plateImg: ertigaImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: 'taisor',
    name: 'Taisor',
    brand: 'Toyota',
    yearRange: '2024 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: 'glanza',
    name: 'Glanza',
    brand: 'Toyota',
    yearRange: '2022 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg,
    price: 2571,
    mrp: 3255
  },
  {
    id: '3xo',
    name: '3XO',
    brand: 'Mahindra',
    yearRange: '2024 - 2025',
    trayFit: 'XUV Tray Fit',
    imgThumb: xuv3xoImg,
    plateImg: xuv3xoImg,
    price: 2571,
    mrp: 3255
  }
];

// MODULE OPTIONS
interface ModuleOption {
  id: 'vent' | 'rear' | 'tray';
  name: string;
  price: number;
  mrp: number;
  thumbImg: string;
  stageImg: string;
  slotStyles: { left: string; top: string; width: string; height: string; zIndex: number };
  description: string;
  features: string[];
  galleryImages: string[];
}

const MODULE_OPTIONS: ModuleOption[] = [
  {
    id: 'vent',
    name: 'Car Vent Mobile Stand',
    price: 499,
    mrp: 999,
    thumbImg: airVentImg,
    stageImg: airVentImg,
    slotStyles: { left: '160px', top: '340px', width: '210px', height: '210px', zIndex: 100 },
    description: 'Lockable steel-core 360° clamping arm mounts securely to horizontal and vertical AC air vents without blocking cabin airflow or vibrating over bumps.',
    features: [
      '360° smooth ball joint for portrait navigation and landscape calls',
      'Aerospace-grade steel hook clamp with anti-scratch silicone cushioning',
      'Instant 25W magnetic wireless charging with precision Qi2 alignment',
      'Universally fits round, vertical, and horizontal automotive air louvers'
    ],
    galleryImages: [
      airVentImg,
      combinedImg
    ]
  },
  {
    id: 'rear',
    name: 'Rear Seat Passenger Mount',
    price: 499,
    mrp: 999,
    thumbImg: headrestMountImg,
    stageImg: headrestMountImg,
    slotStyles: { left: '460px', top: '340px', width: '210px', height: '210px', zIndex: 99 },
    description: 'Heavy-duty dual-post headrest clamp extends magnetic wireless charging and comfortable hands-free video viewing directly to backseat passengers.',
    features: [
      'Heavy-duty dual-post headrest clamp fits any standard passenger headrest',
      'Telescopic articulating pivot arm for gaming, movies, and video calls',
      'Ultra-strong N52 neodymium magnetic ring keeps phones locked on rough roads',
      'High-speed inductive charging eliminates messy charging cords in the back'
    ],
    galleryImages: [
      headrestMountImg,
      combinedImg
    ]
  },
  {
    id: 'tray',
    name: 'Universal Centre Console Dock Tray',
    price: 500,
    mrp: 899,
    thumbImg: dzireSwiftPng,
    stageImg: dzireSwiftPng,
    slotStyles: { left: '300px', top: '510px', width: '220px', height: '220px', zIndex: 98 },
    description: 'Precision molded charging base engineered for the lower center console tray with non-slip silicone backing and factory OEM dashboard finish.',
    features: [
      'Direct OEM console tray fitment with zero rattle or slide during acceleration',
      'Dual-coil 25W Qi2 fast charging architecture with thermal management',
      'Copper dissipation core keeps device cool during continuous GPS navigation',
      'Includes stealth low-profile Type-C power connector for clean cabin wiring'
    ],
    galleryImages: [
      dzireSwiftPng,
      combinedImg
    ]
  }
];


const TECHNICAL_SPECS = [
  { label: 'Wireless Protocol', value: 'Qi2.2 / MagSafe Fast Charging standard' },
  { label: 'Power Output', value: '25W Peak Wireless Fast Charging' },
  { label: 'Input Interface', value: 'USB Type-C (Supports 12V–24V vehicle adapters & 65W+ PD sources)' },
  { label: 'Magnetic Array', value: 'N52 Neodymium Ring (tested up to 1.8kg hold capacity)' },
  { label: 'Thermal System', value: 'Integrated heat dissipation vents with active thermal throttling' },
  { label: 'Safety Protections', value: 'FOD (Foreign Object Detection), OVP, OCP, OTP temperature guard' },
  { label: 'Cable Included', value: '1.5m Heavy-Duty Braided Automotive Type-C (100W rated)' },
  { label: 'Materials', value: 'Aerospace Aluminium, Polycarbonate & Non-Slip Silicone' },
  { label: 'Warranty', value: '2-Year Doorstep Replacement Guarantee' }
];

const WHATS_IN_THE_BOX = [
  '1x 25W Qi2 Fast Wireless Charging Pad / Dock',
  '1x Precision-Fit Dashboard / Console Tray',
  '1x 360° Steel-Hook Car Air Vent Mount',
  '1x Dual-Post Passenger Headrest Mount',
  '1x 100W Braided Heavy-Duty Automotive Type-C Cable (1.5m)',
  '1x Fast Dual-Port 12V Automotive Power Adapter',
  '1x Cable Routing Clips & Quick Start Manual',
  '1x Official 2-Year Warranty Registration Card'
];

// FAQ matching the Car Combo 25W Wireless Charging Ecosystem
const FAQ_ITEMS = [
  {
    q: 'What is the Car Combo 25W Wireless Charger Ecosystem?',
    a: 'The Car Combo is an all-in-one 25W Qi2 wireless charging ecosystem engineered specifically for car cabins. It combines a 25W Qi2 fast wireless charging core with three purpose-built automotive stands: a custom-fit Centre Console Dock Tray tailored to your vehicle, a 360° Steel-Hook Car Air Vent Mount, and a Dual-Post Rear Seat Headrest Mount for backseat passengers.'
  },
  {
    q: 'What comes in the box with the Car Combo?',
    a: 'The package contains: (1) 25W Qi2 Magnetic Fast Wireless Charging Pad, (2) Custom console tray tailored for your selected car model, (3) 360° Steel-Hook Air Vent Mount, (4) Dual-Post Rear Seat Headrest Mount, (5) 1.5m Heavy-Duty Braided Automotive Type-C Cable (100W rated), (6) Fast Dual-Port 12V Automotive Power Adapter, (7) Cable Routing Clips, and (8) Official 2-Year Replacement Warranty Registration Card.'
  },
  {
    q: 'Will the custom console tray fit my specific car model?',
    a: 'Yes! When configuring your combo, you select your exact car (Maruti Suzuki Fronx, Swift, Dzire, Baleno, Ertiga, Toyota Taisor, Glanza, or Mahindra 3XO). Each tray is molded directly from 3D CAD vehicle interior scans to drop snugly into your car’s factory console without adhesives, drilling, or dashboard vibrations.'
  },
  {
    q: 'What makes the 25W Qi2 technology special?',
    a: 'Qi2 is the latest global standard for magnetic wireless charging certified by the Wireless Power Consortium. It delivers up to 25W peak wireless charging speeds with precision N52 neodymium magnetic alignment, superior heat management, and zero disconnections over bumps.'
  },
  {
    q: 'Which phone models are compatible with the Car Combo?',
    a: 'The Car Combo natively supports all MagSafe and Qi2 iPhones (iPhone 12 through iPhone 16 series), as well as wireless-charging Android phones (such as Samsung Galaxy S23/S24/S25 series and Google Pixel) either directly or with any MagSafe-compatible magnetic case or ring.'
  },
  {
    q: 'Is it safe to leave connected inside the car in high summer temperatures?',
    a: 'Yes. Built with automotive-grade temperature-resistant polycarbonate and aircraft-grade aluminum heat dissipation vents, the charger features built-in FOD (Foreign Object Detection), Over-Voltage, and Over-Temperature guards that regulate charging to ensure total safety for your vehicle and phone.'
  },
  {
    q: 'How does the custom vehicle tray dock stay stable during drives?',
    a: 'Each vehicle tray is precision-contoured to fit your vehicle console pocket. Anti-slip high-friction silicone base pads combined with the N52 neodymium magnetic lock ensure your device stays rock-solid over speed bumps, sudden braking, and sharp turns.'
  }
];



export default function NodeConfiguratorPage() {
  const navigate = useNavigate();

  // State: selected car (defaults to Universal)
  const [selectedCarId, setSelectedCarId] = useState<string>('universal');

  // State: selected modules (default: all 3 modules selected)
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(['vent', 'rear', 'tray']);

  // State: "See it in action" toggle
  const [seeInAction, setSeeInAction] = useState<boolean>(false);

  // State: Cart count from storage
  const [cartCount, setCartCount] = useState<number>(0);

  // State: Car Vent Stand Video
  const [ventVideoUrl, setVentVideoUrl] = useState<string>('/videos/car-vent-stand.mp4');
  const [ventVideoError, setVentVideoError] = useState<boolean>(false);

  // State: Rear Seat Stand Video
  const [rearVideoUrl, setRearVideoUrl] = useState<string>('/videos/rear-seat-mount.mp4');
  const [rearVideoError, setRearVideoError] = useState<boolean>(false);

  // State: Vehicle Specific Tray Video
  const [trayVideoUrl, setTrayVideoUrl] = useState<string>('/videos/vehicle-specific-tray.mp4');
  const [trayVideoError, setTrayVideoError] = useState<boolean>(false);

  // State: Accordions
  const [openProductDetails, setOpenProductDetails] = useState<boolean>(false);
  const [openSpecs, setOpenSpecs] = useState<boolean>(false);
  const [openDelivery, setOpenDelivery] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  // State: Product Video
  const [videoUrl, setVideoUrl] = useState<string>('/videos/car-combo-video.mp4');
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isPastVideo, setIsPastVideo] = useState<boolean>(false);
  const [isVideoHovered, setIsVideoHovered] = useState<boolean>(false);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);
  const mainVideoRef = useRef<HTMLVideoElement | null>(null);

  // Play first video only when user scrolls or reaches it on screen
  useEffect(() => {
    const videoEl = mainVideoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [videoUrl]);

  useEffect(() => {
    const checkScrollPosition = () => {
      if (!videoSectionRef.current) return;
      const rect = videoSectionRef.current.getBoundingClientRect();
      // When the top of the video enters viewport or is scrolled past, keep the top image hidden
      // so it never pops back up while browsing Car Vent Stand, Rear Seat Mount, Tray, or FAQs
      const reachedOrPast = rect.top <= window.innerHeight * 0.75;
      setIsPastVideo(reachedOrPast);
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  const shouldHideTopImage = isPastVideo || isVideoHovered;

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoError(false);
    }
  };

  const handleVentVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVentVideoUrl(url);
      setVentVideoError(false);
    }
  };

  const handleRearVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setRearVideoUrl(url);
      setRearVideoError(false);
    }
  };

  const handleTrayVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTrayVideoUrl(url);
      setTrayVideoError(false);
    }
  };

  // State: Modal for "View more"
  const [activeModalModule, setActiveModalModule] = useState<ModuleOption | null>(null);
  const [activeModalImageIdx, setActiveModalImageIdx] = useState<number>(0);

  // Notification for added to cart
  const [addedToast, setAddedToast] = useState<boolean>(false);

  // Read initial cart items
  useEffect(() => {
    const updateCount = () => {
      const items = getCartItems();
      const count = items.reduce((acc, i) => acc + (i.quantity || 1), 0);
      setCartCount(count);
    };
    updateCount();
    window.addEventListener('cartUpdated', updateCount);
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, []);

  // Current selected car
  const currentCar = useMemo(() => {
    return CAR_OPTIONS.find(c => c.id === selectedCarId) || CAR_OPTIONS[0];
  }, [selectedCarId]);

  // Toggle Module selection
  const handleToggleModule = (moduleId: string) => {
    if (selectedModuleIds.includes(moduleId)) {
      if (selectedModuleIds.length > 1) {
        setSelectedModuleIds(selectedModuleIds.filter(id => id !== moduleId));
      }
    } else {
      setSelectedModuleIds([...selectedModuleIds, moduleId]);
    }
  };

  // Price calculations driven by selected car:
  // Universal: ₹2,335 (cancelled ₹3,007 -> 22% OFF)
  // All other cars: ₹2,571 (cancelled ₹3,255 -> 21% OFF)
  const totalPrice = useMemo(() => {
    return currentCar.price;
  }, [currentCar]);

  const totalMrp = useMemo(() => {
    return currentCar.mrp;
  }, [currentCar]);

  const discountPercent = useMemo(() => {
    if (totalMrp <= totalPrice) return 0;
    return Math.round(((totalMrp - totalPrice) / totalMrp) * 100);
  }, [totalPrice, totalMrp]);

  // Handle Add To Cart
  const handleAddToCart = () => {
    const selectedNames = selectedModuleIds
      .map(id => MODULE_OPTIONS.find(m => m.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    addToCart({
      id: `car-combo-${currentCar.id}-${selectedModuleIds.sort().join('-')}`,
      name: `Car Combo – 25W Wireless Charger | Charging Pad + 3 Stands`,
      price: totalPrice,
      originalPrice: totalMrp,
      image: currentCar.imgThumb,
      quantity: 1,
      variant: `${currentCar.name} (${currentCar.brand}) with ${selectedNames || 'Standard Modules'}`
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F0E6] text-[#0A1E3F] font-sans antialiased selection:bg-[#0A1E3F] selection:text-[#F4F0E6]">
      
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-6 md:right-6 z-50 bg-[#0A1E3F] text-[#F4F0E6] px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <Check className="w-4 h-4 text-[#F4F0E6]" />
          <span>Added Car Combo to your bag!</span>
          <button 
            onClick={() => navigate('/cart')}
            className="ml-2 text-xs uppercase tracking-wider font-bold underline bg-white/20 px-2 py-0.5 rounded cursor-pointer"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-[1720px] mx-auto min-h-screen relative">
        
        {/* ======================================================== */}
        {/* TOP / LEFT: STICKY PREVIEW STAGE                         */}
        {/* ======================================================== */}
        <div className={`w-full lg:w-1/2 sticky top-16 sm:top-20 h-[32vh] sm:h-[38vh] lg:h-[calc(100vh-5rem)] bg-[#F4F0E6] border-b lg:border-b-0 lg:border-r border-[#0A1E3F]/10 flex flex-col items-center justify-center z-20 overflow-hidden p-0 m-0 relative transition-all duration-500 ease-in-out ${
          shouldHideTopImage 
            ? '-translate-y-full opacity-0 pointer-events-none' 
            : 'translate-y-0 opacity-100'
        }`}>
          
          {/* Top Bar with Native Back, Share & Cart (Absolute Overlay) */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 sm:px-6 pt-2 sm:pt-4 z-30 pointer-events-auto">
            {/* Back button */}
            <button 
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-[#0A1E3F] hover:opacity-70 transition flex items-center justify-center focus:outline-none cursor-pointer"
              title="Go back"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>

            {/* Right icons */}
            <div className="flex items-center gap-3.5 sm:gap-5 text-[#0A1E3F]">
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ 
                      title: 'Car Combo – 25W Wireless Charger | Charging Pad + 3 Stands', 
                      url: window.location.href 
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="p-1 hover:opacity-70 transition focus:outline-none cursor-pointer"
                title="Share"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="p-1 relative hover:opacity-70 transition focus:outline-none cursor-pointer"
                title="Bag"
                aria-label="Cart Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0A1E3F] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Product Image Stage (Top image with all_in_1combo.png, 0 padding in div) */}
          <div className="relative w-full h-full flex items-center justify-center p-0 m-0 overflow-hidden bg-[#F4F0E6]">
            <img 
              src={allInOneComboImg}
              alt="Car Combo – 25W Wireless Charger | Charging Pad + 3 Stands"
              className="w-full h-full object-contain filter drop-shadow-md select-none p-0 m-0 block transition-all duration-300"
            />
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM / RIGHT: CONFIGURATOR CONTROLS & SELECTION         */}
        {/* ======================================================== */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-3 sm:px-6 lg:px-10 pt-3 sm:pt-5 pb-20 sm:pb-24 lg:pb-8 bg-[#F4F0E6]">
          <div className="max-w-[620px] mx-auto w-full space-y-3 sm:space-y-4">
            
            {/* Header: Title & Pricing */}
            <div className="border-b border-[#0A1E3F]/15 pb-2 sm:pb-3">
              <h1 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A1E3F] tracking-tight uppercase leading-tight my-1">
                Car Combo – 25W Wireless Charger | Charging Pad + 3 Stands
              </h1>
              
              {/* Pricing Row */}
              <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-extrabold text-[#0A1E3F] tracking-tight leading-none">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs sm:text-sm text-[#0A1E3F]/50 line-through font-normal">
                  ₹{totalMrp.toLocaleString('en-IN')}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[10px] sm:text-xs font-bold text-[#0A1E3F] bg-[#0A1E3F]/10 px-1.5 py-0.5 rounded leading-none">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="text-[10px] text-[#0A1E3F]/60 font-medium ml-1">
                  (Incl. all taxes)
                </span>
              </div>
            </div>

            {/* SELECT CAR NAME */}
            <section className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1E3F] my-0">
                  Select Car Name
                </h2>
              </div>

              {/* Horizontal Scrollable Container */}
              <div className="relative group">
                <div 
                  className="flex gap-2 overflow-x-auto pb-1.5 pt-0.5 scroll-smooth no-scrollbar scrollbar-none snap-x snap-mandatory"
                  style={{ WebkitOverflowScrolling: 'touch' }}
                >
                  {CAR_OPTIONS.map(car => {
                    const isSelected = selectedCarId === car.id;
                    return (
                      <button
                        type="button"
                        key={car.id} 
                        onClick={() => setSelectedCarId(car.id)}
                        className={`cursor-pointer shrink-0 snap-start w-[116px] min-w-[116px] h-[76px] rounded-[6px] p-2 flex flex-col justify-between bg-[#FAF7F2] relative select-none text-left transition-all ${
                          isSelected 
                            ? 'border-2 border-[#0A1E3F] bg-[#0A1E3F]/8 shadow-sm ring-1 ring-[#0A1E3F]' 
                            : 'border-[1.5px] border-[#0A1E3F] hover:bg-[#0A1E3F]/5'
                        }`}
                      >
                        {/* Status Checkmark */}
                        <div className="flex items-center justify-between w-full">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-2xs' : 'border border-[#0A1E3F]/25 bg-[#EFEAE1]'
                          }`}>
                            {isSelected ? (
                              <Check className="w-2 h-2 stroke-[3]" />
                            ) : (
                              <div className="w-1 h-1 rounded-full bg-transparent" />
                            )}
                          </div>
                        </div>

                        {/* Title Text: Car Brand & Model */}
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-normal text-[#0A1E3F]/70 leading-tight truncate">
                            {car.brand}
                          </span>
                          <span className="text-[12px] font-bold text-[#0A1E3F] leading-tight truncate">
                            {car.name}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SELECT MODULES */}
            <section className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0A1E3F] my-0">
                  Select Modules
                </h2>
                <span className="text-[11px] sm:text-xs font-semibold text-[#0A1E3F]/70">
                  {selectedModuleIds.length} of {MODULE_OPTIONS.length} Added
                </span>
              </div>

              {/* Module Cards Stack */}
              <div className="flex flex-col space-y-2.5 sm:space-y-3 w-full">
                {MODULE_OPTIONS.map(mod => {
                  const isSelected = selectedModuleIds.includes(mod.id);

                  return (
                    <div
                      key={mod.id}
                      className={`w-full h-[112px] min-h-[110px] max-h-[115px] p-2.5 sm:p-3 rounded-lg border transition-all bg-[#FAF7F2] shadow-2xs flex items-center justify-between ${
                        isSelected 
                          ? 'border-[1.5px] border-[#0A1E3F] bg-[#0A1E3F]/5 ring-1 ring-[#0A1E3F]/20' 
                          : 'border border-[#0A1E3F]/15 hover:border-[#0A1E3F]/35 hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {/* Internal Grid */}
                      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 h-full">
                        
                        {/* Left Thumbnail Box (0 left/right padding, flush edge-to-edge) */}
                        <div 
                          onClick={() => {
                            setActiveModalModule(mod);
                            setActiveModalImageIdx(0);
                          }}
                          className="w-[85px] h-[85px] min-w-[85px] rounded-md bg-transparent border border-[#0A1E3F]/10 flex items-center justify-center p-0 m-0 overflow-hidden cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
                          title="Click to view full module details"
                        >
                          <img 
                            src={mod.thumbImg} 
                            alt={mod.name}
                            className="w-full h-full object-cover object-center p-0 m-0 block"
                          />
                        </div>

                        {/* Right Content Area */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between h-[85px] py-0.5">
                          <div>
                            <p 
                              onClick={() => {
                                setActiveModalModule(mod);
                                setActiveModalImageIdx(0);
                              }}
                              className="text-[14px] font-medium leading-[1.2] text-[#0A1E3F] line-clamp-2 cursor-pointer hover:underline"
                            >
                              {mod.name}
                            </p>
                            
                            {/* "View more" link */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveModalModule(mod);
                                setActiveModalImageIdx(0);
                              }}
                              className="text-[11px] text-[#0A1E3F]/70 hover:text-[#0A1E3F] underline font-normal leading-tight pt-0.5 block text-left cursor-pointer"
                            >
                              View more
                            </button>
                          </div>

                          {/* Action Area: Stand included in combo with zero separate stand price */}
                          <div className="flex items-center justify-between gap-1 mt-auto pt-1">
                            <span className="text-[11px] font-semibold text-[#0A1E3F]/80">
                              Combo Stand
                            </span>

                            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[8px] bg-[#0A1E3F]/10 text-[#0A1E3F] text-[10px] font-bold uppercase tracking-wider select-none">
                              <Check className="w-3 h-3 stroke-[3]" />
                              <span>INCLUDED</span>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Desktop-only Add to Cart Button */}
            <div className="hidden lg:block pt-1.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-[48px] bg-[#0A1E3F] hover:bg-[#152E58] active:scale-[0.99] text-[#F4F0E6] font-bold text-xs uppercase tracking-wider rounded-md shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>ADD TO CART</span>
                <span>-</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </button>
            </div>

            {/* ======================================================== */}
            {/* ACCORDIONS: PRODUCT DETAILS, SPECS, DELIVERY & RETURNS   */}
            {/* ======================================================== */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              
              {/* 1. Product Details Accordion */}
              <div className="border-b border-gray-100 pb-2.5">
                <button
                  type="button"
                  onClick={() => setOpenProductDetails(!openProductDetails)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-900 py-1"
                >
                  <span>Product Details</span>
                  {openProductDetails ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                </button>

                {openProductDetails && (
                  <div className="mt-2 text-xs sm:text-[13px] text-gray-600 space-y-2 leading-relaxed">
                    <p>
                      The Car Combo is an all-in-one 25W Qi2 wireless charging ecosystem precision engineered for Indian roads and vehicle interiors. Comes custom configured for <strong>{currentCar.brand} {currentCar.name}</strong> along with 3 specialized mounting stands.
                    </p>
                    <ul className="space-y-1.5 list-disc pl-4 text-xs sm:text-[13px]">
                      <li>Custom-fit console dock tray designed specifically for {currentCar.name} ({currentCar.trayFit})</li>
                      <li>Car Vent Mobile Stand with lockable 360° steel hook clamp</li>
                      <li>Rear Seat Passenger Mount with dual-post headrest clamp for backseat entertainment</li>
                      <li>Universal Centre Console Dock Tray with non-slip silicone backing</li>
                      <li>Qi2 certified 25W magnetic wireless charging with fast thermal dissipation</li>
                      <li>Smart power management prevents vehicle battery drain when engine is idle</li>
                      <li>Includes braided heavy-duty automotive Type-C cables and 12V adapter</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* 2. Technical Specifications & What's in the Box Accordion */}
              <div className="border-b border-[#0A1E3F]/15 pb-2.5">
                <button
                  type="button"
                  onClick={() => setOpenSpecs(!openSpecs)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0A1E3F] py-1 cursor-pointer"
                >
                  <span>Specifications & Box Contents</span>
                  {openSpecs ? <ChevronUp className="w-4 h-4 text-[#0A1E3F]/60" /> : <ChevronDown className="w-4 h-4 text-[#0A1E3F]/60" />}
                </button>

                {openSpecs && (
                  <div className="mt-2 text-xs sm:text-[13px] text-[#0A1E3F]/80 space-y-3 leading-relaxed">
                    <div>
                      <h4 className="font-bold text-[#0A1E3F] text-xs uppercase tracking-wider mb-1.5">
                        Technical Specifications
                      </h4>
                      <div className="border border-[#0A1E3F]/15 rounded-md divide-y divide-[#0A1E3F]/10 overflow-hidden bg-[#FAF7F2]">
                        {TECHNICAL_SPECS.map((spec, sIdx) => (
                          <div key={sIdx} className="grid grid-cols-2 p-2 text-[11px] sm:text-xs">
                            <span className="font-semibold text-[#0A1E3F]/80">{spec.label}</span>
                            <span className="text-[#0A1E3F]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-[#0A1E3F] text-xs uppercase tracking-wider mb-1.5">
                        What’s in the Box
                      </h4>
                      <ul className="space-y-1 list-disc pl-4 text-xs">
                        {WHATS_IN_THE_BOX.map((item, bIdx) => (
                          <li key={bIdx} className="text-[#0A1E3F]/80">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Delivery Time & Returns Accordion */}
              <div className="border-b border-[#0A1E3F]/15 pb-2.5">
                <button
                  type="button"
                  onClick={() => setOpenDelivery(!openDelivery)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#0A1E3F] py-1 cursor-pointer"
                >
                  <span>Delivery Time & Returns</span>
                  {openDelivery ? <ChevronUp className="w-4 h-4 text-[#0A1E3F]/60" /> : <ChevronDown className="w-4 h-4 text-[#0A1E3F]/60" />}
                </button>

                {openDelivery && (
                  <div className="mt-2 text-xs sm:text-[13px] text-[#0A1E3F]/80 space-y-2.5 leading-relaxed">
                    <div>
                      <h5 className="font-bold text-[#0A1E3F] text-xs uppercase tracking-wider">DELIVERY</h5>
                      <p>Will be Dispatched in 4-5 days.</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-[#0A1E3F] text-xs uppercase tracking-wider">FREE SHIPPING</h5>
                      <p>Free shipping on orders above ₹1199. A charge of ₹79 is applied to all orders of ₹1199 and below.</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-[#0A1E3F] text-xs uppercase tracking-wider">CASH ON DELIVERY</h5>
                      <p>₹99 extra charges for all Cash On Delivery orders.</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-[#0A1E3F] text-xs uppercase tracking-wider">RETURNS</h5>
                      <p>2-year replacement for manufacturing or functionality defects.</p>
                      <p className="mt-1">
                        For more information, check out our{' '}
                        <span className="text-[#0A1E3F] underline cursor-pointer font-medium">Shipping Policy Page</span>{' '}
                        and{' '}
                        <span className="text-[#0A1E3F] underline cursor-pointer font-medium">Return and Exchange Policy</span>{' '}
                        page.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* ======================================================== */}
            {/* CONFORMANCE / TRUST BADGES (QUICK DELIVERY, EASY RETURNS) */}
            {/* ======================================================== */}
            <div className="bg-[#FAF7F2] border border-[#0A1E3F]/15 rounded-lg p-3 my-2 shadow-2xs">
              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-[#0A1E3F]/15">
                <div className="flex flex-col items-center justify-center p-1 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0A1E3F] leading-tight">
                    Quick Delivery
                  </span>
                  <span className="text-[9px] text-[#0A1E3F]/60 leading-tight">
                    2-4 Day Dispatch
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-1 space-y-1 pl-2">
                  <div className="w-8 h-8 rounded-full bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0A1E3F] leading-tight">
                    Easy Returns
                  </span>
                  <span className="text-[9px] text-[#0A1E3F]/60 leading-tight">
                    2-Yr Replacement
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-1 space-y-1 pl-2">
                  <div className="w-8 h-8 rounded-full bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0A1E3F] leading-tight">
                    Quality Assured
                  </span>
                  <span className="text-[9px] text-[#0A1E3F]/60 leading-tight">
                    Qi2 Certified
                  </span>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* FULL-SCREEN WIDTH PRODUCT VIDEO SECTION                  */}
            {/* (Stretched edge-to-edge across screen, no outer container)*/}
            {/* (No start/voice buttons visible on hover)                */}
            {/* ======================================================== */}
            <div 
              ref={videoSectionRef}
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
              className="w-screen relative left-1/2 -translate-x-1/2 mt-4 mb-0 bg-black overflow-hidden shadow-sm select-none"
            >
              {!videoError ? (
                <div className="relative w-full bg-black flex flex-col items-center justify-center">
                  <video
                    ref={mainVideoRef}
                    key={videoUrl}
                    className="w-full h-auto max-h-[85vh] min-h-[220px] object-cover sm:object-contain mx-auto block bg-black"
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    onError={() => setVideoError(true)}
                  >
                    <source src={videoUrl} type="video/mp4" />
                    <source src="/videos/car-combo-video.mp4" type="video/mp4" />
                    Your browser does not support HTML5 video.
                  </video>
                </div>
              ) : (
                <div className="w-full py-12 px-4 bg-gradient-to-b from-[#0A1E3F] via-[#112D5E] to-black text-white text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                    <Video className="w-7 h-7" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Car Combo – 25W Fast Wireless Charger in Action
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Place your video file in the codebase at:{' '}
                    <code className="bg-white/10 text-[#F4F0E6] px-2 py-0.5 rounded font-mono text-[11px] sm:text-xs">
                      public/videos/car-combo-video.mp4
                    </code>
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#0A1E3F] hover:bg-[#152E58] border border-white/20 text-[#F4F0E6] text-xs font-bold uppercase tracking-wider rounded-md transition shadow mt-2">
                    <Upload className="w-4 h-4" />
                    <span>Preview Local Video Now</span>
                    <input 
                      type="file" 
                      accept="video/mp4,video/webm,video/*" 
                      onChange={handleVideoUpload}
                      className="hidden" 
                    />
                  </label>
                </div>
              )}
            </div>

            {/* 25W QI2 IN-CAR ECOSYSTEM SECTION (BETWEEN FIRST VIDEO AND COMBINED-1 IMAGE, NO ICONS) */}
            <div className="bg-[#FAF7F2] border border-[#0A1E3F]/15 rounded-lg p-4 sm:p-5 my-4 shadow-2xs">
              <div className="space-y-1.5 text-left">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#0A1E3F] tracking-tight leading-snug my-0">
                  25W Qi2 Automotive Wireless Charging Ecosystem
                </h3>
                <p className="text-xs sm:text-[13px] text-[#0A1E3F]/80 leading-relaxed my-0">
                  Qi2 is the advanced magnetic wireless charging standard delivering true 25W power. QICDOCK seamlessly brings it to your vehicle ecosystem through dedicated console dock, active air vent, and passenger mounts.
                </p>
              </div>
            </div>

            {/* COMBINED-1 IMAGE (Directly connected below) */}
            <div className="w-screen relative left-1/2 -translate-x-1/2 m-0 p-0 overflow-hidden select-none bg-black">
              <img
                src={combined1Img}
                alt="Car Combo All-in-One Setup"
                className="w-full h-auto block m-0 p-0 object-cover"
                loading="eager"
              />
            </div>

            {/* ======================================================== */}
            {/* SECTION 1: CAR VENT MOBILE STAND (USER SPECIFIED COPY)   */}
            {/* ======================================================== */}
            <section className="pt-4 pb-3 border-t border-[#0A1E3F]/15 space-y-3">
              {/* All texts left-aligned */}
              <div className="space-y-1 text-left">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A1E3F] tracking-tight uppercase leading-tight my-1 text-left">
                  Car Vent Mobile Stand
                </h2>
                <p className="text-xs sm:text-sm font-normal uppercase tracking-wider text-[#0A1E3F]/80 leading-snug my-0 text-left">
                  COOLER AIR. BETTER CHARGING.
                </p>
                <p className="text-xs sm:text-[13px] text-[#0A1E3F]/80 leading-relaxed pt-0.5 my-0 text-left">
                  Positioned right at your car’s AC vent, QICDOCK benefits from cool airflow to help reduce heat buildup and support consistent wireless charging performance.
                </p>
              </div>

              {/* Video Placeholder for Car Vent Mobile Stand */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0A1E3F] border border-[#0A1E3F]/20 shadow-md group">
                {!ventVideoError ? (
                  <div className="relative w-full h-full bg-[#0A1E3F] flex flex-col items-center justify-center">
                    <video
                      key={ventVideoUrl}
                      className="w-full h-full object-cover mx-auto block bg-black"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      onError={() => setVentVideoError(true)}
                    >
                      <source src={ventVideoUrl} type="video/mp4" />
                      <source src="/videos/car-vent-stand.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F] via-[#112D5E] to-[#0A1E3F] flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-[#F4F0E6] shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-[#F4F0E6] text-[#F4F0E6] translate-x-0.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F4F0E6] mt-2">
                      Car Vent Stand in Action
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#F4F0E6]/70 max-w-xs mt-0.5">
                      Place video file in codebase at <code className="text-[#F4F0E6] bg-white/10 px-1 py-0.5 rounded font-mono">public/videos/car-vent-stand.mp4</code>
                    </span>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-[#F4F0E6] text-[10px] font-bold uppercase tracking-wider rounded transition border border-white/20 mt-2.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Video File</span>
                      <input 
                        type="file" 
                        accept="video/mp4,video/webm,video/*" 
                        onChange={handleVentVideoUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Single div container holding all 3 features in a row */}
              <div className="bg-[#FAF7F2] border border-[#0A1E3F]/15 rounded-lg p-2.5 sm:p-3 grid grid-cols-3 divide-x divide-[#0A1E3F]/15 shadow-2xs pt-2.5">
                <div className="px-2 sm:px-3 space-y-1 first:pl-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Wind className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Active Vent Cooling
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    AC air circulates behind Qi2 coil, keeping phone cool during GPS navigation.
                  </p>
                </div>

                <div className="px-2 sm:px-3 space-y-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Steel Hook Grip
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Dual-threaded metal hook locks tightly onto vent slats with zero slippage.
                  </p>
                </div>

                <div className="px-2 sm:px-3 space-y-1 last:pr-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    25W Peak Speed
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Next-gen Qi2 magnetic wireless fast charging for iPhone MagSafe & Android.
                  </p>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 2: REAR SEAT PASSENGER HEADREST MOUNT            */}
            {/* ======================================================== */}
            <section className="pt-4 pb-3 border-t border-[#0A1E3F]/15 space-y-3">
              <div className="space-y-1 text-left">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A1E3F] tracking-tight uppercase leading-tight my-1 text-left">
                  Rear Seat Passenger Mount
                </h2>
                <p className="text-xs sm:text-sm font-normal uppercase tracking-wider text-[#0A1E3F]/80 leading-snug my-0 text-left">
                  PASSENGER ENTERTAINMENT. REAR ROW POWER.
                </p>
                <p className="text-xs sm:text-[13px] text-[#0A1E3F]/80 leading-relaxed pt-0.5 my-0 text-left">
                  Engineered for back-seat passengers and highway drives. Locks onto twin headrest metal posts with dual-strut clamps, positioning smartphones and tablets at eye-level while delivering continuous 25W Qi2 wireless charging.
                </p>
              </div>

              {/* Video for Rear Seat (No overlay text) */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0A1E3F] border border-[#0A1E3F]/20 shadow-md group">
                {!rearVideoError ? (
                  <div className="relative w-full h-full bg-[#0A1E3F] flex flex-col items-center justify-center">
                    <video
                      key={rearVideoUrl}
                      className="w-full h-full object-cover mx-auto block bg-black"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      onError={() => setRearVideoError(true)}
                    >
                      <source src={rearVideoUrl} type="video/mp4" />
                      <source src="/videos/rear-seat-mount.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F] via-[#112D5E] to-[#0A1E3F] flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-[#F4F0E6] shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-[#F4F0E6] text-[#F4F0E6] translate-x-0.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F4F0E6] mt-2">
                      Rear Seat Mount in Action
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#F4F0E6]/70 max-w-xs mt-0.5">
                      Place video file in codebase at <code className="text-[#F4F0E6] bg-white/10 px-1 py-0.5 rounded font-mono">public/videos/rear-seat-mount.mp4</code>
                    </span>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-[#F4F0E6] text-[10px] font-bold uppercase tracking-wider rounded transition border border-white/20 mt-2.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Video File</span>
                      <input 
                        type="file" 
                        accept="video/mp4,video/webm,video/*" 
                        onChange={handleRearVideoUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Single div container holding all 3 features in a row */}
              <div className="bg-[#FAF7F2] border border-[#0A1E3F]/15 rounded-lg p-2.5 sm:p-3 grid grid-cols-3 divide-x divide-[#0A1E3F]/15 shadow-2xs pt-2.5">
                <div className="px-2 sm:px-3 space-y-1 first:pl-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Twin-Post Clamp
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Dual-strut steel mechanical lock secures firmly to headrest posts (100–150mm).
                  </p>
                </div>

                <div className="px-2 sm:px-3 space-y-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Eye-Level Comfort
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Positions smartphones & tablets at natural eye height, preventing neck strain.
                  </p>
                </div>

                <div className="px-2 sm:px-3 space-y-1 last:pr-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    25W Qi2 Rapid Power
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Continuous 25W magnetic wireless power keeps rear passengers charged on road trips.
                  </p>
                </div>
              </div>
            </section>

            {/* ======================================================== */}
            {/* SECTION 3: VEHICLE-SPECIFIC CONSOLE DOCK TRAY             */}
            {/* ======================================================== */}
            <section className="pt-4 pb-3 border-t border-[#0A1E3F]/15 space-y-3">
              <div className="space-y-1 text-left">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-[#0A1E3F] tracking-tight uppercase leading-tight my-1 text-left">
                  Vehicle-Specific Console Dock Tray
                </h2>
                <p className="text-xs sm:text-sm font-normal uppercase tracking-wider text-[#0A1E3F]/80 leading-snug my-0 text-left">
                  FACTORY CONSOLE FIT. ZERO ADHESIVE.
                </p>
                <p className="text-xs sm:text-[13px] text-[#0A1E3F]/80 leading-relaxed pt-0.5 my-0 text-left">
                  Custom molded from sub-millimeter 3D interior scans for <strong>{currentCar.brand} {currentCar.name}</strong> and top Indian vehicles. Drops straight into your factory compartment with zero tools, zero rattling, and discreet automotive cable channels.
                </p>
              </div>

              {/* Video for Vehicle-Specific Console Dock Tray */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-[#0A1E3F] border border-[#0A1E3F]/20 shadow-md group">
                {!trayVideoError ? (
                  <div className="relative w-full h-full bg-[#0A1E3F] flex flex-col items-center justify-center">
                    <video
                      key={trayVideoUrl}
                      className="w-full h-full object-cover mx-auto block bg-black"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      disablePictureInPicture
                      onError={() => setTrayVideoError(true)}
                    >
                      <source src={trayVideoUrl} type="video/mp4" />
                      <source src="/videos/vehicle-specific-tray.mp4" type="video/mp4" />
                      Your browser does not support HTML5 video.
                    </video>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F] via-[#112D5E] to-[#0A1E3F] flex flex-col items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-[#F4F0E6] shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-[#F4F0E6] text-[#F4F0E6] translate-x-0.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-[#F4F0E6] mt-2">
                      Console Dock Tray in Action
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-[#F4F0E6]/70 max-w-xs mt-0.5">
                      Place video file in codebase at <code className="text-[#F4F0E6] bg-white/10 px-1 py-0.5 rounded font-mono">public/videos/vehicle-specific-tray.mp4</code>
                    </span>
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-[#F4F0E6] text-[10px] font-bold uppercase tracking-wider rounded transition border border-white/20 mt-2.5">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Video File</span>
                      <input 
                        type="file" 
                        accept="video/mp4,video/webm,video/*" 
                        onChange={handleTrayVideoUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Single div container holding all 3 features in a row */}
              <div className="bg-[#FAF7F2] border border-[#0A1E3F]/15 rounded-lg p-2.5 sm:p-3 grid grid-cols-3 divide-x divide-[#0A1E3F]/15 shadow-2xs pt-2.5">
                <div className="px-2 sm:px-3 space-y-1 first:pl-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Convenient Console Placement
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Keeps your phone within easy reach on the centre console for effortless access while parked.
                  </p>
                </div>

                <div className="px-2 sm:px-3 space-y-1">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Stable & Secure Mounting
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Provides a firm, reliable base that keeps your charger securely positioned, even on bumpy roads.
                  </p>
                </div>

                <div className="px-2 sm:px-3 space-y-1 last:pr-0">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#0A1E3F]/10 flex items-center justify-center text-[#0A1E3F]">
                    <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] leading-tight">
                    Multiple Car Compatibility
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[#0A1E3F]/75 leading-tight m-0">
                    Choose from Universal or car-specific dock variants designed for a neat, seamless fit in your vehicle.
                  </p>
                </div>
              </div>
            </section>




            {/* ======================================================== */}
            {/* SECTION 7: FREQUENTLY ASKED QUESTIONS (BELOW VIDEO)      */}
            {/* ======================================================== */}
            <section className="pt-4 pb-2 border-t border-[#0A1E3F]/15">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-bold text-[#0A1E3F] tracking-tight my-0">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="divide-y divide-[#0A1E3F]/10 border border-[#0A1E3F]/15 rounded-lg overflow-hidden bg-[#FAF7F2] shadow-2xs">
                {(showAllFaqs ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 5)).map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="transition-colors">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left p-3 sm:p-3.5 hover:bg-[#0A1E3F]/5 transition cursor-pointer"
                      >
                        <span className="text-xs sm:text-[13px] font-semibold text-[#0A1E3F] pr-2">
                          {faq.q}
                        </span>
                        <span className="shrink-0 text-[#0A1E3F]/60">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 pt-0 text-xs text-[#0A1E3F]/80 leading-relaxed border-t border-[#0A1E3F]/5">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* View All FAQs toggle button */}
              <button
                type="button"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="mt-2.5 w-full py-2 bg-[#FAF7F2] hover:bg-[#0A1E3F]/10 border border-[#0A1E3F]/15 rounded-md text-xs font-bold text-[#0A1E3F] uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>{showAllFaqs ? 'Show Less FAQs' : 'View All FAQs'}</span>
                <span>{showAllFaqs ? '−' : '+'}</span>
              </button>
            </section>

            {/* Spacer below video and FAQs to prevent sticky bottom bar overlap on mobile */}
            <div className="h-6 sm:h-8" />

          </div>
        </div>

        {/* ======================================================== */}
        {/* MOBILE STICKY BOTTOM BAR (Fixed CTA Button)              */}
        {/* ======================================================== */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F4F0E6]/95 backdrop-blur border-t border-[#0A1E3F]/15 px-3 py-2 shadow-[0_-4px_16px_rgba(10,30,63,0.08)]">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-[46px] bg-[#0A1E3F] hover:bg-[#152E58] active:scale-[0.99] text-[#F4F0E6] font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition shadow cursor-pointer"
          >
            <span>ADD TO CART</span>
            <span>-</span>
            <span>₹{totalPrice.toLocaleString('en-IN')}</span>
          </button>
        </div>

      </div>

      {/* ======================================================== */}
      {/* MODAL: MODULE "VIEW MORE" DETAILS & GALLERY              */}
      {/* ======================================================== */}
      {activeModalModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative border border-[#0A1E3F]/15">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalModule(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#EFEAE1] hover:bg-[#D5CEBF] flex items-center justify-center text-[#0A1E3F] z-10 transition cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Carousel */}
            <div className="bg-[#EFEAE1] p-4 flex flex-col items-center justify-center border-b border-[#0A1E3F]/10">
              <div className="w-full h-56 flex items-center justify-center">
                <img
                  src={activeModalModule.galleryImages[activeModalImageIdx] || activeModalModule.thumbImg}
                  alt={activeModalModule.name}
                  className="max-h-52 max-w-full object-contain transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {activeModalModule.galleryImages.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 max-w-full">
                  {activeModalModule.galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveModalImageIdx(idx)}
                      className={`w-12 h-12 rounded border p-0.5 bg-[#FAF7F2] shrink-0 overflow-hidden cursor-pointer ${
                        activeModalImageIdx === idx ? 'border-[#0A1E3F] ring-2 ring-[#0A1E3F]/20' : 'border-[#0A1E3F]/15 opacity-60'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-[#0A1E3F]">
                  {activeModalModule.name}
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 mt-1.5 rounded bg-[#0A1E3F]/10 text-[#0A1E3F] text-xs font-bold uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Included in Car Combo</span>
                </div>
              </div>

              <p className="text-xs text-[#0A1E3F]/80 leading-relaxed">
                {activeModalModule.description}
              </p>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A1E3F] mb-2">
                  Key Highlights
                </h4>
                <ul className="space-y-1.5">
                  {activeModalModule.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-[#0A1E3F]/80 flex items-start gap-2">
                      <span className="text-[#0A1E3F] font-bold">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button inside modal */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedModuleIds.includes(activeModalModule.id)) {
                      handleToggleModule(activeModalModule.id);
                    }
                    setActiveModalModule(null);
                  }}
                  className="w-full py-3 bg-[#0A1E3F] hover:bg-[#152E58] text-[#F4F0E6] font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer"
                >
                  {selectedModuleIds.includes(activeModalModule.id) ? 'ALREADY IN COMBO' : 'ADD TO COMBO'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
