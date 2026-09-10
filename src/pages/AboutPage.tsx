import React from 'react';
import { Sparkles, Shield, Zap, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] pt-24 pb-20 px-4 md:px-10">
      <div className="max-w-[1000px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[#0A1E3F] text-xs font-bold tracking-[0.2em] uppercase bg-[#0A1E3F]/10 border border-[#0A1E3F]/30 px-4 py-2 rounded-full inline-block">
            About QicDock
          </span>
          <h1 className="text-4xl md:text-6xl font-['Anton'] tracking-wide uppercase">
            Engineered For <span className="text-[#0A1E3F]">Seamless Mobility</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            The world's first truly modular 25W Qi2 wireless charging ecosystem designed for car, desk, and home.
          </p>
        </div>

        {/* Core Mission */}
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-8 md:p-12 space-y-6">
          <h2 className="text-2xl font-bold font-['Anton'] tracking-wide uppercase text-[#0A1E3F]">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            QicDock was founded with a singular mission: eliminate cable clutter and dashboard chaos by creating a versatile, high-speed magnetic charging system that seamlessly follows you throughout your day. Whether you are navigating rough terrain in your car, typing at your office desk, or relaxing at home, our patented quick-detach magnetic core module moves effortlessly with you.
          </p>
        </div>

        {/* Stats / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] p-8 rounded-2xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F] flex items-center justify-center mx-auto mb-4 border border-[#0A1E3F]/30">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-['Anton'] text-[#0A1E3F]">25W</h3>
            <p className="text-[#0A1E3F] text-xs font-bold uppercase tracking-wider">Qi2 Fast Charging</p>
            <p className="text-gray-600 text-xs mt-1">Blazing fast wireless power delivery with thermal safety controls.</p>
          </div>

          <div className="bg-[#FAF7F0] border border-[#E2DAC8] p-8 rounded-2xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-['Anton'] text-[#0A1E3F]">100%</h3>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Vehicle Fit Guarantee</p>
            <p className="text-gray-600 text-xs mt-1">Custom-engineered fit mounts for every dashboard and air vent.</p>
          </div>

          <div className="bg-[#FAF7F0] border border-[#E2DAC8] p-8 rounded-2xl text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mx-auto mb-4 border border-purple-500/30">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-['Anton'] text-[#0A1E3F]">3-in-1</h3>
            <p className="text-purple-400 text-xs font-bold uppercase tracking-wider">Car, Desk & Wall</p>
            <p className="text-gray-600 text-xs mt-1">One magnetic core module that snaps instantly into any environment.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
