import { useState } from 'react';
import { Check, ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, Truck, MonitorSmartphone, RotateCcw, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import tableStandImg from '../assets/images/table_stand_mount.webp';
import wallStandImg from '../assets/images/wall_stand_mount.webp';

interface Addon {
  id: string;
  name: string;
  reg: number;
  add: number;
  description: string;
  tag: string;
  image: string;
}

const workstationAddons: Addon[] = [
  { 
    id: 'table', 
    name: 'Weighted Table Stand', 
    reg: 399, 
    add: 149, 
    description: 'CNC-machined desktop stand with 65° angle.',
    tag: 'Desk Workstation',
    image: tableStandImg
  },
  { 
    id: 'wall', 
    name: 'Magnetic Wall Base', 
    reg: 299, 
    add: 99, 
    description: 'Direct wall flush mount with 3M tape.',
    tag: 'Bedside & Wall',
    image: wallStandImg
  },
];

export default function HomeOfficeCombo() {
  const { isSoldOut } = useInventory();
  const comboSoldOut = isSoldOut('home-office-combo');

  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    workstationAddons.map(a => a.id)
  );
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeView, setActiveView] = useState<'table' | 'wall'>('table');

  const basePrice = 1999;
  const baseReg = 1999;

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter(item => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const selectAll = () => {
    setSelectedAddons(workstationAddons.map(a => a.id));
  };

  const totalReg = baseReg + workstationAddons
    .filter(a => selectedAddons.includes(a.id))
    .reduce((acc, a) => acc + a.reg, 0);

  const totalComboPrice = basePrice + workstationAddons
    .filter(a => selectedAddons.includes(a.id))
    .reduce((acc, a) => acc + a.add, 0);

  const totalSavings = totalReg - totalComboPrice;

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
          <span className="text-[#0A1E3F] font-semibold">Home & Office Combo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Visual Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 sm:p-8 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-[#0A1E3F]/15 border border-[#0A1E3F]/40 text-[#0A1E3F] text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <MonitorSmartphone className="w-3 h-3" /> Desk & Wall Combo
                </span>
                <span className="text-xs text-emerald-400 font-bold">
                  Save ₹{totalSavings}
                </span>
              </div>

              {/* Main Image */}
              <div className="w-full h-64 sm:h-80 rounded-2xl bg-[#F4F0E6] border border-[#E2DAC8] flex items-center justify-center p-6 overflow-hidden mb-4">
                <img 
                  src={activeView === 'table' ? tableStandImg : wallStandImg} 
                  alt="Home and Office Combo" 
                  loading="eager"
                  fetchPriority="high"
                  decoding="sync"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-105" 
                />
              </div>

              {/* View toggle pills */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveView('table')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    activeView === 'table'
                      ? 'border-[#0A1E3F] bg-[#0A1E3F]/10 text-[#0A1E3F]'
                      : 'border-[#E2DAC8] bg-[#F4F0E6] text-gray-600 hover:text-[#0A1E3F]'
                  }`}
                >
                  Table Stand View
                </button>
                <button
                  onClick={() => setActiveView('wall')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    activeView === 'wall'
                      ? 'border-[#0A1E3F] bg-[#0A1E3F]/10 text-[#0A1E3F]'
                      : 'border-[#E2DAC8] bg-[#F4F0E6] text-gray-600 hover:text-[#0A1E3F]'
                  }`}
                >
                  Wall Mount View
                </button>
              </div>
            </div>

            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 text-xs text-gray-600 space-y-2">
              <div className="text-[#0A1E3F] font-bold text-xs uppercase tracking-wider mb-2">
                WORKBENCH & BEDROOM HIGHLIGHTS
              </div>
              <ul className="space-y-1.5 text-[12px]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A1E3F] flex-shrink-0" />
                  <span>Supports Apple StandBy Mode & iOS 17/18 display widgets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A1E3F] flex-shrink-0" />
                  <span>Concealed cable channel behind weighted aluminum base</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0A1E3F] flex-shrink-0" />
                  <span>3M VHB residue-free wall bracket safe on painted drywall</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Details & Customizer (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase block mb-1">
                Workstation & Bedroom Architecture
              </span>
              <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase mb-3">
                Home & Office <span className="text-[#0A1E3F]">Combo</span>
              </h1>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                All-in-one workstation & home charging solution for desk and wall mounting. Dock your device during Zoom calls, then detach and snap to your bedside dock effortlessly.
              </p>
            </div>

            {/* Core Unit */}
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-4 sm:p-5 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F] border border-[#0A1E3F]/30">
                  CORE MODULE INCLUDED
                </span>
                <h2 className="font-bold text-base text-[#0A1E3F]">25W Qi2 Charger</h2>
                <p className="text-gray-600 text-[11px]">
                  Magnetic core + 1.5m braided USB-C cable
                </p>
              </div>
              <div className="text-right pl-4">
                <span className="text-xl font-bold text-[#0A1E3F] tracking-wide">₹1,999</span>
                <span className="block text-[11px] text-gray-600">Main Unit</span>
              </div>
            </div>

            {/* Included Add-ons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-700">
                    Add-On Stands ({selectedAddons.length}/{workstationAddons.length})
                  </h3>
                  <p className="text-[11px] text-gray-600">
                    Add or remove stands to build your custom bundle
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                {workstationAddons.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                        isSelected 
                          ? 'bg-[#E2DAC8] border-[#D6CDB8]' 
                          : 'bg-[#FAF7F0] border-[#E2DAC8] opacity-70'
                      }`}
                    >
                      <div className="w-16 h-16 rounded-lg bg-[#EBE5D9] border border-[#E2DAC8] p-2 flex shrink-0">
                         <img src={addon.image} alt={addon.name} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1">
                         <h4 className="text-sm font-bold text-[#0A1E3F] leading-tight">{addon.name}</h4>
                         <p className="text-[11px] text-gray-600 leading-tight mt-1 line-clamp-1">{addon.description}</p>
                         <div className="flex items-center gap-2 mt-1">
                           <span className={`text-[12px] font-bold ${isSelected ? 'text-[#0A1E3F]' : 'text-gray-600'}`}>+₹{addon.add}</span>
                           <span className="text-[10px] text-gray-600 line-through">₹{addon.reg}</span>
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


            {/* Price Box */}
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-[#E2DAC8]">
                <div>
                  <p className="text-gray-600 text-xs font-medium uppercase tracking-wider mb-1">
                    Regular Standalone Total
                  </p>
                  <p className="text-gray-600 line-through text-lg font-bold">
                    ₹{totalReg.toLocaleString('en-IN')}
                  </p>
                  <span className="inline-block mt-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Combo Savings: ₹{totalSavings.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-[#0A1E3F] text-xs font-bold tracking-widest uppercase mb-1 flex items-center sm:justify-end gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Discounted Combo Total
                  </p>
                  <p className="text-3xl sm:text-4xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                    ₹{totalComboPrice.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[11px] text-gray-600 block mt-0.5">
                    Fast dispatched with tracked delivery
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={comboSoldOut}
                className={`w-full font-bold text-sm uppercase tracking-widest py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  comboSoldOut
                    ? 'bg-red-50 text-red-600 border border-red-200 cursor-not-allowed shadow-none'
                    : 'bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] shadow-[0_0_25px_rgba(4,217,255,0.3)] cursor-pointer'
                }`}
              >
                {comboSoldOut ? (
                  <span>Sold Out Currently</span>
                ) : addedToCart ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-[#F4F0E6]" />
                    <span>Added To Cart Successfully!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Add Home & Office Bundle to Cart (₹{totalComboPrice.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-gray-600 pt-1">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0A1E3F]" />
                <span>1-Year Repl. Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#0A1E3F]" />
                <span>25W Qi2 Fast Wireless</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#0A1E3F]" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0A1E3F]" />
                <span>Weighted Anti-Tip Base</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
