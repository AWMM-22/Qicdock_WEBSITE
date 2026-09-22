import React, { createContext, useContext, useEffect, useState } from 'react';

type InventoryContextType = {
  inventory: Record<string, boolean>;
  isSoldOut: (productId: string) => boolean;
  refreshInventory: () => Promise<void>;
};

const InventoryContext = createContext<InventoryContextType>({
  inventory: {},
  isSoldOut: () => false,
  refreshInventory: async () => {},
});

export const useInventory = () => useContext(InventoryContext);

const INVENTORY_CACHE_KEY = 'qic_inventory_status';

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Record<string, boolean>>(() => {
    try {
      const cached = localStorage.getItem(INVENTORY_CACHE_KEY);
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  const refreshInventory = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);
      
      const res = await fetch('/api/inventory', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        setInventory(data);
        try {
          localStorage.setItem(INVENTORY_CACHE_KEY, JSON.stringify(data));
        } catch {
          // ignore localStorage errors
        }
      }
    } catch {
      // Graceful offline fallback: rely on initialized state/localStorage
    }
  };

  useEffect(() => {
    refreshInventory();
  }, []);

  const isSoldOut = (productId: string) => {
    return !!inventory[productId];
  };

  return (
    <InventoryContext.Provider value={{ inventory, isSoldOut, refreshInventory }}>
      {children}
    </InventoryContext.Provider>
  );
};
