import React, { useEffect, useState } from 'react';
import { Package, Clock, ExternalLink, Truck, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTracking, setActiveTracking] = useState<any | null>(null);
  const [loadingTracking, setLoadingTracking] = useState(false);
  const [trackingError, setTrackingError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Initial load from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('quickdoc_orders') || '[]');
    setOrders(savedOrders);

    // 2. Fetch fresh status from backend/database
    fetchOrdersFromServer(savedOrders);
  }, []);

  const fetchOrdersFromServer = async (localOrders: any[]) => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const serverOrders = await res.json();
        if (serverOrders && serverOrders.length > 0) {
          // Merge server orders with local storage
          const merged = [...localOrders];
          serverOrders.forEach((so: any) => {
            const idx = merged.findIndex(o => o.id === so.id);
            if (idx >= 0) {
              merged[idx] = { ...merged[idx], ...so };
            } else {
              merged.push(so);
            }
          });
          setOrders(merged);
          localStorage.setItem('quickdoc_orders', JSON.stringify(merged));
        }
      }
    } catch (e) {
      console.warn("Could not sync with backend orders:", e);
    }
  };

  const handleOpenTracking = async (order: any) => {
    setActiveTracking({ order, loading: true });
    setLoadingTracking(true);
    setTrackingError(null);

    try {
      const res = await fetch(`/api/track-order/${order.id}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setActiveTracking({
          order,
          loading: false,
          data: data
        });
      } else {
        setActiveTracking({
          order,
          loading: false,
          data: null,
          error: data.error || 'Tracking details are not yet available from carrier.'
        });
      }
    } catch (err: any) {
      setActiveTracking({
        order,
        loading: false,
        data: null,
        error: 'Failed to connect to tracking server.'
      });
    } finally {
      setLoadingTracking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 py-12 min-h-[70vh]">
      <h1 className="text-3xl font-['Anton'] uppercase text-[#0A1E3F] mb-2">My Orders</h1>
      <p className="text-gray-600 mb-8">View your recent purchases and their shipping status.</p>

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
          {orders.map((order, idx) => {
            const hasAwb = !!(order.awbCode || order.awb_code);
            const awb = order.awbCode || order.awb_code;
            const courier = order.courierName || order.courier_name || 'Shiprocket';
            const trackingUrl = order.trackingUrl || order.tracking_url || (awb ? `https://shiprocket.co/tracking/${awb}` : null);

            return (
              <div key={idx} className="bg-white border border-[#D6CDB8] rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                {/* Order Header */}
                <div className="bg-[#FAF7F0] p-4 md:p-6 border-b border-[#D6CDB8] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</span>
                      <span className="text-sm font-medium text-[#0A1E3F]">{order.id}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Placed on {order.date ? new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recent'}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Total Amount</span>
                      <span className="text-lg font-bold text-[#0A1E3F]">₹{order.total || order.amount}</span>
                    </div>
                    <div className="h-10 w-px bg-[#D6CDB8] hidden md:block"></div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wide ${
                      order.status === 'Shipped' || order.status === 'Delivered' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{order.status || 'Processing'}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping / Shiprocket Status Banner */}
                <div className="bg-emerald-50/70 border-b border-emerald-100 px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span className="text-gray-600">
                      Shipping via: <strong className="text-emerald-900">{courier}</strong>
                    </span>
                    {hasAwb && (
                      <span className="ml-2 bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                        AWB: {awb}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenTracking(order)}
                      className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-700 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-800 transition-colors shadow-sm"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      Live Tracking
                    </button>
                    {trackingUrl && (
                      <a
                        href={trackingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Shiprocket
                      </a>
                    )}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {(order.items || []).map((item: any, i: number) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-[#EBE5D9] shrink-0">
                          <img 
                            src={item.image || 'https://placehold.co/150x150/0A1E3F/F4F0E6?text=QICDOCK'} 
                            alt={item.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-[#0A1E3F]">{item.name}</h4>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-bold text-[#0A1E3F]">
                          ₹{(item.price || 0) * (item.quantity || 1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Footer */}
                <div className="bg-gray-50 p-4 border-t border-[#EBE5D9] flex flex-wrap justify-between items-center text-xs text-gray-500 gap-2">
                  <span className="font-medium">
                    Payment Gateway: <strong className="text-[#0A1E3F]">{order.paymentGateway || order.payment_gateway || 'Razorpay'}</strong>
                  </span>
                  <span className="font-medium">
                    Payment ID: <strong className="text-gray-700">{order.paymentId || order.payment_id || 'N/A'}</strong>
                  </span>
                  {order.shiprocketOrderId && (
                    <span className="font-medium text-emerald-700">
                      Shiprocket Order: #{order.shiprocketOrderId}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Live Tracking Modal */}
      {activeTracking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] border border-[#D6CDB8] rounded-3xl max-w-lg w-full p-6 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setActiveTracking(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 bg-white border border-[#D6CDB8] rounded-full p-1.5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-6 h-6 text-[#0A1E3F]" />
              <h2 className="text-xl font-['Anton'] uppercase text-[#0A1E3F]">Live Shipment Tracking</h2>
            </div>

            <div className="bg-white border border-[#D6CDB8] rounded-2xl p-4 mb-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase">Order ID:</span>
                <span className="font-mono font-bold text-[#0A1E3F]">{activeTracking.order?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold uppercase">Carrier:</span>
                <span className="font-bold text-[#0A1E3F]">{activeTracking.order?.courierName || activeTracking.order?.courier_name || 'Shiprocket'}</span>
              </div>
              {(activeTracking.order?.awbCode || activeTracking.order?.awb_code) && (
                <div className="flex justify-between">
                  <span className="text-gray-500 font-bold uppercase">AWB Number:</span>
                  <span className="font-mono font-bold text-emerald-700">{activeTracking.order?.awbCode || activeTracking.order?.awb_code}</span>
                </div>
              )}
            </div>

            {/* Tracking Content */}
            {activeTracking.loading ? (
              <div className="py-12 text-center text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-[#0A1E3F]" />
                <p className="text-sm font-medium">Fetching real-time tracking data from Shiprocket...</p>
              </div>
            ) : activeTracking.data?.liveTracking?.shipment_track_activities ? (
              <div className="max-h-60 overflow-y-auto pr-1 space-y-4 my-4">
                <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                  {activeTracking.data.liveTracking.shipment_track_activities.map((act: any, idx: number) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-600 border-2 border-white"></div>
                      <p className="text-xs font-bold text-[#0A1E3F]">{act.activity || act.status}</p>
                      <p className="text-[11px] text-gray-500">{act.location} • {act.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 my-4 text-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-blue-900 mb-1">
                  Status: {activeTracking.data?.status || activeTracking.order?.status || 'Processing'}
                </h3>
                <p className="text-xs text-blue-700">
                  {activeTracking.order?.awbCode 
                    ? `Shipment is booked with ${activeTracking.order?.courierName || 'Shiprocket'}. Pickup is scheduled and in progress.` 
                    : 'Your order is confirmed and our warehouse is assigning the nearest courier partner.'}
                </p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              {(activeTracking.order?.awbCode || activeTracking.order?.awb_code) && (
                <a
                  href={`https://shiprocket.co/tracking/${activeTracking.order?.awbCode || activeTracking.order?.awb_code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-[#0A1E3F] text-white text-center py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-[#152B52] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Shiprocket Live Portal
                </a>
              )}
              <button
                onClick={() => setActiveTracking(null)}
                className="flex-1 bg-white border border-[#D6CDB8] text-[#0A1E3F] py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
