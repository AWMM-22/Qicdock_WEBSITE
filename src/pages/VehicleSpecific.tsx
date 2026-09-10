import { useState } from 'react';
import { ArrowLeft, Zap, Shield, Sparkles, CheckCircle2, Truck, Search, Car, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.png';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.png';
import ertigaImg from '../assets/images/Ertiga.png';
import swiftDzireImg from '../assets/images/Dzire and Swift.png';
import universalPadImg from '../assets/images/Universal_.png';
import threeXoImg from '../assets/images/3XO.png';

interface CarModel {
  id: string;
  name: string;
  brand: 'Maruti Suzuki' | 'Toyota' | 'Hyundai' | 'Mahindra' | 'Universal';
  years: string;
  slot: string;
  price: number;
  badge: string;
  image: string;
}

const vehicleModels: CarModel[] = [
  { id: '3xo', name: 'Mahindra XUV 3XO', brand: 'Mahindra', years: '2024 - 2025', slot: 'Center Console Tray', price: 2098, badge: 'New Arrival', image: threeXoImg },
  { id: 'fronx', name: 'Maruti Suzuki Fronx', brand: 'Maruti Suzuki', years: '2023 - 2025', slot: 'Center Console Tray', price: 2098, badge: 'Best Seller', image: fronxEtcImg },
  { id: 'baleno', name: 'Maruti Suzuki Baleno', brand: 'Maruti Suzuki', years: '2022 - 2025', slot: 'Cup Holder & Storage Cavity', price: 2098, badge: 'Direct OEM Fit', image: fronxEtcImg },
  { id: 'taisor', name: 'Toyota Urban Cruiser Taisor', brand: 'Toyota', years: '2024 - 2025', slot: 'Under-Dashboard Console Tray', price: 2098, badge: 'New Release', image: fronxEtcImg },
  { id: 'glanza', name: 'Toyota Glanza', brand: 'Toyota', years: '2022 - 2025', slot: 'Gear Lever Lower Storage', price: 2098, badge: 'Direct OEM Fit', image: fronxEtcImg },
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga', brand: 'Maruti Suzuki', years: '2019 - 2025', slot: 'Center Console Cooled Cup Space', price: 2098, badge: 'High Demand', image: ertigaImg },
  { id: 'swift-2024', name: 'Maruti Suzuki Swift (4th Gen)', brand: 'Maruti Suzuki', years: '2024 - 2025', slot: 'Dedicated Wireless Tray', price: 2098, badge: 'Latest Gen', image: swiftDzireImg },
  { id: 'dzire', name: 'Maruti Suzuki Swift Dzire', brand: 'Maruti Suzuki', years: '2020 - 2025', slot: 'Center Console Lower Pocket', price: 2098, badge: 'Direct OEM Fit', image: swiftDzireImg },
  { id: 'universal', name: 'Universal Automotive Charging Pad', brand: 'Universal', years: 'All Models', slot: 'Flat Dash & Console Surfaces', price: 2098, badge: 'Universal Fit', image: universalPadImg },
];

export default function VehicleSpecific() {
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const brands = ['All', 'Maruti Suzuki', 'Toyota', 'Mahindra', 'Universal'];

  const filteredVehicles = vehicleModels.filter(v => {
    const matchesBrand = selectedBrand === 'All' || v.brand === selectedBrand;
    const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          v.years.includes(searchQuery);
    return matchesBrand && matchesSearch;
  });

  const handleAddToCart = (id: string) => {
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] py-10 md:py-16 px-4 sm:px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        
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
          <span className="text-[#0A1E3F] font-semibold">Vehicle-Specific Docks</span>
        </div>

        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-[#0A1E3F] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
              OEM Precision Integration
            </span>
            <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
              Vehicle Specific & <span className="text-[#0A1E3F]">Custom Fit</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              3D scanned to match your vehicle's factory interior console geometry down to 0.2mm. Enjoy zero rattles, no dangling wires, and instant 25W Qi2 charging.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="w-full lg:w-80 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search car model or year..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF7F0] border border-[#D6CDB8] focus:border-[#0A1E3F] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#0A1E3F] placeholder-gray-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                selectedBrand === brand
                  ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-[0_0_15px_rgba(4,217,255,0.3)]'
                  : 'bg-[#FAF7F0] text-gray-600 border border-[#E2DAC8] hover:border-[#D6CDB8] hover:text-[#0A1E3F]'
              }`}
            >
              {brand === 'All' ? 'All Vehicles' : brand}
            </button>
          ))}
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-12 text-center my-8">
            <Car className="w-12 h-12 text-[#0A1E3F] mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-bold text-[#0A1E3F] mb-2 uppercase">No exact match found</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              We engineer custom docks for all car models. You can also use our Universal Charging Pad or request a custom 3D scan.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedBrand('All'); }}
              className="px-6 py-2.5 rounded-xl bg-[#EBE5D9] border border-[#D6CDB8] text-xs font-bold uppercase tracking-wider text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#F4F0E6] transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => {
              const isAdded = addedItems[vehicle.id];
              return (
                <div
                  key={vehicle.id}
                  className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-6 hover:border-[#0A1E3F]/70 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(4,217,255,0.1)]"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F] border border-[#0A1E3F]/30">
                        {vehicle.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-600">
                        {vehicle.years}
                      </span>
                    </div>

                    {/* Image Stage */}
                    <div className="h-44 bg-[#F4F0E6] rounded-xl border border-[#E2DAC8] p-0 flex items-center justify-center mb-5 overflow-hidden">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
                      />
                    </div>

                    {/* Info */}
                    <h3 className="font-bold text-base text-[#0A1E3F] group-hover:text-[#0A1E3F] transition-colors mb-1">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-4 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F]"></span>
                      Fitment: {vehicle.slot}
                    </p>
                  </div>

                  {/* Pricing & Add to Cart */}
                  <div className="pt-4 border-t border-[#E2DAC8] mt-auto">
                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-[10px] text-gray-600 uppercase tracking-wider block">OEM Precision Price</span>
                        <span className="text-2xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                          ₹{vehicle.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-400">
                        In Stock (Ships in 24h)
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(vehicle.id)}
                      className="w-full bg-[#0A1E3F] text-[#F4F0E6] hover:bg-[#152B52] border border-transparent font-bold uppercase tracking-wider py-3 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
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
        )}

        {/* Custom Request Banner */}
        <div className="mt-16 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-['Anton'] uppercase text-[#0A1E3F] tracking-wide">
              Don't see your car listed?
            </h3>
            <p className="text-gray-600 text-sm max-w-xl">
              We produce custom bespoke 3D-scanned docks for luxury and performance cars upon request. Send us your console photo and our engineering team will fabricate your custom dock.
            </p>
          </div>
          <a
            href="mailto:support@qicdock.com?subject=Custom%20Dock%20Request"
            className="whitespace-nowrap px-6 py-3.5 rounded-xl bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(4,217,255,0.3)]"
          >
            Request Custom Fit Dock
          </a>
        </div>

      </div>
    </div>
  );
}
