import { useState } from 'react';
import { ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, Truck, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import airVentImg from '../assets/images/air_vent_mount.jpg';
import headrestMountImg from '../assets/images/headrest_mount.jpg';
import tableStandImg from '../assets/images/table_stand_mount.jpg';
import wallStandImg from '../assets/images/wall_stand_mount.jpg';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';

interface MountItem {
  id: string;
  name: string;
  category: 'Automotive' | 'Workspace' | 'Home' | 'Power';
  price: number;
  originalPrice: number;
  description: string;
  img: string;
  badge: string;
}

const standaloneBases: MountItem[] = [
  {
    id: 'pad-base',
    name: 'Car Charging Pad Base',
    category: 'Automotive',
    price: 299,
    originalPrice: 499,
    description: 'High-friction silicone console mat with cable guide channel. Snaps directly around your Qicdock core.',
    img: centerMountImg,
    badge: 'Console Fit'
  },
  {
    id: 'vent-base',
    name: 'Air Vent 360° Holder Base',
    category: 'Automotive',
    price: 299,
    originalPrice: 499,
    description: 'Steel-core vent blade clamp with lockable 360° rotating ball socket for horizontal or vertical AC louvers.',
    img: airVentImg,
    badge: 'Dashboard'
  },
  {
    id: 'rear-base',
    name: 'Rear Seat Headrest Clamp Base',
    category: 'Automotive',
    price: 399,
    originalPrice: 599,
    description: 'Dual-bracket headrest post mount giving rear passengers easy access to magnetic charging & movie watching.',
    img: headrestMountImg,
    badge: 'Rear Row'
  },
  {
    id: 'table-base',
    name: 'Weighted Aluminum Table Stand Base',
    category: 'Workspace',
    price: 399,
    originalPrice: 599,
    description: 'Solid CNC aluminum desk pedestal with rubberized base and 65-degree tilt for video conferencing & StandBy.',
    img: tableStandImg,
    badge: 'Desk Workstation'
  },
  {
    id: 'wall-base',
    name: 'Flush Wall & Nightstand Magnetic Base',
    category: 'Home',
    price: 299,
    originalPrice: 499,
    description: 'Low-profile magnetic dock plate with ultra-strong damage-free 3M VHB adhesive for wall, tile, or bedside.',
    img: wallStandImg,
    badge: 'Bedside'
  },
  {
    id: 'gan-adapter',
    name: '45W GaN Dual USB-C Fast Car Charger',
    category: 'Power',
    price: 499,
    originalPrice: 799,
    description: 'High-density miniature 12V socket plug supporting PD 3.0 and PPS to deliver full 25W wireless power.',
    img: centerMountImg,
    badge: 'Fast Power'
  }
];

export default function StandAloneMounts() {
  const { isSoldOut } = useInventory();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const filters = ['All', 'Automotive', 'Workspace', 'Home', 'Power'];

  const filteredItems = selectedFilter === 'All'
    ? standaloneBases
    : standaloneBases.filter(item => item.category === selectedFilter);

  const handleAddToCart = (id: string) => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

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
          <span className="text-[#0A1E3F] font-semibold">Stand-Alone Mounts</span>
        </div>

        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <span className="text-[#0A1E3F] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
            Modular Hardware Expansion
          </span>
          <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
            Stand-Alone Mounts & <span className="text-[#0A1E3F]">Accessories</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Already own a Qicdock core module? Expand your wireless charging to additional vehicles, your office desk, or bedroom nightstand with extra mounting brackets.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#FAF7F0] border border-[#0A1E3F]/30 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-gray-800">
            <Sparkles className="w-4 h-4 text-[#0A1E3F] flex-shrink-0" />
            <span>All bases fit the universal Qicdock 25W magnetic puck perfectly. Note: Core charger sold separately.</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedFilter === f
                  ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-[0_0_15px_rgba(4,217,255,0.3)]'
                  : 'bg-[#FAF7F0] text-gray-600 border border-[#E2DAC8] hover:border-[#D6CDB8] hover:text-[#0A1E3F]'
              }`}
            >
              {f === 'All' ? 'All Accessories (6)' : f}
            </button>
          ))}
        </div>

        {/* Grid of Mounts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isAdded = addedItems[item.id];
            return (
              <div
                key={item.id}
                className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-6 hover:border-[#0A1E3F]/70 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(4,217,255,0.1)]"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F] border border-[#0A1E3F]/30">
                      {item.badge}
                    </span>
                    <span className="text-[11px] text-gray-600 font-medium">
                      {item.category}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="h-44 bg-[#F4F0E6] rounded-xl border border-[#E2DAC8] p-0 flex items-center justify-center mb-5 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-base text-[#0A1E3F] group-hover:text-[#0A1E3F] transition-colors mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-[#E2DAC8] mt-auto">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-gray-600 line-through block">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-2xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                        ₹{item.price}
                      </span>
                    </div>
                    {isSoldOut(item.id) ? (
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                        Sold Out
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Save ₹{item.originalPrice - item.price}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={isSoldOut(item.id)}
                    className={`w-full font-bold uppercase tracking-wider py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                      isSoldOut(item.id)
                        ? 'bg-red-50 text-red-600 border border-red-200 cursor-not-allowed'
                        : 'bg-[#0A1E3F] text-[#F4F0E6] hover:bg-[#152B52] border border-transparent cursor-pointer'
                    }`}
                  >
                    {isSoldOut(item.id) ? (
                      <span>Sold Out Currently</span>
                    ) : isAdded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Buy Mount Only (₹{item.price})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Combo upsell banner */}
        <div className="mt-16 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-['Anton'] uppercase text-[#0A1E3F] tracking-wide">
              Need the core 25W charger as well?
            </h3>
            <p className="text-gray-600 text-sm max-w-xl">
              Get all 5 mounts and the 25W universal magnetic charger together in our All-In-One Combo and save over ₹1,100!
            </p>
          </div>
          <Link
            to="/category/all-in-one"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(4,217,255,0.3)]"
          >
            Explore All In One Combo
          </Link>
        </div>

      </div>
    </div>
  );
}
