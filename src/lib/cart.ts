export interface CartItem {
  id: number | string;
  name: string;
  variant: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

const CART_STORAGE_KEY = 'quickdoc_cart_items';

export function getCartItems(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse cart items:', e);
    return [];
  }
}

export function saveCartItems(items: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: items }));
  } catch (e) {
    console.error('Failed to save cart items:', e);
  }
}

export function addToCart(item: Omit<CartItem, 'quantity'> & { quantity?: number }): void {
  const current = getCartItems();
  const existingIdx = current.findIndex(i => String(i.id) === String(item.id) || (i.name === item.name && i.variant === item.variant));

  if (existingIdx >= 0) {
    current[existingIdx].quantity += item.quantity || 1;
  } else {
    current.push({
      ...item,
      quantity: item.quantity || 1
    });
  }

  saveCartItems(current);
}

export function getCartCount(): number {
  const items = getCartItems();
  return items.reduce((acc, i) => acc + (i.quantity || 1), 0);
}
