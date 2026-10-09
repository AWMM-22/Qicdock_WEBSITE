import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Maximize2, 
  X, 
  Check, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Share2, 
  Copy,
  ExternalLink,
  Minus,
  Plus,
  ArrowRight
} from 'lucide-react';
import { CAR_PRODUCTS, getCarProductBySlug, getRelatedCarProducts, CarProduct } from '../data/carProducts';
import { addToCart } from '../lib/cart';

export default function CarProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const product: CarProduct = getCarProductBySlug(slug || '') || CAR_PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCockpit, setIsAddedToCockpit] = useState(false);
  const [isCopiedCode, setIsCopiedCode] = useState(false);
  const [isCopiedShare, setIsCopiedShare] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset active image and quantity when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    setIsAddedToCockpit(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const currentIndex = CAR_PRODUCTS.findIndex(p => p.id === product.id);
  const prevProduct = CAR_PRODUCTS[(currentIndex - 1 + CAR_PRODUCTS.length) % CAR_PRODUCTS.length];
  const nextProduct = CAR_PRODUCTS[(currentIndex + 1) % CAR_PRODUCTS.length];
  const relatedProducts = getRelatedCarProducts(product.id, 4);

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart({
      id: `car-${product.id}`,
      name: product.name,
      variant: product.shortName,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantity,
      image: product.images[0]
    });

    setIsAddedToCockpit(true);
    setTimeout(() => {
      setIsAddedToCockpit(false);
    }, 2800);
  };

  const handleBuyNow = () => {
    addToCart({
      id: `car-${product.id}`,
      name: product.name,
      variant: product.shortName,
      price: product.price,
      originalPrice: product.originalPrice,
      quantity: quantity,
      image: product.images[0]
    });

    navigate('/cart');
  };

  const copyCouponCode = () => {
    navigator.clipboard.writeText('NEW10');
    setIsCopiedCode(true);
    setTimeout(() => setIsCopiedCode(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopiedShare(true);
      setTimeout(() => setIsCopiedShare(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] py-2 sm:py-4 px-3 sm:px-6 lg:px-10 selection:bg-[#0A1E3F] selection:text-[#FAF7F0]">
      <div className="max-w-[1360px] mx-auto">

        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 border-b border-[#E2DAC8] pb-2 text-[10px] sm:text-xs">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1.5 text-gray-600">
            <Link to="/" className="hover:text-[#0A1E3F] transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link 
              to={
                product.category === 'Home & Office' 
                  ? '/category/home-office' 
                  : product.category === 'Car Specific' 
                  ? '/category/vehicle-specific' 
                  : '/categories'
              } 
              className="hover:text-[#0A1E3F] transition-colors"
            >
              {product.category || 'Products'}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-[#0A1E3F] font-bold truncate max-w-[240px] sm:max-w-md">
              {product.shortName || product.name}
            </span>
          </nav>

          {/* Quick Prev / Grid / Next Navigation */}
          <div className="flex items-center gap-1 text-gray-600">
            <Link 
              to={`/product/${prevProduct.slug}`}
              title={`Previous: ${prevProduct.shortName}`}
              className="p-1.5 hover:text-[#0A1E3F] hover:bg-[#0A1E3F]/10 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link 
              to="/categories"
              title="All Categories & Docks"
              className="p-1.5 hover:text-[#0A1E3F] hover:bg-[#0A1E3F]/10 rounded transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
            </Link>
            <Link 
              to={`/product/${nextProduct.slug}`}
              title={`Next: ${nextProduct.shortName}`}
              className="p-1.5 hover:text-[#0A1E3F] hover:bg-[#0A1E3F]/10 rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-start mb-6">
          
          {/* Left Column: Image Gallery Slider & Thumbnails */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            
            {/* Main Image Stage */}
            <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl overflow-hidden group shadow-sm flex items-center justify-center p-2">
              
              {/* Badges */}
              <div className="absolute top-3 right-3 z-20 flex flex-col items-end gap-1.5">
                <span className="bg-red-600 text-white font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                  {product.discountPercentage}
                </span>
                {product.isHot && (
                  <span className="bg-[#0A1E3F] text-[#FAF7F0] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                    HOT
                  </span>
                )}
              </div>

              {/* Prev / Next Arrows */}
              <button 
                onClick={handlePrevImage}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#0A1E3F]/70 hover:bg-[#0A1E3F] text-[#FAF7F0] transition-all backdrop-blur-sm opacity-80 group-hover:opacity-100 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button 
                onClick={handleNextImage}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-[#0A1E3F]/70 hover:bg-[#0A1E3F] text-[#FAF7F0] transition-all backdrop-blur-sm opacity-80 group-hover:opacity-100 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Fullscreen Expand Button */}
              <button 
                onClick={() => setIsFullscreen(true)}
                aria-label="View Fullscreen"
                className="absolute bottom-3 left-3 z-20 p-2 rounded-lg bg-black/60 hover:bg-black text-white transition-all backdrop-blur-sm cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              {/* Product Main Display Image */}
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden p-2">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={`${product.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-contain transition-all duration-300 hover:scale-105 select-none"
                />
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {product.images.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-lg bg-[#FAF7F0] border-2 overflow-hidden transition-all duration-200 p-1 flex items-center justify-center group cursor-pointer ${
                      isActive 
                        ? 'border-[#0A1E3F] shadow-sm scale-[1.02]' 
                        : 'border-[#E2DAC8] opacity-75 hover:opacity-100 hover:border-[#0A1E3F]/40'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-contain"
                    />

                    {/* Marker for extra thumbnails */}
                    {idx >= 2 && (
                      <div className="absolute inset-0 bg-[#0A1E3F]/20 flex items-center justify-center">
                        <div className="w-5 h-5 rounded-full bg-[#0A1E3F]/80 border border-[#FAF7F0]/60 flex items-center justify-center text-white">
                          <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[5px] border-l-white border-b-[3px] border-b-transparent ml-0.5" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Title, Pricing, Actions & Offers */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-4 sm:space-y-5">
            
            {/* Title */}
            <div>
              <h1 className="text-xl sm:text-2xl xl:text-3xl font-bold tracking-tight text-[#0A1E3F] leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline flex-wrap gap-2.5">
              <span className="text-gray-500 line-through text-base sm:text-lg font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}.00
              </span>
              <span className="text-[#0A1E3F] text-2xl sm:text-3xl font-extrabold tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}.00
              </span>
              <span className="text-[11px] sm:text-xs text-emerald-800 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Inclusive of all taxes
              </span>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-[#D6CDB8] rounded-lg bg-[#FAF7F0] px-2 py-1.5 sm:w-32">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-1.5 text-gray-600 hover:text-[#0A1E3F] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-[#0A1E3F] text-base px-2">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-1.5 text-gray-600 hover:text-[#0A1E3F] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cockpit Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#0A1E3F] hover:bg-[#152B52] active:scale-[0.98] text-[#FAF7F0] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isAddedToCockpit ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    <span>ADDED TO CART!</span>
                  </>
                ) : (
                  <span>ADD TO CART</span>
                )}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-transparent hover:bg-white active:scale-[0.98] text-[#0A1E3F] border-2 border-[#0A1E3F] font-bold text-xs sm:text-sm uppercase tracking-wider py-3.5 px-5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Additional Offer Box */}
            <div className="relative border border-dashed border-[#0A1E3F] rounded-xl p-4 sm:p-5 bg-[#FAF7F0] mt-3">
              {/* Tab Header Badge */}
              <div className="absolute -top-3 left-4 bg-[#0A1E3F] text-[#FAF7F0] font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                Additional Offer
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0A1E3F] flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-800">
                    Additional 10% Off! Use Code:{' '}
                    <button 
                      onClick={copyCouponCode}
                      className="font-extrabold text-[#0A1E3F] tracking-wider underline hover:text-[#152B52] transition-colors ml-1 cursor-pointer"
                      title="Click to copy coupon"
                    >
                      NEW10
                    </button>
                    {isCopiedCode && (
                      <span className="text-xs text-emerald-700 ml-2 font-bold">(Copied!)</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#0A1E3F] flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-800">
                    No Cost EMI Options Available on Major Credit Cards.
                  </p>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-2 pt-3 text-xs sm:text-sm text-gray-700 border-t border-[#E2DAC8]">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-[#0A1E3F]">Category:</span>
                <Link to="/category/vehicle-specific" className="text-gray-700 hover:text-[#0A1E3F] underline transition-colors">
                  {product.category}
                </Link>
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-[#0A1E3F]">Tags:</span>
                <span className="text-gray-600 leading-relaxed">
                  {product.tags.join(', ')}
                </span>
              </div>

              {/* Social Share Icons */}
              <div className="flex items-center gap-3 pt-1">
                <span className="font-bold text-[#0A1E3F]">Share:</span>
                <div className="flex items-center gap-2.5 text-gray-600">
                  {/* Facebook */}
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on Facebook"
                    className="hover:text-[#0A1E3F] transition-colors p-1"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on X"
                    className="hover:text-[#0A1E3F] transition-colors p-1"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a 
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(product.name)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on Pinterest"
                    className="hover:text-[#0A1E3F] transition-colors p-1"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* Copy Link */}
                  <button 
                    onClick={handleShare}
                    title="Copy Link or Share"
                    aria-label="Copy link"
                    className="hover:text-[#0A1E3F] transition-colors p-1 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  {isCopiedShare && (
                    <span className="text-xs text-emerald-700 font-bold">Link Copied!</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Product Description Section */}
        {product.description && (
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-4 sm:p-6 mb-4 shadow-sm">
            <div className="border-b border-[#E2DAC8] pb-3 mb-3">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#0A1E3F] uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-[#0A1E3F] rounded-full inline-block" />
                Description
              </h2>
            </div>
            <div className="space-y-3 text-gray-700 text-xs sm:text-sm leading-relaxed">
              {product.description.split('\n\n').map((para, pIdx) => (
                <p key={pIdx} className="text-gray-700">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* About This Item Section */}
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-4 sm:p-6 mb-4 shadow-sm">
          <div className="border-b border-[#E2DAC8] pb-3 mb-3">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#0A1E3F] uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#0A1E3F] rounded-full inline-block" />
              About This Item
            </h2>
          </div>
          <ul className="space-y-3 text-xs sm:text-sm">
            {(product.aboutThisItem || product.features).map((item, idx) => {
              const boldMatch = item.match(/^(?:•\s*)?\*\*(.*?)\*\*\s*(.*)$/);
              if (boldMatch) {
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F] mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-[#0A1E3F] font-bold">{boldMatch[1]} </strong>
                      <span className="text-gray-700">{boldMatch[2]}</span>
                    </span>
                  </li>
                );
              }
              const colonMatch = item.match(/^(?:•\s*)?([^:]+):\s*(.*)$/);
              if (colonMatch) {
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F] mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">
                      <strong className="text-[#0A1E3F] font-bold">{colonMatch[1]}: </strong>
                      <span className="text-gray-700">{colonMatch[2]}</span>
                    </span>
                  </li>
                );
              }
              return (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0A1E3F] mt-1.5 flex-shrink-0" />
                  <span className="text-gray-700 leading-relaxed">{item.replace(/^•\s*/, '')}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Technical Specifications & Fitment Details */}
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="border-b border-[#E2DAC8] pb-3 mb-4">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#0A1E3F] uppercase">
              Factory Precision Engineering & Fitment
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm max-w-3xl">
            <h3 className="font-bold text-[#0A1E3F] uppercase tracking-wider text-xs">
              Technical Specifications
            </h3>
            <div className="space-y-1.5 text-gray-700">
              <div className="flex justify-between py-1.5 border-b border-[#E2DAC8]">
                <span className="text-gray-600">Charging Protocol:</span>
                <span className="font-medium text-[#0A1E3F] text-right">{product.specs.chargingSpeed}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2DAC8]">
                <span className="text-gray-600">Fitment Slot:</span>
                <span className="font-medium text-[#0A1E3F] text-right">{product.slot}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2DAC8]">
                <span className="text-gray-600">Supported Model Years:</span>
                <span className="font-medium text-[#0A1E3F] text-right">{product.years}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2DAC8]">
                <span className="text-gray-600">Material Grade:</span>
                <span className="font-medium text-[#0A1E3F] text-right">{product.specs.material}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#E2DAC8]">
                <span className="text-gray-600">Warranty:</span>
                <span className="font-medium text-emerald-700 text-right">{product.specs.warranty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-8 pt-6 border-t border-[#E2DAC8]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-2">
            <div>
              <span className="text-[#0A1E3F] text-[10px] font-bold uppercase tracking-[0.2em] block mb-0.5">
                More Vehicle Solutions
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase text-[#0A1E3F] tracking-tight">
                Related Products
              </h2>
            </div>
            <Link 
              to="/category/vehicle-specific"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A1E3F] hover:underline transition-colors"
            >
              <span>View All Car Docks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Horizontal Recommendations Track */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar pb-3 pt-1 -mx-3 px-3 sm:mx-0 sm:px-0">
            {relatedProducts.map((rel) => (
              <div 
                key={rel.id}
                className="w-[260px] sm:w-[300px] shrink-0 bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-3.5 hover:border-[#0A1E3F] transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-sm"
              >
                <div className="flex gap-3 mb-2.5">
                  {/* Thumbnail on left */}
                  <Link 
                    to={`/product/${rel.slug}`} 
                    className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-[#F4F0E6] rounded-lg border border-[#E2DAC8] p-1 overflow-hidden group-hover:border-[#0A1E3F]/40 transition-colors flex items-center justify-center"
                  >
                    <img 
                      src={rel.images[0]} 
                      alt={rel.name} 
                      loading="lazy" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                    />
                  </Link>

                  {/* Info on right */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#0A1E3F]/10 text-[#0A1E3F]">
                          {rel.badge}
                        </span>
                        <span className="text-[9px] font-semibold text-gray-500 truncate">
                          {rel.years}
                        </span>
                      </div>
                      <Link to={`/product/${rel.slug}`}>
                        <h3 className="font-bold text-xs text-[#0A1E3F] group-hover:underline transition-colors line-clamp-2 leading-tight">
                          {rel.shortName || rel.name}
                        </h3>
                      </Link>
                    </div>
                    <p className="text-[10px] text-gray-600 line-clamp-1">
                      Fit: {rel.slot}
                    </p>
                  </div>
                </div>

                {/* Price & Action Link */}
                <div className="pt-2 border-t border-[#E2DAC8] mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-[10px] line-through block leading-none">
                      ₹{rel.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-[#0A1E3F] leading-tight">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Link 
                    to={`/product/${rel.slug}`}
                    className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#FAF7F0] font-bold text-[10px] sm:text-[11px] uppercase tracking-wider px-3 py-1.5 rounded transition-all"
                  >
                    View Dock
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button 
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <img 
            src={product.images[activeImageIndex]} 
            alt={product.name}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none bg-white p-4 rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}
