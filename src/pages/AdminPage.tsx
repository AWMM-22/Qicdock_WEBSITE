import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Truck, ExternalLink, RefreshCw, AlertCircle, CheckCircle2, X } from 'lucide-react';

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
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [retryingOrderId, setRetryingOrderId] = useState<string | null>(null);
  const [trackingModal, setTrackingModal] = useState<any | null>(null);
  const { inventory, isSoldOut, refreshInventory } = useInventory();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      refreshInventory();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'om123' && password === 'Wed4@Oct') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
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
          <h1 className="text-2xl font-['Anton'] uppercase text-center mb-6 text-[#0A1E3F]">Admin Login</h1>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-bold mb-4">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0A1E3F] uppercase mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A1E3F]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#0A1E3F] uppercase mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-[#EBE5D9] border border-[#D6CDB8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#0A1E3F]"
              />
            </div>
            <button type="submit" className="w-full bg-[#0A1E3F] text-white font-bold uppercase py-3 rounded-xl hover:bg-[#152B52] transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-['Anton'] uppercase text-[#0A1E3F]">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchOrders} 
            className="flex items-center gap-1.5 text-xs font-bold bg-white border border-[#D6CDB8] px-3 py-2 rounded-xl text-[#0A1E3F] hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="text-sm font-bold text-gray-600 hover:text-red-500 uppercase tracking-widest">
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Orders List */}
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold uppercase text-[#0A1E3F]">Recent Orders</h2>
            <span className="text-xs font-bold bg-[#0A1E3F] text-white px-2.5 py-1 rounded-full">{orders.length} total</span>
          </div>

          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-1">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders received yet.</p>
            ) : (
              orders.map((order: any, idx: number) => {
                const awb = order.awbCode || order.awb_code;
                const courier = order.courierName || order.courier_name;
                const srOrderId = order.shiprocketOrderId || order.shiprocket_order_id;
                const srShipmentId = order.shiprocketShipmentId || order.shiprocket_shipment_id;

                return (
                  <div key={idx} className="bg-white border border-[#D6CDB8] rounded-xl p-4 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase">Order ID</span>
                        <p className="text-sm font-bold text-[#0A1E3F] font-mono">{order.id}</p>
                        <p className="text-[11px] text-gray-400">
                          {order.date ? new Date(order.date).toLocaleString() : ''}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase">Amount</span>
                        <p className="text-lg font-bold text-green-600">₹{order.amount || order.total}</p>
                      </div>
                    </div>

                    {/* Shiprocket Fulfillment Panel */}
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-2.5 text-xs space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-emerald-900 flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5" /> Shiprocket Fulfillment:
                        </span>
                        {awb ? (
                          <span className="bg-emerald-200 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                            AWB Assigned
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRetryShiprocket(order.id)}
                            disabled={retryingOrderId === order.id}
                            className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-[10px] font-bold px-2 py-0.5 rounded transition-colors"
                          >
                            {retryingOrderId === order.id ? 'Syncing...' : 'Sync Shiprocket'}
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-[11px] text-gray-700">
                        {srOrderId && <div><strong>SR Order ID:</strong> {srOrderId}</div>}
                        {srShipmentId && <div><strong>Shipment ID:</strong> {srShipmentId}</div>}
                        {courier && <div><strong>Courier:</strong> {courier}</div>}
                        {awb && <div><strong>AWB:</strong> <span className="font-mono font-bold text-emerald-800">{awb}</span></div>}
                      </div>

                      {awb && (
                        <div className="pt-1 flex gap-2">
                          <button
                            onClick={() => openLiveTracking(order)}
                            className="text-[11px] font-bold text-emerald-800 hover:underline flex items-center gap-1"
                          >
                            <Truck className="w-3 h-3" /> Track Live
                          </button>
                          <a
                            href={`https://shiprocket.co/tracking/${awb}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-bold text-blue-700 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Shiprocket Portal
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-[#EBE5D9] pt-2 space-y-1 text-xs">
                      <p><strong>Payment:</strong> <span className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded font-bold">{order.paymentGateway || order.payment_gateway || 'Razorpay'}</span> (ID: {order.paymentId || order.payment_id || 'N/A'})</p>
                      <p><strong>Customer:</strong> {order.shippingDetails?.name} ({order.email})</p>
                      <p className="text-gray-600"><strong>Address:</strong> {order.shippingDetails?.addressLine}, {order.shippingDetails?.state} {order.shippingDetails?.pincode}</p>
                      <p className="text-gray-600"><strong>Phone:</strong> {order.shippingDetails?.phone}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Inventory Control */}
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6">
          <h2 className="text-2xl font-bold uppercase text-[#0A1E3F] mb-6">Inventory Management</h2>
          <div className="bg-white border border-[#D6CDB8] rounded-xl overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              {ALL_PRODUCTS.map((product) => {
                const soldOut = isSoldOut(product.id);
                return (
                  <div key={product.id} className="flex justify-between items-center p-4 border-b border-[#EBE5D9] last:border-0 hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-bold text-[#0A1E3F]">{product.name}</p>
                      <p className="text-xs text-gray-500 uppercase">{product.category} | ID: {product.id}</p>
                    </div>
                    <button 
                      onClick={() => toggleSoldOut(product.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${soldOut ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                    >
                      {soldOut ? 'Mark In Stock' : 'Mark Sold Out'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Admin Live Tracking Modal */}
      {trackingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] border border-[#D6CDB8] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button 
              onClick={() => setTrackingModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-white border border-[#D6CDB8] rounded-full p-1.5"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-['Anton'] uppercase text-[#0A1E3F] mb-3">Live Carrier Tracking</h2>
            <div className="bg-white border border-[#D6CDB8] rounded-xl p-3 mb-4 text-xs space-y-1">
              <div><strong>Order ID:</strong> {trackingModal.order?.id}</div>
              <div><strong>AWB:</strong> {trackingModal.order?.awbCode || trackingModal.order?.awb_code}</div>
              <div><strong>Courier:</strong> {trackingModal.order?.courierName || trackingModal.order?.courier_name}</div>
            </div>

            {trackingModal.loading ? (
              <div className="py-8 text-center text-gray-500">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#0A1E3F]" />
                <p className="text-xs">Connecting to Shiprocket API...</p>
              </div>
            ) : trackingModal.data?.liveTracking?.shipment_track_activities ? (
              <div className="max-h-60 overflow-y-auto pr-1 space-y-3 my-4">
                {trackingModal.data.liveTracking.shipment_track_activities.map((act: any, idx: number) => (
                  <div key={idx} className="bg-white p-3 rounded-lg border border-[#EBE5D9] text-xs">
                    <p className="font-bold text-[#0A1E3F]">{act.activity || act.status}</p>
                    <p className="text-[11px] text-gray-500">{act.location} • {act.date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center text-xs text-amber-800 my-4">
                Status: {trackingModal.data?.status || 'Shipment registered with carrier'}
              </div>
            )}

            <button
              onClick={() => setTrackingModal(null)}
              className="w-full bg-[#0A1E3F] text-white py-2.5 rounded-xl font-bold uppercase text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
