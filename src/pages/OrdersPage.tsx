import React, { useEffect, useState } from 'react';
import { Package, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('quickdoc_orders') || '[]');
    setOrders(savedOrders);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 py-12 min-h-[70vh]">
      <h1 className="text-3xl font-['Anton'] uppercase text-[#0A1E3F] mb-2">My Orders</h1>
      <p className="text-gray-600 mb-8">View your recent purchases and their status.</p>

      {orders.length === 0 ? (
        <div className="bg-[#FAF7F0] border border-[#E2DAC8] rounded-3xl p-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-[#0A1E3F] mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't made any purchases.</p>
          <Link to="/" className="inline-block bg-[#0A1E3F] text-[#F4F0E6] font-bold uppercase tracking-widest text-xs px-8 py-3 rounded-xl hover:bg-[#152B52] transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-white border border-[#D6CDB8] rounded-2xl overflow-hidden shadow-sm">
              {/* Order Header */}
              <div className="bg-[#FAF7F0] p-4 md:p-6 border-b border-[#D6CDB8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</span>
                    <span className="text-sm font-medium text-[#0A1E3F]">{order.id}</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Amount</span>
                    <span className="text-lg font-bold text-[#0A1E3F]">₹{order.total}</span>
                  </div>
                  <div className="h-10 w-px bg-[#D6CDB8] hidden md:block"></div>
                  <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-100">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-bold uppercase tracking-wide">{order.status}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6">
                <div className="space-y-4">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-[#EBE5D9] shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#0A1E3F]">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-bold text-[#0A1E3F]">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 border-t border-[#EBE5D9] flex justify-between items-center text-xs text-gray-500">
                <span className="font-medium">
                  Payment Method: <strong className="text-[#0A1E3F]">{order.paymentGateway || 'Razorpay'}</strong>
                </span>
                <span className="font-medium">
                  Payment ID: {order.paymentId || 'N/A'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
