import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, Zap, Shield, Sparkles, LogOut, Package } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import brandLogo from '../assets/images/qicdock_brand_logo_1788854744770.jpg';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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

  // Searchable items combining categories and generic terms
  const searchableItems = [
    ...categoryQuickLinks,
    { name: 'Fronx Wireless Charger', path: '/category/vehicle-specific', tag: 'Product' },
    { name: 'Baleno Wireless Charger', path: '/category/vehicle-specific', tag: 'Product' },
    { name: 'Swift Wireless Charger', path: '/category/vehicle-specific', tag: 'Product' },
    { name: 'Ertiga Wireless Charger', path: '/category/vehicle-specific', tag: 'Product' },
    { name: 'Glanza Wireless Charger', path: '/category/vehicle-specific', tag: 'Product' },
    { name: 'Magnetic Core Charger', path: '/category/individual', tag: 'Module' },
    { name: 'Dashboard Mount', path: '/category/stand-alone', tag: 'Accessory' },
    { name: 'AC Vent Clip', path: '/category/stand-alone', tag: 'Accessory' },
  ];

  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : searchableItems.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F4F0E6]/95 backdrop-blur-md border-b border-[#E2DAC8]">
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
              className="h-9 sm:h-11 w-auto object-contain rounded-lg border border-[#0A1E3F]/30 shadow-[0_0_15px_rgba(4,217,255,0.2)]" 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links (Hidden when search is open on small desktops) */}
        <nav className={`hidden md:flex items-center justify-center gap-8 lg:gap-10 text-[12px] font-bold tracking-[0.16em] uppercase text-gray-700 ${isSearchOpen ? 'md:hidden lg:flex' : ''}`}>
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
                className={`relative py-1 transition-colors hover:text-[#0A1E3F] ${
                  isActive ? 'text-[#0A1E3F]' : 'text-gray-700'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0A1E3F] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions (Search, Account, Cart + Mobile Hamburger) */}
        <div className="flex items-center gap-3 sm:gap-5 text-gray-700">
          <div className="relative">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search chargers"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isSearchOpen ? 'bg-[#0A1E3F] text-white' : 'hover:text-[#0A1E3F] hover:bg-[#152B52]/5'}`}
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </button>
          </div>

          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link 
                to="/orders"
                className="flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#0A1E3F] py-2 px-3 rounded-lg hover:bg-[#152B52]/5 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span className="hidden lg:inline">ORDERS</span>
              </Link>
              <button 
                onClick={() => signOut()}
                aria-label="Sign Out"
                className="flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#0A1E3F] py-2 px-3 rounded-lg hover:bg-[#152B52]/5 transition-colors text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden lg:inline">SIGN OUT</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              aria-label="Account"
              className="hidden sm:flex items-center gap-2 text-xs font-bold tracking-widest hover:text-[#0A1E3F] py-2 px-3 rounded-lg hover:bg-[#152B52]/5 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">ACCOUNT</span>
            </Link>
          )}

          <Link 
            to="/cart"
            aria-label="Cart"
            className="w-10 h-10 rounded-full flex items-center justify-center hover:text-[#0A1E3F] hover:bg-[#152B52]/5 transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 bg-[#0A1E3F] text-[#F4F0E6] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-[0_0_8px_rgba(4,217,255,0.6)]">
              2
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-11 h-11 flex items-center justify-center text-gray-700 hover:text-[#0A1E3F] rounded-lg hover:bg-[#152B52]/5 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#0A1E3F]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-[#FAF7F0] border-b border-[#E2DAC8] shadow-lg overflow-hidden animate-fadeIn pb-4 z-40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for cars, chargers, or mounts..."
                className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl pl-12 pr-4 py-4 text-sm font-medium text-[#0A1E3F] focus:outline-none focus:border-[#0A1E3F] transition-colors placeholder:text-gray-500"
              />
            </div>

            {searchQuery.trim() !== '' && (
              <div className="mt-4 max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {searchResults.map((item, idx) => (
                      <Link
                        key={idx}
                        to={item.path}
                        onClick={() => setIsSearchOpen(false)}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-[#EBE5D9] transition-colors border border-transparent hover:border-[#D6CDB8]"
                      >
                        <span className="font-medium text-[#0A1E3F] text-sm">{item.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F] uppercase tracking-wider">
                          {item.tag}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-b border-[#E2DAC8] px-5 py-6 shadow-2xl transition-all animate-fadeIn">
          {/* Main Mobile Navigation */}
          <div className="space-y-1 pb-5 border-b border-[#E2DAC8]">
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
                    ? 'bg-[#0A1E3F]/10 text-[#0A1E3F]' 
                    : 'text-gray-800 hover:bg-[#152B52]/5 hover:text-[#0A1E3F]'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </Link>
            ))}
          </div>

          {/* Categories Quick Access inside Mobile Menu */}
          <div className="pt-5 pb-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-600 px-3 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#0A1E3F]" />
              Quick Category Configs
            </p>
            <div className="grid grid-cols-1 gap-1.5">
              {categoryQuickLinks.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-gray-700 hover:text-[#0A1E3F] hover:bg-[#152B52]/5 transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0A1E3F]/15 text-[#0A1E3F] border border-[#0A1E3F]/30">
                    {cat.tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Footer info */}
          <div className="pt-5 mt-3 border-t border-[#E2DAC8]">
            <div className="flex flex-col gap-3 mb-4 px-2">
              {user ? (
                <div className="space-y-3">
                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
                  >
                    <Package className="w-4 h-4" />
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors shadow-md"
                >
                  <User className="w-4 h-4" />
                  Sign In / Register
                </Link>
              )}
            </div>
            
            <div className="flex items-center justify-between text-xs text-gray-600 px-2">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#0A1E3F]" />
                <span>1-Year Replacement Warranty</span>
              </div>
              <Link 
                to="/#compatibility" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#0A1E3F] font-semibold hover:underline"
              >
                Fit Check →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
