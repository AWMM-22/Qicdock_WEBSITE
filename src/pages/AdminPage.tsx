import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';

// Centralized list of all products for the admin panel
const ALL_PRODUCTS = [
  // Combos
  { id: 'ultimate-kit', name: 'Ultimate All-in-One Kit', category: 'Combos' },
  { id: 'car-combo', name: 'Car Essentials Combo', category: 'Combos' },
  { id: 'home-office-combo', name: 'Home & Office Combo', category: 'Combos' },
  
  // Individual Chargers / Components
  { id: 'core-charger', name: 'Magnetic Core Charger', category: 'Chargers' },
  
  // Stand-alone Mounts / Components
  { id: 'car-pad', name: 'Car Console Pad', category: 'Mounts' },
  { id: 'air-vent', name: 'Air Vent Clip', category: 'Mounts' },
  { id: 'rear-seat', name: 'Headrest Mount', category: 'Mounts' },
  { id: 'table-stand', name: 'Table Stand', category: 'Mounts' },
  { id: 'wall-stand', name: 'Wall Bracket', category: 'Mounts' },
  { id: 'car-vent', name: 'Car Air Vent Clip (Single)', category: 'Mounts' },
  { id: 'car-rear', name: 'Car Rear Seat Mount (Single)', category: 'Mounts' },
  { id: 'wall-charger', name: 'Wall Mount (Single)', category: 'Mounts' },

  // Vehicle Specific (using their unique IDs if they were implemented, assuming generic pattern)
  { id: 'fronx-charger', name: 'Fronx Wireless Charger', category: 'Vehicle Specific' },
  { id: 'baleno-charger', name: 'Baleno Wireless Charger', category: 'Vehicle Specific' },
  { id: 'swift-charger', name: 'Swift Wireless Charger', category: 'Vehicle Specific' },
  { id: 'ertiga-charger', name: 'Ertiga Wireless Charger', category: 'Vehicle Specific' },
  { id: 'glanza-charger', name: 'Glanza Wireless Charger', category: 'Vehicle Specific' },
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [orders, setOrders] = useState<any[]>([]);
  const { inventory, isSoldOut, refreshInventory } = useInventory();

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
      refreshInventory();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === '123' && password === 'wedwed4@wo') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error('Failed to fetch orders:', err);
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
        <button onClick={() => setIsAuthenticated(false)} className="text-sm font-bold text-gray-600 hover:text-red-500 uppercase tracking-widest">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Orders List */}
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-6">
          <h2 className="text-2xl font-bold uppercase text-[#0A1E3F] mb-6">Recent Orders</h2>
          <div className="space-y-4">
            {orders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders received yet.</p>
            ) : (
              orders.map((order: any, idx: number) => (
                <div key={idx} className="bg-white border border-[#D6CDB8] rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">Order ID</span>
                      <p className="text-sm font-bold text-[#0A1E3F]">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-500 uppercase">Amount</span>
                      <p className="text-lg font-bold text-green-600">₹{order.amount}</p>
                    </div>
                  </div>
                  <div className="border-t border-[#EBE5D9] my-2 pt-2 space-y-1">
                    <p className="text-sm"><strong>Gateway:</strong> <span className="bg-blue-50 text-blue-800 text-xs px-2 py-0.5 rounded font-bold">{order.paymentGateway || 'Razorpay'}</span></p>
                    <p className="text-sm"><strong>Payment ID:</strong> {order.paymentId || 'N/A'}</p>
                    <p className="text-sm"><strong>Email:</strong> {order.email}</p>
                    <p className="text-sm"><strong>Name:</strong> {order.shippingDetails?.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{order.shippingDetails?.addressLine}, {order.shippingDetails?.state} {order.shippingDetails?.pincode}</p>
                    <p className="text-xs text-gray-600">Phone: {order.shippingDetails?.phone}</p>
                  </div>
                </div>
              ))
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
    </div>
  );
}
