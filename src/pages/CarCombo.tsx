import { useState } from 'react';
import { 
  Zap, 
  Shield, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  ShoppingBag, 
  ArrowRight, 
  Copy, 
  CheckCheck, 
  Maximize2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Info, 
  Layers, 
  PackageCheck 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { addToCart, setAppliedCoupon } from '../lib/cart';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import combinedImg from '../assets/images/3in1 copy.webp';
import universalPadImg from '../assets/images/Universal_.webp';

interface ModuleInfo {
  id: string;
  name: string;
  location: string;
  reg: number;
  description: string;
  image: string;
}

const carModules: ModuleInfo[] = [
  { 
    id: 'pad', 
    name: 'Car Console Charging Pad Base', 
    location: 'Console Tray', 
    reg: 499, 
    description: 'Custom-fit console tray charger with high-friction silicone and direct OEM fit',
    image: centerMountImg
  },
  { 
    id: 'vent', 
    name: 'Air Vent 360° Steel-Core Clip Mount', 
    location: 'Dashboard AC Vents', 
    reg: 499, 
    description: 'Lockable steel-core clamping arm for horizontal and vertical louvers without falling',
    image: airVentImg
  },
  { 
    id: 'rear', 
    name: 'Rear Seat Headrest Dual-Post Clamp', 
    location: 'Backseat Passengers', 
    reg: 599, 
    description: 'Extends 25W magnetic wireless charging and hands-free video viewing to back row',
    image: headrestMountImg
  },
];

export default function CarCombo() {
  const { isSoldOut } = useInventory();
  const comboSoldOut = isSoldOut('car-combo');
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showMoreCabinOffer, setShowMoreCabinOffer] = useState(false);

  // Accordion dropdown states
  const [openAboutThisItem, setOpenAboutThisItem] = useState(true);
  const [openSpecifications, setOpenSpecifications] = useState(false);
  const [openWarranty, setOpenWarranty] = useState(false);
  const [openAdditionalDetails, setOpenAdditionalDetails] = useState(false);

  const totalReg = 3696;
  const totalComboPrice = 2048;
  const totalSavings = totalReg - totalComboPrice;

  const galleryImages = [
    { src: combinedImg, label: '3-in-1 Complete Car Station' },
    { src: airVentImg, label: 'Air Vent 360° Steel Clamp' },
    { src: centerMountImg, label: 'Console Charging Pad' },
    { src: headrestMountImg, label: 'Rear Headrest Dual-Post' },
    { src: universalPadImg, label: 'Universal Magnetic Base' }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: 'car-combo',
        name: 'Qicdock 25W Qi2 MagSafe Car Wireless Charger Combo',
        variant: 'Complete Kit (All 3 Modules Included)',
        price: totalComboPrice,
        originalPrice: totalReg,
        image: galleryImages[0].src
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleCopyCoupon = (code: string) => {
    setAppliedCoupon(code);
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] py-2 sm:py-4 px-3 sm:px-4 max-w-[1360px] mx-auto">
      
      {/* Compact Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-600 mb-2 leading-tight flex-wrap">
        <Link to="/" className="hover:text-[#0A1E3F] transition-colors">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/category" className="hover:text-[#0A1E3F] transition-colors">Categories</Link>
        <span className="text-gray-400">/</span>
        <Link to="/category/vehicle-specific" className="hover:text-[#0A1E3F] transition-colors">Car Docks</Link>
        <span className="text-gray-400">/</span>
        <span className="text-[#0A1E3F] font-bold truncate max-w-[220px] sm:max-w-none">Car Combo</span>
      </nav>

      {/* SINGLE UNIFIED PRODUCT CONTAINER */}
      <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-3 sm:p-5 shadow-sm space-y-3 sm:space-y-4">
        
        {/* Top Header Badge, Product Title & Expandable Subtitle */}
        <div className="space-y-1">
          <div>
            <span className="px-2 py-0.5 rounded bg-[#0A1E3F] text-[#FAF7F0] text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5">
              <Zap className="w-3 h-3 fill-current text-cyan-400" /> 3 in 1 Car combo
            </span>
          </div>

          <h1 className="text-base sm:text-lg md:text-xl font-bold text-[#0A1E3F] leading-tight tracking-tight mt-1">
            Qicdock 25W Qi2 MagSafe Car Wireless Charger Combo
          </h1>

          <div className="text-xs sm:text-[13px] text-gray-700 leading-relaxed">
            {!showMoreCabinOffer ? (
              <p>
                <span className="font-semibold text-gray-800">Complete Cabin Station:</span> Air Vent 360° Mount + Silicone{' '}
                <button
                  onClick={() => setShowMoreCabinOffer(true)}
                  className="font-bold text-[#0A1E3F] hover:underline inline-flex items-center gap-0.5 ml-1 cursor-pointer"
                >
                  <span>...more</span>
                </button>
              </p>
            ) : (
              <div className="bg-[#F4F0E6] border border-[#E2DAC8] rounded-lg p-2.5 sm:p-3 space-y-1.5 mt-1 transition-all">
                <p className="font-medium text-gray-800 text-xs sm:text-[13px]">
                  <strong>Complete Cabin Station:</strong> Air Vent 360° Mount + Silicone Console Pad + Rear Headrest Mount + 60W Braided Type-C Fast Cable.
                </p>
                <div className="pt-1 border-t border-[#E2DAC8] text-xs space-y-1 text-gray-700">
                  <p className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Special Combo Offer: Save ₹1,648 instantly vs buying components separately!</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#0A1E3F] shrink-0" />
                    <span>Includes direct OEM fitment for both front dash and backseat passenger setups.</span>
                  </p>
                </div>
                <button
                  onClick={() => setShowMoreCabinOffer(false)}
                  className="text-xs font-bold text-[#0A1E3F] hover:underline block pt-0.5 cursor-pointer"
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2-Column Responsive Section for Image Gallery & Highlights on Left, Pricing & Actions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
          
          {/* Left Column: Image Stage & Thumbnails & Top Highlights */}
          <div className="lg:col-span-6 space-y-3">
            
            {/* Main Image Stage */}
            <div className="w-full h-60 sm:h-72 md:h-[340px] relative rounded-lg bg-[#F4F0E6] border border-[#E2DAC8] flex items-center justify-center overflow-hidden group">
              <img 
                src={galleryImages[activeImageIndex].src} 
                alt="Qicdock 25W Qi2 MagSafe Car Wireless Charger Combo" 
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105 select-none" 
              />

              <button
                onClick={() => setIsFullscreen(true)}
                className="absolute bottom-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded backdrop-blur-md transition-all cursor-pointer"
                title="View full size"
                aria-label="View Full Size"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Horizontally Scrollable Thumbnails */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded border p-0.5 bg-[#F4F0E6] flex items-center justify-center overflow-hidden transition-all cursor-pointer ${
                    activeImageIndex === i 
                      ? 'border-[#0A1E3F] shadow-sm' 
                      : 'border-[#E2DAC8] opacity-70 hover:opacity-100 hover:border-[#0A1E3F]/40'
                  }`}
                  aria-label={`View ${img.label}`}
                >
                  <img 
                    src={img.src} 
                    alt={img.label} 
                    loading="lazy" 
                    decoding="async" 
                    className="w-full h-full object-contain" 
                  />
                </button>
              ))}
            </div>

            {/* Top Highlights (Directly Below Image) */}
            <div className="bg-[#F4F0E6] border border-[#E2DAC8] rounded-lg p-3 space-y-1.5">
              <h3 className="font-extrabold text-[#0A1E3F] uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0A1E3F]" />
                Top Highlights
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-800 font-medium">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F] mt-1.5 shrink-0" />
                  <span>One charger, three stands for every car position.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F] mt-1.5 shrink-0" />
                  <span>Magnetic alignment, keep phone secure while driving.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F] mt-1.5 shrink-0" />
                  <span>Rear passengers get their own charging spot.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Pricing, Checkout & Modules Manifest */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Pricing Block */}
            <div className="space-y-2.5 pb-3 border-b border-[#E2DAC8]">
              <div className="flex items-baseline flex-wrap gap-2">
                <span className="text-red-600 text-xl sm:text-2xl font-bold">-45%</span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#0A1E3F] tracking-tight">
                  ₹{totalComboPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-500 text-xs">
                  M.R.P.: <span className="line-through">₹{totalReg.toLocaleString('en-IN')}</span>
                </span>
              </div>

              <p className="text-[10.5px] sm:text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded inline-block">
                Inclusive of all taxes · Save ₹{totalSavings.toLocaleString('en-IN')} on this complete bundle
              </p>

              {/* Coupon Row */}
              <div className="border border-dashed border-[#0A1E3F] bg-[#F4F0E6] rounded-lg p-2 flex items-center justify-between gap-2">
                <div className="text-xs">
                  <span className="font-bold text-[#0A1E3F]">Coupon Offer: </span>
                  <span className="text-gray-700">Code <strong className="text-[#0A1E3F]">QIC100</strong> for ₹100 instant discount</span>
                </div>
                <button
                  onClick={() => handleCopyCoupon('QIC100')}
                  className="shrink-0 bg-[#0A1E3F] hover:bg-[#152B52] text-[#FAF7F0] text-[10px] font-bold px-2 py-1 rounded transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedCoupon ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCoupon ? 'Applied' : 'Apply'}</span>
                </button>
              </div>

              {/* In Stock Notice */}
              <div className="text-xs text-gray-700 flex items-center justify-between pt-0.5">
                <span className="text-emerald-700 font-bold">✓ In Stock</span>
                <span className="text-gray-500 text-[10px]">Free express delivery in 2-4 days</span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleAddToCart}
                  disabled={comboSoldOut}
                  className={`flex-1 font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm ${
                    comboSoldOut
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : addedToCart
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#0A1E3F] hover:bg-[#152B52] text-[#FAF7F0] cursor-pointer'
                  }`}
                >
                  {addedToCart ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (₹{totalComboPrice.toLocaleString('en-IN')})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={comboSoldOut}
                  className="flex-1 bg-transparent hover:bg-white text-[#0A1E3F] border-2 border-[#0A1E3F] font-bold text-xs sm:text-sm uppercase tracking-wider py-3 px-3 rounded-lg transition-all flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Included Mounting Modules */}
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1E3F]">
                    Included in This Combo (3 Modules + Accessories)
                  </h2>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  All Included
                </span>
              </div>

              <div className="space-y-1.5">
                {carModules.map((addon, index) => (
                  <div
                    key={addon.id}
                    className="p-2 rounded-lg border border-[#E2DAC8] bg-[#F4F0E6] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-5 h-5 rounded-full bg-[#0A1E3F] text-[#FAF7F0] flex items-center justify-center text-[9px] font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="text-xs font-bold text-[#0A1E3F]">{addon.name}</h3>
                          <span className="text-[9px] font-semibold px-1 py-0.2 rounded bg-[#0A1E3F]/10 text-[#0A1E3F]">
                            {addon.location}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-600 line-clamp-1">
                          {addon.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-gray-400 line-through text-[9.5px] block">
                        ₹{addon.reg}
                      </span>
                      <span className="font-bold text-xs text-emerald-700">
                        Included
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F4F0E6] p-2 rounded-lg flex items-center gap-2 text-[10.5px] text-gray-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>Plus 1.5m braided 60W Type-C fast cable + cable management clips included.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Amazon Collapsible Accordion Dropdowns Section */}
        <div className="space-y-3 pt-4 border-t border-[#E2DAC8]">
          
          {/* Dropdown 1: About This Item */}
          <div className="border border-[#E2DAC8] rounded-xl overflow-hidden bg-[#F4F0E6]/60">
            <button
              onClick={() => setOpenAboutThisItem(!openAboutThisItem)}
              className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-[#F4F0E6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#0A1E3F]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1E3F]">
                  About This Item
                </h2>
              </div>
              <div className="p-1 rounded bg-[#0A1E3F]/10 text-[#0A1E3F]">
                {openAboutThisItem ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openAboutThisItem && (
              <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-[#E2DAC8]/70 space-y-2.5 text-xs text-gray-700 leading-relaxed">
                <ul className="space-y-2 list-disc list-outside pl-4">
                  <li>
                    <strong>25W Qi2 Fast Wireless Output:</strong> Next-gen Qi2 power core equipped with 16x N52 neodymium magnets for ultra-fast, efficient charging of iPhone 16/15/14/13/12 and Qi2-enabled Android devices.
                  </li>
                  <li>
                    <strong>3-in-1 Cabin Ecosystem:</strong> Switch seamlessly between dashboard console tray, 360° rotating AC air vent louver clamp, and backseat passenger headrest clamp.
                  </li>
                  <li>
                    <strong>Anti-Drop Magnetic Stability:</strong> Industrial 1200gf magnetic lock withstands sudden braking, potholes, sharp turns, and uneven roads without phone displacement.
                  </li>
                  <li>
                    <strong>Active Thermal Heat Dissipation:</strong> CNC machined aluminum heat sink prevents thermal throttling, maintaining optimal battery health during long navigation journeys.
                  </li>
                  <li>
                    <strong>Zero Wire Splicing & Plug-and-Play:</strong> 100% plug & play via 12V lighter socket or Type-C PD port with included 60W nylon braided cable.
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Dropdown 2: Specifications & Technical Details */}
          <div className="border border-[#E2DAC8] rounded-xl overflow-hidden bg-[#F4F0E6]/60">
            <button
              onClick={() => setOpenSpecifications(!openSpecifications)}
              className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-[#F4F0E6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0A1E3F]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1E3F]">
                  Product Specifications & Technical Details
                </h2>
              </div>
              <div className="p-1 rounded bg-[#0A1E3F]/10 text-[#0A1E3F]">
                {openSpecifications ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openSpecifications && (
              <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-[#E2DAC8]/70 space-y-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-gray-700">
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Brand</span>
                    <span className="text-[#0A1E3F] font-bold">QicDock Official</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Model Number</span>
                    <span className="text-[#0A1E3F] font-bold">QD-CAR-25W-MAGSAFE-COMBO</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Output Protocol</span>
                    <span className="text-[#0A1E3F] font-bold">25W Qi2 / MagSafe (15W / 10W / 7.5W)</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Input Power</span>
                    <span className="text-[#0A1E3F] font-bold">USB-C PD 9V/3A, 12V/2.5A (Max 30W)</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Magnetic Force</span>
                    <span className="text-[#0A1E3F] font-bold">1200gf (16x N52 Neodymium Magnets)</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Material Grade</span>
                    <span className="text-[#0A1E3F] font-bold">Aerospace Aluminum + Liquid Silicone</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Rotation</span>
                    <span className="text-[#0A1E3F] font-bold">360° Full Pivot Multi-Angle Ball Joint</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Weight & Size</span>
                    <span className="text-[#0A1E3F] font-bold">145g | 88 × 64 × 14 mm</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 3: Warranty & Support Details */}
          <div className="border border-[#E2DAC8] rounded-xl overflow-hidden bg-[#F4F0E6]/60">
            <button
              onClick={() => setOpenWarranty(!openWarranty)}
              className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-[#F4F0E6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0A1E3F]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1E3F]">
                  Warranty & Support Details
                </h2>
              </div>
              <div className="p-1 rounded bg-[#0A1E3F]/10 text-[#0A1E3F]">
                {openWarranty ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openWarranty && (
              <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-[#E2DAC8]/70 space-y-2 text-xs text-gray-700 leading-relaxed">
                <div className="bg-[#FAF7F0] p-3 rounded-lg space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A1E3F] block">1-Year Direct Swap Brand Warranty:</strong>
                      <span>Covers magnetic charging module, ball-joints, clamps, and internal coils. Direct replacement sent to your doorstep.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-[#E2DAC8]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A1E3F] block">7-Day Hassle-Free Replacement:</strong>
                      <span>Eligible for instant replacement if any physical damage during transit or fitment incompatibility.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-[#E2DAC8]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#0A1E3F] block">Certifications & Safety:</strong>
                      <span>WPC Qi2 Certified, CE, FCC, RoHS certified with overcharge, over-current, and temperature surge protection.</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown 4: Additional Information */}
          <div className="border border-[#E2DAC8] rounded-xl overflow-hidden bg-[#F4F0E6]/60">
            <button
              onClick={() => setOpenAdditionalDetails(!openAdditionalDetails)}
              className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left hover:bg-[#F4F0E6] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <PackageCheck className="w-4 h-4 text-[#0A1E3F]" />
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0A1E3F]">
                  Additional Information & Box Inclusions
                </h2>
              </div>
              <div className="p-1 rounded bg-[#0A1E3F]/10 text-[#0A1E3F]">
                {openAdditionalDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {openAdditionalDetails && (
              <div className="px-3.5 sm:px-4 pb-4 pt-1 border-t border-[#E2DAC8]/70 space-y-2 text-xs text-gray-700 leading-relaxed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">ASIN</span>
                    <span className="text-[#0A1E3F] font-bold">B0HK4PC61X</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Country of Origin</span>
                    <span className="text-[#0A1E3F] font-bold">India</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Generic Name</span>
                    <span className="text-[#0A1E3F] font-bold">Magnetic Qi2 Wireless Car Kit</span>
                  </div>
                  <div className="bg-[#FAF7F0] p-2.5 rounded">
                    <span className="text-gray-500 block text-[9.5px] uppercase font-bold">Best Sellers Rank</span>
                    <span className="text-[#0A1E3F] font-bold">#1 in Car Wireless Charging Bundles</span>
                  </div>
                </div>

                <div className="bg-[#FAF7F0] p-3 rounded-lg mt-2">
                  <span className="text-[10px] uppercase font-bold text-gray-500 block mb-1">Package Contents:</span>
                  <ul className="text-xs space-y-1 list-disc list-outside pl-4 text-gray-800">
                    <li>1× 25W Qi2 MagSafe Wireless Charger Core Module</li>
                    <li>1× 360° Steel-Core Air Vent Clip Stand</li>
                    <li>1× Center Console Non-Slip Pad Base</li>
                    <li>1× Rear Seat Dual-Post Headrest Mount Clamp</li>
                    <li>1× 1.5m 60W Braided Type-C Fast Charging Cable</li>
                    <li>4× Self-Adhesive Cable Management Routing Clips</li>
                    <li>1× User Manual & 1-Year Warranty Card</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Customer Guarantees Footer Bar */}
        <div className="pt-4 border-t border-[#E2DAC8]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="flex flex-col items-center gap-1 p-2 bg-[#F4F0E6] rounded-lg">
              <Truck className="w-4 h-4 text-[#0A1E3F]" />
              <span className="text-[11.5px] font-bold text-[#0A1E3F]">Free Delivery</span>
              <span className="text-[10px] text-gray-500">2-4 Days India-wide</span>
            </div>

            <div className="flex flex-col items-center gap-1 p-2 bg-[#F4F0E6] rounded-lg">
              <Shield className="w-4 h-4 text-[#0A1E3F]" />
              <span className="text-[11.5px] font-bold text-[#0A1E3F]">1-Yr Warranty</span>
              <span className="text-[10px] text-gray-500">Direct Doorstep Swap</span>
            </div>

            <div className="flex flex-col items-center gap-1 p-2 bg-[#F4F0E6] rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-[#0A1E3F]" />
              <span className="text-[11.5px] font-bold text-[#0A1E3F]">100% Fitment</span>
              <span className="text-[10px] text-gray-500">All Car Models</span>
            </div>

            <div className="flex flex-col items-center gap-1 p-2 bg-[#F4F0E6] rounded-lg">
              <Zap className="w-4 h-4 text-[#0A1E3F]" />
              <span className="text-[11.5px] font-bold text-[#0A1E3F]">25W Qi2 Fast</span>
              <span className="text-[10px] text-gray-500">MagSafe Magnetic Lock</span>
            </div>
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button 
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <img 
            src={galleryImages[activeImageIndex].src} 
            alt="Qicdock Full View"
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}
