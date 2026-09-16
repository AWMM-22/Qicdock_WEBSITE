import React, { useState } from 'react';
import { Minus, Plus, Trash2, Tag, ShieldCheck, Truck, ArrowRight, Zap, CheckCircle2, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCartItems, saveCartItems } from '../lib/cart';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import leftMountImg from '../assets/images/m1.png';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const loadCashfreeScript = () => {
  return new Promise((resolve) => {
    if ((window as any).Cashfree) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function CartPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'CART' | 'ADDRESS' | 'SUCCESS'>('CART');
  const [paymentGateway, setPaymentGateway] = useState<'razorpay' | 'cashfree'>('razorpay');
  const [addressDetails, setAddressDetails] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine: '',
    state: '',
    country: 'India',
    pincode: ''
  });
  const [cartItems, setCartItems] = useState<any[]>(() => {
    const saved = getCartItems();
    if (saved && saved.length > 0) return saved;
    const initial = [
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
    ];
    saveCartItems(initial);
    return initial;
  });

  const handleQuantity = (id: any, delta: number) => {
    setCartItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      });
      saveCartItems(updated);
      return updated;
    });
  };

  const handleRemove = (id: any) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      saveCartItems(updated);
      return updated;
    });
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

  const addTestItem = () => {
    setCartItems([
      {
        id: 999,
        name: 'Payment Test Transaction',
        variant: 'Payment Testing',
        price: 5,
        originalPrice: 5,
        quantity: 1,
        image: 'https://placehold.co/150x150/0A1E3F/F4F0E6?text=TEST'
      }
    ]);
    setCouponApplied(false);
    setCouponCode('');
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = couponApplied ? Math.floor(subtotal * 0.1) : 0; // 10% off for example
  const shipping = (subtotal > 999 || subtotal === 5) ? 0 : 150;
  const total = subtotal - discount + shipping;

  const processOrderSuccess = async (gateway: string, payId: string) => {
    let confirmedOrder: any = null;
    try {
      const res = await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: payId,
          paymentGateway: gateway,
          amount: total,
          email: addressDetails.email,
          shippingDetails: addressDetails,
          items: cartItems
        })
      });
      if (res.ok) {
        const data = await res.json();
        confirmedOrder = data.order;
      }
    } catch (e) {
      console.error("Failed to confirm payment / Shiprocket", e);
    }

    const orderRecord = {
      id: confirmedOrder?.id || `ord_${Date.now()}`,
      date: confirmedOrder?.date || new Date().toISOString(),
      items: cartItems,
      total: total,
      status: confirmedOrder?.status || "Processing",
      paymentGateway: gateway,
      paymentId: payId,
      awbCode: confirmedOrder?.awbCode || null,
      courierName: confirmedOrder?.courierName || null,
      trackingUrl: confirmedOrder?.trackingUrl || null,
      shiprocketOrderId: confirmedOrder?.shiprocketOrderId || null,
      shiprocketShipmentId: confirmedOrder?.shiprocketShipmentId || null
    };
    const existingOrders = JSON.parse(localStorage.getItem("quickdoc_orders") || "[]");
    existingOrders.unshift(orderRecord);
    localStorage.setItem("quickdoc_orders", JSON.stringify(existingOrders));

    setCheckoutStep('SUCCESS');
    setCartItems([]);
    saveCartItems([]);
    setIsProcessing(false);
    window.scrollTo(0, 0);
  };

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }

    if (checkoutStep === 'CART') {
      // Pre-fill email from user if not set
      if (!addressDetails.email) {
        setAddressDetails(prev => ({ ...prev, email: user.email || '' }));
      }
      setCheckoutStep('ADDRESS');
      return;
    }

    // Basic validation before payment
    if (!addressDetails.name || !addressDetails.phone || !addressDetails.addressLine || !addressDetails.state || !addressDetails.pincode) {
      alert("Please fill in all required address fields");
      return;
    }

    setIsProcessing(true);

    if (paymentGateway === 'razorpay') {
      try {
        const res = await loadRazorpayScript();
        
        if (!res) {
          alert("Razorpay SDK failed to load. Are you online?");
          setIsProcessing(false);
          return;
        }

        // Hit our own backend API to generate order
        const result = await fetch("/api/create-razorpay-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
          }),
        });

        if (!result.ok) {
          const errData = await result.json();
          throw new Error(errData.error || "Failed to create order on backend");
        }

        const { amount, id: order_id, currency, key_id } = await result.json();

        const options = {
          key: key_id,
          amount: amount.toString(),
          currency: currency,
          name: "QICDOCK",
          description: "Your Order",
          order_id: order_id,
          handler: function (response: any) {
            processOrderSuccess('Razorpay', response.razorpay_payment_id);
          },
          prefill: {
            name: addressDetails.name || user?.user_metadata?.full_name || "Customer",
            email: addressDetails.email || user?.email || "",
            contact: addressDetails.phone || "9999999999",
          },
          notes: {
            address: `${addressDetails.addressLine}, ${addressDetails.pincode}`,
          },
          theme: {
            color: "#0A1E3F",
          },
        };

        const paymentObject = new (window as any).Razorpay(options);
        
        paymentObject.on('payment.failed', function (response: any) {
          console.error("Payment Failed", response.error);
          alert(`Payment Failed: ${response.error.description}`);
          setIsProcessing(false);
        });

        paymentObject.open();

      } catch (err: any) {
        console.error(err);
        alert(err.message || "Something went wrong opening checkout!");
        setIsProcessing(false);
      }
    } else if (paymentGateway === 'cashfree') {
      try {
        const res = await loadCashfreeScript();
        
        if (!res) {
          alert("Cashfree SDK failed to load. Are you online?");
          setIsProcessing(false);
          return;
        }

        const result = await fetch("/api/create-cashfree-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
            customerName: addressDetails.name,
            customerEmail: addressDetails.email,
            customerPhone: addressDetails.phone
          }),
        });

        if (!result.ok) {
          const errData = await result.json();
          throw new Error(errData.error || "Failed to create Cashfree order on backend");
        }

        const { payment_session_id, order_id, environment } = await result.json();

        const cashfree = (window as any).Cashfree({ mode: environment || "sandbox" });
        
        cashfree.checkout({
          paymentSessionId: payment_session_id,
          redirectTarget: "_modal"
        }).then((result: any) => {
          if (result.error) {
            console.error("Cashfree Payment Failed/Cancelled:", result.error);
            alert(`Cashfree Payment: ${result.error.message || "Cancelled or failed"}`);
            setIsProcessing(false);
          } else if (result.paymentDetails) {
            processOrderSuccess('Cashfree', order_id);
          } else if (result.redirect) {
            console.log("Cashfree redirecting...");
          } else {
            processOrderSuccess('Cashfree', order_id);
          }
        }).catch((err: any) => {
          console.error("Cashfree Checkout error:", err);
          setIsProcessing(false);
        });

      } catch (err: any) {
        console.error(err);
        alert(err.message || "Something went wrong opening Cashfree checkout!");
        setIsProcessing(false);
      }
    }
  };

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
    <div className="min-h-screen bg-[#EBE5D9] text-[#0A1E3F] pt-6 pb-24 px-4 sm:px-6 lg:px-8 font-['Ubuntu']">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumb / Back */}
        {checkoutStep !== 'SUCCESS' && (
          <div className="mb-6">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-[#0A1E3F] transition-colors flex items-center gap-2">
              ← Continue Shopping
            </Link>
          </div>
        )}

        {checkoutStep !== 'SUCCESS' && (
          <h1 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase mb-8 md:mb-12">
            Your Cart <span className="text-gray-600">({cartItems.length})</span>
          </h1>
        )}

        {checkoutStep === 'SUCCESS' ? (
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4 font-['Anton'] uppercase tracking-wide">Order Successful!</h2>
            <p className="text-lg text-gray-700 font-medium mb-2">Thank you for your purchase.</p>
            <p className="text-gray-600 mb-8 max-w-md">Your payment has been verified and a confirmation email has been sent. <strong className="text-[#0A1E3F]">Your order will be received in 5 days.</strong></p>
            <Link to="/" className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
              Return Home
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[40vh]">
            <div className="w-20 h-20 bg-[#0A1E3F]/10 rounded-full flex items-center justify-center mb-6">
              <Trash2 className="w-8 h-8 text-[#0A1E3F]" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md">Looks like you haven't added any products to your cart yet. Explore our high-performance charging solutions.</p>
            <Link to="/categories" className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] py-4 px-8 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Col: Cart Items or Address Form */}
            <div className="w-full lg:flex-1 space-y-4 md:space-y-6">
              
              {checkoutStep === 'CART' ? (
                // Cart Items List
                cartItems.map((item) => (
                  <div key={item.id} className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl md:rounded-3xl p-3 sm:p-4 md:p-6 flex flex-row items-start sm:items-center gap-3 sm:gap-4 md:gap-6 relative group hover:border-[#D6CDB8] transition-colors">
                    
                    {/* Remove btn (Mobile absolute, desktop standard) */}
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-3 right-3 sm:static sm:order-last w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-[#152B52]/5 hover:bg-red-500/20 text-gray-600 hover:text-red-500 transition-colors z-10"
                    >
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#EBE5D9] rounded-xl border border-[#D6CDB8] flex items-center justify-center overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform" />
                  </div>

                  <div className="flex-1 w-full min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2 mb-2 sm:mb-4">
                      <div className="pr-6 sm:pr-0">
                        <h3 className="text-sm sm:text-lg md:text-xl font-bold text-[#0A1E3F] mb-0.5 sm:mb-1 leading-tight truncate sm:whitespace-normal">{item.name}</h3>
                        <p className="text-[10px] sm:text-xs md:text-sm text-[#0A1E3F] font-medium truncate sm:whitespace-normal">{item.variant}</p>
                      </div>
                      <div className="text-left sm:text-right mt-1 sm:mt-0">
                        <div className="text-base sm:text-xl md:text-2xl font-['Anton'] tracking-wide leading-none">₹{(item.price * item.quantity).toLocaleString()}</div>
                        {item.originalPrice > item.price && (
                          <div className="text-[9px] sm:text-xs text-gray-600 line-through mt-0.5">₹{(item.originalPrice * item.quantity).toLocaleString()}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Qty Selector */}
                      <div className="flex items-center bg-[#EBE5D9] border border-[#D6CDB8] rounded-lg overflow-hidden h-9">
                        <button 
                          onClick={() => handleQuantity(item.id, -1)}
                          className="w-9 h-full flex items-center justify-center hover:bg-[#152B52]/10 text-gray-600 hover:text-[#0A1E3F] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <div className="w-10 h-full flex items-center justify-center text-sm font-bold border-x border-[#D6CDB8]">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => handleQuantity(item.id, 1)}
                          className="w-9 h-full flex items-center justify-center hover:bg-[#152B52]/10 text-gray-600 hover:text-[#0A1E3F] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))
              ) : (
                // Address Form
                <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl md:rounded-3xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl md:text-2xl font-bold font-['Anton'] uppercase tracking-wide">Shipping Address</h2>
                    <button 
                      onClick={() => setCheckoutStep('CART')}
                      className="text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-[#0A1E3F]"
                    >
                      Edit Cart
                    </button>
                  </div>

                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">Full Name *</label>
                        <input 
                          type="text" required
                          value={addressDetails.name}
                          onChange={e => setAddressDetails(p => ({ ...p, name: e.target.value }))}
                          className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0A1E3F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">Phone Number *</label>
                        <input 
                          type="tel" required
                          value={addressDetails.phone}
                          onChange={e => setAddressDetails(p => ({ ...p, phone: e.target.value }))}
                          className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0A1E3F]"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">Email Address *</label>
                      <input 
                        type="email" required
                        value={addressDetails.email}
                        onChange={e => setAddressDetails(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0A1E3F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">Address *</label>
                      <input 
                        type="text" required
                        value={addressDetails.addressLine}
                        onChange={e => setAddressDetails(p => ({ ...p, addressLine: e.target.value }))}
                        className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0A1E3F]"
                        placeholder="Street address, apartment, suite"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">State *</label>
                        <input 
                          type="text" required
                          value={addressDetails.state}
                          onChange={e => setAddressDetails(p => ({ ...p, state: e.target.value }))}
                          className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0A1E3F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">PIN Code *</label>
                        <input 
                          type="text" required
                          value={addressDetails.pincode}
                          onChange={e => setAddressDetails(p => ({ ...p, pincode: e.target.value }))}
                          className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0A1E3F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0A1E3F] uppercase tracking-wider pl-1 mb-1.5">Country *</label>
                      <input 
                        type="text" required
                        value={addressDetails.country}
                        readOnly
                        className="w-full bg-[#EBE5D9]/50 border border-[#D6CDB8]/50 rounded-xl px-4 py-3 text-sm font-medium text-gray-500 cursor-not-allowed"
                      />
                    </div>

                    {/* Payment Method Selector */}
                    <div className="mt-8 pt-6 border-t border-[#D6CDB8]">
                      <h3 className="text-sm font-bold text-[#0A1E3F] uppercase tracking-wider mb-4 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#0A1E3F]" /> Select Payment Method
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Razorpay Option */}
                        <div 
                          onClick={() => setPaymentGateway('razorpay')}
                          className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col justify-between transition-all ${
                            paymentGateway === 'razorpay' 
                              ? 'border-[#0A1E3F] bg-[#0A1E3F]/5 shadow-sm' 
                              : 'border-[#D6CDB8] bg-[#EBE5D9]/40 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5 font-bold text-[#0A1E3F] text-sm sm:text-base">
                              <input 
                                type="radio" 
                                name="paymentGateway" 
                                value="razorpay" 
                                checked={paymentGateway === 'razorpay'} 
                                onChange={() => setPaymentGateway('razorpay')}
                                className="accent-[#0A1E3F] w-4 h-4"
                              />
                              Razorpay
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                              UPI / Cards
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 pl-6">
                            Pay securely using UPI (GPay, PhonePe), Credit/Debit Cards, Netbanking & Wallets.
                          </p>
                        </div>

                        {/* Cashfree Option */}
                        <div 
                          onClick={() => setPaymentGateway('cashfree')}
                          className={`cursor-pointer border-2 rounded-2xl p-4 flex flex-col justify-between transition-all ${
                            paymentGateway === 'cashfree' 
                              ? 'border-[#0A1E3F] bg-[#0A1E3F]/5 shadow-sm' 
                              : 'border-[#D6CDB8] bg-[#EBE5D9]/40 hover:border-gray-400'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2.5 font-bold text-[#0A1E3F] text-sm sm:text-base">
                              <input 
                                type="radio" 
                                name="paymentGateway" 
                                value="cashfree" 
                                checked={paymentGateway === 'cashfree'} 
                                onChange={() => setPaymentGateway('cashfree')}
                                className="accent-[#0A1E3F] w-4 h-4"
                              />
                              Cashfree
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800">
                              UPI / Pay Later
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 pl-6">
                            Fast checkout via Cashfree Payments using UPI, Cards, Netbanking & Pay Later.
                          </p>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Right Col: Summary & Checkout */}
            <div className="w-full lg:w-[400px] xl:w-[440px] shrink-0 sticky top-28">
              
              {/* Coupon Section */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl md:rounded-3xl p-5 md:p-6 mb-6">
                <div className="flex items-center gap-2 mb-4 text-sm font-bold uppercase tracking-widest text-[#0A1E3F]">
                  <Tag className="w-4 h-4 text-[#0A1E3F]" /> Have a coupon?
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
                    <button onClick={removeCoupon} className="text-gray-600 hover:text-[#0A1E3F] text-xs font-bold uppercase underline">Remove</button>
                  </div>
                ) : (
                  <div className="flex gap-2 w-full">
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="ENTER CODE" 
                      className="flex-1 min-w-0 bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-3 sm:px-4 py-3 text-sm font-bold text-[#0A1E3F] uppercase focus:outline-none focus:border-[#0A1E3F] transition-colors placeholder:text-gray-600"
                    />
                    <button 
                      onClick={applyCoupon}
                      disabled={!couponCode.trim()}
                      className="shrink-0 whitespace-nowrap bg-[#152B52]/10 hover:bg-[#152B52]/20 text-[#0A1E3F] disabled:opacity-50 disabled:cursor-not-allowed px-4 sm:px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-colors border border-[#D6CDB8]"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl md:rounded-3xl p-5 md:p-6">
                <h2 className="text-lg font-bold text-[#0A1E3F] mb-6 uppercase tracking-widest">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-bold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between items-center text-[#22C55E]">
                      <span>Discount ({couponCode})</span>
                      <span className="font-bold">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="text-[#0A1E3F] font-bold uppercase tracking-wider text-xs">Free</span>
                    ) : (
                      <span className="font-bold">₹{shipping.toLocaleString()}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-[#D6CDB8] pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-base text-[#0A1E3F] font-medium">Total</span>
                    <span className="text-3xl font-['Anton'] text-[#0A1E3F] tracking-wide">₹{total.toLocaleString()}</span>
                  </div>
                  <p className="text-right text-xs text-gray-600 mt-1">Includes GST</p>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#0A1E3F] hover:bg-[#152B52] disabled:opacity-70 disabled:cursor-not-allowed text-[#F4F0E6] py-4 rounded-xl font-bold uppercase tracking-widest text-sm shadow-[0_5px_20px_rgba(4,217,255,0.3)] transition-colors flex justify-center items-center gap-2 mb-4"
                >
                  {isProcessing ? 'Processing...' : checkoutStep === 'CART' ? 'Proceed to Checkout' : `Pay via ${paymentGateway === 'cashfree' ? 'Cashfree' : 'Razorpay'}`}
                  {!isProcessing && <ArrowRight className="w-4 h-4" />}
                </button>
                
                <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] uppercase font-bold tracking-widest">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Secure 256-bit Encryption
                </div>
              </div>

              {/* Value Props under summary */}
              <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
                <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                  <Truck className="w-5 h-5 text-gray-600" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Free Express<br/>Shipping</span>
                </div>
                <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-3 flex flex-col items-center justify-center text-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-gray-600" />
                  <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">1-Year Hardware<br/>Warranty</span>
                </div>
              </div>

              {/* Developer Test Tools */}
              <div className="bg-[#152B52]/5 border border-[#152B52]/20 rounded-xl p-4">
                <p className="text-[10px] font-bold text-[#0A1E3F] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> Developer Testing
                </p>
                <button 
                  onClick={addTestItem}
                  className="w-full bg-white hover:bg-gray-50 text-[#0A1E3F] py-3 rounded-lg font-bold uppercase tracking-widest text-xs border border-[#D6CDB8] transition-colors shadow-sm"
                >
                  Load ₹5 Test Item
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Suggestions Section */}
        {cartItems.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#E2DAC8]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-['Anton'] tracking-wide text-[#0A1E3F] uppercase">
                Complete Your <span className="text-[#0A1E3F]">Setup</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {suggestions.map((item) => (
                <div key={item.id} className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-3 flex flex-col group hover:border-[#D6CDB8] transition-colors relative overflow-hidden">
                  <div className="w-full h-24 sm:h-28 bg-[#EBE5D9] rounded-lg border border-[#D6CDB8] mb-3 flex items-center justify-center p-3 relative z-10">
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-[11px] sm:text-xs font-bold text-[#0A1E3F] mb-1 line-clamp-1">{item.name}</h3>
                  <div className="flex justify-between items-center mt-auto pt-1">
                    <span className="text-sm sm:text-base font-['Anton'] text-[#0A1E3F] tracking-wide">{item.price}</span>
                    <button className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#152B52]/5 hover:bg-[#0A1E3F] hover:text-[#F4F0E6] text-[#0A1E3F] flex items-center justify-center transition-colors">
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
