import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Car, Sparkles, Check, CheckCircle2, Zap, ShoppingBag, ArrowRight, RotateCcw, ChevronDown, ShieldCheck, ExternalLink, Phone, Tag, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { addToCart, setAppliedCoupon } from '../lib/cart';
import { trackAssistantOpen, trackAssistantAnswer, trackAddToCart as trackAnalyticsAddToCart, trackComboUpgrade } from '../lib/analytics';

// Image assets
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.webp';
import ertigaImg from '../assets/images/Ertiga.webp';
import swiftDzireImg from '../assets/images/Dzire and Swift.webp';
import threeXoImg from '../assets/images/3XO.webp';
import universalPadImg from '../assets/images/Universal_.webp';
import tableStandImg from '../assets/images/table_stand_mount.webp';

export interface CarProduct {
  id: string;
  name: string;
  brand: string;
  model: string;
  years: string;
  slot: string;
  price: number;
  originalPrice: number;
  speed: string;
  rating: string;
  reviews: string;
  image: string;
  badge: string;
  specs: string[];
}

export interface DealAddon {
  id: string;
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  addonSavings: number;
}

export interface OptimizedDeal {
  dealId: string;
  title: string;
  badge: string;
  description: string;
  baseProductPrice: number;
  baseProductOriginalPrice: number;
  addonItem: DealAddon;
  bundlePrice: number;
  totalOriginalPrice: number;
  mountSavings: number;
  couponSavings: number;
  totalSavings: number;
  coupon: {
    code: string;
    discountAmount: number;
    minOrderValue: number;
    description: string;
  };
}

export const CAR_PRODUCTS: Record<string, CarProduct> = {
  'fronx': {
    id: 'fronx',
    name: 'Maruti Suzuki Fronx 25W Qi2 Dock',
    brand: 'Maruti Suzuki',
    model: 'Fronx',
    years: '2023 - 2025',
    slot: 'Center Console Tray',
    price: 2098,
    originalPrice: 3299,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.9',
    reviews: '180',
    image: fronxEtcImg,
    badge: 'Best Seller',
    specs: ['Direct OEM Console Tray Fit', '25W Qi2 Fast Charge', 'Zero Wire Cut']
  },
  'baleno': {
    id: 'baleno',
    name: 'Maruti Suzuki Baleno 25W Qi2 Dock',
    brand: 'Maruti Suzuki',
    model: 'Baleno',
    years: '2022 - 2025',
    slot: 'Cup Holder & Storage Cavity',
    price: 2098,
    originalPrice: 3299,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.8',
    reviews: '196',
    image: fronxEtcImg,
    badge: 'Direct OEM Fit',
    specs: ['Precision Molded Base', 'Anti-Slip Silicone Grip', 'Type-C Braided Cable']
  },
  'ertiga': {
    id: 'ertiga',
    name: 'Maruti Suzuki Ertiga 25W Qi2 Dock',
    brand: 'Maruti Suzuki',
    model: 'Ertiga',
    years: '2019 - 2025',
    slot: 'Center Console Cooled Cup Space',
    price: 2098,
    originalPrice: 3599,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.7',
    reviews: '230',
    image: ertigaImg,
    badge: 'High Demand',
    specs: ['Air-Cooled Cavity Fit', 'Fast Heat Dissipation', 'Landscape & Portrait']
  },
  'swift-2024': {
    id: 'swift-2024',
    name: 'Maruti Suzuki Swift (4th Gen) Dock',
    brand: 'Maruti Suzuki',
    model: 'Swift (4th Gen)',
    years: '2024 - 2025',
    slot: 'Dedicated Wireless Tray',
    price: 2098,
    originalPrice: 3199,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.9',
    reviews: '310',
    image: swiftDzireImg,
    badge: 'Latest Gen',
    specs: ['Tailored 2024-25 Dash Tray', 'Strong MagSafe Ring', '15-Minute Easy Install']
  },
  'dzire': {
    id: 'dzire',
    name: 'Maruti Suzuki Swift Dzire Dock',
    brand: 'Maruti Suzuki',
    model: 'Swift Dzire',
    years: '2020 - 2025',
    slot: 'Center Console Lower Pocket',
    price: 2098,
    originalPrice: 3299,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.9',
    reviews: '285',
    image: swiftDzireImg,
    badge: 'Direct OEM Fit',
    specs: ['Lower Pocket Flush Dock', 'Anti-Slip Texture', 'Automatic Device Detect']
  },
  'glanza': {
    id: 'glanza',
    name: 'Toyota Glanza 25W Qi2 Dock',
    brand: 'Toyota',
    model: 'Glanza',
    years: '2022 - 2025',
    slot: 'Gear Lever Lower Storage',
    price: 2098,
    originalPrice: 3299,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.9',
    reviews: '142',
    image: fronxEtcImg,
    badge: 'Direct OEM Fit',
    specs: ['Toyota Glanza Precision Fit', 'MagSafe Alignment', 'Overheat Protection']
  },
  'taisor': {
    id: 'taisor',
    name: 'Toyota Urban Cruiser Taisor Dock',
    brand: 'Toyota',
    model: 'Taisor',
    years: '2024 - 2025',
    slot: 'Under-Dashboard Console Tray',
    price: 2098,
    originalPrice: 3399,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.9',
    reviews: '118',
    image: fronxEtcImg,
    badge: 'New Release',
    specs: ['Custom Under-Dash Contour', '25W Fast Wireless', 'High-Grade Matte Finish']
  },
  '3xo': {
    id: '3xo',
    name: 'Mahindra XUV 3XO 25W Dock',
    brand: 'Mahindra',
    model: 'XUV 3XO',
    years: '2024 - 2025',
    slot: 'Center Console Storage Tray',
    price: 2098,
    originalPrice: 3499,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.8',
    reviews: '112',
    image: threeXoImg,
    badge: 'New Arrival',
    specs: ['Mahindra 3XO Console Fit', 'MagSafe & Qi2 Compatible', 'High-Grip Base']
  },
  'universal': {
    id: 'universal',
    name: 'Universal Automotive Charging Pad',
    brand: 'Universal',
    model: 'Universal (All Cars)',
    years: 'Universal Fit',
    slot: 'Any Flat Dash or Console Surface',
    price: 2098,
    originalPrice: 2499,
    speed: '25W Qi2 Fast Wireless',
    rating: '4.8',
    reviews: '342',
    image: universalPadImg,
    badge: 'Universal Fit',
    specs: ['Fits Any Vehicle Console', 'Anti-Slip High-Tack Silicone', '25W Magnetic Core']
  }
};

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  type?: 'text' | 'options' | 'product_card';
  options?: Array<{ label: string; value: string; icon?: string }>;
  product?: CarProduct;
  step?: 'brand' | 'model';
}

export default function CarFinderChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [addedProductIds, setAddedProductIds] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isSoldOut } = useInventory();
  const navigate = useNavigate();

  // Deal Optimization Flow State
  const [recommendedProduct, setRecommendedProduct] = useState<CarProduct | null>(null);
  const [dealStep, setDealStep] = useState<'IDLE' | 'OFFER' | 'PHONE_INPUT' | 'CONFIRMATION' | 'OPTIMIZING' | 'DEAL_READY' | 'DECLINED'>('IDLE');
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [consentAgreed, setConsentAgreed] = useState(true);
  const [consentError, setConsentError] = useState('');
  const [confirmedPhone, setConfirmedPhone] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedDeal, setOptimizedDeal] = useState<OptimizedDeal | null>(null);
  const [dealAddedToCart, setDealAddedToCart] = useState(false);

  // Normalization and validation for Indian mobile numbers
  const normalizeAndValidateIndianPhone = (raw: string): string | null => {
    if (!raw || typeof raw !== 'string') return null;
    const digits = raw.replace(/\D/g, '');
    let normalized = digits;
    if (digits.length === 12 && digits.startsWith('91')) {
      normalized = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      normalized = digits.slice(1);
    }
    if (/^[6-9]\d{9}$/.test(normalized)) {
      return normalized;
    }
    return null;
  };

  const handlePhoneSubmit = () => {
    const validNumber = normalizeAndValidateIndianPhone(phoneInput);
    if (!validNumber) {
      setPhoneError("That doesn't look like a valid Indian mobile number. Please enter your 10-digit mobile number.");
      return;
    }
    if (!consentAgreed) {
      setConsentError("Please agree to the contact terms and conditions to proceed.");
      return;
    }
    setPhoneError('');
    setConsentError('');
    setConfirmedPhone(validNumber);
    setDealStep('CONFIRMATION');
  };

  const handleChangeNumber = () => {
    setDealStep('PHONE_INPUT');
    setConfirmedPhone('');
    setPhoneError('');
    setConsentError('');
  };

  const handleProceedToOptimization = async () => {
    if (isOptimizing || !confirmedPhone) return;
    setIsOptimizing(true);
    setDealStep('OPTIMIZING');

    try {
      // 1. Store lead in database with consent audit info
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: confirmedPhone,
          brand: recommendedProduct?.brand,
          model: recommendedProduct?.model,
          productId: recommendedProduct?.id || 'fronx',
          productName: recommendedProduct?.name,
          consentGiven: true,
          consentText: 'I agree to be contacted regarding my product enquiry, purchase, delivery, and related support, and I agree to the Terms & Conditions and Privacy Policy.'
        })
      }).catch(() => {});

      // 2. Fetch personalized deal optimization quote
      const res = await fetch('/api/deals/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: recommendedProduct?.id || 'fronx',
          phone: confirmedPhone,
          brand: recommendedProduct?.brand,
          model: recommendedProduct?.model
        })
      });

      const data = await res.json();
      if (res.ok && data.success && data.deal) {
        setOptimizedDeal(data.deal);
        setDealStep('DEAL_READY');
      } else {
        setPhoneError(data.error || 'Unable to optimize deal at this moment.');
        setDealStep('PHONE_INPUT');
        setConfirmedPhone('');
      }
    } catch (e) {
      setPhoneError('Network error while checking deals. Please try again.');
      setDealStep('PHONE_INPUT');
      setConfirmedPhone('');
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleAddDealToCart = () => {
    if (!recommendedProduct || !optimizedDeal) return;

    // 1. Add base recommended vehicle dock
    addToCart({
      id: recommendedProduct.id,
      name: recommendedProduct.name,
      variant: `Custom Fit: ${recommendedProduct.slot}`,
      price: recommendedProduct.price,
      originalPrice: recommendedProduct.originalPrice,
      image: recommendedProduct.image
    });

    // 2. Add bundle add-on item (Table Stand)
    addToCart({
      id: optimizedDeal.addonItem.id,
      name: optimizedDeal.addonItem.name,
      variant: optimizedDeal.addonItem.variant,
      price: optimizedDeal.addonItem.price,
      originalPrice: optimizedDeal.addonItem.originalPrice,
      image: tableStandImg
    });

    // 3. Pre-apply exclusive coupon
    if (optimizedDeal.coupon?.code) {
      setAppliedCoupon(optimizedDeal.coupon.code);
    }

    trackAnalyticsAddToCart(
      recommendedProduct.id,
      `${recommendedProduct.name} + ${optimizedDeal.addonItem.name}`,
      optimizedDeal.bundlePrice,
      'assistant_deal'
    );

    setDealAddedToCart(true);
  };

  // Listen for custom open event (e.g. from Find Your Car section on Homepage)
  useEffect(() => {
    const handleOpenChatbot = (e: any) => {
      setIsOpen(true);
      setHasOpenedBefore(true);
      trackAssistantOpen();
      if (e?.detail?.brand) {
        handleSelectBrand(e.detail.brand);
      }
    };
    window.addEventListener('openCarFinderChatbot', handleOpenChatbot);
    return () => window.removeEventListener('openCarFinderChatbot', handleOpenChatbot);
  }, []);

  // Initialize initial message when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      trackAssistantOpen();
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: 'Hi there! Welcome to QICDOCK Car Compatibility Assistant.',
          type: 'text'
        },
        {
          id: 'welcome-2',
          sender: 'bot',
          text: 'Which car brand do you drive? Choose below to see your precision-fit 25W magnetic dock:',
          type: 'options',
          step: 'brand',
          options: [
            { label: 'Maruti Suzuki', value: 'maruti' },
            { label: 'Toyota', value: 'toyota' },
            { label: 'Mahindra', value: 'mahindra' },
            { label: 'Other / Universal (Fits Any Car)', value: 'universal' }
          ]
        }
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, dealStep, isOptimizing]);

  const handleSelectBrand = (brandValue: string) => {
    let brandLabel = 'Maruti Suzuki';
    if (brandValue === 'toyota') brandLabel = 'Toyota';
    if (brandValue === 'mahindra') brandLabel = 'Mahindra';
    if (brandValue === 'universal') brandLabel = 'Universal (Fits Any Car)';

    trackAssistantAnswer('brand', 'Which car brand do you drive?', brandLabel, brandLabel);

    // User message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: brandLabel
    };

    if (brandValue === 'universal') {
      const product = CAR_PRODUCTS['universal'];
      setRecommendedProduct(product);
      setDealStep('OFFER');
      setPhoneInput('');
      setPhoneError('');
      setConfirmedPhone('');
      setOptimizedDeal(null);
      setDealAddedToCart(false);

      const botResponse: ChatMessage = {
        id: `bot-${Date.now() + 1}`,
        sender: 'bot',
        text: 'Here is our Universal Automotive Wireless Charging Pad that fits virtually any dashboard or console with high-grip silicone:'
      };
      const cardMsg: ChatMessage = {
        id: `card-${Date.now() + 2}`,
        sender: 'bot',
        type: 'product_card',
        product: product
      };
      setMessages(prev => [...prev, userMsg, botResponse, cardMsg]);
      return;
    }

    let modelOptions: Array<{ label: string; value: string }> = [];

    if (brandValue === 'maruti') {
      modelOptions = [
        { label: 'Fronx (2023 - 2025)', value: 'fronx' },
        { label: 'Baleno (2022 - 2025)', value: 'baleno' },
        { label: 'Ertiga (2019 - 2025)', value: 'ertiga' },
        { label: 'Swift (4th Gen 2024-25)', value: 'swift-2024' },
        { label: 'Swift Dzire (2020 - 2025)', value: 'dzire' },
        { label: 'Other Model (Universal Fit)', value: 'universal' }
      ];
    } else if (brandValue === 'toyota') {
      modelOptions = [
        { label: 'Toyota Glanza (2022 - 2025)', value: 'glanza' },
        { label: 'Toyota Urban Cruiser Taisor (2024 - 2025)', value: 'taisor' },
        { label: 'Other Model (Universal Fit)', value: 'universal' }
      ];
    } else if (brandValue === 'mahindra') {
      modelOptions = [
        { label: 'Mahindra XUV 3XO (2024 - 2025)', value: '3xo' },
        { label: 'Other Model (Universal Fit)', value: 'universal' }
      ];
    }

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: `Awesome! Select your ${brandLabel} model:`,
      type: 'options',
      step: 'model',
      options: modelOptions
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const handleSelectModel = (modelValue: string, modelLabel: string) => {
    const product = CAR_PRODUCTS[modelValue] || CAR_PRODUCTS['universal'];
    setRecommendedProduct(product);
    setDealStep('OFFER');
    setPhoneInput('');
    setPhoneError('');
    setConfirmedPhone('');
    setOptimizedDeal(null);
    setDealAddedToCart(false);

    trackAssistantAnswer('model', 'Select your model', modelLabel, product.brand, modelLabel);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: modelLabel
    };

    const botResponse: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: `Found the exact 100% fit-guaranteed dock for your ${product.model}! Here are the specs:`
    };

    const cardMsg: ChatMessage = {
      id: `card-${Date.now() + 2}`,
      sender: 'bot',
      type: 'product_card',
      product: product
    };

    setMessages(prev => [...prev, userMsg, botResponse, cardMsg]);
  };

  const handleAddToCart = (product: CarProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      variant: `Custom Fit: ${product.slot}`,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image
    });

    trackAnalyticsAddToCart(product.id, product.name, product.price, 'assistant');

    setAddedProductIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds(prev => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  const handleRestart = () => {
    setRecommendedProduct(null);
    setDealStep('IDLE');
    setPhoneInput('');
    setPhoneError('');
    setConfirmedPhone('');
    setOptimizedDeal(null);
    setDealAddedToCart(false);

    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: 'Which car brand do you drive? Choose below to find your dock:',
        type: 'options',
        step: 'brand',
        options: [
          { label: 'Maruti Suzuki', value: 'maruti' },
          { label: 'Toyota', value: 'toyota' },
          { label: 'Mahindra', value: 'mahindra' },
          { label: 'Other / Universal (Fits Any Car)', value: 'universal' }
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button (Lifted on Mobile to prevent overlap) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 md:z-50 flex flex-col items-end gap-2">
        {/* Helper pulse badge if closed */}
        {!isOpen && !hasOpenedBefore && (
          <div 
            onClick={() => { setIsOpen(true); setHasOpenedBefore(true); }}
            className="bg-[#FAF7F0] border border-[#0A1E3F]/30 text-[#0A1E3F] text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 cursor-pointer animate-bounce transition-all hover:bg-white"
          >
            <span>Find your car dock here!</span>
            <X 
              className="w-3.5 h-3.5 text-gray-400 hover:text-gray-700 ml-1" 
              onClick={(e) => { e.stopPropagation(); setHasOpenedBefore(true); }} 
            />
          </div>
        )}

        <button
          onClick={() => { setIsOpen(!isOpen); setHasOpenedBefore(true); }}
          className={`flex items-center gap-2 px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer select-none ${
            isOpen 
              ? 'bg-[#0A1E3F] text-white rotate-0' 
              : 'bg-[#0A1E3F] text-[#F4F0E6] shadow-[0_0_25px_rgba(4,217,255,0.4)]'
          }`}
          aria-label="Car Finder Assistant"
        >
          {isOpen ? (
            <>
              <X className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Close</span>
            </>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider">Find Your Car</span>
          )}
        </button>
      </div>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 sm:bottom-24 right-3 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-w-[420px] h-[580px] max-h-[80vh] bg-[#FAF7F0] border border-[#D6CDB8] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="bg-[#0A1E3F] text-[#F4F0E6] p-4 flex items-center justify-between border-b border-[#0A1E3F]/40 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-xs tracking-wider">
                QD
              </div>
              <div>
                <h3 className="font-bold text-sm tracking-wide flex items-center gap-1.5">
                  QICDOCK Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h3>
                <p className="text-[10px] text-gray-300">Instant Model Match & Cart</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleRestart}
                title="Restart Chat"
                className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => {
              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="bg-[#0A1E3F] text-white px-3.5 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%] font-medium shadow-sm">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex items-start gap-2 max-w-[95%]">
                  <div className="w-7 h-7 rounded-full bg-[#0A1E3F] text-white flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold">
                    <Zap className="w-3.5 h-3.5" />
                  </div>

                  <div className="space-y-2 flex-1">
                    {msg.text && (
                      <div className="bg-white border border-[#D6CDB8] text-[#0A1E3F] px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed font-medium">
                        {msg.text}
                      </div>
                    )}

                    {/* Options Buttons */}
                    {msg.type === 'options' && msg.options && (
                      <div className="flex flex-col gap-1.5 pt-1">
                        {msg.options.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              if (msg.step === 'brand') {
                                handleSelectBrand(opt.value);
                              } else if (msg.step === 'model') {
                                handleSelectModel(opt.value, opt.label);
                              }
                            }}
                            className="w-full text-left bg-white hover:bg-[#0A1E3F] text-[#0A1E3F] hover:text-white border border-[#D6CDB8] hover:border-[#0A1E3F] px-3.5 py-2.5 rounded-xl font-bold transition-all flex items-center justify-between group shadow-sm cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              {opt.icon && <span>{opt.icon}</span>}
                              <span>{opt.label}</span>
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Product Card Inside Chat */}
                    {msg.type === 'product_card' && msg.product && (
                      <div className="bg-white border-2 border-[#0A1E3F] rounded-2xl p-3.5 shadow-md space-y-3 mt-2 animate-in fade-in zoom-in-95 duration-200">
                        {/* Image stage */}
                        <div className="h-32 rounded-xl bg-[#FAF7F0] border border-[#E2DAC8] overflow-hidden relative flex items-center justify-center p-2">
                          <img
                            src={msg.product.image}
                            alt={msg.product.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-contain"
                          />
                          <span className="absolute top-2 left-2 bg-[#0A1E3F] text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                            100% Fit Guarantee
                          </span>
                          <span className={`absolute bottom-2 right-2 text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            isSoldOut(msg.product.id) ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {isSoldOut(msg.product.id) ? 'Sold Out' : 'In Stock'}
                          </span>
                        </div>

                        {/* Title & Slot */}
                        <div>
                          <h4 className="font-bold text-sm text-[#0A1E3F] leading-tight">
                            {msg.product.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Fitment: <strong className="text-gray-700">{msg.product.slot}</strong>
                          </p>
                        </div>

                        {/* Specs badges */}
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-blue-50 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100">
                            25W Qi2 Fast Wireless
                          </span>
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                            1-Yr Warranty
                          </span>
                        </div>

                        {/* Intelligent Recommendation: Upgrade to All-In-One Combo */}
                        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-sm">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 text-[11px] font-bold text-[#0A1E3F]">
                              <Sparkles className="w-3.5 h-3.5 text-[#0A1E3F] shrink-0" />
                              <span>Want Car + Desk + Wall Mounts?</span>
                            </div>
                            <p className="text-[10px] text-emerald-700 font-semibold leading-tight">
                              Upgrade to All-In-One Combo & Save ₹1,100!
                            </p>
                          </div>
                          <Link
                            to="/category/all-in-one"
                            onClick={() => {
                              trackComboUpgrade(msg.product?.name || 'Vehicle Dock', 'All In One Combo', 1100);
                              setIsOpen(false);
                            }}
                            className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors"
                          >
                            View Combo
                          </Link>
                        </div>

                        {/* Price & Add to Cart */}
                        <div className="pt-2 border-t border-[#EBE5D9] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-gray-400 line-through block">₹{msg.product.originalPrice}</span>
                            <span className="text-lg font-['Anton'] text-[#0A1E3F]">₹{msg.product.price}</span>
                          </div>

                          <button
                            onClick={() => handleAddToCart(msg.product!)}
                            disabled={isSoldOut(msg.product.id)}
                            className={`px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                              isSoldOut(msg.product.id)
                                ? 'bg-red-50 text-red-600 border border-red-200 cursor-not-allowed'
                                : 'bg-[#0A1E3F] hover:bg-[#152B52] text-white shadow-md'
                            }`}
                          >
                            {isSoldOut(msg.product.id) ? (
                              <span>Sold Out</span>
                            ) : addedProductIds[msg.product.id] ? (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Added!</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Cart</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Quick actions */}
                        <div className="flex gap-2 pt-1">
                          <Link
                            to={`/product/${msg.product.id === 'swift-2024' ? 'swift' : msg.product.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex-1 text-center bg-[#0A1E3F]/10 text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#FAF7F0] border border-[#0A1E3F]/25 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            View Cockpit →
                          </Link>
                          <Link
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 text-center bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            View Cart →
                          </Link>
                          <button
                            onClick={handleRestart}
                            className="px-2.5 text-center bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                            title="Check another car"
                          >
                            <RotateCcw className="w-3.5 h-3.5 mx-auto" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Personalized Deal Optimization Flow */}
                    {msg.type === 'product_card' && msg.product && (
                      <div className="pt-1">
                        {/* 1. DEAL OFFER STEP */}
                        {dealStep === 'OFFER' && (
                          <div className="bg-[#FAF7F0] border-2 border-emerald-600/40 rounded-2xl p-3.5 space-y-2.5 shadow-sm animate-in fade-in duration-300">
                            <div className="flex items-start gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                <Sparkles className="w-3.5 h-3.5" />
                              </div>
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-bold text-xs text-[#0A1E3F] flex items-center gap-1.5">
                                    Want a better deal?
                                  </h5>
                                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Exclusive Offer
                                  </span>
                                </div>
                                <p className="text-[11px] text-gray-700 leading-snug">
                                  Share your mobile number and we'll check the best available bundle offer for your recommendation. You could save <strong className="text-emerald-800 font-bold">₹550 Total (Mount discount + ₹100 coupon)</strong> on your order.
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-1">
                              <button
                                onClick={() => setDealStep('DECLINED')}
                                className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-[#D6CDB8] py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                No, thanks
                              </button>
                              <button
                                onClick={() => { setDealStep('PHONE_INPUT'); setPhoneError(''); }}
                                className="flex-1 bg-[#0A1E3F] hover:bg-[#152B52] text-white py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Zap className="w-3.5 h-3.5 text-amber-300" />
                                <span>Check Best Offer</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 2. PHONE INPUT STEP */}
                        {dealStep === 'PHONE_INPUT' && (
                          <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F]/40 rounded-2xl p-3.5 space-y-3 shadow-sm animate-in fade-in duration-300">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A1E3F]">
                                  <Phone className="w-3.5 h-3.5 text-[#0A1E3F]" />
                                  <span>Get your personalized deal</span>
                                </div>
                                <span className="text-[10px] text-gray-500 font-medium">10-Digit Indian Mobile</span>
                              </div>
                              <p className="text-[11px] text-gray-600 leading-snug">
                                Share your mobile number and our team can contact you to help with your purchase and provide the best available deal.
                              </p>
                            </div>

                            <div className="space-y-2">
                              <div className="flex rounded-xl overflow-hidden border border-[#D6CDB8] bg-white focus-within:border-[#0A1E3F] transition-colors shadow-inner">
                                <span className="bg-[#EBE5D9] text-[#0A1E3F] font-bold text-xs px-3 py-2.5 flex items-center border-r border-[#D6CDB8] select-none">
                                  +91
                                </span>
                                <input
                                  type="tel"
                                  inputMode="numeric"
                                  value={phoneInput}
                                  onChange={(e) => {
                                    setPhoneInput(e.target.value);
                                    if (phoneError) setPhoneError('');
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') handlePhoneSubmit();
                                  }}
                                  placeholder="Enter your 10-digit mobile number"
                                  maxLength={15}
                                  autoFocus
                                  className="flex-1 min-w-0 px-3 py-2 text-xs font-semibold text-[#0A1E3F] placeholder:text-gray-400 focus:outline-none bg-transparent"
                                />
                              </div>

                              {/* Interactive Mandatory Consent Checkbox */}
                              <label className="flex items-start gap-2 cursor-pointer select-none text-[11px] text-gray-700 leading-snug pt-0.5">
                                <input
                                  type="checkbox"
                                  checked={consentAgreed}
                                  onChange={(e) => {
                                    setConsentAgreed(e.target.checked);
                                    if (consentError) setConsentError('');
                                  }}
                                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-[#0A1E3F] focus:ring-[#0A1E3F] cursor-pointer shrink-0 accent-[#0A1E3F]"
                                />
                                <span>
                                  I agree to be contacted regarding my product enquiry, purchase, delivery, and related support, and I agree to the{' '}
                                  <Link to="/about" target="_blank" className="text-[#0A1E3F] font-bold underline hover:text-[#152B52]">
                                    Terms & Conditions
                                  </Link>{' '}
                                  and{' '}
                                  <Link to="/about" target="_blank" className="text-[#0A1E3F] font-bold underline hover:text-[#152B52]">
                                    Privacy Policy
                                  </Link>.
                                </span>
                              </label>

                              {phoneError && (
                                <p className="text-[10px] text-red-600 font-bold bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg animate-in fade-in duration-200 flex items-center gap-1.5">
                                  <span>{phoneError}</span>
                                </p>
                              )}
                              {consentError && (
                                <p className="text-[10px] text-red-600 font-bold bg-red-50 border border-red-200 px-2.5 py-1.5 rounded-lg animate-in fade-in duration-200 flex items-center gap-1.5">
                                  <span>{consentError}</span>
                                </p>
                              )}
                            </div>

                            <div className="flex gap-2">
                              <button
                                onClick={() => setDealStep('DECLINED')}
                                className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-[#D6CDB8] py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                              >
                                No, thanks
                              </button>
                              <button
                                onClick={handlePhoneSubmit}
                                className="flex-1 bg-[#0A1E3F] hover:bg-[#152B52] text-white py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <span>Continue</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 3. CONFIRMATION STEP */}
                        {dealStep === 'CONFIRMATION' && (
                          <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F] rounded-2xl p-3.5 space-y-3 shadow-md animate-in fade-in duration-300">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A1E3F]">
                                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                <span>Is this number correct?</span>
                              </div>
                              <p className="text-[11px] text-gray-700 leading-relaxed">
                                We'll use this number to <strong className="text-[#0A1E3F] font-bold">contact you regarding your product enquiry/purchase</strong> and for delivery or order-related communication.
                              </p>
                            </div>

                            <div className="bg-white border border-[#D6CDB8] rounded-xl p-2.5 text-center shadow-sm">
                              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Your Mobile Number</div>
                              <div className="text-base font-['Anton'] tracking-wider text-[#0A1E3F] mt-0.5">
                                +91 {confirmedPhone.slice(0, 5)} {confirmedPhone.slice(5)}
                              </div>
                            </div>

                            <div className="flex gap-2 pt-0.5">
                              <button
                                onClick={handleChangeNumber}
                                disabled={isOptimizing}
                                className="flex-1 bg-white hover:bg-gray-100 text-gray-700 border border-[#D6CDB8] py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50"
                              >
                                Change Number
                              </button>
                              <button
                                onClick={handleProceedToOptimization}
                                disabled={isOptimizing}
                                className="flex-1 bg-[#0A1E3F] hover:bg-[#152B52] text-white py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50"
                              >
                                {isOptimizing ? (
                                  <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                    <span>Finding Best Deal...</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Proceed</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 4. OPTIMIZING STEP */}
                        {dealStep === 'OPTIMIZING' && (
                          <div className="bg-[#FAF7F0] border border-[#0A1E3F]/30 rounded-2xl p-4 text-center space-y-2 shadow-sm animate-in fade-in duration-300">
                            <Loader2 className="w-6 h-6 text-[#0A1E3F] animate-spin mx-auto" />
                            <p className="text-xs font-bold text-[#0A1E3F]">
                              Analyzing dock fitment & checking exclusive bundle offers...
                            </p>
                            <p className="text-[10px] text-gray-500">Calculating maximum bundle savings & applying coupon</p>
                          </div>
                        )}

                        {/* 5. DEAL READY STEP */}
                        {dealStep === 'DEAL_READY' && optimizedDeal && (
                          <div className="bg-white border-2 border-emerald-600 rounded-2xl p-3.5 shadow-lg space-y-3 animate-in fade-in zoom-in-95 duration-300">
                            <div className="flex items-center justify-between pb-2 border-b border-[#EBE5D9]">
                              <div className="flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                <h5 className="font-bold text-xs sm:text-sm text-[#0A1E3F]">
                                  We found a better deal for you!
                                </h5>
                              </div>
                              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                {optimizedDeal.badge}
                              </span>
                            </div>

                            <p className="text-[11px] text-gray-700 leading-snug">
                              {optimizedDeal.description}
                            </p>

                            {/* Bundle item add-on highlight */}
                            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-2.5 flex items-center gap-2.5">
                              <div className="w-11 h-11 rounded-lg bg-white border border-[#D6CDB8] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                <img src={tableStandImg} alt="Table Stand" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <h6 className="text-xs font-bold text-[#0A1E3F] truncate">{optimizedDeal.addonItem.name}</h6>
                                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                                    Save ₹{optimizedDeal.addonItem.addonSavings}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-500">{optimizedDeal.addonItem.variant}</p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-xs font-bold text-[#0A1E3F]">₹{optimizedDeal.addonItem.price}</span>
                                  <span className="text-[10px] text-gray-400 line-through">₹{optimizedDeal.addonItem.originalPrice}</span>
                                </div>
                              </div>
                            </div>

                            {/* Savings + Coupon banner */}
                            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Tag className="w-4 h-4 text-emerald-700 shrink-0" />
                                <div>
                                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                                    <span>Coupon: {optimizedDeal.coupon.code}</span>
                                    <span className="text-[9px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.5 rounded">₹{optimizedDeal.coupon.discountAmount} OFF</span>
                                  </div>
                                  <p className="text-[10px] text-emerald-700 font-medium">Applied automatically to your cart</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-[9px] text-gray-500 block uppercase font-bold">Total Savings</span>
                                <span className="text-sm font-['Anton'] text-emerald-800">₹{optimizedDeal.totalSavings}</span>
                              </div>
                            </div>

                            {/* Price & Add Deal to Cart */}
                            <div className="pt-2 border-t border-[#EBE5D9] flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-gray-400 line-through block">₹{optimizedDeal.totalOriginalPrice}</span>
                                <span className="text-lg font-['Anton'] text-[#0A1E3F]">₹{optimizedDeal.bundlePrice}</span>
                              </div>

                              <button
                                onClick={handleAddDealToCart}
                                className="px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-[#0A1E3F] hover:bg-[#152B52] text-white shadow-md"
                              >
                                {dealAddedToCart ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                    <span>Deal Added!</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>Add Deal to Cart</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {dealAddedToCart && (
                              <div className="pt-1 animate-in fade-in duration-200">
                                <Link
                                  to="/cart"
                                  onClick={() => setIsOpen(false)}
                                  className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl font-bold text-xs tracking-wider uppercase shadow-md transition-colors flex items-center justify-center gap-1.5"
                                >
                                  <span>View Cart & Checkout (₹100 Off)</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            )}
                          </div>
                        )}

                        {/* 6. DECLINED STEP */}
                        {dealStep === 'DECLINED' && (
                          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-xl p-2.5 text-[11px] text-gray-600 flex items-center justify-between">
                            <span>Standard dock recommendation active.</span>
                            <button
                              onClick={() => { setDealStep('PHONE_INPUT'); setPhoneError(''); }}
                              className="text-[#0A1E3F] font-bold underline hover:text-[#152B52] cursor-pointer"
                            >
                              Check deals
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer bar */}
          <div className="p-3 bg-white border-t border-[#D6CDB8] text-[11px] text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Fit Guarantee
            </span>
            <Link
              to="/category/vehicle-specific"
              onClick={() => setIsOpen(false)}
              className="text-[#0A1E3F] font-bold hover:underline flex items-center gap-1"
            >
              Browse All Docks <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

        </div>
      )}
    </>
  );
}
