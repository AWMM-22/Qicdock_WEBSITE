import React, { useState, useEffect } from 'react';
import { Home, LayoutGrid, Layers, Car, ShoppingBag } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { getCartCount } from '../lib/cart';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState<number>(() => getCartCount());

  useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCartCount());
    };
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const navItems = [
    {
      id: 'home',
      name: 'Home',
      path: '/',
      icon: Home,
      match: (pathname: string) => pathname === '/' && !location.hash.includes('compatibility')
    },
    {
      id: 'categories',
      name: 'Categories',
      path: '/categories',
      icon: LayoutGrid,
      match: (pathname: string) => pathname.startsWith('/categories')
    },
    {
      id: 'combo',
      name: 'Combo',
      path: '/category/all-in-one',
      icon: Layers,
      match: (pathname: string) => 
        pathname.startsWith('/category/all-in-one') || 
        pathname.startsWith('/category/car-combo') || 
        pathname.startsWith('/category/home-office')
    },
    {
      id: 'find-car',
      name: 'Find Car',
      path: '/category/vehicle-specific',
      icon: Car,
      match: (pathname: string) => 
        pathname.startsWith('/category/vehicle-specific') || 
        pathname.startsWith('/product') || 
        pathname.startsWith('/car-product') ||
        location.hash.includes('compatibility')
    }
  ];

  const handleNavClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    e.preventDefault();
    if (item.id === 'find-car') {
      if (location.pathname === '/') {
        const el = document.getElementById('compatibility');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      navigate('/category/vehicle-specific');
      return;
    }
    if (item.id === 'home') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }
    navigate(item.path);
  };

  return (
    <div 
      aria-label="Floating Mobile Navigation"
      className="md:hidden fixed bottom-3.5 sm:bottom-5 left-0 right-0 z-50 px-3.5 flex justify-center pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Floating Curved Container */}
      <nav className="pointer-events-auto w-full max-w-[420px] bg-[#0A1E3F]/95 backdrop-blur-xl border-2 border-[#D6CDB8] rounded-full p-1.5 shadow-[0_14px_36px_rgba(10,30,63,0.38)] relative flex items-center justify-between gap-1 transition-all duration-300">
        
        {/* Subtle dual-color ambient shimmer line */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#FAF7F0]/40 to-transparent pointer-events-none" />

        {/* Optional Cart Alert Badge */}
        {cartCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2.5 -right-1 z-20"
          >
            <button
              onClick={() => navigate('/cart')}
              className="bg-[#FAF7F0] text-[#0A1E3F] border border-[#0A1E3F] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <ShoppingBag className="w-3 h-3 text-[#0A1E3F]" />
              <span>{cartCount}</span>
            </button>
          </motion.div>
        )}

        {navItems.map((item) => {
          const isActive = item.match(location.pathname);
          const Icon = item.icon;

          return (
            <motion.button
              key={item.id}
              onClick={(e) => handleNavClick(e, item)}
              whileTap={{ scale: 0.92 }}
              className="relative flex-1 py-1.5 px-2 flex flex-col items-center justify-center rounded-full transition-colors cursor-pointer select-none"
            >
              {/* Active sliding pill indicator */}
              {isActive && (
                <motion.div
                  layoutId="floatingNavPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="absolute inset-0 bg-[#FAF7F0] rounded-full shadow-sm"
                />
              )}

              {/* Icon & Label with color transition */}
              <div className="relative z-10 flex flex-col items-center justify-center gap-0.5">
                <Icon 
                  className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-all duration-200 ${
                    isActive 
                      ? 'text-[#0A1E3F] scale-105 stroke-[2.4]' 
                      : 'text-[#FAF7F0]/75 hover:text-[#FAF7F0] stroke-[1.8]'
                  }`} 
                />
                <span 
                  className={`text-[10.5px] tracking-tight leading-none transition-colors duration-200 ${
                    isActive 
                      ? 'font-bold text-[#0A1E3F]' 
                      : 'font-medium text-[#FAF7F0]/75 hover:text-[#FAF7F0]'
                  }`}
                >
                  {item.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
