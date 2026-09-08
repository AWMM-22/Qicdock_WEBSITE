import { ShieldCheck, Wrench, Magnet, Layers, MonitorSmartphone, Car, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.png';
import leftMountImg from '../assets/images/m1.png';
import rightMountImg from '../assets/images/m3.png';
import combinedImg from '../assets/images/3in1 copy.png';

const categoriesData = [
  {
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
    badgeText: "COCKPIT READY",
    badgeIcon: Car,
    title: "CAR COMBO BUNDLE",
    subtitle: "Front & Rear Passenger Charging",
    description: "Tailored automotive bundle including center console pad, 360° air vent clip, and rear passenger headrest bracket.",
    price: "From ₹2,346",
    savings: "Save ₹650",
    image: centerMountImg,
    link: "/category/car-combo"
  },
  {
    badgeText: "WORKSTATION",
    badgeIcon: MonitorSmartphone,
    title: "HOME & OFFICE COMBO",
    subtitle: "Desk Stand & Wall Mount",
    description: "High-stability weighted aluminum desktop dock paired with an ultra-slim flush wall bracket for clutter-free charging.",
    price: "From ₹2,247",
    savings: "Save ₹450",
    image: rightMountImg,
    link: "/category/home-office"
  },
  {
    badgeText: "MODULAR SETUPS",
    badgeIcon: Magnet,
    title: "INDIVIDUAL CHARGERS",
    subtitle: "Single Environment Setups",
    description: "Select your dedicated 15W Qi2 charger pre-bundled with your preferred mounting base for car, table, or wall.",
    price: "From ₹2,098",
    savings: "Special Pricing",
    image: leftMountImg,
    link: "/category/individual"
  },
  {
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
    badgeText: "MODULAR EXPANSION",
    badgeIcon: Wrench,
    title: "STAND-ALONE MOUNTS",
    subtitle: "Bases & Additional Brackets",
    description: "Already own a Qicdock 15W magnetic core module? Expand your setup with standalone brackets and mounting bases.",
    price: "From ₹299",
    savings: "Add-on Pricing",
    image: rightMountImg,
    link: "/category/stand-alone"
  }
];

export default function CategoriesPage() {
  return (
    <div className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-10 bg-[#080808] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-[#04D9FF] flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#04D9FF] font-semibold">Categories</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-14 md:mb-16">
          <span className="text-[#04D9FF] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
            Automotive & Desk Charging Architecture
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-['Anton'] tracking-wide text-white uppercase">
            Shop By <span className="text-[#04D9FF]">Categories</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
            Choose from all-in-one multi-environment bundles, car-specific docks, or modular mounting accessories engineered with 15W fast wireless charging.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
          {categoriesData.map((cat, idx) => (
            <Link 
              to={cat.link} 
              key={idx} 
              className="bg-[#0c0c0c] border border-[#222] rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden relative group hover:border-[#04D9FF]/70 transition-all duration-300 flex flex-col justify-between p-3.5 sm:p-6 md:p-8 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(4,217,255,0.12)]"
            >
              {/* Background Glow on hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#04D9FF]/5 rounded-full blur-3xl group-hover:bg-[#04D9FF]/15 transition-all pointer-events-none"></div>

              {/* Top Row: Badge & Image Preview */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#04D9FF]/30 bg-[#04D9FF]/10 text-[#04D9FF] text-[11px] font-bold tracking-wider uppercase">
                    <cat.badgeIcon className="w-3.5 h-3.5" />
                    {cat.badgeText}
                  </span>
                  <span className="text-[11px] font-bold tracking-wider uppercase text-gray-400 group-hover:text-[#04D9FF] transition-colors">
                    {cat.savings}
                  </span>
                </div>

                {/* Product Image Stage */}
                <div className="w-full h-44 sm:h-52 bg-[#080808]/80 rounded-xl border border-[#1a1a1a] p-4 flex items-center justify-center mb-6 overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                  />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 flex flex-col flex-1 justify-between pt-2 border-t border-[#1a1a1a]">
                <div>
                  <p className="text-[#04D9FF] text-xs font-semibold tracking-wider uppercase mb-1">
                    {cat.subtitle}
                  </p>
                  <h2 className="text-2xl font-['Anton'] text-white uppercase tracking-wide group-hover:text-[#04D9FF] transition-colors mb-2">
                    {cat.title}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1a1a1a] mt-auto flex flex-col gap-3">
                  <div>
                    <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Starting at</span>
                    <span className="text-lg font-bold text-white tracking-wide">{cat.price}</span>
                  </div>
                  <span className="w-full text-center py-2.5 px-4 rounded-xl bg-[#04D9FF] hover:bg-[#3bf0ff] text-black font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(4,217,255,0.3)]">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-16 bg-[#0c0c0c] border border-[#222] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">
              Not sure which setup fits your vehicle?
            </h3>
            <p className="text-gray-400 text-sm">
              Use our interactive Vehicle Compatibility Engine to filter by your exact car make, model, and year.
            </p>
          </div>
          <Link
            to="/#compatibility"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-[#04D9FF] hover:bg-white text-[#080808] font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(4,217,255,0.3)]"
          >
            Launch Vehicle Engine
          </Link>
        </div>

      </div>
    </div>
  );
}
