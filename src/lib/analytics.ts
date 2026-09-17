// Client-side analytics tracking utility for Qicdock

const SESSION_KEY = 'qicdock_session_id';

export function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 'sess_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return 'sess_anon_' + Date.now();
  }
}

export interface AnalyticsEventPayload {
  eventType: 'page_view' | 'assistant_open' | 'assistant_answer' | 'add_to_cart' | 'combo_upgrade_click' | 'checkout_started' | 'order_completed';
  page?: string;
  brand?: string;
  model?: string;
  question?: string;
  answer?: string;
  productId?: string;
  productName?: string;
  price?: number;
  amount?: number;
  source?: string;
  metadata?: Record<string, any>;
}

export async function trackEvent(payload: AnalyticsEventPayload): Promise<void> {
  try {
    const eventData = {
      sessionId: getSessionId(),
      timestamp: new Date().toISOString(),
      url: window.location.pathname + window.location.search,
      referrer: document.referrer || null,
      ...payload
    };

    // Send asynchronously without blocking the user
    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(eventData)], { type: 'application/json' });
      navigator.sendBeacon('/api/analytics/track', blob);
    } else {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        keepalive: true
      }).catch(() => {});
    }
  } catch (err) {
    // Ignore analytics network errors in client
  }
}

// Convenient helper functions
export const trackPageView = (pageName?: string) => {
  trackEvent({ eventType: 'page_view', page: pageName || window.location.pathname });
};

export const trackAssistantOpen = () => {
  trackEvent({ eventType: 'assistant_open' });
};

export const trackAssistantAnswer = (step: string, question: string, answer: string, brand?: string, model?: string) => {
  trackEvent({
    eventType: 'assistant_answer',
    question,
    answer,
    brand,
    model,
    metadata: { step }
  });
};

export const trackAddToCart = (productId: string, productName: string, price: number, source: string = 'direct') => {
  trackEvent({
    eventType: 'add_to_cart',
    productId,
    productName,
    price,
    source
  });
};

export const trackComboUpgrade = (fromProduct: string, toProduct: string, savings: number) => {
  trackEvent({
    eventType: 'combo_upgrade_click',
    productId: toProduct,
    productName: toProduct,
    price: savings,
    metadata: { fromProduct, savings }
  });
};
