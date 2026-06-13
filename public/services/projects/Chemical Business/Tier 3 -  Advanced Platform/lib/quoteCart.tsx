"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export interface QuoteCartItem {
  productId: string;
  productName: string;
  quantity: string;
  unit: string;
  packaging?: string;
}

interface QuoteCartContextType {
  items: QuoteCartItem[];
  addItem: (item: QuoteCartItem) => void;
  removeItem: (productId: string) => void;
  updateItem: (productId: string, updates: Partial<QuoteCartItem>) => void;
  clear: () => void;
  count: number;
}

const QuoteCartContext = createContext<QuoteCartContextType | undefined>(undefined);

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("quoteCart");
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse quote cart", e);
      }
    }
    setMounted(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("quoteCart", JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (item: QuoteCartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        // Update quantity if product already in cart
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const updateItem = (productId: string, updates: Partial<QuoteCartItem>) => {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId ? { ...i, ...updates } : i
      )
    );
  };

  const clear = () => {
    setItems([]);
  };

  return (
    <QuoteCartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItem,
        clear,
        count: items.length,
      }}
    >
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext);
  if (!context) {
    throw new Error("useQuoteCart must be used within QuoteCartProvider");
  }
  return context;
}
