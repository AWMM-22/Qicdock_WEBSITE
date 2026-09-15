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

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [inventory, setInventory] = useState<Record<string, boolean>>({});

  const refreshInventory = async () => {
    try {
      const res = await fetch('/api/inventory');
      if (res.ok) {
        const data = await res.json();
        setInventory(data);
      }
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
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
