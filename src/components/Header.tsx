import { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, Zap, Shield, Sparkles, LogOut, Package, ArrowRight, ArrowLeft, MessageSquare, Tag } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getCartCount } from '../lib/cart';
import brandLogo from '../assets/images/qicdocklogo.png';
import { searchEngine, SearchResult } from '../lib/searchEngine';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState<number>(() => getCartCount());
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 15);
      const totalScroll = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100)));
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Update search results dynamically using the fuzzy & token-based search engine
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const results = searchEngine(searchQuery);
      setSearchResults(results);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle outside click to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close search when route changes
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

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

  const popularSearches = ['Fronx', 'Wireless Charger', 'All in One', 'Air Vent', 'Table Stand', 'Ertiga', 'Swift'];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 pointer-events-none ${
        isScrolled ? 'pt-2 sm:pt-3 px-3 sm:px-6' : 'pt-0 px-0'
      }`} 
      ref={searchContainerRef}
    >
      <div 
        className={`pointer-events-auto transition-all duration-300 relative ${
          isScrolled 
            ? 'max-w-[1360px] mx-auto bg-[#FAF7F0]/95 backdrop-blur-xl border-2 border-[#D6CDB8] rounded-2xl md:rounded-full shadow-[0_14px_36px_rgba(10,30,63,0.18)] px-4 sm:px-6' 
            : 'w-full bg-[#F4F0E6]/95 backdrop-blur-md border-b border-[#E2DAC8] px-3 sm:px-6 lg:px-10'
        }`}
      >
        {/* Dynamic Navy Blue Reading Progress Indicator */}
        <div className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-transparent pointer-events-none overflow-hidden z-20 ${isScrolled ? 'rounded-full' : ''}`}>
          <div 
            className="h-full bg-gradient-to-r from-[#0A1E3F] via-[#1A386D] to-[#0A1E3F] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(10,30,63,0.5)]"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className={`max-w-[1440px] mx-auto flex items-center justify-between gap-2 sm:gap-4 md:gap-6 transition-all duration-300 ${
          isScrolled ? 'h-14 sm:h-16' : 'h-16 sm:h-20'
        }`}>
        
        {/* Brand Logo */}
        <div className="flex items-center shrink-0">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 group"
          >
            <img 
              src={brandLogo} 
              alt="QicDock" 
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              className="h-8 sm:h-11 w-auto object-contain rounded-lg border border-[#0A1E3F]/30 shadow-[0_0_15px_rgba(4,217,255,0.2)]" 
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center justify-center gap-5 2xl:gap-8 text-[12px] font-bold tracking-[0.14em] uppercase text-gray-700 shrink-0">
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

        {/* Extended Search Bar in Nav Bar */}
        <div className="flex flex-1 min-w-[110px] max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl relative items-center">
          <div className="relative w-full">
            <Search className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 w-3.5 sm:w-4 h-3.5 sm:h-4 text-gray-400 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim().length > 0) setIsSearchOpen(true);
              }}
              placeholder="Search for cars"
              className="w-full bg-[#FAF7F0] border border-[#D6CDB8] focus:border-[#0A1E3F] rounded-full pl-8 sm:pl-10 pr-7 sm:pr-9 py-1.5 sm:py-2 text-xs sm:text-sm text-[#0A1E3F] placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[#0A1E3F]/30 transition-all shadow-sm truncate"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Right Actions (Account, Cart, Mobile Menu) */}
        <div className="flex items-center gap-1 sm:gap-3 text-gray-700 shrink-0">
          {user ? (
            <div className="hidden sm:flex items-center gap-1">
              <Link 
                to="/orders"
                className="flex items-center gap-1.5 text-xs font-bold tracking-widest hover:text-[#0A1E3F] py-1.5 px-2.5 rounded-lg hover:bg-[#152B52]/5 transition-colors"
              >
                <Package className="w-4 h-4" />
                <span className="hidden xl:inline">ORDERS</span>
              </Link>
              <button 
                onClick={() => signOut()}
                aria-label="Sign Out"
                className="flex items-center gap-1.5 text-xs font-bold tracking-widest hover:text-[#0A1E3F] py-1.5 px-2.5 rounded-lg hover:bg-[#152B52]/5 transition-colors text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden xl:inline">SIGN OUT</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login"
              aria-label="Account"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold tracking-widest hover:text-[#0A1E3F] py-1.5 px-2.5 rounded-lg hover:bg-[#152B52]/5 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden xl:inline">ACCOUNT</span>
            </Link>
          )}

          <Link 
            to="/cart"
            aria-label="Cart"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:text-[#0A1E3F] hover:bg-[#152B52]/5 transition-colors relative"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute top-0.5 right-0.5 sm:top-1.5 sm:right-1.5 bg-[#0A1E3F] text-[#F4F0E6] text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
              {cartCount}
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="xl:hidden w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-gray-700 hover:text-[#0A1E3F] rounded-lg hover:bg-[#152B52]/5 transition-colors focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#0A1E3F]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Live Search Results Dropdown */}
      {isSearchOpen && searchQuery.trim().length > 0 && (
        <div className={`pointer-events-auto absolute top-full left-0 w-full bg-[#FAF7F0] shadow-2xl overflow-hidden z-50 max-h-[75vh] overflow-y-auto animate-fadeIn ${
          isScrolled ? 'mt-2 border-2 border-[#D6CDB8] rounded-2xl' : 'border-b border-[#D6CDB8]'
        }`}>
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2DAC8]">
              <div className="text-xs text-gray-600 font-medium">
                {searchResults.length > 0 ? (
                  <span>Showing <strong className="text-[#0A1E3F] font-bold">{searchResults.length}</strong> matching results for "<span className="text-[#0A1E3F] italic">{searchQuery}</span>"</span>
                ) : (
                  <span>Search results for "<span className="text-[#0A1E3F] italic">{searchQuery}</span>"</span>
                )}
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-xs text-gray-500 hover:text-[#0A1E3F] flex items-center gap-1 transition-colors"
              >
                <span>Close</span>
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {searchResults.map(({ item, matchedAttributes }, idx) => (
                  <Link
                    key={idx}
                    to={item.link}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#F4F0E6] hover:bg-[#EBE5D9] border border-[#E2DAC8] hover:border-[#0A1E3F]/40 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-xl bg-[#FAF7F0] border border-[#D6CDB8] p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0A1E3F]/10 text-[#0A1E3F]">
                          {item.type}
                        </span>
                        {item.savings && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                            {item.savings}
                          </span>
                        )}
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0A1E3F] leading-snug group-hover:text-[#0A1E3F] truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5">
                        {item.description}
                      </p>
                      <div className="flex items-baseline gap-2 mt-1.5">
                        <span className="text-xs sm:text-sm font-bold text-[#0A1E3F]">{item.price}</span>
                        {item.oldPrice && (
                          <span className="text-[10px] text-gray-500 line-through">{item.oldPrice}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Helpful No-Results Feedback */
              <div className="py-8 px-4 text-center max-w-lg mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-[#0A1E3F]">
                    No exact match found for "{searchQuery}"
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Check your spelling, or try searching with generic terms like "wireless", "charger", "mount", or your vehicle name.
                  </p>
                </div>

                {/* Popular Search Suggestions */}
                <div className="pt-2">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 block mb-2">
                    Suggested Searches
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {popularSearches.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setSearchQuery(term)}
                        className="bg-[#FAF7F0] hover:bg-[#0A1E3F] text-[#0A1E3F] hover:text-white border border-[#D6CDB8] text-xs font-semibold px-3 py-1.5 rounded-full transition-all cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Helpful Action Links */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 border-t border-[#E2DAC8]">
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      window.dispatchEvent(new CustomEvent('openCarFinderChatbot'));
                    }}
                    className="w-full sm:w-auto bg-[#0A1E3F] hover:bg-[#152B52] text-[#F4F0E6] text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    Launch Car Assistant
                  </button>
                  <Link
                    to="/categories"
                    onClick={() => setIsSearchOpen(false)}
                    className="w-full sm:w-auto bg-transparent border border-[#0A1E3F] text-[#0A1E3F] hover:bg-[#0A1E3F]/10 text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                  >
                    Browse Categories
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`pointer-events-auto md:hidden bg-[#FAF7F0] shadow-2xl transition-all animate-fadeIn px-5 py-6 ${
          isScrolled ? 'mt-2 border-2 border-[#D6CDB8] rounded-2xl max-w-[1360px] mx-auto' : 'border-b border-[#E2DAC8]'
        }`}>
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
