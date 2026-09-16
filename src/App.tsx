import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import AllInOneCombo from './pages/AllInOneCombo';
import CarCombo from './pages/CarCombo';
import HomeOfficeCombo from './pages/HomeOfficeCombo';
import IndividualChargers from './pages/IndividualChargers';
import VehicleSpecific from './pages/VehicleSpecific';
import StandAloneMounts from './pages/StandAloneMounts';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import LoginPage from './pages/LoginPage';
import OrdersPage from "./pages/OrdersPage";
import AdminPage from './pages/AdminPage';
import CarFinderChatbot from './components/CarFinderChatbot';
import { AuthProvider } from './context/AuthContext';
import { InventoryProvider } from './context/InventoryContext';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] flex flex-col font-['Ubuntu',sans-serif] selection:bg-[#0A1E3F] selection:text-[#F4F0E6]">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/category/all-in-one" element={<AllInOneCombo />} />
              <Route path="/category/car-combo" element={<CarCombo />} />
              <Route path="/category/home-office" element={<HomeOfficeCombo />} />
              <Route path="/category/individual" element={<IndividualChargers />} />
              <Route path="/category/vehicle-specific" element={<VehicleSpecific />} />
              <Route path="/category/stand-alone" element={<StandAloneMounts />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/admin_qicdock" element={<AdminPage />} />
              <Route path="/admin_quickdoc" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
          <BottomNav />
          <CarFinderChatbot />
        </div>
      </BrowserRouter>
      </InventoryProvider>
    </AuthProvider>
  );
}
