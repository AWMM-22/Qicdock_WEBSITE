import { useState } from 'react';
import { ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, Truck, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import airVentImg from '../assets/images/air_vent_mount.jpg';
import rearSeatImg from '../assets/images/headrest_mount.jpg';
import tableStandImg from '../assets/images/table_stand_mount.jpg';
import wallStandImg from '../assets/images/wall_stand_mount.jpg';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';

interface ProductSetup {
  id: string;
  name: string;
  category: 'Car' | 'Workspace' | 'Home';
  fullPrice: string;
  specialPrice: string;
  savings: string;
  img: string;
  mountType: string;
  specs: string[];
}

const individualSetups: ProductSetup[] = [
  {
    id: 'car-pad',
    name: 'Car Charger + Center Console Pad',
    category: 'Car',
    fullPrice: '2,298',
    specialPrice: '2,098',
    savings: 'Save ₹200',
    img: centerMountImg,
    mountType: 'Direct Console Pad',
    specs: ['25W Qi2 Core', 'High-Grip Silicone', 'Zero Wire Cut']
  },
  {
    id: 'car-vent',
    name: 'Car Air Vent 360° Magnetic Charger',
    category: 'Car',
    fullPrice: '2,298',
    specialPrice: '2,098',
    savings: 'Save ₹200',
    img: airVentImg,
    mountType: 'Air Vent Clip',
    specs: ['Steel Vent Clamp', '360° Ball Pivot', 'Fast Cooling']
  },
  {
    id: 'car-rear',
    name: 'Car Rear Passenger Headrest Charger',
    category: 'Car',
    fullPrice: '2,398',
    specialPrice: '2,148',
    savings: 'Save ₹250',
    img: rearSeatImg,
    mountType: 'Headrest Post Mount',
    specs: ['Solid Post Clamp', 'Landscape Mode', 'Passenger Ready']
  },
  {
    id: 'table-stand',
    name: 'Heavyweight Aluminum Table Stand Charger',
    category: 'Workspace',
    fullPrice: '2,398',
    specialPrice: '2,148',
    savings: 'Save ₹250',
    img: tableStandImg,
    mountType: 'Desk Stand Base',
    specs: ['Solid Aluminum', '65° Viewing Angle', 'StandBy Ready']
  },
  {
    id: 'wall-charger',
    name: 'Ultra-Slim Magnetic Wall Charger',
    category: 'Home',
    fullPrice: '2,298',
    specialPrice: '2,098',
    savings: 'Save ₹200',
    img: wallStandImg,
    mountType: 'Wall Flush Mount',
    specs: ['3M VHB Tape Base', 'Bedside Friendly', 'Zero Footprint']
  },
];

export default function IndividualChargers() {
  const { isSoldOut } = useInventory();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const handleAddToCart = (id: string) => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  const filteredSetups = activeCategory === 'All' 
    ? individualSetups 
    : individualSetups.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] py-10 md:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600">
          <Link to="/" className="hover:text-[#0A1E3F] flex items-center gap-1 transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/categories" className="hover:text-[#0A1E3F] transition-colors">
            Categories
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#0A1E3F] font-semibold">Individual Chargers</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-[#0A1E3F] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
            Pre-Bundled Dedicated Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
            Choose Your <span className="text-[#0A1E3F]">Dedicated Setup</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Every setup includes our 25W Qi2/MagSafe core module paired with one dedicated mounting bracket. Looking to use one charger everywhere? Check our combos!
          </p>

          {/* Compatibility Banner */}
          <div className="inline-flex items-center gap-2 bg-[#FAF7F0] border border-[#0A1E3F]/30 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-gray-800 shadow-[0_0_15px_rgba(4,217,255,0.1)]">
            <Sparkles className="w-4 h-4 text-[#0A1E3F] flex-shrink-0" />
            <span>This 25W core module is hot-swappable across all Qicdock mounts at any time.</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {['All', 'Car', 'Workspace', 'Home'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-[0_0_15px_rgba(4,217,255,0.3)]'
                  : 'bg-[#FAF7F0] text-gray-600 border border-[#E2DAC8] hover:border-[#D6CDB8] hover:text-[#0A1E3F]'
              }`}
            >
              {cat === 'All' ? 'All Environments (5)' : `${cat} Environments`}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredSetups.map((product) => {
            const isAdded = addedItems[product.id];
            return (
              <div 
                key={product.id} 
                className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl overflow-hidden hover:border-[#0A1E3F]/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(4,217,255,0.1)]"
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="p-4 pb-0 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#152B52]/5 border border-white/10 text-gray-700">
                      {product.mountType}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      {product.savings}
                    </span>
                  </div>

                  {/* Image Showcase */}
                  <div className="h-52 bg-[#F4F0E6] p-0 m-3 rounded-xl border border-[#E2DAC8] flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" 
                    />
                  </div>

                  {/* Info */}
                  <div className="px-5 pt-2 pb-4">
                    <h3 className="font-bold text-sm sm:text-base text-[#0A1E3F] group-hover:text-[#0A1E3F] transition-colors leading-snug mb-3">
                      {product.name}
                    </h3>

                    {/* Spec tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.specs.map((sp, i) => (
                        <span key={i} className="text-[10px] bg-[#152B52]/[0.03] text-gray-600 border border-white/5 px-2 py-0.5 rounded">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="p-5 pt-0 border-t border-[#E2DAC8] mt-auto">
                  <div className="flex items-baseline justify-between pt-3 mb-4">
                    <div>
                      <span className="text-[11px] text-gray-600 line-through block">
                        ₹{product.fullPrice}
                      </span>
                      <span className="text-xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                        ₹{product.specialPrice}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0A1E3F] bg-[#0A1E3F]/10 px-2 py-1 rounded border border-[#0A1E3F]/20">
                      Special Rate
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={isAdded || isSoldOut(product.id)}
                    className={`w-full ${isSoldOut(product.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#0A1E3F] hover:bg-[#152B52]'} text-[#F4F0E6] border border-transparent font-bold uppercase tracking-wider py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-80`}
                  >
                    {isSoldOut(product.id) ? (
                      <span>Sold Out</span>
                    ) : isAdded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Warranty & Guarantee footer */}
        <div className="mt-14 border-t border-[#E2DAC8] pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-600 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-[#0A1E3F]" />
            <span>1-Year Complete Replacement Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-[#0A1E3F]" />
            <span>Free Express Shipping Across All Pincodes</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0A1E3F]" />
            <span>100% Fit & Magnetic Alignment Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
}
