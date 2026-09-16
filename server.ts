import express from "express";
import path from "path";
import cors from "cors";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Mock DB state
let orders: any[] = [];
let inventory: Record<string, boolean> = {}; // { productId: isSoldOut }

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

  // Orders API
  app.get("/api/orders", (req, res) => {
    res.json(orders);
  });

  // Razorpay API Routes
  app.post("/api/create-razorpay-order", async (req, res) => {
    try {
      const { amount } = req.body;
      const key_id = process.env.RAZORPAY_KEY_ID;
      const key_secret = process.env.RAZORPAY_KEY_SECRET;

      if (!key_id || !key_secret) {
        return res.status(500).json({ 
          error: "Razorpay credentials are not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." 
        });
      }

      const instance = new Razorpay({
        key_id,
        key_secret,
      });

      const options = {
        amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`
      };

      const order = await instance.orders.create(options);
      
      res.json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        key_id // Safe to pass public key ID back to frontend to initialize Razorpay checkout
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
          error: "Cashfree credentials are not configured. Please add CASHFREE_APP_ID and CASHFREE_SECRET_KEY in .env." 
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
          customer_phone: phone
        }
      };

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": appId,
          "x-client-secret": secretKey,
          "x-api-version": "2023-08-01"
        },
        body: JSON.stringify(payload)
      });

      const data: any = await response.json();

      if (!response.ok) {
        console.error("Cashfree Order Creation Failed:", data);
        return res.status(response.status).json({ 
          error: data.message || "Failed to create Cashfree order" 
        });
      }

      res.json({
        payment_session_id: data.payment_session_id,
        order_id: data.order_id,
        environment: isProduction ? "production" : "sandbox"
      });
    } catch (error: any) {
      console.error("Cashfree Error:", error);
      res.status(500).json({ error: error.message || "Failed to create Cashfree order" });
    }
  });

  app.post("/api/confirm-payment", async (req, res) => {
    try {
      const { paymentId, paymentGateway = "Razorpay", shippingDetails, amount, email } = req.body;

      // Save order to in-memory array
      const newOrder = {
        id: `ord_${Date.now()}`,
        paymentId,
        paymentGateway,
        amount,
        email,
        shippingDetails,
        date: new Date().toISOString(),
        status: 'Processing'
      };
      orders.push(newOrder);

      // Send confirmation email
      const smtpPass = process.env.RESEND_API_KEY || process.env.SMTP_PASSWORD;
      if (smtpPass) {
        const transporter = nodemailer.createTransport({
          host: 'smtp.resend.com',
          port: 465,
          secure: true,
          auth: {
            user: 'resend',
            pass: smtpPass
          }
        });

        await transporter.sendMail({
          from: 'onboarding@resend.dev', // Ensure this matches your verified Resend domain
          to: email,
          subject: 'Order Confirmation - QICDOCK',
          html: `
            <div style="font-family: sans-serif; color: #0A1E3F; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #0A1E3F;">Thank you for your order!</h1>
              <p>Your payment was successful and we are processing your order.</p>
              
              <div style="background: #FAF7F0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Order Details</h3>
                <p><strong>Payment Method:</strong> ${paymentGateway}</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                <p><strong>Amount Paid:</strong> ₹${amount}</p>
              </div>

              <div style="background: #FAF7F0; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Shipping To:</h3>
                <p>${shippingDetails.name}<br/>
                ${shippingDetails.addressLine}<br/>
                ${shippingDetails.state}, ${shippingDetails.pincode}<br/>
                ${shippingDetails.country}<br/>
                Phone: ${shippingDetails.phone}</p>
              </div>

              <p style="font-size: 16px; font-weight: bold; color: #22C55E;">
                Your order will be received in 5 days.
              </p>
            </div>
          `
        });
      } else {
        console.warn("SMTP credentials not found, skipping confirmation email.");
      }

      res.json({ success: true, order: newOrder });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
