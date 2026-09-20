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
    <div className="min-h-screen bg-[#11141A] text-[#F4F0E6] py-8 sm:py-12 px-4 sm:px-6 lg:px-12 selection:bg-[#00C8EC] selection:text-black">
      <div className="max-w-[1440px] mx-auto">

        {/* Top Breadcrumb & Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-2 text-gray-400">
            <Link to="/" className="hover:text-[#00C8EC] transition-colors">
              Home
            </Link>
            <span className="text-gray-600">/</span>
            <Link to="/category/vehicle-specific" className="hover:text-[#00C8EC] transition-colors">
              Car Specific
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gray-200 font-medium truncate max-w-[280px] sm:max-w-md lg:max-w-lg">
              {product.name}
            </span>
          </nav>

          {/* Quick Prev / Grid / Next Navigation */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <Link 
              to={`/product/${prevProduct.slug}`}
              title={`Previous: ${prevProduct.shortName}`}
              className="p-2 hover:text-[#00C8EC] hover:bg-white/5 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </Link>
            <Link 
              to="/category/vehicle-specific"
              title="All Car Specific Models"
              className="p-2 hover:text-[#00C8EC] hover:bg-white/5 rounded-lg transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
            </Link>
            <Link 
              to={`/product/${nextProduct.slug}`}
              title={`Next: ${nextProduct.shortName}`}
              className="p-2 hover:text-[#00C8EC] hover:bg-white/5 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Product Layout: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start mb-16">
          
          {/* Left Column: Image Gallery Slider & Thumbnails */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Image Stage */}
            <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#181D26] border-2 border-white/10 rounded-none overflow-hidden group shadow-2xl flex items-center justify-center p-0">
              
              {/* Badges */}
              <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
                <span className="bg-[#00C8EC] text-black font-extrabold text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-none shadow-md">
                  {product.discountPercentage}
                </span>
                {product.isHot && (
                  <span className="bg-[#FF2E2E] text-white font-extrabold text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-none shadow-md animate-pulse">
                    HOT
                  </span>
                )}
              </div>

              {/* Prev / Next Arrows */}
              <button 
                onClick={handlePrevImage}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-none bg-black/60 hover:bg-[#00C8EC] text-white hover:text-black transition-all backdrop-blur-sm opacity-80 group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button 
                onClick={handleNextImage}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-none bg-black/60 hover:bg-[#00C8EC] text-white hover:text-black transition-all backdrop-blur-sm opacity-80 group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Fullscreen Expand Button */}
              <button 
                onClick={() => setIsFullscreen(true)}
                aria-label="View Fullscreen"
                className="absolute bottom-4 left-4 z-20 p-2.5 rounded-none bg-black/60 hover:bg-black text-white hover:text-[#00C8EC] transition-all backdrop-blur-sm border border-white/10"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Product Main Display Image */}
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden p-0">
                <img 
                  src={product.images[activeImageIndex]} 
                  alt={`${product.name} view ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 hover:scale-105 select-none"
                />
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {product.images.map((img, idx) => {
                const isActive = activeImageIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-square rounded-none bg-[#181D26] border-2 overflow-hidden transition-all duration-200 p-0 flex items-center justify-center group ${
                      isActive 
                        ? 'border-[#00C8EC] shadow-[0_0_15px_rgba(0,200,236,0.35)] scale-[1.02]' 
                        : 'border-white/10 hover:border-white/30 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />

                    {/* Unboxing / Video Marker for 3rd and 4th thumbnails to match reference */}
                    {idx >= 2 && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-black/70 border border-white/30 flex items-center justify-center text-white">
                          <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[7px] border-l-white border-b-[4px] border-b-transparent ml-0.5" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Title, Pricing, Actions & Offers */}
          <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
            
            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline flex-wrap gap-3">
              <span className="text-gray-400 line-through text-lg sm:text-xl font-normal">
                ₹{product.originalPrice.toLocaleString('en-IN')}.00
              </span>
              <span className="text-[#00C8EC] text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                ₹{product.price.toLocaleString('en-IN')}.00
              </span>
              <span className="text-xs sm:text-sm text-gray-300 font-medium ml-1">
                Taxes included
              </span>
            </div>

            {/* Subtitle / Model Tagline */}
            <div className="text-gray-300 text-sm sm:text-base font-normal leading-relaxed">
              {product.subtitle}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Quantity Selector */}
              <div className="flex items-center justify-between border border-white/20 rounded-lg bg-[#181D26] px-2 py-1.5 sm:w-32">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-bold text-white text-base px-2">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cockpit Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#00C8EC] hover:bg-[#20d8fa] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-lg transition-all shadow-[0_4px_20px_rgba(0,200,236,0.3)] flex items-center justify-center gap-2"
              >
                {isAddedToCockpit ? (
                  <>
                    <Check className="w-4 h-4 text-black stroke-[3]" />
                    <span>ADDED TO COCKPIT!</span>
                  </>
                ) : (
                  <span>ADD TO COCKPIT</span>
                )}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#00C8EC] hover:bg-[#20d8fa] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider py-4 px-6 rounded-lg transition-all shadow-[0_4px_20px_rgba(0,200,236,0.3)] flex items-center justify-center gap-2"
              >
                <span>BUY NOW</span>
              </button>
            </div>

            {/* Additional Offer Box (Matches Exact Reference UI) */}
            <div className="relative border border-dashed border-[#00C8EC] rounded-xl p-5 sm:p-6 bg-[#161B24]/70 mt-6">
              {/* Tab Header Badge */}
              <div className="absolute -top-3.5 left-5 bg-[#00C8EC] text-black font-bold text-xs uppercase tracking-wider px-3.5 py-1 rounded-md shadow-sm">
                Additional Offer
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#00C8EC] flex-shrink-0" />
                  <p className="text-sm text-gray-200">
                    Additional 10% Off! Use Code:{' '}
                    <button 
                      onClick={copyCouponCode}
                      className="font-extrabold text-white tracking-wider underline hover:text-[#00C8EC] transition-colors ml-1 cursor-pointer"
                      title="Click to copy coupon"
                    >
                      NEW10
                    </button>
                    {isCopiedCode && (
                      <span className="text-xs text-[#00C8EC] ml-2 font-bold">(Copied!)</span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-3.5 h-3.5 rounded-sm bg-[#00C8EC] flex-shrink-0" />
                  <p className="text-sm text-gray-200">
                    No Cost EMI Options Available on Credit Card.
                  </p>
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="space-y-2.5 pt-4 text-xs sm:text-sm text-gray-300 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-white">Category:</span>
                <Link to="/category/vehicle-specific" className="text-gray-300 hover:text-[#00C8EC] transition-colors">
                  {product.category}
                </Link>
              </div>

              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-bold text-white">Tags:</span>
                <span className="text-gray-300 leading-relaxed">
                  {product.tags.join(', ')}
                </span>
              </div>

              {/* Social Share Icons */}
              <div className="flex items-center gap-4 pt-2">
                <span className="font-bold text-white">Share:</span>
                <div className="flex items-center gap-3 text-gray-400">
                  {/* Facebook */}
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on Facebook"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on X"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* Pinterest */}
                  <a 
                    href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(product.name)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on Pinterest"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    aria-label="Share on LinkedIn"
                    className="hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>

                  {/* Copy Link / Native Share */}
                  <button 
                    onClick={handleShare}
                    title="Copy Link or Share"
                    aria-label="Copy link"
                    className="hover:text-[#00C8EC] transition-colors p-1"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  {isCopiedShare && (
                    <span className="text-xs text-[#00C8EC] font-bold">Link Copied!</span>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Specifications & Fitment Details */}
        <div className="bg-[#181D26] border border-white/10 rounded-2xl p-6 sm:p-8 mb-16 shadow-xl">
          <div className="border-b border-white/10 pb-4 mb-6">
            <h2 className="text-xl sm:text-2xl font-['Anton'] tracking-wide text-white uppercase">
              Factory Precision Engineering & Fitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-4">
              <h3 className="font-bold text-[#00C8EC] uppercase tracking-wider text-xs">
                Key Features
              </h3>
              <ul className="space-y-2.5 text-gray-300">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00C8EC] mt-2 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-[#00C8EC] uppercase tracking-wider text-xs">
                Technical Specifications
              </h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Charging Protocol:</span>
                  <span className="font-medium text-white text-right">{product.specs.chargingSpeed}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Fitment Slot:</span>
                  <span className="font-medium text-white text-right">{product.slot}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Supported Model Years:</span>
                  <span className="font-medium text-white text-right">{product.years}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Material Grade:</span>
                  <span className="font-medium text-white text-right">{product.specs.material}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-400">Warranty:</span>
                  <span className="font-medium text-emerald-400 text-right">{product.specs.warranty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#00C8EC] text-xs font-bold uppercase tracking-[0.2em] block mb-1">
                More Vehicle Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-['Anton'] uppercase text-white tracking-wide">
                Related Products
              </h2>
            </div>
            <Link 
              to="/category/vehicle-specific"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00C8EC] hover:text-white transition-colors"
            >
              <span>View All Car Docks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <div 
                key={rel.id}
                className="bg-[#181D26] border-2 border-white/10 rounded-none p-5 hover:border-[#00C8EC]/70 transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 shadow-lg"
              >
                <div>
                  {/* Badge & Years */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none bg-[#00C8EC]/10 text-[#00C8EC] border border-[#00C8EC]/30">
                      {rel.badge}
                    </span>
                    <span className="text-[11px] font-semibold text-gray-400">
                      {rel.years}
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <Link 
                    to={`/product/${rel.slug}`} 
                    className="block h-44 w-full bg-[#11141A] rounded-none border border-white/5 p-0 mb-4 overflow-hidden group-hover:border-[#00C8EC]/40 transition-colors"
                  >
                    <img 
                      src={rel.images[0]} 
                      alt={rel.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Title & Slot */}
                  <Link to={`/product/${rel.slug}`}>
                    <h3 className="font-bold text-sm text-white group-hover:text-[#00C8EC] transition-colors line-clamp-2 mb-1">
                      {rel.name}
                    </h3>
                  </Link>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-1">
                    Fitment: {rel.slot}
                  </p>
                </div>

                {/* Price & Action Link */}
                <div className="pt-3 border-t border-white/10 mt-auto flex items-center justify-between">
                  <div>
                    <span className="text-gray-400 text-[10px] line-through block">
                      ₹{rel.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="text-lg font-bold text-[#00C8EC]">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <Link 
                    to={`/product/${rel.slug}`}
                    className="bg-[#00C8EC] hover:bg-[#20d8fa] text-black font-extrabold text-[11px] uppercase tracking-wider px-4 py-2 rounded-none transition-all"
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
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <button 
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen"
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <img 
            src={product.images[activeImageIndex]} 
            alt={product.name}
            className="max-w-[90vw] max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}
