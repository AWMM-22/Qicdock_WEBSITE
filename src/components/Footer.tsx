import { ArrowRight, Facebook, Twitter, Instagram, Youtube, Linkedin, Mail } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import type { MouseEvent } from 'react';
import brandLogo from '../assets/images/qicdock_brand_logo_1788854744770.webp';

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
    <footer className="bg-[#EBE5D9] pt-14 pb-24 md:pb-12 px-4 sm:px-6 lg:px-10 border-t border-[#E2DAC8] text-[#0A1E3F]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Top Brand & Newsletter (Desktop & Mobile) */}
        <div className="mb-10 pb-10 border-b border-[#E2DAC8] flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-md space-y-4">
            <Link to="/" className="inline-block">
              <img 
                src={brandLogo} 
                alt="QicDock" 
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg border border-[#0A1E3F]/30 shadow-[0_0_15px_rgba(4,217,255,0.2)]" 
              />
            </Link>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              High-output 25W Qi2 wireless charging solutions precision-tailored for modern automobile cabins, home workstations, and bedside spaces.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            <span className="text-[#0A1E3F] font-bold text-xs uppercase tracking-widest block mb-2.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#0A1E3F]" />
              Subscribe for New Vehicle Releases
            </span>
            <div className="flex relative">
              <input 
                type="email" 
                placeholder="Enter email or car model..." 
                className="w-full bg-[#FAF7F0] border border-[#D6CDB8] rounded-xl py-3 px-4 text-xs sm:text-sm text-[#0A1E3F] focus:outline-none focus:border-[#0A1E3F] pr-12 transition-colors placeholder-gray-500"
              />
              <button 
                aria-label="Subscribe"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Let's Get Social Section */}
        <div className="pt-8 pb-6 text-center border-t border-[#E2DAC8]">
          <h4 className="text-sm sm:text-base font-medium text-gray-700 mb-4 tracking-wide">
            Let's get social
          </h4>
          <div className="flex items-center justify-center gap-7 sm:gap-8 text-gray-600 mb-6">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-[#0A1E3F] transition-colors hover:scale-110 transform duration-200"
            >
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="X (Twitter)"
              className="hover:text-[#0A1E3F] transition-colors hover:scale-110 transform duration-200"
            >
              <Twitter className="w-5 h-5 fill-current" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-[#0A1E3F] transition-colors hover:scale-110 transform duration-200"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="YouTube"
              className="hover:text-[#0A1E3F] transition-colors hover:scale-110 transform duration-200"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#0A1E3F] transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin className="w-5 h-5 fill-current" />
            </a>
          </div>

          {/* Horizontal Policies Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-gray-600 mb-4 px-4">
            <Link to="/about" className="hover:text-[#0A1E3F] transition-colors">Privacy Policy</Link>
            <span className="text-gray-600 select-none">•</span>
            <Link to="/about" className="hover:text-[#0A1E3F] transition-colors">Terms of Use</Link>
            <span className="text-gray-600 select-none">•</span>
            <Link to="/about" className="hover:text-[#0A1E3F] transition-colors">Warranty Policy</Link>
            <span className="text-gray-600 select-none">•</span>
            <Link to="/about" className="hover:text-[#0A1E3F] transition-colors">D2D Replacement Service Policy</Link>
          </div>

          {/* Copyright notice */}
          <p className="text-[11px] sm:text-xs text-gray-600 mb-3 tracking-wide">
            &copy; 2026 QICDOCK Technologies India Limited. All Rights Reserved.
          </p>

          {/* Company address block */}
          <p className="text-[10px] sm:text-[11px] text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 mb-2">
            For queries contact us: QICDOCK Automotive Labs, Unit no. 204 & 205, 2nd Floor, Signature Park, Electronic City, Bengaluru, Karnataka-560100, India
          </p>
          <p className="text-[11px] sm:text-xs text-gray-600 font-medium">
            Support: <a href="mailto:support@qicdock.com" className="text-[#0A1E3F] hover:text-[#0A1E3F] transition-colors">support@qicdock.com</a>
          </p>
        </div>

      </div>
    </footer>
  );
}
