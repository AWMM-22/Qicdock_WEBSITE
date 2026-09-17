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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {categoriesData.map((cat, idx) => {
            const soldOut = cat.productId ? isSoldOut(cat.productId) : false;
            return (
              <Link 
                to={cat.link} 
                key={idx} 
                className={`bg-[#FAF7F0] border rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden relative group transition-all duration-300 flex flex-row lg:flex-col justify-between p-3 sm:p-6 md:p-8 hover:-translate-y-1 hover:shadow-md gap-3 sm:gap-0 ${
                  soldOut ? 'border-red-300 opacity-90' : 'border-[#0A1E3F]/30 hover:border-[#0A1E3F]/70'
                }`}
              >
                {/* Background Glow on hover */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A1E3F]/5 rounded-full blur-3xl group-hover:bg-[#0A1E3F]/15 transition-all pointer-events-none"></div>

                {/* Left/Top Row: Badge & Image Preview */}
                <div className="relative z-10 w-2/5 lg:w-full flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-1 sm:gap-2 mb-2 sm:mb-6 hidden lg:flex">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#0A1E3F]/30 bg-[#0A1E3F]/10 text-[#0A1E3F] text-[11px] font-bold tracking-wider uppercase">
                      <cat.badgeIcon className="w-3.5 h-3.5" />
                      {cat.badgeText}
                    </span>
                    {soldOut ? (
                      <span className="text-[11px] font-bold tracking-wider uppercase text-red-600 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                        Sold Out
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold tracking-wider uppercase text-gray-600 group-hover:text-[#0A1E3F] transition-colors self-end sm:self-auto">
                        {cat.savings}
                      </span>
                    )}
                  </div>

                  {/* Mobile-only badges (above image) */}
                  <div className="flex lg:hidden flex-col gap-1 mb-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[#0A1E3F]/30 bg-[#0A1E3F]/10 text-[#0A1E3F] text-[9px] font-bold tracking-wider uppercase self-start">
                      <cat.badgeIcon className="w-2.5 h-2.5" />
                      {cat.badgeText}
                    </span>
                  </div>

                  {/* Product Image Stage */}
                  <div className="w-full h-full lg:h-52 min-h-[110px] bg-[#F4F0E6]/80 rounded-xl border border-[#E2DAC8] p-2 flex items-center justify-center lg:mb-6 overflow-hidden flex-1 lg:flex-none">
                    <img 
                      src={cat.image} 
                      alt={cat.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" 
                    />
                  </div>
                </div>

                {/* Right/Bottom Content */}
                <div className="relative z-10 flex flex-col flex-1 justify-between pt-0 lg:pt-2 border-t-0 lg:border-t border-[#E2DAC8]">
                  <div>
                    <div className="flex justify-between items-start mb-0.5">
                      <p className="text-[#0A1E3F] text-[9px] lg:text-xs font-semibold tracking-wider uppercase">
                        {cat.subtitle}
                      </p>
                      <span className="lg:hidden text-[9px] font-bold tracking-wider uppercase text-[#22C55E] self-start mt-0.5">
                        {soldOut ? 'Sold Out' : cat.savings}
                      </span>
                    </div>
                    <h2 className="text-sm lg:text-2xl font-['Anton'] text-[#0A1E3F] uppercase tracking-wide group-hover:text-[#0A1E3F] transition-colors mb-1 lg:mb-2 leading-tight">
                      {cat.title}
                    </h2>
                    <p className="text-gray-600 text-[10px] lg:text-sm leading-relaxed mb-2 lg:mb-6 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-2 lg:pt-4 border-t border-[#E2DAC8] mt-auto flex flex-col gap-1.5 lg:gap-3">
                    <div className="flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start">
                      <span className="text-[9px] lg:text-[11px] text-gray-600 uppercase tracking-wider block">Starting at</span>
                      <span className="text-[11px] lg:text-lg font-bold text-[#0A1E3F] tracking-wide">{cat.price}</span>
                    </div>
                    <span className={`w-full text-center py-1.5 lg:py-2.5 px-2 lg:px-4 rounded-lg lg:rounded-xl font-bold text-[10px] lg:text-xs uppercase tracking-widest transition-all ${
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
        <div className="mt-16 bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-[#0A1E3F] uppercase tracking-wide">
              Not sure which setup fits your vehicle?
            </h3>
            <p className="text-gray-600 text-sm">
              Use our interactive Vehicle Compatibility Engine to filter by your exact car make, model, and year.
            </p>
          </div>
          <Link
            to="/#compatibility"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(4,217,255,0.3)]"
          >
            Launch Vehicle Engine
          </Link>
        </div>

      </div>
    </div>
  );
}
