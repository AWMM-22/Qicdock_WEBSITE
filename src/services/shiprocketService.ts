interface ShiprocketAuthResponse {
  token: string;
  [key: string]: any;
}

interface ShiprocketOrderItem {
  name: string;
  sku?: string;
  units: number;
  selling_price: number;
  discount?: number;
}

interface ShiprocketCreateOrderPayload {
  order_id: string;
  order_date: string;
  pickup_location: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  order_items: ShiprocketOrderItem[];
  payment_method: "Prepaid" | "COD";
  sub_total: number;
  length?: number;
  breadth?: number;
  height?: number;
  weight?: number;
}

export class ShiprocketService {
  private static token: string | null = null;
  private static tokenExpiry: number = 0; // timestamp in ms

  private static getCredentials() {
    const email = process.env.SHIPROCKET_EMAIL;
    const password = process.env.SHIPROCKET_PASSWORD;
    return { email, password };
  }

  /**
   * Authenticate and get JWT token from Shiprocket.
   * Caches token in memory until close to expiration (Shiprocket tokens typically valid for 240 hours/10 days).
   */
  public static async getToken(forceRefresh = false): Promise<string | null> {
    const { email, password } = this.getCredentials();

    if (!email || !password) {
      console.warn("[Shiprocket] Credentials (SHIPROCKET_EMAIL, SHIPROCKET_PASSWORD) not configured in .env");
      return null;
    }

    // Return cached token if valid
    const now = Date.now();
    if (!forceRefresh && this.token && this.tokenExpiry > now + 60000) {
      return this.token;
    }

    try {
      console.log("[Shiprocket] Authenticating with Shiprocket API...");
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json() as ShiprocketAuthResponse;
      if (!res.ok || !data.token) {
        console.error("[Shiprocket] Login failed:", data);
        return null;
      }

      this.token = data.token;
      // Cache for 24 hours conservatively
      this.tokenExpiry = now + 24 * 60 * 60 * 1000;
      console.log("[Shiprocket] Authentication successful, token cached.");
      return this.token;
    } catch (error) {
      console.error("[Shiprocket] Auth exception:", error);
      return null;
    }
  }

  /**
   * Fetch configured/existing pickup locations from Shiprocket account
   */
  public static async getPickupLocation(): Promise<string> {
    // If explicitly configured in env, prioritize that
    if (process.env.SHIPROCKET_PICKUP_LOCATION) {
      return process.env.SHIPROCKET_PICKUP_LOCATION;
    }

    const token = await this.getToken();
    if (!token) return "Primary";

    try {
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/settings/company/pickup", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        const addressList = data?.data?.shipping_address || [];
        if (addressList.length > 0) {
          // Use primary or first pickup location
          const primary = addressList.find((loc: any) => loc.is_primary_location === 1) || addressList[0];
          if (primary && primary.pickup_location) {
            console.log(`[Shiprocket] Using existing pickup location: ${primary.pickup_location}`);
            return primary.pickup_location;
          }
        }
      }
    } catch (e) {
      console.error("[Shiprocket] Error fetching pickup locations:", e);
    }

    return "Primary";
  }

  /**
   * Create an adhoc order in Shiprocket
   */
  public static async createOrder(orderData: {
    orderId: string;
    amount: number;
    email: string;
    shippingDetails: {
      name: string;
      phone: string;
      addressLine: string;
      city?: string;
      state: string;
      pincode: string;
      country?: string;
    };
    items?: Array<{
      name: string;
      quantity: number;
      price: number;
      sku?: string;
    }>;
  }) {
    const token = await this.getToken();
    if (!token) {
      return { success: false, error: "Shiprocket credentials missing or auth failed" };
    }

    const pickupLocation = await this.getPickupLocation();
    const nameParts = (orderData.shippingDetails.name || "Customer").trim().split(" ");
    const firstName = nameParts[0] || "Customer";
    const lastName = nameParts.slice(1).join(" ") || " ";

    // Current date in YYYY-MM-DD HH:mm format
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Clean phone number (must be 10 digits)
    let phone = (orderData.shippingDetails.phone || "9999999999").replace(/\D/g, "");
    if (phone.length < 10) phone = "9999999999";
    if (phone.length > 10) phone = phone.slice(-10);

    const orderItems: ShiprocketOrderItem[] = (orderData.items && orderData.items.length > 0)
      ? orderData.items.map((item, idx) => ({
          name: item.name || "Qicdock Product",
          sku: item.sku || `SKU_${idx + 1}_${Date.now()}`,
          units: item.quantity || 1,
          selling_price: item.price || orderData.amount,
          discount: 0,
        }))
      : [
          {
            name: "Qicdock Order Item",
            sku: `SKU_${orderData.orderId}`,
            units: 1,
            selling_price: orderData.amount,
            discount: 0,
          },
        ];

    const payload: ShiprocketCreateOrderPayload = {
      order_id: orderData.orderId,
      order_date: formattedDate,
      pickup_location: pickupLocation,
      billing_customer_name: firstName,
      billing_last_name: lastName,
      billing_address: orderData.shippingDetails.addressLine || "Address",
      billing_city: orderData.shippingDetails.city || orderData.shippingDetails.state || "City",
      billing_pincode: orderData.shippingDetails.pincode ? String(orderData.shippingDetails.pincode).trim() : "110001",
      billing_state: orderData.shippingDetails.state || "State",
      billing_country: orderData.shippingDetails.country || "India",
      billing_email: orderData.email || "customer@example.com",
      billing_phone: phone,
      shipping_is_billing: true,
      order_items: orderItems,
      payment_method: "Prepaid",
      sub_total: orderData.amount,
      length: 10,
      breadth: 10,
      height: 10,
      weight: 0.5,
    };

    try {
      console.log(`[Shiprocket] Creating order for ID: ${orderData.orderId}...`);
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/orders/create/adhoc", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: any = await res.json();
      if (!res.ok || (data.status_code && data.status_code !== 200 && !data.order_id)) {
        console.error("[Shiprocket] Order creation failed:", data);
        return { success: false, error: data.message || "Failed to create Shiprocket order", details: data };
      }

      console.log(`[Shiprocket] Order created! Shiprocket Order ID: ${data.order_id}, Shipment ID: ${data.shipment_id}`);
      return {
        success: true,
        orderId: data.order_id,
        shipmentId: data.shipment_id,
        status: data.status,
        raw: data,
      };
    } catch (error: any) {
      console.error("[Shiprocket] Create order exception:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Assign courier and generate AWB for the shipment
   */
  public static async assignCourierAndAWB(shipmentId: number | string, courierId?: number) {
    const token = await this.getToken();
    if (!token) return { success: false, error: "Auth failed" };

    try {
      console.log(`[Shiprocket] Generating AWB for shipment: ${shipmentId}...`);
      const bodyPayload: any = { shipment_id: shipmentId };
      if (courierId) {
        bodyPayload.courier_id = courierId;
      }

      const res = await fetch("https://apiv2.shiprocket.in/v1/external/courier/assign/awb", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });

      const data: any = await res.json();
      const awbData = data?.response?.data;

      if (!res.ok || !awbData?.awb_code) {
        console.warn("[Shiprocket] AWB assignment response:", data);
        return {
          success: false,
          error: data?.message || awbData?.awb_assign_error || "AWB assignment pending or failed",
          raw: data,
        };
      }

      console.log(`[Shiprocket] AWB Assigned: ${awbData.awb_code}, Courier: ${awbData.courier_name}`);
      return {
        success: true,
        awbCode: awbData.awb_code,
        courierName: awbData.courier_name,
        courierCompanyId: awbData.courier_company_id,
        appliedWeight: awbData.applied_weight,
        raw: data,
      };
    } catch (error: any) {
      console.error("[Shiprocket] AWB generation exception:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate pickup request for the shipment
   */
  public static async generatePickup(shipmentId: number | string) {
    const token = await this.getToken();
    if (!token) return { success: false, error: "Auth failed" };

    try {
      console.log(`[Shiprocket] Requesting pickup for shipment: ${shipmentId}...`);
      const res = await fetch("https://apiv2.shiprocket.in/v1/external/courier/generate/pickup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shipment_id: [Number(shipmentId)],
        }),
      });

      const data: any = await res.json();
      const pickupData = data?.response;

      if (!res.ok || data.status === 0) {
        console.warn("[Shiprocket] Pickup generation response:", data);
        return {
          success: false,
          error: data?.message || "Pickup generation response received",
          raw: data,
        };
      }

      console.log(`[Shiprocket] Pickup generated successfully for shipment: ${shipmentId}`);
      return {
        success: true,
        pickupStatus: pickupData?.pickup_status || "Scheduled",
        pickupScheduledDate: pickupData?.pickup_scheduled_date || new Date().toISOString(),
        raw: data,
      };
    } catch (error: any) {
      console.error("[Shiprocket] Pickup request exception:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Live tracking by AWB code or Shipment ID
   */
  public static async trackShipment(identifier: { awbCode?: string; shipmentId?: string | number }) {
    const token = await this.getToken();
    if (!token) return { success: false, error: "Auth failed" };

    try {
      let url = "";
      if (identifier.awbCode) {
        url = `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${identifier.awbCode}`;
      } else if (identifier.shipmentId) {
        url = `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${identifier.shipmentId}`;
      } else {
        return { success: false, error: "AWB code or Shipment ID required" };
      }

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data: any = await res.json();
      if (!res.ok) {
        return { success: false, error: data?.message || "Failed to fetch tracking details" };
      }

      return {
        success: true,
        tracking: data?.tracking_data || data,
      };
    } catch (error: any) {
      console.error("[Shiprocket] Tracking exception:", error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Full end-to-end fulfillment pipeline:
   * 1. Create order
   * 2. Assign courier & AWB
   * 3. Request pickup
   */
  public static async fulfillOrder(orderData: {
    orderId: string;
    amount: number;
    email: string;
    shippingDetails: any;
    items?: any[];
  }) {
    // 1. Create order
    const orderResult = await this.createOrder(orderData);
    if (!orderResult.success || !orderResult.shipmentId) {
      return {
        success: false,
        step: "order_creation",
        error: orderResult.error,
        shiprocketOrderId: orderResult.orderId ? String(orderResult.orderId) : null,
        shiprocketShipmentId: orderResult.shipmentId ? String(orderResult.shipmentId) : null,
      };
    }

    const shipmentId = orderResult.shipmentId;
    const shiprocketOrderId = orderResult.orderId;

    // 2. Assign AWB & Courier
    const awbResult = await this.assignCourierAndAWB(shipmentId);
    let awbCode = awbResult.success ? awbResult.awbCode : null;
    let courierName = awbResult.success ? awbResult.courierName : null;

    // 3. Request Pickup
    let pickupStatus = null;
    let pickupScheduledDate = null;
    if (awbCode) {
      const pickupResult = await this.generatePickup(shipmentId);
      if (pickupResult.success) {
        pickupStatus = pickupResult.pickupStatus;
        pickupScheduledDate = pickupResult.pickupScheduledDate;
      }
    }

    const trackingUrl = awbCode ? `https://shiprocket.co/tracking/${awbCode}` : null;

    return {
      success: true,
      shiprocketOrderId: String(shiprocketOrderId),
      shiprocketShipmentId: String(shipmentId),
      awbCode: awbCode ? String(awbCode) : null,
      courierName: courierName ? String(courierName) : null,
      pickupStatus: pickupStatus ? String(pickupStatus) : null,
      pickupScheduledDate: pickupScheduledDate ? String(pickupScheduledDate) : null,
      trackingUrl,
    };
  }
}
