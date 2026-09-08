import React, { useState } from 'react';
import { Minus, Plus, Trash2, Tag, ShieldCheck, Truck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import leftMountImg from '../assets/images/m1.png';

export default function CartPage() {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Ultimate All-in-One Kit',
      variant: 'Charger + 5 Mounts',
      price: 2594,
      originalPrice: 3694,
      quantity: 1,
      image: leftMountImg,
    },
    {
      id: 2,
      name: 'Car Pad Core Mount',
      variant: 'Universal Fit',
      price: 899,
      originalPrice: 1299,
      quantity: 1,
      image: centerMountImg,
    }
  ]);

  const handleQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const handleRemove = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.trim() !== '') {
      setCouponApplied(true);
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = couponApplied ? Math.floor(subtotal * 0.1) : 0; // 10% off for example
  const shipping = subtotal > 999 ? 0 : 150;
  const total = subtotal - discount + shipping;

  const suggestions = [
    {
      id: 3,
      name: 'Air Vent Clip Pro',
      price: '₹399',
      image: centerMountImg,
    },
    {
      id: 4,
      name: 'Desktop Wall Base',
      price: '₹299',
      image: leftMountImg,
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-6 pb-24 px-4 sm:px-6 lg:px-8 font-['Ubuntu']">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-[#04D9FF] transition-colors flex items-center gap-2">
            ← Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-white uppercase mb-8 md:mb-12">
          Your Cart <span className="text-gray-600">({cartItems.length})</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#121212] border border-[#262626] rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-20 h-20 bg-[#04D9FF]/10 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-8 h-8 text-[#04D9FF]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md">Looks like you haven't added any products to your cart yet. Explore our high-performance charging solutions.</p>
            <Link to="/categories" className="bg-[#04D9FF] hover:bg-white text-black py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Col: Cart Items */}
            <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-[#121212] border border-[#262626] rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 relative group hover:border-[#444] transition-colors">
                  
                  {/* Remove btn (Mobile absolute, desktop standard) */}
                  <button 
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-4 right-4 sm:static sm:order-last w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="w-24 h-24 sm:w-28 sm:h-28 bg-[#050505] rounded-xl border border-[#333] flex items-center justify-center overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform" />
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-1 leading-tight pr-8 sm:pr-0">{item.name}</h3>
                        <p className="text-xs md:text-sm text-[#04D9FF] font-medium">{item.variant}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-xl md:text-2xl font-['Anton'] tracking-wide">₹{(item.price * item.quantity).toLocaleString()}</div>
                        {item.originalPrice > item.price && (
                          <div className="text-xs text-gray-500 line-through">₹{(item.originalPrice * item.quantity).toLocaleString()}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Qty Selector */}
                      <div className="flex items-center bg-[#050505] border border-[#333] rounded-lg overflow-hidden h-9">
                        <button 
                          onClick={() => handleQuantity(item.id, -1)}
                          className="w-9 h-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-10 h-full flex items-center justify-center text-sm font-bold border-x border-[#333]">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => handleQuantity(item.id, 1)}
                          className="w-9 h-full flex items-center justify-center hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Right Col: Summary & Checkout */}
            <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 sticky top-28">
              
              {/* Coupon Section */}
              <div className="bg-[#121212] border border-[#262626] rounded-2xl md:rounded-3xl p-5 md:p-6 mb-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-widest text-white">
                  <Tag className="w-4 h-4 text-[#04D9FF]" /> Have a coupon?
                </div>
                
                {couponApplied ? (
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2.5 text-[#22C55E]">
                      <CheckCircle2 className="w-5 h-5" />
                      <div>
                        <div className="text-sm font-bold uppercase tracking-wider">{couponCode} APPLIED</div>
                        <div className="text-xs">10% Off your order</div>
                      </div>
                    </div>
                    <button onClick={removeCoupon} className="text-gray-500 hover:text-white text-xs font-bold uppercase underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="ENTER CODE" 
                      className="flex-1 bg-[#050505] border border-[#333] rounded-xl px-4 py-3 text-sm font-bold text-white uppercase focus:outline-none focus:border-[#04D9FF] transition-colors placeholder:text-gray-600"
                    />
                    <button 
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="bg-white/10 hover:bg-white/20 text-white disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors border border-[#333]"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-[#121212] border border-[#262626] rounded-2xl md:rounded-3xl p-5 md:p-6">
                <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-[#22C55E]">
                      <span>Discount ({couponCode})</span>
                      <span className="font-bold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-[#04D9FF] font-bold uppercase tracking-wider text-xs">Free</span>
                    ) : (
                      <span className="font-bold">₹{shipping.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#333] pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-base text-white font-medium">Total</span>
                    <span className="text-3xl font-['Anton'] text-[#04D9FF] tracking-wide">₹{total.toLocaleString()}</span>
                  </div>
                  <p className="text-right text-xs text-gray-500 mt-1">Includes GST</p>
                </div>

                <button className="w-full bg-[#04D9FF] hover:bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-[0_5px_20px_rgba(4,217,255,0.3)] transition-colors flex justify-center items-center gap-2 mb-4">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure 256-bit Encryption
                </div>
              </div>

              {/* Value Props under summary */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#121212] border border-[#262626] rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                  <Truck className="w-5 h-5 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Free Express<br/>Shipping</span>
                </div>
                <div className="bg-[#121212] border border-[#262626] rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">1-Year Hardware<br/>Warranty</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Suggestions Section */}
        {cartItems.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#1a1a1a]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-['Anton'] tracking-wide text-white uppercase">
                Complete Your <span className="text-[#04D9FF]">Setup</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {suggestions.map((item) => (
                <div key={item.id} className="bg-[#121212] border border-[#262626] rounded-xl p-3 flex flex-col group hover:border-[#444] transition-colors relative overflow-hidden">
                  <div className="w-full h-24 sm:h-28 bg-[#050505] rounded-lg border border-[#333] mb-3 flex items-center justify-center p-3 relative z-10">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                  <div className="flex justify-between items-center mt-auto pt-1">
                    <span className="text-sm sm:text-base font-['Anton'] text-[#04D9FF] tracking-wide">{item.price}</span>
                    <button className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 hover:bg-[#04D9FF] hover:text-black text-white flex items-center justify-center transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
