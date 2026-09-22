import { useState, useMemo } from 'react';
import { Zap, Shield, CheckCircle2, Search, Car, ChevronRight, Filter, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { addToCart } from '../lib/cart';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import ertigaImg from '../assets/images/Ertiga.webp';
import swiftDzireImg from '../assets/images/Dzire and Swift.webp';
import universalPadImg from '../assets/images/Universal_.webp';
import threeXoImg from '../assets/images/3XO.webp';

interface CarModel {
  id: string;
  name: string;
  modelName: string;
  brand: 'Maruti Suzuki' | 'Toyota' | 'Mahindra' | 'Universal';
  years: string;
  slot: string;
  price: number;
  badge: string;
  image: string;
  isCustomFit?: boolean;
}

const vehicleModels: CarModel[] = [
  // Maruti Suzuki
  { id: 'fronx', name: 'Maruti Suzuki Fronx', modelName: 'Fronx', brand: 'Maruti Suzuki', years: '2023 - 2025', slot: 'Center Console Lower Tray', price: 2349, badge: 'Best Seller', image: fronxEtcImg },
  { id: 'baleno', name: 'Maruti Suzuki Baleno', modelName: 'Baleno', brand: 'Maruti Suzuki', years: '2022 - 2025', slot: 'Cup Holder & Storage Cavity', price: 2349, badge: 'Direct OEM Fit', image: fronxEtcImg },
  { id: 'swift-2024', name: 'Maruti Suzuki Swift (4th Gen)', modelName: 'Swift', brand: 'Maruti Suzuki', years: '2024 - 2025', slot: 'Dedicated Wireless Tray', price: 2349, badge: 'Latest Gen', image: swiftDzireImg },
  { id: 'dzire', name: 'Maruti Suzuki Swift Dzire', modelName: 'Dzire', brand: 'Maruti Suzuki', years: '2020 - 2025', slot: 'Center Console Lower Pocket', price: 2349, badge: 'Direct OEM Fit', image: swiftDzireImg },
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga', modelName: 'Ertiga', brand: 'Maruti Suzuki', years: '2019 - 2025', slot: 'Center Console Cooled Cup Space', price: 2349, badge: 'High Demand', image: ertigaImg },
  { id: 'brezza', name: 'Maruti Suzuki Brezza', modelName: 'Brezza', brand: 'Maruti Suzuki', years: '2022 - 2025', slot: 'Under-AC Console Storage Pocket', price: 2349, badge: 'OEM 3D Scan', image: fronxEtcImg },
  { id: 'grand-vitara', name: 'Maruti Suzuki Grand Vitara', modelName: 'Grand Vitara', brand: 'Maruti Suzuki', years: '2022 - 2025', slot: 'Front Console Wireless Bay', price: 2349, badge: 'OEM 3D Scan', image: fronxEtcImg },

  // Toyota
  { id: 'taisor', name: 'Toyota Urban Cruiser Taisor', modelName: 'Taisor', brand: 'Toyota', years: '2024 - 2025', slot: 'Under-Dashboard Console Tray', price: 2349, badge: 'New Release', image: fronxEtcImg },
  { id: 'glanza', name: 'Toyota Glanza', modelName: 'Glanza', brand: 'Toyota', years: '2022 - 2025', slot: 'Gear Lever Lower Storage', price: 2349, badge: 'Direct OEM Fit', image: fronxEtcImg },
  { id: 'hyryder', name: 'Toyota Urban Cruiser Hyryder', modelName: 'Hyryder', brand: 'Toyota', years: '2022 - 2025', slot: 'Center Console Phone Deck', price: 2349, badge: 'OEM 3D Scan', image: fronxEtcImg },
  { id: 'innova-hycross', name: 'Toyota Innova Hycross', modelName: 'Innova Hycross', brand: 'Toyota', years: '2023 - 2025', slot: 'Bridge Console Storage Cavity', price: 2349, badge: 'OEM 3D Scan', image: fronxEtcImg },

  // Mahindra
  { id: '3xo', name: 'Mahindra XUV 3XO', modelName: 'XUV 3XO', brand: 'Mahindra', years: '2024 - 2025', slot: 'Center Console Tray', price: 2349, badge: 'New Arrival', image: threeXoImg },

  // Universal
  { id: 'universal', name: 'Universal Automotive Charging Pad', modelName: 'Universal Pad', brand: 'Universal', years: 'All Makes & Models', slot: 'Flat Dash & Console Surfaces', price: 2098, badge: 'Universal Fit', image: universalPadImg },
];

const brandModelMap: Record<string, string[]> = {
  'Maruti Suzuki': ['Fronx', 'Baleno', 'Swift', 'Dzire', 'Ertiga', 'Brezza', 'Grand Vitara'],
  'Toyota': ['Taisor', 'Glanza', 'Hyryder', 'Innova Hycross'],
  'Mahindra': ['XUV 3XO'],
  'Universal': ['Universal Pad'],
};

export default function VehicleSpecific() {
  const { isSoldOut } = useInventory();
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedModel, setSelectedModel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState<{ [key: string]: boolean }>({});

  const brands = ['All', 'Maruti Suzuki', 'Toyota', 'Mahindra', 'Universal'];

  // Available models based on selected brand
  const availableModels = useMemo(() => {
    if (selectedBrand === 'All') {
      const all = new Set<string>();
      Object.values(brandModelMap).forEach(models => models.forEach(m => all.add(m)));
      return Array.from(all);
    }
    return brandModelMap[selectedBrand] || [];
  }, [selectedBrand]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    setSelectedModel('All'); // reset model when brand changes
  };

  const filteredVehicles = useMemo(() => {
    return vehicleModels.filter(v => {
      const matchesBrand = selectedBrand === 'All' || v.brand === selectedBrand;
      const matchesModel = selectedModel === 'All' || v.modelName.toLowerCase() === selectedModel.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.modelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.years.includes(searchQuery) ||
        v.slot.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesBrand && matchesModel && matchesSearch;
    });
  }, [selectedBrand, selectedModel, searchQuery]);

  const handleAddToCart = (vehicle: CarModel) => {
    addToCart({
      id: `car-${vehicle.id}`,
      name: vehicle.name,
      variant: vehicle.slot,
      price: vehicle.price,
      originalPrice: Math.round(vehicle.price * 1.45),
      image: vehicle.image,
      quantity: 1
    });

    setAddedItems(prev => ({ ...prev, [vehicle.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [vehicle.id]: false }));
    }, 2500);
  };

  const resetAllFilters = () => {
    setSelectedBrand('All');
    setSelectedModel('All');
    setSearchQuery('');
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
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-[#0A1E3F] text-xs md:text-sm font-bold tracking-[0.2em] uppercase block">
              OEM Precision Fitment
            </span>
            <h1 className="text-3xl sm:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
              Vehicle Specific & <span className="text-[#0A1E3F]">Custom Fit</span>
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              3D laser-scanned to snap flush into your car's factory interior console cavity down to 0.2mm. Zero rattles, zero dangling wires, and 25W Qi2 MagSafe wireless fast charging.
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
              className="w-full bg-[#FAF7F0] border border-[#D6CDB8] focus:border-[#0A1E3F] rounded-none pl-11 pr-4 py-3 text-xs sm:text-sm text-[#0A1E3F] placeholder-gray-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Interactive Vehicle Selector & Matcher Control Hub */}
        <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F] rounded-none p-5 sm:p-6 mb-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-[#E2DAC8]">
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-[#0A1E3F]" />
              <h2 className="text-base sm:text-lg font-bold uppercase tracking-wider text-[#0A1E3F]">
                Select Vehicle Brand & Model
              </h2>
            </div>
            
            {(selectedBrand !== 'All' || selectedModel !== 'All' || searchQuery !== '') && (
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-[#0A1E3F] uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Selection</span>
              </button>
            )}
          </div>

          {/* Brand Buttons */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-600">
              Select Brand:
            </div>
            <div className="flex flex-wrap gap-2">
              {brands.map((brand) => {
                const isSelected = selectedBrand === brand;
                return (
                  <button
                    key={brand}
                    onClick={() => handleBrandChange(brand)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                      isSelected
                        ? 'bg-[#0A1E3F] text-[#FAF7F0] shadow-md'
                        : 'bg-[#F4F0E6] text-[#0A1E3F] border border-[#D6CDB8] hover:border-[#0A1E3F] hover:bg-[#EBE5D9]'
                    }`}
                  >
                    {brand === 'All' ? 'All Brands' : brand}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Selection Row (Shows when a brand or all is selected) */}
          {availableModels.length > 0 && (
            <div className="mt-5 pt-4 border-t border-[#E2DAC8] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0A1E3F] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0A1E3F]" />
                  <span>
                    {selectedBrand === 'All' ? 'Choose Car Model:' : `Choose ${selectedBrand} Model:`}
                  </span>
                </span>
                {selectedModel !== 'All' && (
                  <button
                    onClick={() => setSelectedModel('All')}
                    className="text-[10px] uppercase font-bold text-gray-600 hover:text-[#0A1E3F] transition-colors cursor-pointer"
                  >
                    Show All {selectedBrand !== 'All' ? selectedBrand : ''} Models
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedModel('All')}
                  className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                    selectedModel === 'All'
                      ? 'bg-[#0A1E3F] text-[#FAF7F0]'
                      : 'bg-[#FAF7F0] text-gray-700 border border-[#D6CDB8] hover:border-[#0A1E3F]'
                  }`}
                >
                  All {selectedBrand !== 'All' ? selectedBrand : 'Models'}
                </button>
                {availableModels.map((model) => {
                  const isSelected = selectedModel.toLowerCase() === model.toLowerCase();
                  return (
                    <button
                      key={model}
                      onClick={() => setSelectedModel(model)}
                      className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer rounded-none ${
                        isSelected
                          ? 'bg-[#0A1E3F] text-[#FAF7F0] font-bold shadow-sm'
                          : 'bg-[#FAF7F0] text-gray-700 border border-[#D6CDB8] hover:border-[#0A1E3F] hover:bg-[#EAE4D5]'
                      }`}
                    >
                      {model}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-[#FAF7F0] border-2 border-[#D6CDB8] rounded-none p-12 text-center my-8">
            <Car className="w-12 h-12 text-[#0A1E3F] mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-bold text-[#0A1E3F] mb-2 uppercase">No exact dock found for this filter</h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
              We fabricate custom 3D docks for all car models. You can also order our Universal Charging Pad or request a custom scan.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 rounded-none bg-[#0A1E3F] text-[#FAF7F0] text-xs font-bold uppercase tracking-wider hover:bg-[#152B52] transition-all"
              >
                Reset All Filters
              </button>
              <a
                href="mailto:support@qicdock.com?subject=Custom%20Dock%20Request"
                className="px-6 py-2.5 rounded-none bg-[#FAF7F0] border border-[#0A1E3F] text-xs font-bold uppercase tracking-wider text-[#0A1E3F] hover:bg-[#EBE5D9] transition-all"
              >
                Request Custom 3D Scan
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => {
              const isAdded = addedItems[vehicle.id];
              return (
                <div
                  key={vehicle.id}
                  className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-none p-6 hover:border-[#0A1E3F] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none bg-[#0A1E3F]/10 text-[#0A1E3F] border border-[#0A1E3F]/30">
                        {vehicle.badge}
                      </span>
                      <span className="text-[11px] font-semibold text-gray-600">
                        {vehicle.years}
                      </span>
                    </div>

                    {/* Image Stage - Edge-to-Edge and Clickable */}
                    <Link 
                      to={`/product/${vehicle.id}`} 
                      className="block w-full h-48 bg-[#F4F0E6] rounded-none border border-[#E2DAC8] p-0 flex items-center justify-center mb-5 overflow-hidden group-hover:border-[#0A1E3F]/40"
                    >
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover rounded-none group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                    </Link>

                    {/* Info */}
                    <Link to={`/product/${vehicle.id}`}>
                      <h3 className="font-bold text-base text-[#0A1E3F] hover:text-[#152B52] transition-colors mb-1">
                        {vehicle.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-600 mb-3 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#0A1E3F]"></span>
                      Fitment: {vehicle.slot}
                    </p>

                    {/* View Details Link */}
                    <Link 
                      to={`/product/${vehicle.id}`} 
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0A1E3F] hover:text-[#152B52] transition-colors uppercase tracking-wider mb-2"
                    >
                      <span>View Cockpit Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
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
                      <span className={`text-[11px] font-bold ${isSoldOut(vehicle.id) ? 'text-red-500' : 'text-emerald-700'}`}>
                        {isSoldOut(vehicle.id) ? 'Sold Out' : 'In Stock (Ships in 24h)'}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(vehicle)}
                        disabled={isSoldOut(vehicle.id)}
                        className={`flex-1 font-bold uppercase tracking-wider py-3 rounded-none text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          isSoldOut(vehicle.id)
                            ? 'bg-red-50 text-red-600 border border-red-200 cursor-not-allowed'
                            : 'bg-[#0A1E3F] text-[#F4F0E6] hover:bg-[#152B52] border border-transparent'
                        }`}
                      >
                        {isSoldOut(vehicle.id) ? (
                          <span>Sold Out</span>
                        ) : isAdded ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Added!</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <Link
                        to={`/product/${vehicle.id}`}
                        className="px-4 py-3 bg-[#EAE4D5] hover:bg-[#0A1E3F] text-[#0A1E3F] hover:text-[#F4F0E6] font-bold text-xs uppercase tracking-wider rounded-none transition-all flex items-center justify-center"
                        title="View details"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Custom Request Banner */}
        <div className="mt-16 bg-[#FAF7F0] border border-[#E2DAC8] rounded-none p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-['Anton'] uppercase text-[#0A1E3F] tracking-wide">
              Don't see your specific car model?
            </h3>
            <p className="text-gray-600 text-sm max-w-xl">
              We fabricate bespoke 3D-scanned docks for all Indian & international vehicles. Send us your console photos and our engineering team will manufacture your custom-fit wireless dock.
            </p>
          </div>
          <a
            href="mailto:support@qicdock.com?subject=Custom%20Dock%20Request"
            className="whitespace-nowrap px-6 py-3.5 rounded-none bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-widest transition-all shadow-md"
          >
            Request Custom 3D Scan
          </a>
        </div>

      </div>
    </div>
  );
}

