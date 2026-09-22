import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import { ShiprocketService } from "./src/services/shiprocketService";

dotenv.config();

// In-memory fallback state
let orders: any[] = [];
let inventory: Record<string, boolean> = {}; // { productId: isSoldOut }

// Analytics storage with local persistence fallback
const ANALYTICS_FILE = path.join(process.cwd(), "analytics_events.json");
let analyticsEvents: any[] = [];

try {
  if (fs.existsSync(ANALYTICS_FILE)) {
    const raw = fs.readFileSync(ANALYTICS_FILE, "utf-8");
    analyticsEvents = JSON.parse(raw);
  }
} catch (e) {
  console.warn("[Analytics] Could not load local analytics file, starting fresh.");
}

function saveAnalyticsLocal() {
  try {
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(analyticsEvents.slice(-5000), null, 2), "utf-8");
  } catch (e) {
    console.error("[Analytics] Error saving local analytics:", e);
  }
}

// Customer Phone Leads storage with local persistence fallback
const LEADS_FILE = path.join(process.cwd(), "phone_leads.json");
let phoneLeads: any[] = [];

try {
  if (fs.existsSync(LEADS_FILE)) {
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    phoneLeads = JSON.parse(raw);
  }
} catch (e) {
  console.warn("[Leads] Could not load local leads file, starting fresh.");
}

function saveLeadsLocal() {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(phoneLeads.slice(-5000), null, 2), "utf-8");
  } catch (e) {
    console.error("[Leads] Error saving local leads:", e);
  }
}

// Supabase client initialization (server-side)
const supabaseUrl =
  process.env.VITE_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://sqkdwltnkgjbylwykbsb.supabase.co";

const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxa2R3bHRua2dqYnlsd3lrYnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwMzg4MTEsImV4cCI6MjEwNDYxNDgxMX0.8uYJ8KDXN1wikXv2oOwMcgEUI4LcVjRjiVeN2Bxnasc";

const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Inventory API
  app.get("/api/inventory", (req, res) => {
    res.json(inventory);
  });

  app.post("/api/inventory", (req, res) => {
    const { productId, isSoldOut } = req.body;
    inventory[productId] = isSoldOut;
    res.json({ success: true, inventory });
  });

  // Phone normalization & validation for Indian numbers
  function normalizeIndianPhone(input: string): string | null {
    if (!input || typeof input !== "string") return null;
    const digits = input.replace(/\D/g, "");
    let normalized = digits;
    if (digits.length === 12 && digits.startsWith("91")) {
      normalized = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith("0")) {
      normalized = digits.slice(1);
    }
    if (/^[6-9]\d{9}$/.test(normalized)) {
      return normalized;
    }
    return null;
  }

  // --- Personalized Deal Optimization API ---
  app.post("/api/deals/quote", (req, res) => {
    try {
      const { productId = "fronx", phone, brand, model } = req.body;
      const normalizedPhone = normalizeIndianPhone(phone);
      if (!normalizedPhone) {
        return res.status(400).json({
          error: "That doesn't look like a valid Indian mobile number. Please enter your 10-digit mobile number."
        });
      }

      // Authentic catalog pricing
      const basePrice = 2098;
      const baseOriginal = 3299;
      const addonPrice = 149;
      const addonOriginal = 599;
      const mountSavings = addonOriginal - addonPrice; // 450
      const couponDiscount = 100;
      const totalSavings = mountSavings + couponDiscount; // 550

      const deal = {
        dealId: `deal_${Date.now()}`,
        title: "Vehicle Dock + Workspace Desk Stand Bundle",
        badge: "Smart Bundle Deal",
        description: "Adding the Weighted Aluminum Table Stand to your order unlocks special bundle pricing + an exclusive coupon.",
        baseProductPrice: basePrice,
        baseProductOriginalPrice: baseOriginal,
        addonItem: {
          id: "table-base",
          name: "Weighted Aluminum Table Stand Base",
          variant: "Add-on: Workspace Mount",
          price: addonPrice,
          originalPrice: addonOriginal,
          addonSavings: mountSavings
        },
        bundlePrice: basePrice + addonPrice,
        totalOriginalPrice: baseOriginal + addonOriginal,
        mountSavings: mountSavings,
        couponSavings: couponDiscount,
        totalSavings: totalSavings,
        coupon: {
          code: "QIC100",
          discountAmount: couponDiscount,
          minOrderValue: 1999,
          description: "₹100 OFF coupon applied for your order"
        }
      };

      res.json({
        success: true,
        deal,
        maskedPhone: `+91 ${normalizedPhone.slice(0, 2)}******${normalizedPhone.slice(8)}`
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to generate deal quote" });
    }
  });

  // --- Coupon Validation API ---
  app.post("/api/deals/validate-coupon", (req, res) => {
    try {
      const { code, subtotal = 0 } = req.body;
      const cleanCode = (code || "").trim().toUpperCase();

      if (cleanCode === "QIC100") {
        if (subtotal < 1999) {
          return res.json({
            valid: false,
            message: "Coupon QIC100 requires a minimum order value of ₹1,999."
          });
        }
        return res.json({
          valid: true,
          code: "QIC100",
          discountAmount: 100,
          discountType: "fixed",
          message: "₹100 discount applied!"
        });
      }

      if (cleanCode === "WELCOME10" || cleanCode === "SAVE10") {
        const discount = Math.floor(subtotal * 0.1);
        return res.json({
          valid: true,
          code: cleanCode,
          discountAmount: discount,
          discountType: "percentage",
          message: "10% discount applied!"
        });
      }

      return res.status(400).json({
        valid: false,
        message: "Invalid or expired coupon code."
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message || "Failed to validate coupon" });
    }
  });

  // --- Customer Phone Leads API ---
  app.post("/api/leads", async (req, res) => {
    try {
      const { phone, brand, model, productId, productName, consentGiven, consentText } = req.body;
      const normalized = normalizeIndianPhone(phone);
      if (!normalized) {
        return res.status(400).json({ error: "Invalid Indian mobile number." });
      }

      const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const formattedPhone = `+91 ${normalized.slice(0, 5)} ${normalized.slice(5)}`;
      const newLead = {
        id: leadId,
        phone: normalized,
        formattedPhone,
        brand: brand || "Unknown",
        model: model || "Universal",
        productId: productId || "fronx",
        productName: productName || "Vehicle Wireless Dock",
        consentGiven: Boolean(consentGiven),
        consentText: consentText || "Agreed to contact for enquiry, purchase, delivery & support and accepted Terms & Privacy Policy",
        consentTimestamp: new Date().toISOString(),
        status: "New",
        createdAt: new Date().toISOString()
      };

      // Check if lead already exists with same phone in last 24h, update if needed
      const existingIdx = phoneLeads.findIndex(l => l.phone === normalized);
      if (existingIdx >= 0) {
        phoneLeads[existingIdx] = { ...phoneLeads[existingIdx], ...newLead };
      } else {
        phoneLeads.unshift(newLead);
      }
      saveLeadsLocal();

      // Supabase insert (non-blocking fallback)
      supabase.from("customer_leads").insert([newLead]).then(() => {}, () => {});

      res.json({ success: true, leadId, lead: newLead });
    } catch (e: any) {
      res.status(500).json({ error: e.message || "Failed to save lead" });
    }
  });

  app.get("/api/leads", async (req, res) => {
    try {
      let dbLeads: any[] = [];
      try {
        const { data, error } = await supabase.from("customer_leads").select("*").order("createdAt", { ascending: false });
        if (!error && data) {
          dbLeads = data;
        }
      } catch {}

      const dbIds = new Set(dbLeads.map(l => l.id));
      const memoryOnly = phoneLeads.filter(l => !dbIds.has(l.id));
      res.json({ success: true, leads: [...dbLeads, ...memoryOnly] });
    } catch (e: any) {
      res.json({ success: true, leads: phoneLeads });
    }
  });

  app.patch("/api/leads/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const lead = phoneLeads.find(l => l.id === id);
      if (lead) {
        lead.status = status;
        saveLeadsLocal();
      }
      try {
        await supabase.from("customer_leads").update({ status }).eq("id", id);
      } catch {}
      res.json({ success: true, status });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- Analytics Tracking API ---
  app.post("/api/analytics/track", async (req, res) => {
    try {
      const event = {
        id: "evt_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
        sessionId: req.body.sessionId || "sess_unknown",
        eventType: req.body.eventType || "unknown",
        timestamp: req.body.timestamp || new Date().toISOString(),
        url: req.body.url || null,
        referrer: req.body.referrer || null,
        brand: req.body.brand || null,
        model: req.body.model || null,
        question: req.body.question || null,
        answer: req.body.answer || null,
        productId: req.body.productId || null,
        productName: req.body.productName || null,
        price: req.body.price || null,
        amount: req.body.amount || null,
        source: req.body.source || "direct",
        metadata: req.body.metadata || {}
      };

      analyticsEvents.push(event);
      if (analyticsEvents.length > 5000) {
        analyticsEvents = analyticsEvents.slice(-5000);
      }
      saveAnalyticsLocal();

      // Non-blocking async write to Supabase table if configured
      supabase.from("analytics_events").insert([event]).then(({ error }) => {
        if (error && error.code !== "42P01") {
          // Table may not exist yet, graceful fallback to local memory/file
        }
      }, () => {});

      res.json({ success: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  // --- Analytics Aggregated Stats API ---
  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const range = (req.query.range as string) || "all";
      const now = Date.now();
      
      let filteredEvents = [...analyticsEvents];
      if (range === "today") {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        filteredEvents = filteredEvents.filter(e => new Date(e.timestamp).getTime() >= startOfDay.getTime());
      } else if (range === "7days") {
        const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
        filteredEvents = filteredEvents.filter(e => new Date(e.timestamp).getTime() >= sevenDaysAgo);
      }

      // Fetch latest orders count & revenue
      let totalOrdersCount = orders.length;
      let totalRevenue = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
      try {
        const { data: dbOrders } = await supabase.from("orders").select("id, amount, created_at");
        if (dbOrders && dbOrders.length > 0) {
          totalOrdersCount = dbOrders.length;
          totalRevenue = dbOrders.reduce((sum: number, o: any) => sum + (Number(o.amount) || 0), 0);
        }
      } catch {}

      // Unique visitors (sessions)
      const sessionSet = new Set(filteredEvents.map(e => e.sessionId));
      const totalVisitors = Math.max(sessionSet.size, filteredEvents.length > 0 ? 1 : 0);

      // Assistant engagement
      const assistantSessions = new Set(
        filteredEvents
          .filter(e => e.eventType === "assistant_open" || e.eventType === "assistant_answer")
          .map(e => e.sessionId)
      );
      const assistantEngagements = assistantSessions.size;

      // Question / Answer breakdown
      const brandCounts: Record<string, number> = {};
      const modelCounts: Record<string, number> = {};
      let totalAnswers = 0;

      filteredEvents.forEach(e => {
        if (e.eventType === "assistant_answer") {
          totalAnswers++;
          if (e.brand) {
            brandCounts[e.brand] = (brandCounts[e.brand] || 0) + 1;
          }
          if (e.model) {
            modelCounts[e.model] = (modelCounts[e.model] || 0) + 1;
          }
        }
      });

      // Format brand breakdown for charts
      const brandDistribution = Object.entries(brandCounts).map(([brand, count]) => ({
        brand,
        count,
        percentage: totalAnswers > 0 ? Math.round((count / totalAnswers) * 100) : 0
      })).sort((a, b) => b.count - a.count);

      // Format model breakdown for charts
      const modelDistribution = Object.entries(modelCounts).map(([model, count]) => ({
        model,
        count
      })).sort((a, b) => b.count - a.count);

      // Add to cart & upgrades
      const addToCartEvents = filteredEvents.filter(e => e.eventType === "add_to_cart");
      const totalAddToCart = addToCartEvents.length;
      const addedFromAssistant = addToCartEvents.filter(e => e.source === "assistant" || e.source === "chatbot").length;
      const comboUpgrades = filteredEvents.filter(e => e.eventType === "combo_upgrade_click").length;

      // Conversion rate
      const conversionRate = totalVisitors > 0 ? Number(((totalOrdersCount / totalVisitors) * 100).toFixed(1)) : 0;
      const assistantToCartRate = assistantEngagements > 0 ? Number(((addedFromAssistant / assistantEngagements) * 100).toFixed(1)) : 0;

      // Daily Trends (last 7 days)
      const dailyTrends: Record<string, { date: string; label: string; visitors: Set<string>; assistant: Set<string>; carts: number; orders: number }> = {};
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now - i * 24 * 60 * 60 * 1000);
        const dateKey = d.toISOString().split("T")[0];
        const label = d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
        dailyTrends[dateKey] = { date: dateKey, label, visitors: new Set(), assistant: new Set(), carts: 0, orders: 0 };
      }

      analyticsEvents.forEach(e => {
        const dateKey = e.timestamp.split("T")[0];
        if (dailyTrends[dateKey]) {
          dailyTrends[dateKey].visitors.add(e.sessionId);
          if (e.eventType === "assistant_open" || e.eventType === "assistant_answer") {
            dailyTrends[dateKey].assistant.add(e.sessionId);
          }
          if (e.eventType === "add_to_cart") {
            dailyTrends[dateKey].carts++;
          }
        }
      });

      const trendsArray = Object.values(dailyTrends).map(t => ({
        date: t.date,
        label: t.label,
        visitors: t.visitors.size,
        assistant: t.assistant.size,
        carts: t.carts,
        orders: 0
      }));

      // Recent Event Stream
      const recentEvents = [...filteredEvents].reverse().slice(0, 35).map(e => ({
        id: e.id,
        sessionId: e.sessionId,
        eventType: e.eventType,
        timestamp: e.timestamp,
        brand: e.brand,
        model: e.model,
        question: e.question,
        answer: e.answer,
        productName: e.productName,
        price: e.price,
        source: e.source
      }));

      res.json({
        success: true,
        stats: {
          totalVisitors,
          assistantEngagements,
          assistantAnswers: totalAnswers,
          totalAddToCart,
          addedFromAssistant,
          comboUpgrades,
          totalOrdersCount,
          totalRevenue,
          conversionRate,
          assistantToCartRate,
          brandDistribution,
          modelDistribution,
          dailyTrends: trendsArray,
          recentEvents
        }
      });
    } catch (err: any) {
      console.error("[Analytics Stats Error]:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // Orders API (fetches from Supabase with in-memory fallback)
  app.get("/api/orders", async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("[Supabase] Orders fetch error, falling back to in-memory:", error.message);
        return res.json(orders);
      }

      // Format records to match frontend expectations
      const formatted = (data || []).map((row: any) => ({
        id: row.id,
        paymentId: row.payment_id,
        paymentGateway: row.payment_gateway,
        amount: row.amount,
        email: row.email,
        shippingDetails: row.shipping_details,
        items: row.items || [],
        status: row.status || "Processing",
        date: row.created_at,
        shiprocketOrderId: row.shiprocket_order_id,
        shiprocketShipmentId: row.shiprocket_shipment_id,
        awbCode: row.awb_code,
        courierName: row.courier_name,
        pickupStatus: row.pickup_status,
        pickupScheduledDate: row.pickup_scheduled_date,
        trackingUrl: row.tracking_url,
      }));

      // Combine with any memory-only orders not in DB
      const dbIds = new Set(formatted.map((o: any) => o.id));
      const memoryOnly = orders.filter((o) => !dbIds.has(o.id));
      res.json([...formatted, ...memoryOnly]);
    } catch (err: any) {
      console.error("[Orders] Error:", err);
      res.json(orders);
    }
  });

  // Live order tracking API
  app.get("/api/track-order/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;

      // 1. Fetch order details from Supabase or memory
      let order: any = null;
      try {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();
        order = data;
      } catch (e) {
        // ignore
      }

      if (!order) {
        order = orders.find((o) => o.id === orderId);
      }

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const awbCode = order.awb_code || order.awbCode;
      const shipmentId = order.shiprocket_shipment_id || order.shiprocketShipmentId;

      if (!awbCode && !shipmentId) {
        return res.json({
          success: true,
          status: order.status || "Processing",
          message: "Shipment AWB is being generated by our warehouse.",
          order,
        });
      }

      // Query live tracking from Shiprocket
      const liveTracking = await ShiprocketService.trackShipment({
        awbCode,
        shipmentId,
      });

      res.json({
        success: true,
        orderId,
        awbCode,
        courierName: order.courier_name || order.courierName,
        trackingUrl: order.tracking_url || order.trackingUrl || (awbCode ? `https://shiprocket.co/tracking/${awbCode}` : null),
        liveTracking: liveTracking.tracking || null,
        status: order.status || "Processing",
      });
    } catch (error: any) {
      console.error("[Tracking Error]:", error);
      res.status(500).json({ error: error.message || "Failed to track order" });
    }
  });

  // Admin retry Shiprocket generation for an order
  app.post("/api/admin/shiprocket-retry/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;

      // Find order
      let order: any = null;
      try {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .eq("id", orderId)
          .single();
        order = data;
      } catch (e) {
        // ignore
      }

      if (!order) {
        order = orders.find((o) => o.id === orderId);
      }

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      const shippingDetails = order.shipping_details || order.shippingDetails;
      const items = order.items || [];
      const amount = order.amount;
      const email = order.email;

      console.log(`[Admin] Retrying Shiprocket fulfillment for order ${orderId}...`);
      const shiprocketResult = await ShiprocketService.fulfillOrder({
        orderId,
        amount,
        email,
        shippingDetails,
        items,
      });

      if (!shiprocketResult.success) {
        return res.status(400).json({
          error: "Shiprocket fulfillment retry failed",
          details: shiprocketResult,
        });
      }

      // Update Supabase
      try {
        await supabase
          .from("orders")
          .update({
            shiprocket_order_id: shiprocketResult.shiprocketOrderId,
            shiprocket_shipment_id: shiprocketResult.shiprocketShipmentId,
            awb_code: shiprocketResult.awbCode,
            courier_name: shiprocketResult.courierName,
            pickup_status: shiprocketResult.pickupStatus,
            pickup_scheduled_date: shiprocketResult.pickupScheduledDate,
            tracking_url: shiprocketResult.trackingUrl,
            status: shiprocketResult.awbCode ? "Shipped" : "Processing",
            updated_at: new Date().toISOString(),
          })
          .eq("id", orderId);
      } catch (dbErr) {
        console.warn("[Supabase] Update failed on retry:", dbErr);
      }

      // Update memory
      const memOrder = orders.find((o) => o.id === orderId);
      if (memOrder) {
        memOrder.shiprocketOrderId = shiprocketResult.shiprocketOrderId;
        memOrder.shiprocketShipmentId = shiprocketResult.shiprocketShipmentId;
        memOrder.awbCode = shiprocketResult.awbCode;
        memOrder.courierName = shiprocketResult.courierName;
        memOrder.trackingUrl = shiprocketResult.trackingUrl;
      }

      res.json({ success: true, shiprocket: shiprocketResult });
    } catch (error: any) {
      console.error("[Admin Retry Error]:", error);
      res.status(500).json({ error: error.message || "Failed to retry Shiprocket fulfillment" });
    }
  });

  // Razorpay API Routes
  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { amount } = req.body;
      const key_id = process.env.RAZORPAY_KEY_ID;
      const key_secret = process.env.RAZORPAY_KEY_SECRET;

      if (!key_id || !key_secret) {
        return res.status(500).json({
          error: "Razorpay credentials are not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.",
        });
      }

      const instance = new Razorpay({
        key_id,
        key_secret,
      });

      const options = {
        amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
      };

      const order = await instance.orders.create(options);

      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id,
      });
    } catch (error: any) {
      console.error("Razorpay Error:", error);
      res.status(500).json({ error: error.message || "Failed to create order" });
    }
  });

  // Cashfree API Routes
  app.post("/api/create-cashfree-order", async (req, res) => {
    try {
      const { amount, customerName, customerEmail, customerPhone } = req.body;
      const appId = process.env.CASHFREE_APP_ID;
      const secretKey = process.env.CASHFREE_SECRET_KEY;
      const env = process.env.CASHFREE_ENV || "TEST";

      if (!appId || !secretKey) {
        return res.status(500).json({
          error: "Cashfree credentials are not configured. Please add CASHFREE_APP_ID and CASHFREE_SECRET_KEY in .env.",
        });
      }

      const isProduction = env.toUpperCase() === "PRODUCTION" || env.toUpperCase() === "PROD";
      const baseUrl = isProduction
        ? "https://api.cashfree.com/pg/orders"
        : "https://sandbox.cashfree.com/pg/orders";

      let phone = (customerPhone || "9999999999").replace(/\D/g, "");
      if (phone.length < 10) phone = "9999999999";
      if (phone.length > 10) phone = phone.slice(-10);

      const orderId = `order_${Date.now()}`;
      const payload = {
        order_id: orderId,
        order_amount: Number(amount),
        order_currency: "INR",
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_name: customerName || "Customer",
          customer_email: customerEmail || "customer@example.com",
          customer_phone: phone,
        },
      };

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": appId,
          "x-client-secret": secretKey,
          "x-api-version": "2023-08-01",
        },
        body: JSON.stringify(payload),
      });

      const data: any = await response.json();

      if (!response.ok) {
        console.error("Cashfree Order Creation Failed:", data);
        return res.status(response.status).json({
          error: data.message || "Failed to create Cashfree order",
        });
      }

      res.json({
        payment_session_id: data.payment_session_id,
        order_id: data.order_id,
        environment: isProduction ? "production" : "sandbox",
      });
    } catch (error: any) {
      console.error("Cashfree Error:", error);
      res.status(500).json({ error: error.message || "Failed to create Cashfree order" });
    }
  });

  // Single Integration Point: Confirm Payment & Automate Shiprocket Fulfillment
  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const {
        paymentId,
        paymentGateway = "Razorpay",
        shippingDetails,
        amount,
        email,
        items = [],
      } = req.body;

      const orderId = `ord_${Date.now()}`;
      console.log(`[Order Confirmation] Processing order: ${orderId} (${paymentGateway}, PayID: ${paymentId})`);

      // 1. Trigger Shiprocket Fulfillment Pipeline
      let shiprocketData: any = null;
      try {
        console.log(`[Order Confirmation] Triggering Shiprocket for order: ${orderId}...`);
        shiprocketData = await ShiprocketService.fulfillOrder({
          orderId,
          amount,
          email,
          shippingDetails,
          items,
        });
        console.log(`[Order Confirmation] Shiprocket response:`, shiprocketData);
      } catch (srErr) {
        console.error("[Order Confirmation] Shiprocket fulfillment error (non-fatal):", srErr);
      }

      const awbCode = shiprocketData?.awbCode || null;
      const courierName = shiprocketData?.courierName || null;
      const shiprocketOrderId = shiprocketData?.shiprocketOrderId || null;
      const shiprocketShipmentId = shiprocketData?.shiprocketShipmentId || null;
      const pickupStatus = shiprocketData?.pickupStatus || null;
      const pickupScheduledDate = shiprocketData?.pickupScheduledDate || null;
      const trackingUrl = shiprocketData?.trackingUrl || (awbCode ? `https://shiprocket.co/tracking/${awbCode}` : null);

      // 2. Persist in Supabase PostgreSQL
      const dbOrderRecord = {
        id: orderId,
        payment_id: paymentId,
        payment_gateway: paymentGateway,
        amount: Number(amount),
        email: email,
        shipping_details: shippingDetails,
        items: items,
        status: awbCode ? "Shipped" : "Processing",
        shiprocket_order_id: shiprocketOrderId,
        shiprocket_shipment_id: shiprocketShipmentId,
        awb_code: awbCode,
        courier_name: courierName,
        pickup_status: pickupStatus,
        pickup_scheduled_date: pickupScheduledDate,
        tracking_url: trackingUrl,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        const { error: dbError } = await supabase.from("orders").insert([dbOrderRecord]);
        if (dbError) {
          console.warn("[Supabase] Insert order warning (ensure 'orders' table exists):", dbError.message);
        } else {
          console.log(`[Supabase] Order ${orderId} successfully saved to PostgreSQL.`);
        }
      } catch (dbEx) {
        console.warn("[Supabase] Exception writing to database:", dbEx);
      }

      // 3. Fallback in-memory state
      const newOrder = {
        id: orderId,
        paymentId,
        paymentGateway,
        amount,
        email,
        shippingDetails,
        items,
        date: new Date().toISOString(),
        status: awbCode ? "Shipped" : "Processing",
        shiprocketOrderId,
        shiprocketShipmentId,
        awbCode,
        courierName,
        pickupStatus,
        pickupScheduledDate,
        trackingUrl,
      };
      orders.unshift(newOrder);

      // 4. Send confirmation email with shipment details
      const smtpPass = process.env.RESEND_API_KEY || process.env.SMTP_PASSWORD;
      if (smtpPass) {
        try {
          const transporter = nodemailer.createTransport({
            host: "smtp.resend.com",
            port: 465,
            secure: true,
            auth: {
              user: "resend",
              pass: smtpPass,
            },
          });

          const trackingSection = awbCode
            ? `
            <div style="background: #E8F5E9; border: 1px solid #A5D6A7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2E7D32;">Shipment & Tracking Information</h3>
              <p><strong>Courier:</strong> ${courierName || "Shiprocket Express"}</p>
              <p><strong>AWB / Tracking Number:</strong> ${awbCode}</p>
              <p><a href="${trackingUrl}" style="background: #2E7D32; color: #ffffff; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold; margin-top: 8px;">Track Your Shipment</a></p>
            </div>
            `
            : `
            <p style="font-size: 14px; color: #555;">
              Our logistics partner (Shiprocket) is preparing your shipment. You will receive live tracking updates once the courier is dispatched.
            </p>
            `;

          await transporter.sendMail({
            from: "onboarding@resend.dev",
            to: email,
            subject: `Order Confirmation #${orderId} - QICDOCK`,
            html: `
              <div style="font-family: sans-serif; color: #0A1E3F; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h1 style="color: #0A1E3F;">Thank you for your order!</h1>
                <p>Your payment was successful and your order has been dispatched to fulfillment.</p>
                
                <div style="background: #FAF7F0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Order Summary</h3>
                  <p><strong>Order ID:</strong> ${orderId}</p>
                  <p><strong>Payment Method:</strong> ${paymentGateway}</p>
                  <p><strong>Payment ID:</strong> ${paymentId}</p>
                  <p><strong>Amount Paid:</strong> ₹${amount}</p>
                </div>

                ${trackingSection}

                <div style="background: #FAF7F0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <h3 style="margin-top: 0;">Shipping To:</h3>
                  <p>${shippingDetails.name}<br/>
                  ${shippingDetails.addressLine}<br/>
                  ${shippingDetails.state}, ${shippingDetails.pincode}<br/>
                  ${shippingDetails.country || "India"}<br/>
                  Phone: ${shippingDetails.phone}</p>
                </div>

                <p style="font-size: 16px; font-weight: bold; color: #22C55E;">
                  Estimated delivery in 3-5 business days.
                </p>
              </div>
            `,
          });
        } catch (mailErr) {
          console.error("Failed to send email confirmation:", mailErr);
        }
      }

      res.json({
        success: true,
        order: newOrder,
        shiprocket: shiprocketData,
      });
    } catch (error: any) {
      console.error("Confirmation Error:", error);
      res.status(500).json({ error: error.message || "Failed to confirm payment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
