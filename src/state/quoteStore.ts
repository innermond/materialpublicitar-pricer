import { useState } from "react";
import type { QuoteItem } from "../types/quote";

export function useQuoteStore() {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const addItem = (item: QuoteItem) => {
    setItems((prev) => [...prev, item]);
    setActiveId(item.id);
  };

  const updateItem = (id: string, patch: Partial<QuoteItem>) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, ...patch } : i
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const activeItem = items.find((i) => i.id === activeId) || null;

  return {
    items,
    activeId,
    activeItem,
    setActiveId,
    addItem,
    updateItem,
    deleteItem,
  };
}
