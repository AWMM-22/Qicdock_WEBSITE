import { useState } from 'react';
import { Check, ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import rightMountImg from '../assets/images/right_car_mount_1788721169113.jpg';
import leftMountImg from '../assets/images/left_car_mount_1788721155876.jpg';

interface Addon {
  id: string;
  name: string;
  location: string;
  reg: number;
  add: number;
  description: string;
  image: string;
}

const carAddons: Addon[] = [
  { 
    id: 'pad', 
    name: 'Car Console Charging Pad', 
    location: 'Driver & Passenger Console', 
    reg: 299, 
    add: 99, 
    description: 'Direct console mat with high-grip silicone and cable groove',
    image: centerMountImg
  },
  { 
    id: 'vent', 
    name: 'Air Vent 360° Clip Holder', 
    location: 'Dashboard AC Vents', 
    reg: 299, 
    add: 99, 
    description: 'Firm clamping arm with steel core suitable for heavy braking',
    image: rightMountImg
  },
  { 
    id: 'rear', 
    name: 'Rear Seat Headrest Clamp', 
    location: 'Rear Row Passengers', 
    reg: 399, 
    add: 149, 
    description: 'Extends charging & landscape video viewing to back row',
    image: leftMountImg
  },
];

export default function CarCombo() {
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    carAddons.map(a => a.id)
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const basePrice = 1999;
  const baseReg = 1999;

  const galleryImages = [
    { src: centerMountImg, label: 'Center Console View' },
    { src: rightMountImg, label: 'Air Vent Mount' },
    { src: leftMountImg, label: 'Rear Passenger Mount' }
  ];

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const selectAll = () => {
    setSelectedAddons(carAddons.map(a => a.id));
  };

  const totalReg = baseReg + carAddons
    .filter(a => selectedAddons.includes(a.id))
    .reduce((acc, a) => acc + a.reg, 0);

  const totalComboPrice = basePrice + carAddons
    .filter(a => selectedAddons.includes(a.id))
    .reduce((acc, a) => acc + a.add, 0);

  const totalSavings = totalReg - totalComboPrice;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white py-10 md:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-[#04D9FF] flex items-center gap-1 transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/categories" className="hover:text-[#04D9FF] transition-colors">
            Categories
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#04D9FF] font-semibold">Car Combo Bundle</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Automotive Gallery Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="bg-[#0c0c0c] border border-[#222] rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#04D9FF]/15 border border-[#04D9FF]/40 text-[#04D9FF] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Zap className="w-3 h-3" /> Cockpit & Cabin Bundle
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  {galleryImages[activeImageIndex].label}
                </span>
              </div>

              {/* Main Active Image */}
              <div className="w-full h-64 sm:h-80 rounded-2xl bg-[#080808] border border-[#1a1a1a] flex items-center justify-center p-4 overflow-hidden mb-4">
                <img 
                  src={galleryImages[activeImageIndex].src} 
                  alt="Car Combo Configuration" 
                  className="max-h-full max-w-full object-contain rounded-lg drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-105" 
                />
              </div>

              {/* Thumbnails switcher */}
              <div className="grid grid-cols-3 gap-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`h-16 rounded-xl border p-1 bg-[#080808] flex items-center justify-center overflow-hidden transition-all ${
                      activeImageIndex === i 
                        ? 'border-[#04D9FF] shadow-[0_0_12px_rgba(4,217,255,0.3)]' 
                        : 'border-[#222] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img.src} alt={img.label} className="h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Specs */}
            <div className="bg-[#0c0c0c] border border-[#222] rounded-2xl p-5 text-xs text-gray-400 space-y-2">
              <div className="text-white font-bold text-xs uppercase tracking-wider mb-2">
                AUTOMOTIVE INTERIOR SPECIFICATIONS
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-gray-400 block">Magnetic Array</span>
                  <span className="text-white font-semibold">16x N52 Neodymium</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-gray-400 block">Thermal Venting</span>
                  <span className="text-white font-semibold">Passive Heat Sink</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-gray-400 block">Input Voltage</span>
                  <span className="text-white font-semibold">9V/2A, 12V/1.67A</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-gray-400 block">Warranty</span>
                  <span className="text-white font-semibold">1-Year Direct Swap</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bundle Details & Add-ons (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#04D9FF] text-xs font-bold tracking-[0.2em] uppercase block mb-1">
                Front & Rear Vehicle Charging
              </span>
              <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-white uppercase mb-3">
                Car <span className="text-[#04D9FF]">Combo</span>
              </h1>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                All-in-one car charger bundle designed for front and rear passengers. Keep your phone locked in place over speed bumps, potholes, and sharp corners while delivering 15W fast charging.
              </p>
            </div>

            {/* Core Unit Box */}
            <div className="bg-[#0c0c0c] border border-[#222] rounded-2xl p-5 sm:p-6 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#04D9FF]/10 text-[#04D9FF] border border-[#04D9FF]/30">
                  CORE MODULE INCLUDED
                </span>
                <h2 className="font-bold text-lg text-white">Qicdock 15W Automotive Charger</h2>
                <p className="text-gray-400 text-xs">
                  Universal MagSafe & Qi2 core dock with braided type-C vehicle power cable
                </p>
              </div>
              <div className="text-right pl-4">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-wide">₹1,999</span>
                <span className="block text-[11px] text-gray-400">Core Unit</span>
              </div>
            </div>

            {/* Add-ons List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-300">
                    Included Vehicle Add-ons ({selectedAddons.length}/{carAddons.length})
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Toggle mounts to tailor the setup for your car's interior
                  </p>
                </div>
                {selectedAddons.length < carAddons.length && (
                  <button 
                    onClick={selectAll}
                    className="text-xs font-bold text-[#04D9FF] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Select All Add-ons
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {carAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isSelected 
                          ? 'bg-[#04D9FF]/[0.06] border-[#04D9FF]/70 shadow-[0_0_15px_rgba(4,217,255,0.1)]' 
                          : 'bg-[#0c0c0c] border-[#222] hover:border-[#444] opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div 
                          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors flex-shrink-0 ${
                            isSelected 
                              ? 'bg-[#04D9FF] text-[#080808]' 
                              : 'border border-[#444] bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{addon.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10">
                              {addon.location}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 leading-snug mt-0.5">
                            {addon.description}
                          </p>
                        </div>
                      </div>

                      <div className="text-left sm:text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                        <span className="text-gray-400 line-through text-xs">
                          Reg: ₹{addon.reg}
                        </span>
                        <span className={`font-bold text-sm ${isSelected ? 'text-[#04D9FF]' : 'text-gray-400'}`}>
                          +₹{addon.add}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#0c0c0c] border border-[#262626] rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-[#222]">
                <div>
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">
                    Regular Total Value
                  </p>
                  <p className="text-gray-400 line-through text-lg font-bold">
                    ₹{totalReg.toLocaleString('en-IN')}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Bundle Savings: ₹{totalSavings.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[#04D9FF] text-xs font-bold tracking-widest uppercase mb-1 flex items-center sm:justify-end gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Special Car Combo Price
                  </p>
                  <p className="text-3xl sm:text-4xl font-['Anton'] text-white tracking-wide">
                    ₹{totalComboPrice.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    Includes all 3 in-car mounting modules
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-[#04D9FF] hover:bg-white text-[#080808] font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(4,217,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedToCart ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#080808]" />
                    <span>Added To Cart Successfully!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Add Car Combo to Cart (₹{totalComboPrice.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-gray-400 pt-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#04D9FF]" />
                <span>1-Year Repl. Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#04D9FF]" />
                <span>Zero Wire Splicing</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#04D9FF]" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#04D9FF]" />
                <span>Anti-Slip Magnetic Grip</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
