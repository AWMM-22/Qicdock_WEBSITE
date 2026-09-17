import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Truck, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, X, BarChart3, PieChart as PieChartIcon, Users, ShoppingBag, TrendingUp, Sparkles, Car, DollarSign, Clock, Calendar, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

// Centralized list of all products for the admin panel
const ALL_PRODUCTS = [
  // Combos
  { id: 'ultimate-kit', name: 'Ultimate All-in-One Kit', category: 'Combos' },
  { id: 'car-combo', name: 'Car Essentials Combo', category: 'Combos' },
  { id: 'home-office-combo', name: 'Home & Office Combo', category: 'Combos' },
  
  // Individual Chargers / Single Setups
  { id: 'core-charger', name: 'Magnetic Core Charger', category: 'Individual Chargers' },
  { id: 'car-pad', name: 'Car Charger + Center Console Pad', category: 'Individual Chargers' },
  { id: 'car-vent', name: 'Car Air Vent 360° Magnetic Charger', category: 'Individual Chargers' },
  { id: 'car-rear', name: 'Car Rear Passenger Headrest Charger', category: 'Individual Chargers' },
  { id: 'table-stand', name: 'Aluminum Table Stand Charger', category: 'Individual Chargers' },
  { id: 'wall-charger', name: 'Magnetic Wall Mount Charger', category: 'Individual Chargers' },

  // Stand-alone Mounts / Bases
  { id: 'pad-base', name: 'Car Charging Pad Base', category: 'Mounts & Bases' },
  { id: 'vent-base', name: 'Air Vent 360° Holder Base', category: 'Mounts & Bases' },
  { id: 'rear-base', name: 'Rear Seat Headrest Clamp Base', category: 'Mounts & Bases' },
  { id: 'table-base', name: 'Weighted Table Stand Base', category: 'Mounts & Bases' },
  { id: 'wall-base', name: 'Magnetic Wall Bracket Base', category: 'Mounts & Bases' },

  // Vehicle Specific Docks
  { id: '3xo', name: 'Mahindra XUV 3XO Dock', category: 'Vehicle Specific' },
  { id: 'fronx', name: 'Maruti Suzuki Fronx Dock', category: 'Vehicle Specific' },
  { id: 'baleno', name: 'Maruti Suzuki Baleno Dock', category: 'Vehicle Specific' },
  { id: 'taisor', name: 'Toyota Urban Cruiser Taisor Dock', category: 'Vehicle Specific' },
  { id: 'glanza', name: 'Toyota Glanza Dock', category: 'Vehicle Specific' },
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga Dock', category: 'Vehicle Specific' },
  { id: 'swift-2024', name: 'Maruti Suzuki Swift (4th Gen) Dock', category: 'Vehicle Specific' },
  { id: 'dzire', name: 'Maruti Suzuki Swift Dzire Dock', category: 'Vehicle Specific' },
  { id: 'universal', name: 'Universal Automotive Pad', category: 'Vehicle Specific' },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'analytics' | 'orders' | 'inventory'>('analytics');
  const [analyticsRange, setAnalyticsRange] = useState<'all' | 'today' | '7days'>('all');
  const [analyticsStats, setAnalyticsStats] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [retryingOrderId, setRetryingOrderId] = useState<string | null>(null);
  const [trackingModal, setTrackingModal] = useState<any | null>(null);
  const { inventory, isSoldOut, refreshInventory } = useInventory();

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
      fetchOrders();
      refreshInventory();
    }
  }, [isAuthenticated, analyticsRange]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'om123' && password === 'Wed4@Oct') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchAnalytics = async () => {
    setLoadingAnalytics(true);
    try {
      const res = await fetch(`/api/analytics/stats?range=${analyticsRange}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.stats) {
          setAnalyticsStats(data.stats);
        }
      }
    } catch (err) {
      console.error('Failed to fetch analytics stats:', err);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleRetryShiprocket = async (orderId: string) => {
    setRetryingOrderId(orderId);
    try {
      const res = await fetch(`/api/admin/shiprocket-retry/${orderId}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok && data.success) {
        alert('Shiprocket order & AWB generated successfully!');
        fetchOrders();
      } else {
        alert(`Shiprocket retry error: ${data.error || 'Failed to retry'}`);
      }
    } catch (err: any) {
      alert(`Network error: ${err.message}`);
    } finally {
      setRetryingOrderId(null);
    }
  };

  const openLiveTracking = async (order: any) => {
    setTrackingModal({ order, loading: true });
    try {
      const res = await fetch(`/api/track-order/${order.id}`);
      const data = await res.json();
      setTrackingModal({ order, loading: false, data });
    } catch (e) {
      setTrackingModal({ order, loading: false, error: 'Failed to fetch tracking data' });
    }
  };

  const toggleSoldOut = async (productId: string) => {
    const currentStatus = isSoldOut(productId);
    try {
      await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, isSoldOut: !currentStatus })
      });
      refreshInventory();
    } catch (err) {
      console.error('Failed to update inventory:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F0E6] flex items-center justify-center p-4">
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-8 max-w-sm w-full shadow-lg">
          <div className="w-12 h-12 bg-[#0A1E3F] text-[#F4F0E6] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-['Anton'] uppercase text-center mb-1 text-[#0A1E3F]">Admin Portal</h1>
          <p className="text-xs text-gray-500 text-center mb-6 font-medium">Qicdock Management &amp; Analytics</p>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0A1E3F] uppercase mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A1E3F] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0A1E3F] uppercase mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A1E3F] text-sm"
              />
            </div>
            <button type="submit" className="w-full bg-[#0A1E3F] text-[#F4F0E6] font-bold uppercase py-3.5 rounded-xl hover:bg-[#152B52] transition-colors cursor-pointer text-xs tracking-wider">
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate brand slice colors for Pie/Donut Chart
  const brandColors = ['#0A1E3F', '#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

  return (
    <div className="min-h-screen bg-[#F4F0E6] text-[#0A1E3F] py-8 md:py-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-800">Live System Online</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-['Anton'] uppercase text-[#0A1E3F] tracking-wide">
              Admin &amp; <span className="text-[#0A1E3F]">Intelligence</span>
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button 
              onClick={() => { fetchAnalytics(); fetchOrders(); refreshInventory(); }} 
              className="flex items-center gap-1.5 text-xs font-bold bg-[#EBE5D9] border border-[#D6CDB8] px-4 py-2.5 rounded-xl text-[#0A1E3F] hover:bg-[#0A1E3F] hover:text-[#F4F0E6] transition-all cursor-pointer shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingAnalytics || loadingOrders ? 'animate-spin' : ''}`} />
              Sync Live Data
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)} 
              className="text-xs font-bold text-gray-500 hover:text-red-600 uppercase tracking-widest px-3 py-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#E2DAC8] pb-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-md shadow-[#0A1E3F]/20'
                : 'bg-[#FAF7F0] text-gray-600 hover:text-[#0A1E3F] border border-[#E2DAC8]'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Analytics &amp; User Intelligence
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-md shadow-[#0A1E3F]/20'
                : 'bg-[#FAF7F0] text-gray-600 hover:text-[#0A1E3F] border border-[#E2DAC8]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Orders &amp; Shiprocket ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'bg-[#0A1E3F] text-[#F4F0E6] shadow-md shadow-[#0A1E3F]/20'
                : 'bg-[#FAF7F0] text-gray-600 hover:text-[#0A1E3F] border border-[#E2DAC8]'
            }`}
          >
            <Truck className="w-4 h-4" />
            Stock &amp; Inventory
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: ANALYTICS DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Filter Pill Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date Window:</span>
                {(['all', '7days', 'today'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setAnalyticsRange(r)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      analyticsRange === r
                        ? 'bg-[#0A1E3F] text-[#F4F0E6]'
                        : 'bg-[#FAF7F0] text-gray-600 border border-[#E2DAC8] hover:border-[#D6CDB8]'
                    }`}
                  >
                    {r === 'all' ? 'All Time' : r === '7days' ? 'Last 7 Days' : 'Today'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Data updates automatically as users visit and interact with the Car Finder Assistant.
              </p>
            </div>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Unique Visitors */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 relative overflow-hidden group hover:border-[#0A1E3F] transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Unique Visitors</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                  {analyticsStats?.totalVisitors || 0}
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Live active user sessions</p>
              </div>

              {/* Card 2: Assistant Engagement */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 relative overflow-hidden group hover:border-[#0A1E3F] transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Assistant Users</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                  {analyticsStats?.assistantEngagements || 0}
                </div>
                <p className="text-[10px] text-purple-700 font-semibold mt-1">
                  {analyticsStats?.assistantAnswers || 0} total questions answered
                </p>
              </div>

              {/* Card 3: Adds to Cart */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 relative overflow-hidden group hover:border-[#0A1E3F] transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Added to Cart</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                  {analyticsStats?.totalAddToCart || 0}
                </div>
                <p className="text-[10px] text-amber-700 font-semibold mt-1">
                  {analyticsStats?.addedFromAssistant || 0} from Assistant
                </p>
              </div>

              {/* Card 4: Orders & Revenue */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 relative overflow-hidden group hover:border-[#0A1E3F] transition-all">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Orders</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-['Anton'] text-emerald-800 tracking-wide">
                  {analyticsStats?.totalOrdersCount || 0}
                </div>
                <p className="text-[10px] text-emerald-700 font-bold mt-1">
                  ₹{(analyticsStats?.totalRevenue || 0).toLocaleString('en-IN')} GMV
                </p>
              </div>

              {/* Card 5: Conversion Rate */}
              <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-2xl p-5 relative overflow-hidden group hover:border-[#0A1E3F] transition-all col-span-2 sm:col-span-1">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Conversion Rate</span>
                  <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-['Anton'] text-[#0A1E3F] tracking-wide">
                  {analyticsStats?.conversionRate || 0}%
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Visitor ➔ Order Conversion</p>
              </div>
            </div>

            {/* Visual Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Chart 1: Bar Chart of Car Models Selected (7 cols) */}
              <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-[#E2DAC8]">
                  <div>
                    <h3 className="text-lg font-bold font-['Anton'] uppercase tracking-wide text-[#0A1E3F] flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#0A1E3F]" />
                      Most Popular Car Models in Assistant (Bar Chart)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Real-time user selections when asking for their vehicle model
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-[#0A1E3F]/10 text-[#0A1E3F] px-2.5 py-1 rounded-full">
                    {analyticsStats?.modelDistribution?.length || 0} Models Tracked
                  </span>
                </div>

                {/* SVG / Styled Bar Chart */}
                {(!analyticsStats?.modelDistribution || analyticsStats.modelDistribution.length === 0) ? (
                  <div className="py-16 text-center text-gray-400 text-sm">
                    <Car className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    No assistant selections recorded yet. Interact with the Car Finder to see real bars populate!
                  </div>
                ) : (
                  <div className="space-y-4 pt-2">
                    {analyticsStats.modelDistribution.slice(0, 7).map((item: any, idx: number) => {
                      const maxCount = Math.max(...analyticsStats.modelDistribution.map((m: any) => m.count), 1);
                      const barWidth = Math.round((item.count / maxCount) * 100);
                      
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-[#0A1E3F] flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-[#0A1E3F] text-[#F4F0E6] text-[10px] flex items-center justify-center font-mono">
                                #{idx + 1}
                              </span>
                              {item.model}
                            </span>
                            <span className="font-bold font-mono text-[#0A1E3F] bg-[#EBE5D9] px-2 py-0.5 rounded-md">
                              {item.count} selection{item.count > 1 ? 's' : ''}
                            </span>
                          </div>
                          
                          {/* Visual Bar Track */}
                          <div className="w-full h-5 bg-[#EBE5D9] rounded-full overflow-hidden p-0.5">
                            <div 
                              className="h-full bg-gradient-to-r from-[#0A1E3F] to-[#2563EB] rounded-full transition-all duration-700 relative group flex items-center justify-end pr-2"
                              style={{ width: `${Math.max(barWidth, 8)}%` }}
                            >
                              <span className="text-[9px] font-bold text-white leading-none">
                                {barWidth}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Chart 2: Donut / Pie Chart for Brand Distribution (5 cols) */}
              <div className="lg:col-span-5 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="flex justify-between items-center pb-4 border-b border-[#E2DAC8]">
                  <div>
                    <h3 className="text-lg font-bold font-['Anton'] uppercase tracking-wide text-[#0A1E3F] flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5 text-[#0A1E3F]" />
                      Car Brand Breakdown (Pie / Donut)
                    </h3>
                    <p className="text-xs text-gray-500">Share of questions answered by brand</p>
                  </div>
                </div>

                {(!analyticsStats?.brandDistribution || analyticsStats.brandDistribution.length === 0) ? (
                  <div className="py-16 text-center text-gray-400 text-sm">
                    <PieChartIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    No brand data recorded yet.
                  </div>
                ) : (
                  <div className="space-y-6 my-auto">
                    {/* Visual Segmented Progress Wheel */}
                    <div className="flex items-center justify-center relative py-2">
                      <div className="w-36 h-36 rounded-full border-8 border-[#0A1E3F] flex flex-col items-center justify-center bg-[#F4F0E6] shadow-inner text-center p-2">
                        <span className="text-2xl font-['Anton'] text-[#0A1E3F] leading-none">
                          {analyticsStats.assistantAnswers}
                        </span>
                        <span className="text-[10px] font-bold text-gray-500 uppercase mt-0.5">
                          Total Answers
                        </span>
                      </div>
                    </div>

                    {/* Brand Legend Breakdown */}
                    <div className="space-y-2.5">
                      {analyticsStats.brandDistribution.map((b: any, idx: number) => {
                        const color = brandColors[idx % brandColors.length];
                        return (
                          <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-xl bg-[#EBE5D9]/60">
                            <div className="flex items-center gap-2.5">
                              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></span>
                              <span className="font-bold text-[#0A1E3F]">{b.brand}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-gray-500">{b.count} clicks</span>
                              <span className="font-bold text-[#0A1E3F] bg-[#FAF7F0] px-2 py-0.5 rounded border border-[#D6CDB8]">
                                {b.percentage}%
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Funnel & Real-Time Event Feed */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Conversion Funnel Breakdown (5 cols) */}
              <div className="lg:col-span-5 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm space-y-5">
                <div className="pb-3 border-b border-[#E2DAC8]">
                  <h3 className="text-lg font-bold font-['Anton'] uppercase tracking-wide text-[#0A1E3F] flex items-center gap-2">
                    <Activity className="w-5 h-5 text-[#0A1E3F]" />
                    E-Commerce Conversion Funnel
                  </h3>
                  <p className="text-xs text-gray-500">Progression from initial visit to completed purchase</p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Step 1 */}
                  <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider block">1. Site Visitors</span>
                      <span className="text-base font-bold text-[#0A1E3F]">{analyticsStats?.totalVisitors || 0} sessions</span>
                    </div>
                    <span className="text-xs font-bold text-blue-900 bg-white px-2.5 py-1 rounded-full shadow-sm">100%</span>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">2. Used Car Assistant</span>
                      <span className="text-base font-bold text-[#0A1E3F]">{analyticsStats?.assistantEngagements || 0} engaged</span>
                    </div>
                    <span className="text-xs font-bold text-purple-900 bg-white px-2.5 py-1 rounded-full shadow-sm">
                      {analyticsStats?.totalVisitors ? Math.round(((analyticsStats.assistantEngagements || 0) / analyticsStats.totalVisitors) * 100) : 0}%
                    </span>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">3. Added Product to Cart</span>
                      <span className="text-base font-bold text-[#0A1E3F]">{analyticsStats?.totalAddToCart || 0} cart adds</span>
                    </div>
                    <span className="text-xs font-bold text-amber-900 bg-white px-2.5 py-1 rounded-full shadow-sm">
                      {analyticsStats?.totalVisitors ? Math.round(((analyticsStats.totalAddToCart || 0) / analyticsStats.totalVisitors) * 100) : 0}%
                    </span>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">4. Orders Placed</span>
                      <span className="text-base font-bold text-emerald-900">{analyticsStats?.totalOrdersCount || 0} purchases</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-900 bg-white px-2.5 py-1 rounded-full shadow-sm">
                      {analyticsStats?.conversionRate || 0}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Real-Time Live Activity & Answers Log (7 cols) */}
              <div className="lg:col-span-7 bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-[#E2DAC8]">
                  <div>
                    <h3 className="text-lg font-bold font-['Anton'] uppercase tracking-wide text-[#0A1E3F] flex items-center gap-2">
                      <Clock className="w-5 h-5 text-[#0A1E3F]" />
                      Live User Interaction Stream
                    </h3>
                    <p className="text-xs text-gray-500">Live answers and events recorded directly from users</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live Feed
                  </span>
                </div>

                <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                  {(!analyticsStats?.recentEvents || analyticsStats.recentEvents.length === 0) ? (
                    <div className="py-12 text-center text-gray-400 text-sm">
                      No live events recorded yet. Try choosing a car brand in the assistant to watch the feed update in real-time!
                    </div>
                  ) : (
                    analyticsStats.recentEvents.map((evt: any, i: number) => {
                      const timeStr = new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      
                      return (
                        <div key={i} className="bg-white border border-[#E2DAC8] rounded-xl p-3 shadow-xs flex items-start justify-between gap-3 text-xs">
                          <div className="flex items-start gap-2.5">
                            <div className="mt-0.5">
                              {evt.eventType === 'assistant_answer' && <Car className="w-4 h-4 text-purple-600" />}
                              {evt.eventType === 'assistant_open' && <Sparkles className="w-4 h-4 text-blue-600" />}
                              {evt.eventType === 'add_to_cart' && <ShoppingBag className="w-4 h-4 text-amber-600" />}
                              {evt.eventType === 'combo_upgrade_click' && <TrendingUp className="w-4 h-4 text-emerald-600" />}
                              {evt.eventType === 'page_view' && <Activity className="w-4 h-4 text-gray-400" />}
                            </div>
                            
                            <div>
                              {evt.eventType === 'assistant_answer' && (
                                <p className="font-semibold text-[#0A1E3F]">
                                  Answered: <strong className="text-purple-700">{evt.answer}</strong> {evt.brand ? `(${evt.brand})` : ''}
                                </p>
                              )}
                              {evt.eventType === 'assistant_open' && (
                                <p className="font-medium text-gray-700">Opened Car Finder Chatbot Assistant</p>
                              )}
                              {evt.eventType === 'add_to_cart' && (
                                <p className="font-semibold text-amber-800">
                                  Added to Cart: <strong className="text-[#0A1E3F]">{evt.productName || 'Product'}</strong> (₹{evt.price}) {evt.source === 'assistant' ? '⚡ via Assistant' : ''}
                                </p>
                              )}
                              {evt.eventType === 'combo_upgrade_click' && (
                                <p className="font-semibold text-emerald-800">
                                  Clicked Combo Upgrade to <strong className="text-[#0A1E3F]">{evt.productName}</strong>
                                </p>
                              )}
                              {evt.eventType === 'page_view' && (
                                <p className="text-gray-500">Visited page: <span className="font-mono text-[11px]">{evt.url || '/'}</span></p>
                              )}
                              <span className="text-[10px] text-gray-400 font-mono">Session: {evt.sessionId.substring(0, 14)}...</span>
                            </div>
                          </div>

                          <span className="text-[10px] text-gray-400 font-mono whitespace-nowrap bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                            {timeStr}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: ORDERS MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2DAC8]">
              <div>
                <h2 className="text-2xl font-bold font-['Anton'] uppercase text-[#0A1E3F]">All Received Orders</h2>
                <p className="text-xs text-gray-500">Manage orders, payment status, and Shiprocket dispatching</p>
              </div>
              <span className="text-xs font-bold bg-[#0A1E3F] text-white px-3 py-1.5 rounded-full">{orders.length} total orders</span>
            </div>

            <div className="space-y-4 max-h-[900px] overflow-y-auto pr-1">
              {orders.length === 0 ? (
                <div className="py-16 text-center text-gray-500 text-sm">
                  <ShoppingBag className="w-10 h-10 mx-auto mb-2 opacity-30" />
                  No orders received yet.
                </div>
              ) : (
                orders.map((order: any, idx: number) => {
                  const awb = order.awbCode || order.awb_code;
                  const courier = order.courierName || order.courier_name;
                  const srOrderId = order.shiprocketOrderId || order.shiprocket_order_id;
                  const srShipmentId = order.shiprocketShipmentId || order.shiprocket_shipment_id;

                  return (
                    <div key={idx} className="bg-white border border-[#D6CDB8] rounded-2xl p-5 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-gray-100">
                        <div>
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Order ID</span>
                          <p className="text-base font-bold text-[#0A1E3F] font-mono">{order.id}</p>
                          <p className="text-[11px] text-gray-500">
                            {order.date ? new Date(order.date).toLocaleString() : ''} • {order.email || order.shippingDetails?.email || 'N/A'}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Amount Paid</span>
                          <p className="text-2xl font-['Anton'] text-emerald-700">₹{order.amount || order.total}</p>
                        </div>
                      </div>

                      {/* Shiprocket Fulfillment Panel */}
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 text-xs space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-emerald-700" /> Shiprocket Fulfillment Status:
                          </span>
                          {awb ? (
                            <span className="bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                              AWB Active
                            </span>
                          ) : (
                            <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                              Pending Sync
                            </span>
                          )}
                        </div>

                        {awb ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                            <div>
                              <span className="text-gray-500 block">AWB Code:</span>
                              <strong className="font-mono text-[#0A1E3F]">{awb}</strong>
                            </div>
                            <div>
                              <span className="text-gray-500 block">Courier:</span>
                              <strong className="text-[#0A1E3F]">{courier || 'Delhivery / Bluedart'}</strong>
                            </div>
                            <div>
                              <span className="text-gray-500 block">SR Order ID:</span>
                              <strong className="font-mono text-[#0A1E3F]">{srOrderId || 'Generated'}</strong>
                            </div>
                            <div>
                              <button
                                onClick={() => openLiveTracking(order)}
                                className="inline-flex items-center gap-1 bg-[#0A1E3F] hover:bg-[#152B52] text-white px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-colors"
                              >
                                <ExternalLink className="w-3 h-3" /> Live Tracking
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-1">
                            <p className="text-amber-800 text-[11px]">
                              Shiprocket shipment creation pending or required retry.
                            </p>
                            <button
                              onClick={() => handleRetryShiprocket(order.id)}
                              disabled={retryingOrderId === order.id}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 transition-colors"
                            >
                              <RefreshCw className={`w-3 h-3 ${retryingOrderId === order.id ? 'animate-spin' : ''}`} />
                              {retryingOrderId === order.id ? 'Retrying...' : 'Generate AWB Now'}
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Items Ordered */}
                      <div className="space-y-1 text-xs">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Purchased Items:</span>
                        {(order.items || []).map((it: any, i: number) => (
                          <div key={i} className="flex justify-between items-center py-1 border-b border-gray-50">
                            <span className="font-medium text-[#0A1E3F]">{it.name || it.title} {it.variant ? `(${it.variant})` : ''} x {it.quantity || 1}</span>
                            <span className="font-mono font-bold text-gray-700">₹{(it.price || 0) * (it.quantity || 1)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Shipping Address */}
                      {order.shippingDetails && (
                        <div className="text-[11px] text-gray-500 bg-gray-50 p-2.5 rounded-xl">
                          <strong className="text-gray-700 block mb-0.5">Shipping to:</strong>
                          {order.shippingDetails.name}, {order.shippingDetails.addressLine}, {order.shippingDetails.city || ''} {order.shippingDetails.state} - {order.shippingDetails.pincode} • Phone: {order.shippingDetails.phone}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: INVENTORY CONTROL */}
        {/* ========================================================================= */}
        {activeTab === 'inventory' && (
          <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 shadow-sm animate-in fade-in duration-300">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#E2DAC8]">
              <div>
                <h2 className="text-2xl font-bold font-['Anton'] uppercase text-[#0A1E3F]">Product Stock Control</h2>
                <p className="text-xs text-gray-500">Toggle In Stock / Sold Out badges in real-time across the entire store</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {ALL_PRODUCTS.map((prod) => {
                const soldOut = isSoldOut(prod.id);
                return (
                  <div key={prod.id} className="bg-white border border-[#E2DAC8] rounded-2xl p-4 flex items-center justify-between gap-3 shadow-xs">
                    <div>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">{prod.category}</span>
                      <h4 className="text-sm font-bold text-[#0A1E3F] leading-snug">{prod.name}</h4>
                    </div>

                    <button
                      onClick={() => toggleSoldOut(prod.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                        soldOut
                          ? 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {soldOut ? 'Sold Out' : 'In Stock'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Live Tracking Modal */}
        {trackingModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6 max-w-lg w-full shadow-2xl relative animate-in zoom-in-95">
              <button 
                onClick={() => setTrackingModal(null)} 
                className="absolute top-4 right-4 text-gray-500 hover:text-black p-1 rounded-full bg-[#EBE5D9]"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-['Anton'] uppercase text-[#0A1E3F] mb-4">
                Live Shipment Tracking
              </h3>

              {trackingModal.loading ? (
                <div className="py-12 text-center text-sm font-bold flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" /> Fetching live tracking from courier...
                </div>
              ) : trackingModal.error ? (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold">
                  {trackingModal.error}
                </div>
              ) : (
                <div className="space-y-4 text-xs">
                  <div className="bg-white border border-[#E2DAC8] rounded-xl p-4">
                    <p className="font-bold text-[#0A1E3F]">AWB: {trackingModal.data?.awb || trackingModal.order?.awbCode}</p>
                    <p className="text-gray-500">Courier: {trackingModal.data?.courier || trackingModal.order?.courierName || 'Delhivery'}</p>
                    <p className="text-emerald-700 font-bold mt-1">Status: {trackingModal.data?.current_status || 'In Transit'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
