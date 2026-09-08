import { Home, LayoutGrid, Layers, Car, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Home
    },
    {
      name: 'Categories',
      path: '/categories',
      icon: LayoutGrid
    },
    {
      name: 'Combos',
      path: '/category/all-in-one',
      icon: Layers
    },
    {
      name: 'Find Car',
      path: '/category/vehicle-specific',
      icon: Car
    },
    {
      name: 'Support',
      path: '/#faq',
      icon: MessageCircle
    }
  ];

  return (
    <nav 
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-[#1f1f1f] px-2 py-1.5 flex items-center justify-around shadow-[0_-5px_20px_rgba(0,0,0,0.6)]"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 6px)' }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;

        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              isActive ? 'text-[#04D9FF]' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <div className={`p-1 rounded-full ${isActive ? 'bg-[#04D9FF]/10' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-bold text-[#04D9FF]' : 'font-medium text-gray-400'}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
