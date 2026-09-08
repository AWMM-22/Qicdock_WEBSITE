import { useState } from 'react';
import { ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, Truck, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import leftMountImg from '../assets/images/m1.png';
import rightMountImg from '../assets/images/m3.png';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import airVentImg from '../assets/images/right_car_mount_1788721169113.jpg';
import rearSeatImg from '../assets/images/left_car_mount_1788721155876.jpg';

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
    specs: ['15W Qi2 Core', 'High-Grip Silicone', 'Zero Wire Cut']
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
    img: leftMountImg,
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
    img: rightMountImg,
    mountType: 'Wall Flush Mount',
    specs: ['3M VHB Tape Base', 'Bedside Friendly', 'Zero Footprint']
  },
];

export default function IndividualChargers() {
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
    <div className="min-h-screen bg-[#080808] text-white py-10 md:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400">
          <Link to="/" className="hover:text-[#04D9FF] flex items-center gap-1 transition-colors">
            Home
          </Link>
          <span className="text-gray-600">/</span>
          <Link to="/categories" className="hover:text-[#04D9FF] transition-colors">
            Categories
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-[#04D9FF] font-semibold">Individual Chargers</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-[#04D9FF] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
            Pre-Bundled Dedicated Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-white uppercase">
            Choose Your <span className="text-[#04D9FF]">Dedicated Setup</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Every setup includes our 15W Qi2/MagSafe core module paired with one dedicated mounting bracket. Looking to use one charger everywhere? Check our combos!
          </p>

          {/* Compatibility Banner */}
          <div className="inline-flex items-center gap-2 bg-[#0c0c0c] border border-[#04D9FF]/30 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-gray-200 shadow-[0_0_15px_rgba(4,217,255,0.1)]">
            <Sparkles className="w-4 h-4 text-[#04D9FF] flex-shrink-0" />
            <span>This 15W core module is hot-swappable across all Qicdock mounts at any time.</span>
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
                  ? 'bg-[#04D9FF] text-[#080808] shadow-[0_0_15px_rgba(4,217,255,0.3)]'
                  : 'bg-[#0c0c0c] text-gray-400 border border-[#222] hover:border-[#444] hover:text-white'
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
                className="bg-[#0c0c0c] border border-[#222] rounded-2xl overflow-hidden hover:border-[#04D9FF]/60 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(4,217,255,0.1)]"
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="p-4 pb-0 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {product.mountType}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      {product.savings}
                    </span>
                  </div>

                  {/* Image Showcase */}
                  <div className="h-52 bg-[#080808] p-6 m-3 rounded-xl border border-[#1a1a1a] flex items-center justify-center overflow-hidden">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" 
                    />
                  </div>

                  {/* Info */}
                  <div className="px-5 pt-2 pb-4">
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#04D9FF] transition-colors leading-snug mb-3">
                      {product.name}
                    </h3>

                    {/* Spec tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {product.specs.map((sp, i) => (
                        <span key={i} className="text-[10px] bg-white/[0.03] text-gray-400 border border-white/5 px-2 py-0.5 rounded">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Pricing & Action */}
                <div className="p-5 pt-0 border-t border-[#1a1a1a] mt-auto">
                  <div className="flex items-baseline justify-between pt-3 mb-4">
                    <div>
                      <span className="text-[11px] text-gray-400 line-through block">
                        ₹{product.fullPrice}
                      </span>
                      <span className="text-xl font-['Anton'] text-white tracking-wide">
                        ₹{product.specialPrice}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#04D9FF] bg-[#04D9FF]/10 px-2 py-1 rounded border border-[#04D9FF]/20">
                      Special Rate
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-[#141414] hover:bg-[#04D9FF] hover:text-[#080808] border border-[#333] hover:border-[#04D9FF] text-white font-bold uppercase tracking-wider py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    {isAdded ? (
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
        <div className="mt-14 border-t border-[#1a1a1a] pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400 text-center">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-[#04D9FF]" />
            <span>1-Year Complete Replacement Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-[#04D9FF]" />
            <span>Free Express Shipping Across All Pincodes</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#04D9FF]" />
            <span>100% Fit & Magnetic Alignment Guarantee</span>
          </div>
        </div>

      </div>
    </div>
  );
}
