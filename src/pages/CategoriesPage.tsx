import { ShieldCheck, Wrench, Magnet, Layers, MonitorSmartphone, Car, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.webp';
import airVentImg from '../assets/images/air_vent_mount.webp';
import headrestMountImg from '../assets/images/headrest_mount.webp';
import tableStandImg from '../assets/images/table_stand_mount.webp';
import wallStandImg from '../assets/images/wall_stand_mount.webp';
import combinedImg from '../assets/images/3in1 copy.webp';

const categoriesData = [
  {
    productId: "ultimate-kit",
    badgeText: "MOST POPULAR",
    badgeIcon: Layers,
    title: "ALL IN ONE COMBO",
    subtitle: "Car, Desk & Wall Ecosystem",
    description: "Complete modular charger solution for effortless transition between your vehicle cockpit, office desk, and bedside wall.",
    price: "From ₹2,594",
    savings: "Save ₹1,100",
    image: combinedImg,
    link: "/category/all-in-one"
  },
  {
    productId: "car-combo",
    badgeText: "COCKPIT READY",
    badgeIcon: Car,
    title: "CAR COMBO BUNDLE",
    subtitle: "Front & Rear Passenger Charging",
    description: "Tailored automotive bundle including center console pad, 360° air vent clip, and rear passenger headrest bracket.",
    price: "From ₹2,346",
    savings: "Save ₹650",
    image: airVentImg,
    link: "/category/car-combo"
  },
  {
    productId: "home-office-combo",
    badgeText: "WORKSTATION",
    badgeIcon: MonitorSmartphone,
    title: "HOME & OFFICE COMBO",
    subtitle: "Desk Stand & Wall Mount",
    description: "High-stability weighted aluminum desktop dock paired with an ultra-slim flush wall bracket for clutter-free charging.",
    price: "From ₹2,247",
    savings: "Save ₹450",
    image: tableStandImg,
    link: "/category/home-office"
  },
  {
    productId: "individual",
    badgeText: "MODULAR SETUPS",
    badgeIcon: Magnet,
    title: "INDIVIDUAL CHARGERS",
    subtitle: "Single Environment Setups",
    description: "Select your dedicated 25W Qi2 charger pre-bundled with your preferred mounting base for car, table, or wall.",
    price: "From ₹2,098",
    savings: "Special Pricing",
    image: headrestMountImg,
    link: "/category/individual"
  },
  {
    productId: "vehicle-specific",
    badgeText: "OEM INTEGRATION",
    badgeIcon: ShieldCheck,
    title: "VEHICLE SPECIFIC DOCKS",
    subtitle: "Precision Molded For Your Car",
    description: "Custom-fit wireless charging docks engineered specifically for Fronx, Baleno, Glanza, Ertiga, Swift, and more.",
    price: "₹2,098 Flat",
    savings: "100% Fit Guarantee",
    image: centerMountTransparentImg,
    link: "/category/vehicle-specific"
  },
  {
    productId: "stand-alone",
    badgeText: "MODULAR EXPANSION",
    badgeIcon: Wrench,
    title: "STAND-ALONE MOUNTS",
    subtitle: "Bases & Additional Brackets",
    description: "Already own a Qicdock 25W magnetic core module? Expand your setup with standalone brackets and mounting bases.",
    price: "From ₹299",
    savings: "Add-on Pricing",
    image: wallStandImg,
    link: "/category/stand-alone"
  }
];

export default function CategoriesPage() {
  const { isSoldOut } = useInventory();
  return (
    <div className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-10 bg-[#F4F0E6] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600">
          <Link to="/" className="hover:text-[#0A1E3F] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#0A1E3F] font-semibold">Categories</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-14 md:mb-16">
          <span className="text-[#0A1E3F] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
            Automotive & Desk Charging Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
            Shop By <span className="text-[#0A1E3F]">Categories</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Choose from all-in-one multi-environment bundles, car-specific docks, or modular mounting accessories engineered with 25W fast wireless charging.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {categoriesData.map((cat, idx) => {
            const soldOut = cat.productId ? isSoldOut(cat.productId) : false;
            return (
              <Link 
                to={cat.link} 
                key={idx} 
                className={`bg-[#FAF7F0] border-2 rounded-none overflow-hidden relative group transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg ${
                  soldOut ? 'border-red-300 opacity-90' : 'border-[#0A1E3F]/40 hover:border-[#0A1E3F]'
                }`}
              >
                {/* Product Image Stage (Edge-to-Edge) */}
                <div className="w-full h-48 sm:h-56 bg-transparent border-b border-[#E2DAC8] p-0 flex items-center justify-center overflow-hidden relative">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    loading="lazy"
                    decoding="async" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Badges overlay on image */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-none border border-[#0A1E3F]/30 bg-[#FAF7F0]/95 text-[#0A1E3F] text-[10px] font-bold tracking-wider uppercase backdrop-blur-sm shadow-sm">
                      <cat.badgeIcon className="w-3.5 h-3.5" />
                      {cat.badgeText}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    {soldOut ? (
                      <span className="text-[10px] font-bold tracking-wider uppercase text-red-700 bg-red-100 px-2 py-1 rounded-none border border-red-300">
                        Sold Out
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100/95 px-2 py-1 rounded-none border border-emerald-300 backdrop-blur-sm">
                        {cat.savings}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 flex flex-col flex-1 justify-between p-4 sm:p-6">
                  <div>
                    <p className="text-[#0A1E3F] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
                      {cat.subtitle}
                    </p>
                    <h2 className="text-base sm:text-xl font-['Anton'] text-[#0A1E3F] uppercase tracking-wide group-hover:text-[#152B52] transition-colors mb-2 leading-tight">
                      {cat.title}
                    </h2>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E2DAC8] mt-auto flex flex-col gap-2.5">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[10px] sm:text-xs text-gray-600 uppercase tracking-wider block">Starting at</span>
                      <span className="text-base sm:text-lg font-['Anton'] text-[#0A1E3F] tracking-wide">{cat.price}</span>
                    </div>
                    <span className={`w-full text-center py-2.5 px-4 rounded-none font-bold text-xs uppercase tracking-widest transition-all ${
                      soldOut 
                        ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                        : 'bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6]'
                    }`}>
                      {soldOut ? 'View (Sold Out)' : 'Explore'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 bg-[#FAF7F0] border-2 border-[#0A1E3F] rounded-none p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-['Anton'] text-[#0A1E3F] uppercase tracking-wide">
              Not sure which setup fits your vehicle?
            </h3>
            <p className="text-gray-600 text-sm">
              Use our interactive Vehicle Compatibility Engine to filter by your exact car make, model, and year.
            </p>
          </div>
          <Link
            to="/#compatibility"
            className="whitespace-nowrap px-6 py-3.5 rounded-none bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            Launch Vehicle Engine
          </Link>
        </div>

      </div>
    </div>
  );
}
