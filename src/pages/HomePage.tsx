import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingBag, ChevronDown, Car, Smartphone, Check, RefreshCw, Zap, Star, Eye, CreditCard, Wind, MonitorSmartphone, Lightbulb, Layers, Home, BatteryCharging, Plus, ArrowRight, Facebook, Twitter, Instagram, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import centerMountImg from '../assets/images/center_mount_1788721138616.jpg';
import centerMountTransparentImg from '../assets/images/center-mount-transparent.png';
import leftMountImg from '../assets/images/m1.png';
import rightMountImg from '../assets/images/m3.png';
import combinedImg from '../assets/images/3in1 copy.png';

const carModelsData: Record<string, { id: number; title: string; desc: string; price: string; oldPrice: string; speed: string; rating: string; reviews: string; installedIn: string }[]> = {
  "Universal": [
    {
      id: 1,
      title: "Universal Car Charging Pad",
      desc: "Universal 15W Qi2 fast wireless charging pad with secure dashboard & console grip",
      price: "₹2,499",
      oldPrice: "₹2,999",
      speed: "15W Qi2 Fast Charge",
      rating: "4.8",
      reviews: "342",
      installedIn: "UNIVERSAL"
    },
    {
      id: 2,
      title: "Universal MagCharge Console Mount",
      desc: "Adjustable magnetic arm mount for all standard automotive consoles and air vents",
      price: "₹2,799",
      oldPrice: "₹3,499",
      speed: "15W Fast Charge",
      rating: "4.9",
      reviews: "215",
      installedIn: "UNIVERSAL"
    }
  ],
  "Fronx": [
    {
      id: 1,
      title: "Fronx Car Charger",
      desc: "Custom-molded 15W Qi2 wireless charging pad engineered specifically for Maruti Suzuki Fronx",
      price: "₹3,299",
      oldPrice: "₹3,999",
      speed: "15W Qi2 Fast Charge",
      rating: "4.9",
      reviews: "180",
      installedIn: "FRONX"
    }
  ],
  "Baleno": [
    {
      id: 1,
      title: "Baleno Car Charger",
      desc: "Precision fit 15W magnetic wireless charging dock seamlessly integrated into Baleno console",
      price: "₹3,299",
      oldPrice: "₹3,999",
      speed: "15W Qi2 Fast Charge",
      rating: "4.8",
      reviews: "196",
      installedIn: "BALENO"
    }
  ],
  "Glanza": [
    {
      id: 1,
      title: "Glanza Car Charger",
      desc: "Custom-fit wireless charging tray engineered for Toyota Glanza center console",
      price: "₹3,299",
      oldPrice: "₹3,999",
      speed: "15W Qi2 Fast Charge",
      rating: "4.9",
      reviews: "142",
      installedIn: "GLANZA"
    }
  ],
  "Taisor": [
    {
      id: 1,
      title: "Taisor Car Charger",
      desc: "OEM-fit wireless fast charging pad designed exclusively for Toyota Urban Cruiser Taisor",
      price: "₹3,399",
      oldPrice: "₹4,099",
      speed: "15W Qi2 Fast Charge",
      rating: "4.9",
      reviews: "118",
      installedIn: "TAISOR"
    }
  ],
  "Ertiga": [
    {
      id: 1,
      title: "Ertiga Car Charger",
      desc: "Multi-device 15W fast wireless charging console integration for Maruti Suzuki Ertiga",
      price: "₹3,599",
      oldPrice: "₹4,299",
      speed: "15W Qi2 Fast Charge",
      rating: "4.7",
      reviews: "230",
      installedIn: "ERTIGA"
    }
  ],
  "Swift": [
    {
      id: 1,
      title: "Swift Car Charger",
      desc: "Precision molded 15W magnetic fast charging pad tailored for Swift dashboard console",
      price: "₹3,199",
      oldPrice: "₹3,899",
      speed: "15W Qi2 Fast Charge",
      rating: "4.9",
      reviews: "310",
      installedIn: "SWIFT"
    }
  ],
  "Swift Dzire": [
    {
      id: 1,
      title: "Swift Dzire Car Charger",
      desc: "Custom-contoured 15W wireless charging dock designed precisely for Swift Dzire console",
      price: "₹3,299",
      oldPrice: "₹3,999",
      speed: "15W Qi2 Fast Charge",
      rating: "4.9",
      reviews: "285",
      installedIn: "SWIFT DZIRE"
    }
  ]
};

export default function HomePage() {
  const [selectedMake, setSelectedMake] = useState('Maruti Suzuki & Toyota / Universal');
  const [selectedModel, setSelectedModel] = useState('Fronx');

  const availableModels = ['Universal', 'Fronx', 'Baleno', 'Glanza', 'Taisor', 'Ertiga', 'Swift', 'Swift Dzire'];
  const currentProducts = carModelsData[selectedModel] || carModelsData['Universal'];

  return (
    <>
      {/* Hero Section */}
      <main className="flex-1 relative flex flex-col justify-center items-center overflow-hidden pb-16 md:pb-32 pt-6 md:pt-8">
        
        {/* Desktop Background Text */}
        <div className="hidden md:flex absolute inset-0 flex-col justify-between items-center py-4 pointer-events-none select-none z-0 overflow-hidden">
          <h1 className="text-[13vw] leading-[0.85] font-['Anton'] text-[#04D9FF] tracking-tight uppercase whitespace-nowrap opacity-100 transform scale-y-[1.1] text-center">
            MODULAR MOUNTING
          </h1>
          <h1 className="text-[26vw] leading-[0.75] font-['Anton'] text-[#04D9FF] tracking-tight uppercase whitespace-nowrap opacity-100 mb-[-2vw] transform scale-y-[1.1] text-center">
            UNBOUND
          </h1>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-center md:justify-between items-center h-full gap-4 md:gap-8">
          
          {/* Left Column */}
          <div className="hidden md:block w-full md:w-[300px] xl:w-[340px] shrink-0 transform md:translate-y-8 z-20 text-center md:text-left order-2 md:order-1 mt-4 md:mt-0">
            <div className="hidden md:block rounded-[36px] border-[3px] border-[#444] p-1.5 overflow-hidden bg-black aspect-[1.15] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group">
              <div className="w-full h-full rounded-[28px] overflow-hidden">
                <img 
                  src={leftMountImg} 
                  alt="Workspace mounting" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
            <p className="md:mt-6 text-[18px] md:text-[19px] font-medium font-['Ubuntu'] text-white leading-[1.6] tracking-wide text-center md:text-left drop-shadow-md bg-[#0a0d14]/70 backdrop-blur-md p-5 rounded-2xl border border-[#04D9FF]/40 border-l-[6px] border-l-[#04D9FF] shadow-[0_0_20px_rgba(4,217,255,0.15)] relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-[#04D9FF]/10 to-transparent pointer-events-none"></span>
              <span className="relative z-10">Seamlessly adapt your<br className="hidden md:block" />workspace. One core module<br className="hidden md:block" />for every environment.</span>
            </p>
          </div>

          {/* Center Image & Mobile Layout */}
          <div className="flex-1 w-full flex flex-col items-center justify-center md:-mx-16 relative z-30 order-1 md:order-2 my-2 md:my-0">
            
            {/* Mobile Title Stack: Modular Mounting -> Unbound -> Image -> Subtitle & Button */}
            <div className="md:hidden flex flex-col items-center text-center w-full space-y-1 mb-4">
              <h1 className="text-[11vw] leading-[0.9] font-['Anton'] text-[#04D9FF] tracking-tight uppercase">
                MODULAR MOUNTING
              </h1>
              <h1 className="text-[14vw] leading-[0.9] font-['Anton'] text-[#04D9FF] tracking-tight uppercase pt-1 pb-3">
                UNBOUND
              </h1>
            </div>

            <img 
              src={centerMountTransparentImg} 
              alt="QicDock Stand" 
              className="w-[82%] sm:w-[70%] md:w-full max-w-[310px] md:max-w-[360px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-[8deg] pointer-events-none my-2" 
            />
            
            {/* Mobile-Only Subtitle and Button */}
            <div className="md:hidden flex flex-col items-center text-center mt-5 z-45 space-y-3.5">
              <p className="text-gray-300 font-medium text-sm tracking-wide leading-snug">
                Qicdock Mobile<br />Build Experience
              </p>
              <Link
                to="/categories"
                className="bg-[#04D9FF] hover:bg-[#3bf0ff] text-black font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full shadow-[0_0_20px_rgba(4,217,255,0.4)] transition-all active:scale-95"
              >
                Explore Categories
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden md:flex w-full md:w-[300px] xl:w-[340px] shrink-0 flex-col items-center md:items-end transform md:translate-y-28 z-20 text-center md:text-right order-3 md:order-3 mt-4 md:mt-0">
            <div className="hidden md:block rounded-[36px] border-[3px] border-[#444] p-1.5 overflow-hidden bg-black aspect-[1.2] w-full shadow-[0_0_50px_rgba(0,0,0,0.8)] relative group">
              <div className="w-full h-full rounded-[28px] overflow-hidden">
                <img 
                  src={rightMountImg} 
                  alt="Car mounting" 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
            <p className="md:mt-6 text-[18px] md:text-[19px] font-medium font-['Ubuntu'] text-white leading-[1.6] tracking-wide text-center md:text-right drop-shadow-md bg-[#0a0d14]/70 backdrop-blur-md p-5 rounded-2xl border border-[#04D9FF]/40 border-r-[6px] border-r-[#04D9FF] shadow-[0_0_20px_rgba(4,217,255,0.15)] relative overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-l from-[#04D9FF]/10 to-transparent pointer-events-none"></span>
              <span className="relative z-10">Instant magnetic alignment.<br className="hidden md:block" />Secure mounting for the<br className="hidden md:block" />roughest roads.</span>
            </p>
          </div>

        </div>
      </main>

      {/* Integrated Solutions Section */}
      <section className="bg-[#080808] text-white w-full py-16 md:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Left Content */}
          <div className="flex-1 space-y-8 md:space-y-12 max-w-2xl w-full">
            <h2 className="text-3xl md:text-[40px] leading-tight font-medium tracking-tight text-white">
              Integrated Solutions for <span className="text-[#04D9FF]">Every Space</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-12 gap-y-6 sm:gap-y-10">
              {/* Feature 1 */}
              <div className="space-y-3 sm:space-y-4">
                <div className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full bg-[#EAF2A6] flex items-center justify-center border border-[#dce68f]">
                  <Smartphone className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] text-[#222] stroke-[1.5]" />
                </div>
                <h3 className="text-sm sm:text-[18px] font-semibold font-['Ubuntu'] tracking-wide text-white">On-Desk Adaptability</h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-[15px]">
                  From a simple phone stand to a full workstation, the desk base adapts to your needs.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-3 sm:space-y-4">
                <div className="w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] rounded-full bg-[#DDF1FB] flex items-center justify-center border border-[#cae9f8]">
                  <Car className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] text-[#222] stroke-[1.5]" />
                </div>
                <h3 className="text-sm sm:text-[18px] font-semibold font-['Ubuntu'] tracking-wide text-white">Seamless Car &amp; Wall Integration</h3>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-[15px]">
                  Easily transition from desk to car with specialized vents and wall mounts.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 w-full flex justify-end">
            <div className="w-full max-w-[650px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#111] aspect-[16/9] lg:aspect-[1.8] relative shadow-2xl border border-[#333]">
               <img 
                 src={combinedImg} 
                 alt="Combined solutions" 
                 className="w-full h-full object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      <section className="bg-[#080808] w-full py-24 px-4 md:px-10 relative overflow-hidden border-t border-[#111]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-16 relative z-20">
            <h2 className="text-4xl md:text-5xl font-['Anton'] tracking-wide text-white uppercase">
              THE <span className="text-[#04D9FF]">QICDOCK</span> CONFIGURATOR
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium">
              High-resolution charging module, or dynamically changes on click
            </p>
          </div>

          {/* Main Stage */}
          <div className="relative w-full max-w-[1000px] mx-auto mt-10 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-12 items-center relative z-10">
              
              {/* Left Column */}
              <div className="flex flex-col gap-6 md:gap-8 items-center md:items-end">
                {/* 1. All in One */}
                <Link to="/category/all-in-one" className="flex flex-col items-center md:items-end group cursor-pointer">
                  <div className="flex items-center gap-0">
                    <div className="w-[140px] md:w-[180px] aspect-[4/3] rounded-2xl border border-[#333] bg-[#0c0c0c] p-2 flex justify-center items-center shadow-lg group-hover:border-[#04D9FF]/50 transition-colors relative z-10">
                      <img src={combinedImg} alt="All in one" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-[#333] bg-[#0c0c0c] items-center justify-center text-gray-400 group-hover:text-[#04D9FF] group-hover:border-[#04D9FF]/50 transition-colors relative z-20">
                      <Layers className="w-4 h-4 relative z-10 bg-[#0c0c0c]" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-left rotate-[18deg]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-white mt-2 md:mr-[48px] lg:mr-[56px] group-hover:text-[#04D9FF] transition-colors">All in one</span>
                </Link>
                
                {/* 2. Car Combo */}
                <Link to="/category/car-combo" className="flex flex-col items-center md:items-end group cursor-pointer">
                  <div className="flex items-center gap-0">
                    <div className="w-[140px] md:w-[180px] aspect-[4/3] rounded-2xl border border-[#333] bg-[#0c0c0c] p-2 flex justify-center items-center shadow-lg group-hover:border-[#04D9FF]/50 transition-colors relative z-10">
                      <img src={centerMountImg} alt="Car combo" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-[#333] bg-[#0c0c0c] items-center justify-center text-gray-400 group-hover:text-[#04D9FF] group-hover:border-[#04D9FF]/50 transition-colors relative z-20">
                      <Car className="w-4 h-4 relative z-10 bg-[#0c0c0c]" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-full w-6 md:w-12 lg:w-16 h-[1px] bg-[#555] -z-10 origin-left rotate-[-2deg]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-white mt-2 md:mr-[48px] lg:mr-[56px] group-hover:text-[#04D9FF] transition-colors">Car combo</span>
                </Link>

                {/* 3. Home and office Combo */}
                <Link to="/category/home-office" className="flex flex-col items-center md:items-end group cursor-pointer">
                  <div className="flex items-center gap-0">
                    <div className="w-[140px] md:w-[180px] aspect-[4/3] rounded-2xl border border-[#333] bg-[#0c0c0c] p-2 flex justify-center items-center shadow-lg group-hover:border-[#04D9FF]/50 transition-colors relative z-10">
                      <img src={leftMountImg} alt="Home and office Combo" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-[#333] bg-[#0c0c0c] items-center justify-center text-gray-400 group-hover:text-[#04D9FF] group-hover:border-[#04D9FF]/50 transition-colors relative z-20">
                      <Home className="w-4 h-4 relative z-10 bg-[#0c0c0c]" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-left rotate-[-20deg]">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-white mt-2 md:mr-[48px] lg:mr-[56px] group-hover:text-[#04D9FF] transition-colors text-center max-w-[140px] md:max-w-full">Home & Office Combo</span>
                </Link>
              </div>

              {/* Center Column */}
              <div className="flex flex-col items-center justify-center relative py-10 md:py-0">
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-[#04D9FF] blur-[70px] opacity-25 rounded-full mix-blend-screen pointer-events-none"></div>
                  <img 
                    src={centerMountTransparentImg} 
                    alt="Core Module" 
                    className="w-[220px] md:w-[320px] object-contain relative z-10 drop-shadow-[0_0_20px_rgba(4,217,255,0.5)]"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-6 md:gap-8 items-center md:items-start">
                {/* 4. Car Charger */}
                <Link to="/category/vehicle-specific" className="flex flex-col items-center md:items-start group cursor-pointer">
                  <div className="flex items-center gap-0 flex-row-reverse md:flex-row">
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-[#333] bg-[#0c0c0c] items-center justify-center text-gray-400 group-hover:text-[#04D9FF] group-hover:border-[#04D9FF]/50 transition-colors relative z-20">
                      <Zap className="w-4 h-4 relative z-10 bg-[#0c0c0c]" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-right rotate-[-18deg]">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="w-[140px] md:w-[180px] aspect-[4/3] rounded-2xl border border-[#333] bg-[#0c0c0c] p-2 flex justify-center items-center shadow-lg group-hover:border-[#04D9FF]/50 transition-colors relative z-10">
                      <img src={rightMountImg} alt="Car Charger" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-white mt-2 md:ml-[48px] lg:ml-[56px] group-hover:text-[#04D9FF] transition-colors">Car Charger</span>
                </Link>
                
                {/* 5. Universal car charging pad */}
                <Link to="/category/individual" className="flex flex-col items-center md:items-start group cursor-pointer">
                  <div className="flex items-center gap-0 flex-row-reverse md:flex-row">
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-[#333] bg-[#0c0c0c] items-center justify-center text-gray-400 group-hover:text-[#04D9FF] group-hover:border-[#04D9FF]/50 transition-colors relative z-20">
                      <BatteryCharging className="w-4 h-4 relative z-10 bg-[#0c0c0c]" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-6 md:w-12 lg:w-16 h-[1px] bg-[#555] -z-10 origin-right rotate-[2deg]">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="w-[140px] md:w-[180px] aspect-[4/3] rounded-2xl border border-[#333] bg-[#0c0c0c] p-2 flex justify-center items-center shadow-lg group-hover:border-[#04D9FF]/50 transition-colors relative z-10">
                      <img src={centerMountTransparentImg} alt="Universal car charging pad" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-white mt-2 md:ml-[48px] lg:ml-[56px] group-hover:text-[#04D9FF] transition-colors text-center max-w-[140px] md:max-w-full">Universal Charging Pad</span>
                </Link>

                {/* 6. Only stand */}
                <Link to="/category/stand-alone" className="flex flex-col items-center md:items-start group cursor-pointer">
                  <div className="flex items-center gap-0 flex-row-reverse md:flex-row">
                    <div className="hidden md:flex w-8 h-8 rounded-full border border-[#333] bg-[#0c0c0c] items-center justify-center text-gray-400 group-hover:text-[#04D9FF] group-hover:border-[#04D9FF]/50 transition-colors relative z-20">
                      <MonitorSmartphone className="w-4 h-4 relative z-10 bg-[#0c0c0c]" />
                      <div className="absolute top-1/2 -translate-y-1/2 right-full w-10 md:w-16 lg:w-24 h-[1px] bg-[#555] -z-10 origin-right rotate-[20deg]">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#555]"></div>
                      </div>
                    </div>
                    <div className="hidden md:block w-4 lg:w-6 h-[1px] bg-[#555]"></div>
                    <div className="w-[140px] md:w-[180px] aspect-[4/3] rounded-2xl border border-[#333] bg-[#0c0c0c] p-2 flex justify-center items-center shadow-lg group-hover:border-[#04D9FF]/50 transition-colors relative z-10">
                      <img src={leftMountImg} alt="Only stand" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-[13px] md:text-sm font-bold font-['Ubuntu'] text-white mt-2 md:ml-[48px] lg:ml-[56px] group-hover:text-[#04D9FF] transition-colors">Only Stand</span>
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Compatibility Engine Section */}
      <section id="compatibility" className="bg-[#080808] w-full pb-24 px-4 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center space-y-4 mb-10">
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-white uppercase mt-2">
              Find Your Car
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-lg">
              Select your vehicle make and model to see 100% fit-guaranteed QICDOCK chargers.
            </p>
          </div>

          {/* Selectors */}
          <div className="bg-[#0c0c0c] rounded-2xl border border-[#222] p-4 md:p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="w-full space-y-2">
              <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-1">1. Select Make</label>
              <select 
                value={selectedMake}
                onChange={(e) => setSelectedMake(e.target.value)}
                className="w-full bg-[#080808] border border-[#333] text-white text-sm rounded-xl px-4 py-3.5 outline-none focus:border-[#04D9FF] appearance-none cursor-pointer"
              >
                <option value="Maruti Suzuki & Toyota / Universal">Maruti Suzuki & Toyota / Universal</option>
              </select>
            </div>
            <div className="w-full space-y-2">
              <label className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-1">2. Select Model</label>
              <select 
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#080808] border border-[#333] text-white text-sm rounded-xl px-4 py-3.5 outline-none focus:border-[#04D9FF] appearance-none cursor-pointer"
              >
                {availableModels.map(model => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            <div className="w-full pt-2 md:pt-0">
              <button className="w-full bg-[#04D9FF] hover:bg-white text-black px-6 py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer">
                Show Fit Results &gt;
              </button>
            </div>
          </div>

          {/* Success Banner */}
          <div className="bg-[#04D9FF]/5 border border-[#04D9FF]/30 rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#04D9FF] flex items-center justify-center shrink-0">
                <Check className="w-6 h-6 text-[#0a0d14] stroke-[3]" />
              </div>
              <div>
                <div className="text-[#04D9FF] text-[10px] font-bold tracking-widest uppercase mb-0.5">100% Fit Guarantee Confirmed</div>
                <div className="text-white text-sm md:text-base font-medium">Compatible chargers for <span className="text-[#04D9FF]">2025 {selectedModel.toUpperCase()}</span></div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedModel('Universal')}
              className="flex items-center gap-2 text-gray-400 hover:text-white border border-[#1E293B] hover:border-gray-500 bg-[#121824] px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest uppercase transition-all shrink-0 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {currentProducts.map(product => (
              <div key={product.id} className="bg-[#121824] border border-[#1E293B] rounded-2xl overflow-hidden flex flex-col group hover:border-[#04D9FF]/50 transition-colors">
                {/* Image Area */}
                <div className="w-full aspect-[16/10] bg-[#0a0d14] relative overflow-hidden">
                  <img src={centerMountImg} alt={product.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#04D9FF] text-[#0a0d14] text-[7px] md:text-[9px] font-bold px-1.5 md:px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-lg">
                    <Check className="w-2 h-2 md:w-3 md:h-3" /> 100% Fit Guarantee
                  </div>
                  <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 bg-[#0a0d14]/90 text-[#04D9FF] text-[7px] md:text-[9px] font-bold px-1.5 md:px-2 py-1 rounded-md uppercase tracking-wider border border-[#04D9FF]/20 backdrop-blur-sm">
                    Installed in {product.installedIn}
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-3 md:p-5 flex flex-col flex-1">
                  {/* Specs row */}
                  <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="flex items-center gap-1 text-[#04D9FF]">
                      <Zap className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current" />
                      <span className="text-[8px] md:text-[10px] font-bold tracking-wide uppercase">{product.speed}</span>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-current" />
                      <span className="text-[8px] md:text-[10px] font-bold text-gray-300">{product.rating} <span className="text-gray-500">({product.reviews})</span></span>
                    </div>
                  </div>
                  
                  {/* Title & Desc */}
                  <h3 className="text-white font-bold text-xs md:text-sm leading-snug mb-1 md:mb-2">{product.title}</h3>
                  <p className="text-gray-400 text-[9px] md:text-[11px] leading-relaxed mb-3 md:mb-4 flex-1 line-clamp-2 md:line-clamp-none">{product.desc}</p>
                  
                  {/* Price Row */}
                  <div className="flex items-end gap-1.5 md:gap-2 mb-3 md:mb-5">
                    <span className="text-sm md:text-lg font-bold text-white leading-none">{product.price}</span>
                    <span className="text-[10px] md:text-xs text-gray-500 line-through leading-none pb-0.5">{product.oldPrice}</span>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-auto">
                    <Link to="/category/vehicle-specific" className="flex-1 flex items-center justify-center gap-1 md:gap-2 bg-[#1E293B]/50 hover:bg-[#1E293B] border border-[#2D3748] text-gray-300 hover:text-white px-2 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold tracking-widest uppercase transition-colors">
                      <Eye className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> <span className="hidden sm:inline">View Product</span><span className="sm:hidden">View</span>
                    </Link>
                    <Link to="/cart" className="flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 bg-[#04D9FF] hover:bg-[#03b8d9] text-[#0a0d14] px-2 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-bold tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(4,217,255,0.3)]">
                      <ShoppingBag className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" /> Add
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* Best Value Combos Section */}
      <section className="bg-[#050505] w-full py-24 px-4 md:px-10 border-t border-[#111]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16 flex flex-col items-center">
            <span className="text-[#0066FF] text-xs font-bold tracking-[0.2em] uppercase bg-[#0066FF]/10 border border-[#0066FF]/30 px-4 py-2 rounded-full backdrop-blur-sm inline-block shadow-[0_0_15px_rgba(0,102,255,0.2)]">
              SAVE UP TO ₹1,100 WITH BUNDLES
            </span>
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-white uppercase mt-4">
              Smart Combos. <span className="text-[#04D9FF]">Bigger Savings.</span>
            </h2>
            <p className="text-[#E2E8F0] text-sm md:text-base max-w-2xl mx-auto font-medium">
              Unlock instant discounts on mounts and accessories when you buy them together.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            
            {/* Card 1: Ultimate */}
            <div className="bg-[#121212] border border-[#0066FF]/50 rounded-2xl md:rounded-3xl p-3 md:p-5 lg:p-6 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(0,102,255,0.15)] group transition-all hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0066FF]/10 to-transparent opacity-50 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <div>
                    <span className="text-[#0066FF] text-[8px] md:text-[10px] font-bold tracking-widest uppercase bg-[#0066FF]/10 border border-[#0066FF]/30 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full mb-1 md:mb-2 inline-block">Best Value Badge</span>
                    <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 line-clamp-2 md:line-clamp-none leading-snug">Ultimate All-in-One Kit</h3>
                    <p className="text-[#E2E8F0] text-[9px] md:text-xs font-medium tracking-wide">Every Mount Included</p>
                  </div>
                </div>

                {/* 3D Render Image Placeholder - Using existing combinedImg */}
                <div className="h-24 md:h-44 w-full bg-[#050505] rounded-xl md:rounded-2xl border border-[#262626] mb-2 md:mb-4 flex items-center justify-center overflow-hidden p-2 md:p-4 group-hover:border-[#0066FF]/50 transition-colors relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={combinedImg} alt="Ultimate Kit" className="relative z-20 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]" />
                </div>

                <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                  <div className="flex items-start md:items-center gap-1.5 md:gap-2.5">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-[#0066FF] flex-shrink-0 mt-0.5 md:mt-0" />
                    <span className="text-[9px] md:text-sm text-[#E2E8F0] leading-tight md:leading-normal">Charger (₹1,999) + 5 Mounts</span>
                  </div>
                  <div className="flex items-start md:items-center gap-1.5 md:gap-2.5">
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-[#0066FF] flex-shrink-0 mt-0.5 md:mt-0" />
                    <span className="text-[9px] md:text-sm text-gray-400 leading-tight md:leading-normal">Desk, Wall, Vent, Rear Seat, Car Pad</span>
                  </div>
                  
                  {/* Micro Breakdown Box */}
                  <div className="bg-[#050505] border border-[#262626] rounded-lg md:rounded-xl p-2 md:p-3 mt-2 md:mt-3 hidden sm:block">
                    <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mb-1 md:mb-1.5 font-bold">Mount Prices Drop</div>
                    <div className="flex justify-between items-center text-[9px] md:text-[11px]">
                      <span className="text-gray-500 line-through">₹299 - ₹399 each</span>
                      <ArrowRight className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-[#0066FF]" />
                      <span className="text-[#04D9FF] font-bold">₹99 - ₹149 each</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-2 md:pt-4 border-t border-[#262626] relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 md:mb-4 gap-1">
                  <div>
                    <div className="text-gray-500 line-through text-[10px] md:text-sm mb-0 md:mb-0.5 decoration-red-500 decoration-2 font-medium leading-none">Regular: ₹3,694</div>
                    <div className="text-lg md:text-3xl lg:text-4xl font-['Anton'] text-[#04D9FF] tracking-wide leading-none mt-1">₹2,594</div>
                  </div>
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[8px] md:text-[9px] font-bold px-1.5 py-1 md:px-2 md:py-1.5 rounded md:rounded-lg uppercase text-center shadow-[0_0_15px_rgba(34,197,94,0.15)] mt-1 sm:mt-0 self-start sm:self-auto">
                    INSTANT ₹1,100 OFF
                  </div>
                </div>
                <button className="w-full bg-[#0066FF] hover:bg-white text-white hover:text-[#080808] transition-colors py-2 md:py-3 rounded-lg md:rounded-xl font-bold uppercase tracking-wider text-[9px] md:text-sm shadow-[0_5px_20px_rgba(0,102,255,0.4)] mt-2">
                  Get Ultimate Kit
                </button>
              </div>
            </div>

            {/* Card 2: Car Pack */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl md:rounded-3xl p-3 md:p-5 lg:p-6 flex flex-col relative overflow-hidden group hover:border-[#444] transition-all hover:-translate-y-1">
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-2 md:mb-4">
                  <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 group-hover:text-[#04D9FF] transition-colors line-clamp-2 md:line-clamp-none leading-snug">Front & Rear Vehicle Charging</h3>
                  <p className="text-[#04D9FF] text-[9px] md:text-xs font-bold uppercase tracking-wider mb-1">Car Combo</p>
                  <p className="text-[#E2E8F0] text-[9px] md:text-xs font-medium tracking-wide leading-relaxed">All-in-one car charger bundle designed for front and rear passengers. Keep your phone locked in place over speed bumps, potholes, and sharp corners while delivering 15W fast charging.</p>
                </div>

                <div className="h-24 md:h-44 w-full bg-[#050505] rounded-xl md:rounded-2xl border border-[#262626] mb-2 md:mb-4 flex items-center justify-center overflow-hidden p-2 md:p-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={centerMountImg} alt="Car Pack" className="relative z-20 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] opacity-90" />
                </div>

                <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                  <div className="flex items-start md:items-center gap-1.5 md:gap-2.5">
                    <CheckCircle2 className="w-3 h-3 md:w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-[#04D9FF] transition-colors mt-0.5 md:mt-0" />
                    <span className="text-[9px] md:text-sm text-[#E2E8F0] leading-tight md:leading-normal">1x Qicdock Core Charger</span>
                  </div>
                  <div className="flex items-start md:items-center gap-1.5 md:gap-2.5">
                    <CheckCircle2 className="w-3 h-3 md:w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-[#04D9FF] transition-colors mt-0.5 md:mt-0" />
                    <span className="text-[9px] md:text-sm text-gray-400 leading-tight md:leading-normal">Car Pad + Air Vent Clip + Rear Seat</span>
                  </div>
                  
                  {/* Micro Breakdown Box */}
                  <div className="bg-[#050505] border border-[#262626] rounded-lg md:rounded-xl p-2 md:p-3 mt-2 md:mt-3 hidden sm:block">
                    <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mb-1 md:mb-1.5 font-bold">Bundle Advantage</div>
                    <div className="flex justify-between items-center text-[9px] md:text-[11px]">
                      <span className="text-[#E2E8F0] font-medium">Equip your entire vehicle</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-2 md:pt-4 border-t border-[#262626] relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 md:mb-4 gap-1">
                  <div>
                    <div className="text-gray-500 line-through text-[10px] md:text-sm mb-0 md:mb-0.5 decoration-red-500 decoration-2 font-medium leading-none">Regular: ₹2,996</div>
                    <div className="text-lg md:text-3xl lg:text-4xl font-['Anton'] text-white tracking-wide leading-none mt-1">₹2,346</div>
                  </div>
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[8px] md:text-[9px] font-bold px-1.5 py-1 md:px-2 md:py-1.5 rounded md:rounded-lg uppercase text-center shadow-[0_0_15px_rgba(34,197,94,0.15)] mt-1 sm:mt-0 self-start sm:self-auto">
                    SAVE ₹650
                  </div>
                </div>
                <button className="w-full bg-[#222] border border-[#333] hover:bg-[#04D9FF] hover:border-[#04D9FF] text-white hover:text-[#080808] transition-colors py-2 md:py-3 rounded-lg md:rounded-xl font-bold uppercase tracking-wider text-[9px] md:text-sm mt-2">
                  Get Car Pack
                </button>
              </div>
            </div>

            {/* Card 3: Mega Pack */}
            <div className="bg-[#121212] border border-[#262626] rounded-2xl md:rounded-3xl p-3 md:p-5 lg:p-6 flex flex-col relative overflow-hidden group hover:border-[#444] transition-all hover:-translate-y-1 col-span-2 sm:col-span-1 lg:col-span-1 mx-auto w-full max-w-[300px] sm:max-w-none">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2 md:mb-4">
                  <div>
                    <span className="text-gray-300 text-[8px] md:text-[10px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 px-1.5 py-0.5 md:px-2.5 md:py-1 rounded-full mb-1 md:mb-2 inline-block">Special Value</span>
                    <h3 className="text-sm md:text-2xl font-bold text-white mb-0.5 group-hover:text-[#04D9FF] transition-colors line-clamp-2 md:line-clamp-none leading-snug">Dual Charger + All Mounts</h3>
                    <p className="text-[#E2E8F0] text-[9px] md:text-xs font-medium tracking-wide">For Home & Car Setups</p>
                  </div>
                </div>

                <div className="h-24 md:h-44 w-full bg-[#050505] rounded-xl md:rounded-2xl border border-[#262626] mb-2 md:mb-4 flex items-center justify-center overflow-hidden p-2 md:p-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img src={leftMountImg} alt="Mega Pack" className="relative z-20 max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] opacity-90" />
                </div>

                <div className="space-y-1 md:space-y-2 mb-2 md:mb-4">
                  <div className="flex items-start md:items-center gap-1.5 md:gap-2.5">
                    <CheckCircle2 className="w-3 h-3 md:w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-[#04D9FF] transition-colors mt-0.5 md:mt-0" />
                    <span className="text-[9px] md:text-sm text-[#E2E8F0] leading-tight md:leading-normal">2x Qicdock Core Chargers</span>
                  </div>
                  <div className="flex items-start md:items-center gap-1.5 md:gap-2.5">
                    <CheckCircle2 className="w-3 h-3 md:w-4 h-4 text-gray-500 flex-shrink-0 group-hover:text-[#04D9FF] transition-colors mt-0.5 md:mt-0" />
                    <span className="text-[9px] md:text-sm text-gray-400 leading-tight md:leading-normal">All 5 Universal Mount Bases</span>
                  </div>
                  
                  {/* Micro Breakdown Box */}
                  <div className="bg-[#050505] border border-[#262626] rounded-lg md:rounded-xl p-2 md:p-3 mt-2 md:mt-3 hidden sm:block">
                    <div className="text-[8px] md:text-[9px] text-gray-500 uppercase tracking-widest mb-1 md:mb-1.5 font-bold">Dual Convenience</div>
                    <div className="flex justify-between items-center text-[9px] md:text-[11px]">
                      <span className="text-[#E2E8F0] font-medium">Leave one at home, one in car</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-2 md:pt-4 border-t border-[#262626] relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-2 md:mb-4 gap-1">
                  <div>
                    <div className="text-gray-500 line-through text-[10px] md:text-sm mb-0 md:mb-0.5 decoration-red-500 decoration-2 font-medium leading-none">Regular: ₹5,693</div>
                    <div className="text-lg md:text-3xl lg:text-4xl font-['Anton'] text-white tracking-wide leading-none mt-1">₹4,293</div>
                  </div>
                  <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-[8px] md:text-[9px] font-bold px-1.5 py-1 md:px-2 md:py-1.5 rounded md:rounded-lg uppercase text-center shadow-[0_0_15px_rgba(34,197,94,0.15)] mt-1 sm:mt-0 self-start sm:self-auto">
                    SAVE ₹1,400
                  </div>
                </div>
                <button className="w-full bg-[#222] border border-[#333] hover:bg-[#04D9FF] hover:border-[#04D9FF] text-white hover:text-[#080808] transition-colors py-2 md:py-3 rounded-lg md:rounded-xl font-bold uppercase tracking-wider text-[9px] md:text-sm mt-2">
                  Get Mega Bundle
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#080808] w-full py-24 px-4 md:px-10 border-t border-[#111]">
        <div className="max-w-[1400px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-white uppercase">
              How <span className="text-[#04D9FF]">QICDOCK</span> Works
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Four simple steps from selection to effortless daily wireless charging.
            </p>
          </div>

          {/* Steps Grid - 2 rows x 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            
            {/* Step 1 */}
            <div className="bg-[#0c0c0c] rounded-xl sm:rounded-2xl border border-[#333] p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#04D9FF]/50 transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#1a1a1a] opacity-50 z-0 select-none">
                01
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#04D9FF]/10 border border-[#04D9FF]/30 flex items-center justify-center text-[#04D9FF] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-white uppercase tracking-wider mb-1.5 sm:mb-3">Choose Your Car</h3>
                <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Select your vehicle Make, Model, and Year in our compatibility tool.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#0c0c0c] rounded-xl sm:rounded-2xl border border-[#333] p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#04D9FF]/50 transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#1a1a1a] opacity-50 z-0 select-none">
                02
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#04D9FF]/10 border border-[#04D9FF]/30 flex items-center justify-center text-[#04D9FF] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-white uppercase tracking-wider mb-1.5 sm:mb-3">Select Your Dock</h3>
                <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Pick OEM Car-Specific Docks, Universal Mats, or Custom Requests.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#0c0c0c] rounded-xl sm:rounded-2xl border border-[#333] p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#04D9FF]/50 transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#1a1a1a] opacity-50 z-0 select-none">
                03
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#04D9FF]/10 border border-[#04D9FF]/30 flex items-center justify-center text-[#04D9FF] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-white uppercase tracking-wider mb-1.5 sm:mb-3">Easy Install</h3>
                <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Plug-and-play setup in under 2 minutes with zero wire cutting or tools.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#0c0c0c] rounded-xl sm:rounded-2xl border border-[#333] p-4 sm:p-6 md:p-8 flex flex-col items-center text-center group hover:border-[#04D9FF]/50 transition-colors relative overflow-hidden">
              <div className="absolute -right-2 sm:-right-4 -top-2 sm:-top-4 text-5xl sm:text-7xl md:text-[110px] font-['Anton'] text-[#1a1a1a] opacity-50 z-0 select-none">
                04
              </div>
              <div className="relative z-10 w-full flex flex-col items-center">
                <div className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#04D9FF]/10 border border-[#04D9FF]/30 flex items-center justify-center text-[#04D9FF] mb-3 sm:mb-5 md:mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xs sm:text-base md:text-lg font-bold text-white uppercase tracking-wider mb-1.5 sm:mb-3">Drive & Charge</h3>
                <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-snug sm:leading-relaxed">
                  Drop your smartphone onto the dock and enjoy instant 15W wireless power.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#080808] w-full py-24 px-4 md:px-10 border-t border-[#111]">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-['Anton'] tracking-wide text-white uppercase">
              Got Questions? <span className="text-[#04D9FF]">We Have Answers.</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base font-medium max-w-2xl mx-auto">
              Everything you need to know about compatibility, installation, and delivery.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Which cars are compatible with QICDOCK?",
                a: "QICDOCK Universal chargers work with most vehicles. For our Car Specific Docks, we support a wide range of modern vehicles. Please use our 'Find Your Car' compatibility engine to see options specifically engineered for your make and model."
              },
              {
                q: "How do I know which charger fits my car?",
                a: "Simply navigate to our homepage and use the Vehicle Compatibility Engine. Select your car's make, model, and year, and we will show you the exact QICDOCK solutions designed to fit your console seamlessly."
              },
              {
                q: "Does QICDOCK support fast wireless charging?",
                a: "Yes! All QICDOCK core modules support high-output 15W fast wireless charging for compatible devices, including Apple MagSafe and Qi2 standard devices."
              },
              {
                q: "Does the charger require professional installation or wire cutting?",
                a: "No professional installation is required. Our docks are designed for a 2-minute plug-and-play setup. They run directly off your car's existing USB or 12V ports with zero wire cutting."
              },
              {
                q: "Will my phone slip off during hard braking or cornering?",
                a: "Not at all. Our docks utilize advanced non-slip silicone surfaces and, for MagSafe/Qi2 models, strong magnetic arrays to ensure your device stays perfectly aligned and secure even under hard acceleration or cornering."
              }
            ].map((faq, i) => (
              <details key={i} className="bg-[#0c0c0c] border border-[#333] rounded-xl group overflow-hidden transition-colors hover:border-[#04D9FF]/50 [&_summary::-webkit-details-marker]:hidden">
                <summary className="p-6 flex justify-between items-center cursor-pointer list-none">
                  <h3 className="text-white font-medium text-[15px] group-hover:text-[#04D9FF] transition-colors pr-8">{faq.q}</h3>
                  <div className="relative w-5 h-5 flex-shrink-0 flex items-center justify-center text-gray-500 group-hover:text-[#04D9FF] transition-colors">
                    <Plus className="w-5 h-5 absolute transition-transform duration-300 group-open:rotate-45" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-[#222] pt-4 mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#080808] w-full relative overflow-hidden border-t border-[#111]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-transparent"></div>
        
        <div className="max-w-[1400px] mx-auto py-24 px-4 md:px-10 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[#04D9FF] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">Automotive Interior</span>
            <h2 className="text-4xl md:text-6xl font-['Anton'] tracking-wide text-white uppercase mb-6">
              UPGRADE YOUR <span className="text-[#04D9FF]">INTERIOR TODAY</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Your Dashboard Deserves Better.</h3>
            <p className="text-gray-400 text-sm md:text-base mb-10 max-w-2xl mx-auto leading-relaxed">
              Find a charging solution engineered specifically around the way you drive. Zero messy cables, zero compromise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#04D9FF] text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white transition-colors flex items-center justify-center gap-2">
                FIND YOUR CAR
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                SHOP UNIVERSAL
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Badges strip */}
        <div className="border-t border-b border-[#222] bg-[#0c0c0c] py-6 relative z-10">
          <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-center gap-8 md:gap-20">
            <div className="flex items-center gap-3 justify-center">
              <Truck className="w-6 h-6 text-[#04D9FF]" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">Free Express Shipping</p>
                <p className="text-gray-500 text-xs">On all India orders above ₹999</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="w-6 h-6 text-[#04D9FF]" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">1 Year Warranty</p>
                <p className="text-gray-500 text-xs">Instant hardware replacement guarantee</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#04D9FF]" />
              <div className="text-left">
                <p className="text-white font-bold text-sm">100% Fit Guarantee</p>
                <p className="text-gray-500 text-xs">Guaranteed vehicle compatibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </>
  );
}
