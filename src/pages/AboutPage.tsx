import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Zap, RefreshCw, CheckCircle2, ArrowRight, Award, Compass, Cpu, Car, Layers, HelpCircle, PhoneCall } from 'lucide-react';
import centerMountImg from '../assets/images/center_mount_1788721138616.webp';
import combinedImg from '../assets/images/3in1 copy.webp';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] pt-24 md:pt-28 pb-24 px-4 md:px-10">
      <div className="max-w-[1200px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 px-4 py-2 rounded-none inline-block">
            ABOUT QICDOCK
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-['Anton'] tracking-wide uppercase text-[#0A1E3F]">
            ENGINEERED FOR <span className="text-[#0A1E3F]">SEAMLESS MOBILITY</span>
          </h1>
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            The world's first truly modular 25W Qi2 wireless charging ecosystem, bridging vehicle cockpits, workstation desks, and living spaces with zero cable clutter.
          </p>
        </div>

        {/* Hero Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#FAF7F0] border-2 border-[#0A1E3F]/30 p-6 md:p-10 shadow-lg">
          <div className="space-y-6">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0A1E3F] bg-[#0A1E3F]/10 px-3 py-1">
              THE GENESIS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Anton'] uppercase tracking-wide text-[#0A1E3F]">
              Eliminating Dashboard Chaos & Loose Wires
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              QicDock was born out of frustration with flimsy plastic suction cups, tangled charging cables, and bulky car holders that block air conditioning or drop your phone over speed bumps.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              We asked a fundamental question: <em className="text-[#0A1E3F] font-semibold">Why buy separate chargers for your car, work desk, and bedside table?</em> By developing a universal hot-swappable magnetic core module that locks into precision-molded bases, we created a seamless charging bridge that transitions in one click.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all shadow-md"
              >
                <span>Explore Ecosystem</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/category/vehicle-specific"
                className="inline-flex items-center gap-2 bg-[#0A1E3F]/10 hover:bg-[#0A1E3F] text-[#0A1E3F] hover:text-[#FAF7F0] border border-[#0A1E3F]/30 font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all"
              >
                <span>Find Your Car</span>
              </Link>
            </div>
          </div>

          <div className="h-full min-h-[280px] sm:min-h-[360px] bg-[#FAF7F0] border border-[#D6CDB8] flex items-center justify-center p-4 overflow-hidden relative group">
            <img
              src={combinedImg}
              alt="QicDock Ecosystem"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* 4 Core Pillars of Engineering */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#0A1E3F] bg-[#0A1E3F]/10 px-3 py-1 inline-block">
              ENGINEERING PHILOSOPHY
            </span>
            <h2 className="text-3xl md:text-4xl font-['Anton'] uppercase tracking-wide text-[#0A1E3F]">
              Why QicDock Stands Apart
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F]/30 hover:border-[#0A1E3F] p-6 space-y-4 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 text-[#0A1E3F] flex items-center justify-center">
                <Zap className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] text-[#0A1E3F]">25W Qi2 Fast Wireless</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Certified fast magnetic wireless charging with active thermal dissipation coils to charge up to 3x faster without overheating your battery.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F]/30 hover:border-[#0A1E3F] p-6 space-y-4 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 text-[#0A1E3F] flex items-center justify-center">
                <Car className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] text-[#0A1E3F]">100% OEM Molded Fit</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                3D laser-scanned for Maruti Fronx, Baleno, Swift, Ertiga, Mahindra XUV 3XO, Toyota Glanza, and universal dashboard consoles.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F]/30 hover:border-[#0A1E3F] p-6 space-y-4 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 text-[#0A1E3F] flex items-center justify-center">
                <Layers className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] text-[#0A1E3F]">Modular Snapping Base</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                One Core Puck clicks into desk stands, car air vents, console charging pads, and bedside wall brackets instantly.
              </p>
            </div>

            <div className="bg-[#FAF7F0] border-2 border-[#0A1E3F]/30 hover:border-[#0A1E3F] p-6 space-y-4 shadow-sm transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#0A1E3F]/10 border border-[#0A1E3F]/25 text-[#0A1E3F] flex items-center justify-center">
                <Award className="w-6 h-6 stroke-[2]" />
              </div>
              <h3 className="text-lg font-bold font-['Ubuntu'] text-[#0A1E3F]">1-Year Replacement</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Zero hassle warranty. If anything fails under normal usage, our Indian support team ships a brand-new unit within 48 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Quality & Guarantee Banner */}
        <div className="bg-[#0A1E3F] text-[#F4F0E6] p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="text-xs font-bold tracking-widest uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 px-3 py-1 inline-block">
              OUR PROMISE TO YOU
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Anton'] uppercase tracking-wide">
              The 100% Fit & Satisfaction Guarantee
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              If your QicDock doesn't fit your car's cavity or vent seamlessly, we exchange it or refund 100% of your order without tedious paperwork.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F4F0E6]/20">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">Free Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">7-Day Return Window</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">24/7 Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact / Help Strip */}
        <div className="bg-[#FAF7F0] border border-[#D6CDB8] p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold text-lg text-[#0A1E3F]">Have custom requirements or fleet inquiries?</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Reach out to our engineering and support specialists anytime.</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/support"
              className="bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] px-6 py-3 font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
