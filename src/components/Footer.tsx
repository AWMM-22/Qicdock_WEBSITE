import { ArrowRight, Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { MouseEvent } from 'react';
import brandLogo from '../assets/images/qicdock_brand_logo_1788854744770.jpg';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFindYourCar = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#compatibility');
    } else {
      const el = document.getElementById('compatibility');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleShopUniversal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/categories');
  };

  return (
    <footer className="bg-[#050505] pt-14 pb-24 md:pb-12 px-4 sm:px-6 lg:px-10 border-t border-[#1a1a1a] text-white">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Brand & Newsletter (Desktop & Mobile) */}
        <div className="mb-10 pb-10 border-b border-[#1f1f1f] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-md space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={brandLogo} 
                alt="QicDock" 
                className="h-10 sm:h-12 w-auto object-contain rounded-lg border border-[#04D9FF]/30 shadow-[0_0_15px_rgba(4,217,255,0.2)]" 
              />
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              High-output 15W Qi2 wireless charging solutions precision-tailored for modern automobile cabins, home workstations, and bedside spaces.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={handleFindYourCar}
                className="bg-[#04D9FF] hover:bg-[#3bf0ff] text-black font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(4,217,255,0.3)] cursor-pointer"
              >
                Find Your Car
              </button>
              <button 
                onClick={handleShopUniversal}
                className="bg-[#1a1a1a] hover:bg-[#262626] text-white border border-[#333] hover:border-[#04D9FF] font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                Shop Universal
              </button>
            </div>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            <span className="text-white font-bold text-xs uppercase tracking-widest block mb-2.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#04D9FF]" />
              Subscribe for New Vehicle Releases
            </span>
            <div className="flex relative">
              <input 
                type="email" 
                placeholder="Enter email or car model..." 
                className="w-full bg-[#0c0c0c] border border-[#333] rounded-xl py-3 px-4 text-xs sm:text-sm text-white focus:outline-none focus:border-[#04D9FF] pr-12 transition-colors placeholder-gray-500"
              />
              <button 
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#04D9FF] hover:bg-white text-[#080808] rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Let's Get Social Section */}
        <div className="pt-8 pb-6 text-center border-t border-[#1a1a1a]">
          <h4 className="text-sm sm:text-base font-medium text-gray-300 mb-4 tracking-wide">
            Let's get social
          </h4>
          <div className="flex items-center justify-center gap-7 sm:gap-8 text-gray-400 mb-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-[#04D9FF] transition-colors hover:scale-110 transform duration-200"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-[#04D9FF] transition-colors hover:scale-110 transform duration-200"
            >
              <Twitter className="w-5 h-5 fill-current" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-[#04D9FF] transition-colors hover:scale-110 transform duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-[#04D9FF] transition-colors hover:scale-110 transform duration-200"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#04D9FF] transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin className="w-5 h-5 fill-current" />
            </a>
          </div>

          {/* Horizontal Policies Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-gray-400 mb-4 px-4">
            <Link to="/about" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span className="text-gray-400 select-none">•</span>
            <Link to="/about" className="hover:text-white transition-colors">Terms of Use</Link>
            <span className="text-gray-400 select-none">•</span>
            <Link to="/about" className="hover:text-white transition-colors">Warranty Policy</Link>
            <span className="text-gray-400 select-none">•</span>
            <Link to="/about" className="hover:text-white transition-colors">D2D Replacement Service Policy</Link>
          </div>

          {/* Copyright notice */}
          <p className="text-[11px] sm:text-xs text-gray-400 mb-3 tracking-wide">
            &copy; 2026 QICDOCK Technologies India Limited. All Rights Reserved.
          </p>

          {/* Company address block */}
          <p className="text-[10px] sm:text-[11px] text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            For queries contact us: QICDOCK Automotive Labs, Unit no. 204 & 205, 2nd Floor, Signature Park, Electronic City, Bengaluru, Karnataka-560100, India
          </p>
        </div>

      </div>
    </footer>
  );
}
