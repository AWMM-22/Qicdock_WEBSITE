import { useState } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import brandLogo from '../assets/images/qicdock_brand_logo_1788854744770.jpg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Categories', path: '/categories' },
    { name: 'Find Your Car', path: '/#compatibility' },
    { name: 'Custom Made', path: '/category/vehicle-specific' },
    { name: 'About', path: '/about' }
  ];

  const categoryQuickLinks = [
    { name: 'All-In-One Combo', path: '/category/all-in-one', tag: 'Best Value' },
    { name: 'Car Combo Bundle', path: '/category/car-combo', tag: 'Automotive' },
    { name: 'Home & Office Combo', path: '/category/home-office', tag: 'Desk & Wall' },
    { name: 'Vehicle-Specific Docks', path: '/category/vehicle-specific', tag: 'OEM Fit' },
    { name: 'Individual Setups', path: '/category/individual', tag: 'Modular' },
    { name: 'Stand-Alone Bases', path: '/category/stand-alone', tag: 'Mounts' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080808]/95 backdrop-blur-md border-b border-[#1a1a1a]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group"
          >
            <img 
              src={brandLogo} 
              alt="QicDock" 
              className="h-9 sm:h-11 w-auto object-contain rounded-lg border border-[#04D9FF]/30 shadow-[0_0_15px_rgba(4,217,255,0.2)]" 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.16em] uppercase text-gray-300">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  if (link.path.startsWith('/#')) {
                    const hashId = link.path.replace('/#', '');
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById(hashId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
                className={`relative py-1 transition-colors hover:text-[#04D9FF] ${
                  isActive ? 'text-[#04D9FF]' : 'text-gray-300'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#04D9FF] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Search, Account, Cart + Mobile Hamburger) */}
        <div className="flex items-center gap-3 sm:gap-5 text-gray-300">
          <button 
            aria-label="Search chargers"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:text-[#04D9FF] hover:bg-white/5 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          <button 
            aria-label="Account"
            className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#04D9FF] py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden lg:inline">ACCOUNT</span>
          </button>

          <Link 
            to="/cart"
            aria-label="Cart"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:text-[#04D9FF] hover:bg-white/5 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 bg-[#04D9FF] text-[#080808] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(4,217,255,0.6)]">
              2
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-11 h-11 flex items-center justify-center text-gray-300 hover:text-[#04D9FF] rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#04D9FF]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-[#222] px-5 py-6 shadow-2xl transition-all animate-fadeIn">
          {/* Main Mobile Navigation */}
          <div className="space-y-1 pb-5 border-b border-[#1f1f1f]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (link.path.startsWith('/#')) {
                    const hashId = link.path.replace('/#', '');
                    if (location.pathname === '/') {
                      e.preventDefault();
                      const el = document.getElementById(hashId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }
                }}
                className={`flex items-center justify-between px-3 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-colors ${
                  location.pathname === link.path 
                    ? 'bg-[#04D9FF]/10 text-[#04D9FF]' 
                    : 'text-gray-200 hover:bg-white/5 hover:text-[#04D9FF]'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            ))}
          </div>

          {/* Categories Quick Access inside Mobile Menu */}
          <div className="pt-5 pb-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-3 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#04D9FF]" />
              Quick Category Configs
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {categoryQuickLinks.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#04D9FF]/15 text-[#04D9FF] border border-[#04D9FF]/30">
                    {cat.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Footer info */}
          <div className="pt-4 mt-3 border-t border-[#1f1f1f] flex items-center justify-between text-xs text-gray-400 px-2">
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#04D9FF]" />
              <span>1-Year Replacement Warranty</span>
            </div>
            <Link 
              to="/#compatibility" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#04D9FF] font-semibold hover:underline"
            >
              Fit Check →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
