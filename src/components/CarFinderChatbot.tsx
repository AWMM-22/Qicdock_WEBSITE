import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Car, Sparkles, Check, CheckCircle2, Zap, ShoppingBag, ArrowRight, RotateCcw, ChevronDown, ShieldCheck, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';
import { addToCart } from '../lib/cart';

// Image assets
import fronxEtcImg from '../assets/images/Fronx, Taisor, Glanza and Baleno.png';
import ertigaImg from '../assets/images/Ertiga.png';
import swiftDzireImg from '../assets/images/Dzire and Swift.png';
import threeXoImg from '../assets/images/3XO.png';
import universalPadImg from '../assets/images/Universal_.png';

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

  // Listen for custom open event (e.g. from Find Your Car section on Homepage)
  useEffect(() => {
    const handleOpenChatbot = (e: any) => {
      setIsOpen(true);
      setHasOpenedBefore(true);
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
      setMessages([
        {
          id: 'welcome-1',
          sender: 'bot',
          text: '👋 Hi there! Welcome to QICDOCK Car Compatibility Assistant.',
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
  }, [messages, isOpen]);

  const handleSelectBrand = (brandValue: string) => {
    let brandLabel = 'Maruti Suzuki';
    if (brandValue === 'toyota') brandLabel = 'Toyota';
    if (brandValue === 'mahindra') brandLabel = 'Mahindra';
    if (brandValue === 'universal') brandLabel = 'Universal (Fits Any Car)';

    // User message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: brandLabel
    };

    if (brandValue === 'universal') {
      const product = CAR_PRODUCTS['universal'];
      const botResponse: ChatMessage = {
        id: `bot-${Date.now() + 1}`,
        sender: 'bot',
        text: '⚡ Here is our Universal Automotive Wireless Charging Pad that fits virtually any dashboard or console with high-grip silicone:'
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
        { label: '🌐 Other Model (Universal Fit)', value: 'universal' }
      ];
    } else if (brandValue === 'toyota') {
      modelOptions = [
        { label: 'Toyota Glanza (2022 - 2025)', value: 'glanza' },
        { label: 'Toyota Urban Cruiser Taisor (2024 - 2025)', value: 'taisor' },
        { label: '🌐 Other Model (Universal Fit)', value: 'universal' }
      ];
    } else if (brandValue === 'mahindra') {
      modelOptions = [
        { label: 'Mahindra XUV 3XO (2024 - 2025)', value: '3xo' },
        { label: '🌐 Other Model (Universal Fit)', value: 'universal' }
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
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: modelLabel
    };

    const product = CAR_PRODUCTS[modelValue] || CAR_PRODUCTS['universal'];

    const botResponse: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: `🎯 Found the exact 100% fit-guaranteed dock for your ${product.model}! Here are the specs:`
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

    setAddedProductIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedProductIds(prev => ({ ...prev, [product.id]: false }));
    }, 2500);
  };

  const handleRestart = () => {
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
            <>
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75"></span>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">Find Your Car</span>
            </>
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
                    ⚡
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
                        <div className="h-32 rounded-xl bg-[#FAF7F0] border border-[#E2DAC8] overflow-hidden relative flex items-center justify-center">
                          <img
                            src={msg.product.image}
                            alt={msg.product.name}
                            className="w-full h-full object-cover"
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
                            ⚡ 25W Qi2 Fast Wireless
                          </span>
                          <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                            🛡️ 1-Yr Warranty
                          </span>
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
                            to="/cart"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 text-center bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            View Cart →
                          </Link>
                          <button
                            onClick={handleRestart}
                            className="flex-1 text-center bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                          >
                            🔄 Check Another Car
                          </button>
                        </div>
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
