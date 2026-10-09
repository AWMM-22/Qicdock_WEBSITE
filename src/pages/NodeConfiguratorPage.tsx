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
  Play
} from 'lucide-react';
import { addToCart, getCartItems } from '../lib/cart';

// Real asset imports
import allInOneComboImg from '../assets/images/all_in_1combo.png';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import dzireSwiftImg from '../assets/images/Dzire and Swift.webp';
import ertigaImg from '../assets/images/Ertiga.webp';
import xuv3xoImg from '../assets/images/3XO.webp';
import combinedImg from '../assets/images/3in1 copy.webp';

// CAR MODEL OPTIONS
interface CarOption {
  id: string;
  name: string;
  brand: string;
  yearRange: string;
  trayFit: string;
  imgThumb: string;
  plateImg: string;
}

const CAR_OPTIONS: CarOption[] = [
  {
    id: 'fronx',
    name: 'Fronx',
    brand: 'Maruti Suzuki',
    yearRange: '2023 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg
  },
  {
    id: 'baleno',
    name: 'Baleno',
    brand: 'Maruti Suzuki',
    yearRange: '2022 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg
  },
  {
    id: 'swift',
    name: 'Swift',
    brand: 'Maruti Suzuki',
    yearRange: '2024 - 2025',
    trayFit: 'Center Slot Fit',
    imgThumb: dzireSwiftImg,
    plateImg: dzireSwiftImg
  },
  {
    id: 'dzire',
    name: 'Dzire',
    brand: 'Maruti Suzuki',
    yearRange: '2024 - 2025',
    trayFit: 'Center Slot Fit',
    imgThumb: dzireSwiftImg,
    plateImg: dzireSwiftImg
  },
  {
    id: 'ertiga',
    name: 'Ertiga',
    brand: 'Maruti Suzuki',
    yearRange: '2019 - 2025',
    trayFit: 'Cup-Holder Slot',
    imgThumb: ertigaImg,
    plateImg: ertigaImg
  },
  {
    id: 'taisor',
    name: 'Taisor',
    brand: 'Toyota',
    yearRange: '2024 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg
  },
  {
    id: 'glanza',
    name: 'Glanza',
    brand: 'Toyota',
    yearRange: '2022 - 2025',
    trayFit: 'Console Tray Fit',
    imgThumb: fronxEtcImg,
    plateImg: fronxEtcImg
  },
  {
    id: '3xo',
    name: '3XO',
    brand: 'Mahindra',
    yearRange: '2024 - 2025',
    trayFit: 'XUV Tray Fit',
    imgThumb: xuv3xoImg,
    plateImg: xuv3xoImg
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
    thumbImg: centerMountImg,
    stageImg: centerMountImg,
    slotStyles: { left: '300px', top: '510px', width: '220px', height: '220px', zIndex: 98 },
    description: 'Precision molded charging base engineered for the lower center console tray with non-slip silicone backing and factory OEM dashboard finish.',
    features: [
      'Direct OEM console tray fitment with zero rattle or slide during acceleration',
      'Dual-coil 25W Qi2 fast charging architecture with thermal management',
      'Copper dissipation core keeps device cool during continuous GPS navigation',
      'Includes stealth low-profile Type-C power connector for clean cabin wiring'
    ],
    galleryImages: [
      centerMountImg,
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
    q: 'What power adapter should be used with the Car Combo in my car?',
    a: 'We include a fast dual-port 12V automotive power adapter in the package that plugs directly into your car auxiliary 12V/24V socket. You can also connect it to any onboard USB-C port in your vehicle that supports 15W–65W Power Delivery (PD).'
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

  // State: selected car (defaults to Fronx)
  const [selectedCarId, setSelectedCarId] = useState<string>('fronx');

  // State: selected modules (default: all 3 modules selected)
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>(['vent', 'rear', 'tray']);

  // State: "See it in action" toggle
  const [seeInAction, setSeeInAction] = useState<boolean>(false);

  // State: Cart count from storage
  const [cartCount, setCartCount] = useState<number>(0);

  // State: Pincode check
  const [pincode, setPincode] = useState<string>('');
  const [pincodeMessage, setPincodeMessage] = useState<string | null>(null);

  // State: Accordions
  const [openProductDetails, setOpenProductDetails] = useState<boolean>(false);
  const [openSpecs, setOpenSpecs] = useState<boolean>(false);
  const [openDelivery, setOpenDelivery] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  // State: Product Video
  const [videoUrl, setVideoUrl] = useState<string>('/videos/car-combo-video.mp4');
  const [videoError, setVideoError] = useState<boolean>(false);
  const [isVideoOnScreen, setIsVideoOnScreen] = useState<boolean>(false);
  const [isVideoHovered, setIsVideoHovered] = useState<boolean>(false);
  const videoSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoOnScreen(entry.isIntersecting);
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const shouldHideTopImage = isVideoOnScreen || isVideoHovered;

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setVideoError(false);
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

  // Base price for car specific charging tray hardware
  const baseCarPrice = 550;
  const baseCarMrp = 999;

  // Price calculations
  const totalPrice = useMemo(() => {
    let sum = baseCarPrice;
    selectedModuleIds.forEach(id => {
      const mod = MODULE_OPTIONS.find(m => m.id === id);
      if (mod) sum += mod.price;
    });
    // When all 3 modules are selected, exactly matches the combo deal: ₹2,048
    if (selectedModuleIds.length === 3) return 2048;
    return sum;
  }, [selectedModuleIds]);

  const totalMrp = useMemo(() => {
    let sum = baseCarMrp;
    selectedModuleIds.forEach(id => {
      const mod = MODULE_OPTIONS.find(m => m.id === id);
      if (mod) sum += mod.mrp;
    });
    // Combo MRP is ₹3,696
    if (selectedModuleIds.length === 3) return 3696;
    return Math.max(sum, Math.round(totalPrice * 1.8 / 100) * 100 - 1);
  }, [selectedModuleIds, totalPrice]);

  const discountPercent = useMemo(() => {
    if (totalMrp <= totalPrice) return 0;
    return Math.round(((totalMrp - totalPrice) / totalMrp) * 100);
  }, [totalPrice, totalMrp]);

  // Handle Pincode Check
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.length < 6) {
      setPincodeMessage('Please enter a valid 6-digit Indian PIN code');
      return;
    }
    setPincodeMessage(`Delivery to ${pincode}: Dispatch within 2-4 business days. Free express delivery available for ${currentCar.name}.`);
  };

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
    <div className="w-full min-h-screen bg-white text-[#1d1d1f] font-sans antialiased selection:bg-[#20a87e] selection:text-white">
      
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:top-6 md:right-6 z-50 bg-[#20a87e] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-fade-in text-sm font-semibold">
          <Check className="w-4 h-4 text-white" />
          <span>Added Car Combo to your bag!</span>
          <button 
            onClick={() => navigate('/cart')}
            className="ml-2 text-xs uppercase tracking-wider font-bold underline bg-white/20 px-2 py-0.5 rounded"
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
        <div className={`w-full lg:w-1/2 sticky top-0 h-[32vh] sm:h-[38vh] lg:h-screen bg-white border-b lg:border-b-0 lg:border-r border-[#EEEEEE] flex flex-col items-center justify-center z-20 overflow-hidden p-0 m-0 relative transition-all duration-500 ease-in-out ${
          shouldHideTopImage 
            ? '-translate-y-full opacity-0 pointer-events-none' 
            : 'translate-y-0 opacity-100'
        }`}>
          
          {/* Top Bar with Native Back, Share & Cart (Absolute Overlay) */}
          <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 sm:px-6 pt-2 sm:pt-4 z-30 pointer-events-auto">
            {/* Back button */}
            <button 
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 text-[#1d1d1f] hover:opacity-70 transition flex items-center justify-center focus:outline-none"
              title="Go back"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
            </button>

            {/* Right icons */}
            <div className="flex items-center gap-3.5 sm:gap-5 text-[#1d1d1f]">
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
                className="p-1 hover:opacity-70 transition focus:outline-none"
                title="Share"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="p-1 relative hover:opacity-70 transition focus:outline-none"
                title="Bag"
                aria-label="Cart Bag"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#0d8c66] text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Product Image Stage (Top image with all_in_1combo.png, 0 padding in div) */}
          <div className="relative w-full h-full flex items-center justify-center p-0 m-0 overflow-hidden bg-white">
            <img 
              src={allInOneComboImg}
              alt="Car Combo – 25W Wireless Charger | Charging Pad + 3 Stands"
              className="w-full h-full object-contain filter drop-shadow-md select-none p-0 m-0 block transition-all duration-300"
            />

            {/* "See it in action" Active Wireless Charging Glow & Pulse */}
            {seeInAction && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="w-36 sm:w-52 h-36 sm:h-52 rounded-full border-2 border-[#0d8c66] animate-ping opacity-60" />
                <span className="absolute w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#0d8c66]/20 backdrop-blur-xs border border-[#0d8c66] flex items-center justify-center text-white shadow-lg">
                  <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-[#0d8c66] fill-[#0d8c66]" />
                </span>
              </div>
            )}

            {/* Status pill on stage when "See it in action" is active */}
            {seeInAction && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-[#1d1d1f]/90 backdrop-blur text-white px-3 py-1 sm:px-4 sm:py-1.5 rounded-full flex items-center gap-2 shadow-2xl text-[10px] sm:text-xs font-bold tracking-wider uppercase z-30">
                <span className="w-2 h-2 rounded-full bg-[#0d8c66] animate-pulse" />
                <span>25W Qi2 MagSafe Active · {currentCar.name}</span>
              </div>
            )}
          </div>

          {/* Bottom "See it in action" Floating Toggle (Absolute Overlay) */}
          <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
            <div className="bg-white/95 backdrop-blur shadow-sm border border-gray-200/80 px-2.5 py-1 rounded-full flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-[#0d8c66]" />
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider text-[#1d1d1f] uppercase">
                See it in action
              </span>
              <button
                type="button"
                onClick={() => setSeeInAction(!seeInAction)}
                className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                  seeInAction ? 'bg-[#0d8c66]' : 'bg-[#d1d5db]'
                }`}
                title="Toggle charging & illumination mode"
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    seeInAction ? 'translate-x-3.5' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BOTTOM / RIGHT: CONFIGURATOR CONTROLS & SELECTION         */}
        {/* ======================================================== */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-3 sm:px-6 lg:px-10 pt-3 sm:pt-5 pb-20 sm:pb-24 lg:pb-8 bg-white">
          <div className="max-w-[620px] mx-auto w-full space-y-3 sm:space-y-4">
            
            {/* Header: Title & Pricing (Compact typography & spacing, unbolded title) */}
            <div className="border-b border-gray-100 pb-2 sm:pb-3">
              <h1 className="text-base sm:text-lg md:text-xl font-normal text-[#1d1d1f] tracking-tight uppercase leading-tight my-1">
                Car Combo – 25W Wireless Charger | Charging Pad + 3 Stands
              </h1>
              
              {/* Pricing Row - Tightly stacked */}
              <div className="mt-1 flex items-baseline gap-2 flex-wrap">
                <span className="text-xl sm:text-2xl font-extrabold text-[#1d1d1f] tracking-tight leading-none">
                  ₹{totalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 line-through font-normal">
                  ₹{totalMrp.toLocaleString('en-IN')}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[10px] sm:text-xs font-bold text-[#0d8c66] bg-emerald-50 px-1.5 py-0.5 rounded leading-none">
                    {discountPercent}% OFF
                  </span>
                )}
                <span className="text-[10px] text-gray-400 font-medium ml-1">
                  (Incl. all taxes)
                </span>
              </div>
            </div>

            {/* SELECT CAR NAME (Reduced size to 3/4 height, width 124px so 3rd div peeks in, no brand badge, no tray fit text) */}
            <section className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-900 my-0">
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
                        className={`cursor-pointer shrink-0 snap-start w-[124px] min-w-[124px] h-[102px] rounded-[6px] p-2 flex flex-col justify-between bg-white relative select-none text-left transition-all ${
                          isSelected 
                            ? 'border-[1.5px] border-[#0d8c66] bg-emerald-50/15 shadow-2xs' 
                            : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
                        }`}
                      >
                        {/* Status Checkmark */}
                        <div className="flex items-center justify-between w-full">
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isSelected ? 'bg-[#0d8c66] text-white shadow-2xs' : 'border border-gray-300 bg-gray-50'
                          }`}>
                            {isSelected ? (
                              <Check className="w-2 h-2 stroke-[3]" />
                            ) : (
                              <div className="w-1 h-1 rounded-full bg-transparent" />
                            )}
                          </div>
                        </div>

                        {/* Title Text: Car Brand & Model */}
                        <div className="flex flex-col min-w-0 my-0.5">
                          <span className="text-[10.5px] font-normal text-gray-500 leading-tight truncate">
                            {car.brand}
                          </span>
                          <span className="text-[12px] font-bold text-gray-900 leading-tight truncate">
                            {car.name}
                          </span>
                        </div>

                        {/* Price Text: Font size 12px bold, strikethrough 10px */}
                        <div className="flex items-baseline gap-1 pt-1 border-t border-gray-100 w-full">
                          <span className="text-[12px] font-bold text-gray-900 leading-none">
                            ₹550
                          </span>
                          <span className="text-[10px] text-gray-400 line-through leading-none">
                            ₹999
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SELECT MODULES (Dimensionality: Full-width stack ~328px-340px, height 110px-115px, thumbnail 85x85, right ~220px, 14px medium, 13px bold, 28x72 pill #0d8c66) */}
            <section className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#1d1d1f] my-0">
                  Select Modules
                </h2>
                <span className="text-[11px] sm:text-xs font-semibold text-gray-500">
                  {selectedModuleIds.length} of {MODULE_OPTIONS.length} Added
                </span>
              </div>

              {/* Module Cards Stack (Vertical Stack Row) */}
              <div className="flex flex-col space-y-2.5 sm:space-y-3">
                {MODULE_OPTIONS.map(mod => {
                  const isSelected = selectedModuleIds.includes(mod.id);

                  return (
                    <div
                      key={mod.id}
                      className={`w-full max-w-[340px] sm:max-w-none h-[112px] min-h-[110px] max-h-[115px] p-2.5 sm:p-3 rounded-lg border transition-all bg-white shadow-2xs flex items-center justify-between mx-auto sm:mx-0 ${
                        isSelected 
                          ? 'border-[1.5px] border-[#0d8c66] bg-emerald-50/15 ring-1 ring-[#0d8c66]/20' 
                          : 'border border-gray-200 hover:border-gray-300 hover:bg-gray-50/40'
                      }`}
                    >
                      {/* Internal Grid (Horizontal Split) */}
                      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0 h-full">
                        
                        {/* Left Thumbnail Box: Width 85px, Height 85px (Square grey background box #f7f7f7) */}
                        <div 
                          onClick={() => {
                            setActiveModalModule(mod);
                            setActiveModalImageIdx(0);
                          }}
                          className="w-[85px] h-[85px] min-w-[85px] rounded-md bg-[#f7f7f7] border border-gray-100 flex items-center justify-center p-1 cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
                          title="Click to view full module details"
                        >
                          <img 
                            src={mod.thumbImg} 
                            alt={mod.name}
                            className="max-h-[72px] max-w-[72px] w-auto h-auto object-contain"
                          />
                        </div>

                        {/* Right Content Area: Width ~220px */}
                        <div className="w-[220px] max-w-[220px] sm:max-w-none flex-1 min-w-0 flex flex-col justify-between h-[85px] py-0.5">
                          {/* Title Text: Font size 14px medium, line height 1.2 */}
                          <div>
                            <p 
                              onClick={() => {
                                setActiveModalModule(mod);
                                setActiveModalImageIdx(0);
                              }}
                              className="text-[14px] font-medium leading-[1.2] text-gray-900 line-clamp-2 cursor-pointer hover:underline"
                            >
                              {mod.name}
                            </p>
                            
                            {/* "View more" link: Font size 11px, underline */}
                            <button
                              type="button"
                              onClick={() => {
                                setActiveModalModule(mod);
                                setActiveModalImageIdx(0);
                              }}
                              className="text-[11px] text-gray-500 hover:text-gray-900 underline font-normal leading-tight pt-0.5 block text-left"
                            >
                              View more
                            </button>
                          </div>

                          {/* Price & Action Area: Price: 13px bold, Action Button: Height 28px, Width 72px, Border Radius 8px, Background #0d8c66 */}
                          <div className="flex items-center justify-between gap-1 mt-auto pt-1">
                            <div className="flex items-baseline gap-1">
                              <span className="text-[13px] font-bold text-gray-900 leading-none">
                                ₹{mod.price.toLocaleString('en-IN')}
                              </span>
                              <span className="text-[10px] text-gray-400 line-through leading-none">
                                ₹{mod.mrp.toLocaleString('en-IN')}
                              </span>
                            </div>

                            {/* Action Button (REMOVE / + ADD) */}
                            {isSelected ? (
                              <button
                                type="button"
                                onClick={() => handleToggleModule(mod.id)}
                                className="h-[28px] w-[72px] min-w-[72px] rounded-[8px] bg-[#0d8c66] hover:bg-[#0b7857] text-white text-[10px] font-bold uppercase tracking-wider flex items-center justify-center transition shadow-2xs cursor-pointer"
                                title="Remove module"
                              >
                                REMOVE
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleToggleModule(mod.id)}
                                className="h-[28px] w-[72px] min-w-[72px] rounded-[8px] border border-[#0d8c66] text-[#0d8c66] bg-white hover:bg-emerald-50 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center transition cursor-pointer"
                                title="Add module"
                              >
                                + ADD
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>



            {/* ======================================================== */}
            {/* DELIVERY PINCODE CHECKER                                  */}
            {/* ======================================================== */}
            <div className="border border-gray-200 rounded-lg p-3 sm:p-3.5 bg-white space-y-2 mt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-800">
                <Truck className="w-4 h-4 text-gray-600" />
                <span>Check Delivery Date & COD</span>
              </div>
              
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-md focus:outline-none focus:border-[#20a87e]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-gray-800 transition"
                >
                  CHECK
                </button>
              </form>

              {pincodeMessage && (
                <div className="flex items-start gap-1.5 pt-0.5 text-xs text-[#20a87e] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <p>{pincodeMessage}</p>
                </div>
              )}
            </div>

            {/* Desktop-only Add to Cart Button */}
            <div className="hidden lg:block pt-1.5">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full h-[48px] bg-[#20a87e] hover:bg-[#1b936e] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded-md shadow-sm flex items-center justify-center gap-2 transition"
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
              <div className="border-b border-gray-100 pb-2.5">
                <button
                  type="button"
                  onClick={() => setOpenSpecs(!openSpecs)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-900 py-1"
                >
                  <span>Specifications & Box Contents</span>
                  {openSpecs ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                </button>

                {openSpecs && (
                  <div className="mt-2 text-xs sm:text-[13px] text-gray-600 space-y-3 leading-relaxed">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1.5">
                        Technical Specifications
                      </h4>
                      <div className="border border-gray-200 rounded-md divide-y divide-gray-100 overflow-hidden bg-gray-50/50">
                        {TECHNICAL_SPECS.map((spec, sIdx) => (
                          <div key={sIdx} className="grid grid-cols-2 p-2 text-[11px] sm:text-xs">
                            <span className="font-semibold text-gray-700">{spec.label}</span>
                            <span className="text-gray-900">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1.5">
                        What’s in the Box
                      </h4>
                      <ul className="space-y-1 list-disc pl-4 text-xs">
                        {WHATS_IN_THE_BOX.map((item, bIdx) => (
                          <li key={bIdx} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. Delivery Time & Returns Accordion */}
              <div className="border-b border-gray-100 pb-2.5">
                <button
                  type="button"
                  onClick={() => setOpenDelivery(!openDelivery)}
                  className="w-full flex items-center justify-between text-left text-xs sm:text-[13px] font-bold uppercase tracking-wider text-gray-900 py-1"
                >
                  <span>Delivery Time & Returns</span>
                  {openDelivery ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
                </button>

                {openDelivery && (
                  <div className="mt-2 text-xs sm:text-[13px] text-gray-600 space-y-2.5 leading-relaxed">
                    <div>
                      <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider">DELIVERY</h5>
                      <p>Will be Dispatched in 4-5 days.</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider">FREE SHIPPING</h5>
                      <p>Free shipping on orders above ₹1199. A charge of ₹79 is applied to all orders of ₹1199 and below.</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider">CASH ON DELIVERY</h5>
                      <p>₹99 extra charges for all Cash On Delivery orders.</p>
                    </div>

                    <div>
                      <h5 className="font-bold text-gray-900 text-xs uppercase tracking-wider">RETURNS</h5>
                      <p>2-year replacement for manufacturing or functionality defects.</p>
                      <p className="mt-1">
                        For more information, check out our{' '}
                        <span className="text-[#20a87e] underline cursor-pointer font-medium">Shipping Policy Page</span>{' '}
                        and{' '}
                        <span className="text-[#20a87e] underline cursor-pointer font-medium">Return and Exchange Policy</span>{' '}
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
            <div className="bg-[#F8F8F8] border border-gray-200/80 rounded-lg p-3 my-2">
              <div className="grid grid-cols-3 gap-2 text-center divide-x divide-gray-200">
                <div className="flex flex-col items-center justify-center p-1 space-y-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/60 flex items-center justify-center text-[#20a87e]">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">
                    Quick Delivery
                  </span>
                  <span className="text-[9px] text-gray-500 leading-tight">
                    2-4 Day Dispatch
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-1 space-y-1 pl-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/60 flex items-center justify-center text-[#20a87e]">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">
                    Easy Returns
                  </span>
                  <span className="text-[9px] text-gray-500 leading-tight">
                    2-Yr Replacement
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center p-1 space-y-1 pl-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100/60 flex items-center justify-center text-[#20a87e]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-900 leading-tight">
                    Quality Assured
                  </span>
                  <span className="text-[9px] text-gray-500 leading-tight">
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
              className="w-screen relative left-1/2 -translate-x-1/2 my-4 bg-black overflow-hidden shadow-sm select-none"
            >
              {!videoError ? (
                <div className="relative w-full bg-black flex flex-col items-center justify-center">
                  <video
                    key={videoUrl}
                    className="w-full h-auto max-h-[85vh] min-h-[220px] object-cover sm:object-contain mx-auto block bg-black"
                    autoPlay
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
                <div className="w-full py-12 px-4 bg-gradient-to-b from-gray-900 to-black text-white text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                    <Video className="w-7 h-7" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    Car Combo – 25W Fast Wireless Charger in Action
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                    Place your video file in the codebase at:{' '}
                    <code className="bg-white/10 text-emerald-300 px-2 py-0.5 rounded font-mono text-[11px] sm:text-xs">
                      public/videos/car-combo-video.mp4
                    </code>
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#20a87e] hover:bg-[#1b936e] text-white text-xs font-bold uppercase tracking-wider rounded-md transition shadow mt-2">
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

            {/* ======================================================== */}
            {/* FREQUENTLY ASKED QUESTIONS (NOW POSITIONED BELOW VIDEO)  */}
            {/* ======================================================== */}
            <section className="pt-4 pb-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm sm:text-base font-bold text-gray-900 tracking-tight my-0">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="divide-y divide-gray-100 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-2xs">
                {(showAllFaqs ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 5)).map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="transition-colors">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between text-left p-3 sm:p-3.5 hover:bg-gray-50/70 transition cursor-pointer"
                      >
                        <span className="text-xs sm:text-[13px] font-semibold text-gray-900 pr-2">
                          {faq.q}
                        </span>
                        <span className="shrink-0 text-gray-500">
                          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-3 pb-3 sm:px-3.5 sm:pb-3.5 pt-0 text-xs text-gray-600 leading-relaxed border-t border-gray-50">
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
                className="mt-2.5 w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-[46px] bg-[#20a87e] hover:bg-[#1b936e] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition shadow"
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
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActiveModalModule(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 z-10 transition"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image Carousel */}
            <div className="bg-[#F8F8F8] p-4 flex flex-col items-center justify-center border-b border-gray-100">
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
                      className={`w-12 h-12 rounded border p-0.5 bg-white shrink-0 overflow-hidden ${
                        activeModalImageIdx === idx ? 'border-[#20a87e] ring-2 ring-[#20a87e]/20' : 'border-gray-200 opacity-60'
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
                <h3 className="text-lg font-bold text-gray-900">
                  {activeModalModule.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-lg font-bold text-[#1d1d1f]">
                    ₹{activeModalModule.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹{activeModalModule.mrp.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                {activeModalModule.description}
              </p>

              {/* Key Features */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                  Key Highlights
                </h4>
                <ul className="space-y-1.5">
                  {activeModalModule.features.map((feat, fIdx) => (
                    <li key={fIdx} className="text-xs text-gray-600 flex items-start gap-2">
                      <span className="text-[#20a87e] font-bold">✓</span>
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
                  className="w-full py-3 bg-[#20a87e] hover:bg-[#1b936e] text-white font-bold text-xs uppercase tracking-wider rounded transition"
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
