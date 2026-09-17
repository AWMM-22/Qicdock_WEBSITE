import { useState } from 'react';
import { Check, ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, RotateCcw, Truck, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import combinedImg from '../assets/images/3in1 copy.png';
import carPadImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.png';
import airVentImg from '../assets/images/air_vent_mount.jpg';
import rearSeatImg from '../assets/images/headrest_mount.jpg';
import tableStandImg from '../assets/images/table_stand_mount.jpg';
import wallStandImg from '../assets/images/wall_stand_mount.jpg';

interface Addon {
  id: string;
  name: string;
  category: string;
  mrp: number;
  addonPrice: number;
  description: string;
  image: string;
}

const initialAddons: Addon[] = [
  { id: 'car-pad', name: 'Car Console Pad', category: 'Automotive', mrp: 299, addonPrice: 99, description: 'Anti-slip silicone mat', image: carPadImg },
  { id: 'air-vent', name: 'Air Vent Clip', category: 'Automotive', mrp: 299, addonPrice: 99, description: '360° ball-joint clamp', image: airVentImg },
  { id: 'rear-seat', name: 'Headrest Mount', category: 'Automotive', mrp: 399, addonPrice: 149, description: 'Direct headrest post clamp', image: rearSeatImg },
  { id: 'table-stand', name: 'Table Stand', category: 'Workspace', mrp: 399, addonPrice: 149, description: 'Heavy desktop base (65°)', image: tableStandImg },
  { id: 'wall-stand', name: 'Wall Bracket', category: 'Home', mrp: 299, addonPrice: 99, description: '3M VHB magnetic wall mount', image: wallStandImg },
];

export default function AllInOneCombo() {
  const { isSoldOut } = useInventory();
  const comboSoldOut = isSoldOut('ultimate-kit');
  
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    initialAddons.map(a => a.id)
  );
  const [addedToCart, setAddedToCart] = useState(false);

  const basePrice = 1999;
  const baseMrp = 1999;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const selectAll = () => {
    setSelectedAddons(initialAddons.map(a => a.id));
  };

  // Calculate totals
  const totalMrp = baseMrp + initialAddons
    .filter(a => selectedAddons.includes(a.id))
    .reduce((acc, a) => acc + a.mrp, 0);

  const totalBundlePrice = basePrice + initialAddons
    .filter(a => selectedAddons.includes(a.id))
    .reduce((acc, a) => acc + a.addonPrice, 0);

  const totalSavings = totalMrp - totalBundlePrice;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] py-10 md:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1320px] mx-auto">
        
        {/* Breadcrumbs */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600">
          <Link to="/" className="hover:text-[#0A1E3F] flex items-center gap-1 transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/categories" className="hover:text-[#0A1E3F] transition-colors">
            Categories
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#0A1E3F] font-semibold">All In One Combo</span>
        </div>

        {/* Product Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Visual Showcase & Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-3 sm:p-8 relative overflow-hidden group">
              <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0A1E3F]/15 border border-[#0A1E3F]/40 text-[#0A1E3F] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" /> Ultimate Bundle
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
                  Save ₹{totalSavings}
                </span>
              </div>

              {/* Product Image Stage */}
              <div className="w-full h-80 sm:h-96 flex items-center justify-center p-0 overflow-hidden">
                <img 
                  src={combinedImg} 
                  alt="Qicdock All In One Combo Package" 
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500" 
                />
              </div>

              {/* Badges footer */}
              <div className="grid grid-cols-3 gap-2 pt-6 border-t border-[#E2DAC8] text-center">
                <div className="p-2 rounded-xl bg-[#152B52]/[0.02]">
                  <span className="text-xs font-bold text-[#0A1E3F] block">25W Qi2</span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">Fast Wireless</span>
                </div>
                <div className="p-2 rounded-xl bg-[#152B52]/[0.02]">
                  <span className="text-xs font-bold text-[#0A1E3F] block">5 Mounts</span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">Car / Desk / Wall</span>
                </div>
                <div className="p-2 rounded-xl bg-[#152B52]/[0.02]">
                  <span className="text-xs font-bold text-[#0A1E3F] block">1-Yr Repl.</span>
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">Full Warranty</span>
                </div>
              </div>
            </div>

            {/* In-the-box summary */}
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 text-xs text-gray-600 space-y-2.5">
              <div className="flex items-center justify-between text-[#0A1E3F] font-bold pb-2 border-b border-[#E2DAC8]">
                <span>PACKAGE CONTENTS</span>
                <span className="text-[#0A1E3F]">{selectedAddons.length + 1} ITEMS INCLUDED</span>
              </div>
              <p className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0A1E3F] flex-shrink-0" />
                <span>1x Qicdock 25W Qi2 Universal Magnetic Core Module</span>
              </p>
              {initialAddons.filter(a => selectedAddons.includes(a.id)).map(addon => (
                <p key={addon.id} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>1x {addon.name}</span>
                </p>
              ))}
              <div className="pt-2 flex items-center justify-between text-[11px] text-gray-600 border-t border-[#E2DAC8]">
                <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-[#0A1E3F]" /> Free Express Shipping Across India</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configurator & Price Calculator (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header / Value Proposition */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase">
                  Modular Charging Architecture
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase mb-3">
                All in One <span className="text-[#0A1E3F]">Combo</span>
              </h1>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                All in one charger solution for seamless transition between Car, Desk, and Wall environments. Detach your 25W core puck with a click and mount it anywhere instantly.
              </p>
            </div>

            {/* Core Product Box */}
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-4 sm:p-5 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F] border border-[#0A1E3F]/30">
                    CORE PRODUCT (REQUIRED)
                  </span>
                </div>
                <h2 className="font-bold text-base text-[#0A1E3F]">25W Qi2 Core Module</h2>
                <p className="text-gray-600 text-[11px]">
                  25W Qi2 Certified Core + braided USB-C power lead
                </p>
              </div>
              <div className="text-right pl-4">
                <span className="text-xl font-bold text-[#0A1E3F] tracking-wide">₹1,999</span>
                <span className="block text-[11px] text-gray-600">Base Unit</span>
              </div>
            </div>

            {/* Selectable Add-on Modules */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Add-On Modules ({selectedAddons.length}/{initialAddons.length})
                  </h3>
                  <p className="text-[11px] text-gray-600">
                    Add or remove stands to build your custom bundle
                  </p>
                </div>
              </div>

              {/* Interactive Modules List */}
              <div className="space-y-2">
                {initialAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl border transition-all ${
                        isSelected 
                          ? 'bg-[#E2DAC8] border-[#D6CDB8]' 
                          : 'bg-[#FAF7F0] border-[#E2DAC8] opacity-70'
                      }`}
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#FAF7F0] border border-[#E2DAC8] p-0 flex shrink-0 overflow-hidden shadow-sm items-center justify-center">
                         <img src={addon.image} alt={addon.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-[#0A1E3F] leading-tight">{addon.name}</h4>
                         <p className="text-[11px] text-gray-600 leading-tight mt-1 line-clamp-1">{addon.description}</p>
                         <div className="flex items-center gap-2 mt-1">
                           <span className={`text-[12px] font-bold ${isSelected ? 'text-[#0A1E3F]' : 'text-gray-600'}`}>+₹{addon.addonPrice}</span>
                           <span className="text-[10px] text-gray-600 line-through">₹{addon.mrp}</span>
                         </div>
                      </div>
                      <button 
                        onClick={() => toggleAddon(addon.id)}
                        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected 
                            ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20' 
                            : 'bg-[#0A1E3F]/10 border-[#0A1E3F]/30 text-[#0A1E3F] hover:bg-[#0A1E3F]/20'
                        }`}
                      >
                         {isSelected ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Bundle Price Box */}
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0A1E3F]/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-[#E2DAC8]">
                <div>
                  <p className="text-gray-600 text-xs font-medium uppercase tracking-wider mb-1">
                    Original Combined Total
                  </p>
                  <p className="text-gray-600 line-through text-lg font-bold">
                    ₹{totalMrp.toLocaleString('en-IN')}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Instant Savings: ₹{totalSavings.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[#0A1E3F] text-xs font-bold tracking-widest uppercase mb-1 flex items-center sm:justify-end gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Special Bundle Price
                  </p>
                  <p className="text-3xl sm:text-4xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                    ₹{totalBundlePrice.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[11px] text-gray-600 block mt-0.5">
                    Inclusive of all taxes & doorstep delivery
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleAddToCart}
                disabled={addedToCart || comboSoldOut}
                className={`w-full ${comboSoldOut ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0A1E3F] hover:bg-[#152B52] shadow-[0_0_25px_rgba(4,217,255,0.3)]'} text-[#F4F0E6] font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-80`}
              >
                {comboSoldOut ? (
                  <span>Currently Sold Out</span>
                ) : addedToCart ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#F4F0E6]" />
                    <span>Added To Cart Successfully!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Add Complete Combo to Cart (₹{totalBundlePrice.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>

            {/* Guarantee footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-gray-600 pt-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0A1E3F]" />
                <span>1-Year Replacement</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0A1E3F]" />
                <span>Zero Wire Cutting</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0A1E3F]" />
                <span>Dispatches in 24h</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0A1E3F]" />
                <span>100% Fit Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
