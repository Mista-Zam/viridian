import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Address } from '../types';

interface CartState {
  items: CartItem[];
  address: Address | null;
  deliveryMethod: 'standard' | 'express';
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  toggleCheck: (productId: string) => void;
  toggleAll: (checked: boolean) => void;
  clearChecked: () => void;
  setAddress: (address: Address) => void;
  setDeliveryMethod: (method: 'standard' | 'express') => void;
  getSelectedItems: () => CartItem[];
  getTotal: () => number;
  getShipping: () => number;
  getGrandTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      address: null,
      deliveryMethod: 'standard',

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId ? { ...i, qty: i.qty + item.qty } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),

      updateQty: (productId, qty) =>
        set((state) => ({
          items: state.items.map((i) => (i.productId === productId ? { ...i, qty: Math.max(1, qty) } : i)),
        })),

      toggleCheck: (productId) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, checked: !i.checked } : i
          ),
        })),

      toggleAll: (checked) =>
        set((state) => ({
          items: state.items.map((i) => ({ ...i, checked })),
        })),

      clearChecked: () =>
        set((state) => ({
          items: state.items.filter((i) => !i.checked),
        })),

      setAddress: (address) => set({ address }),
      setDeliveryMethod: (method) => set({ deliveryMethod: method }),

      getSelectedItems: () => get().items.filter((i) => i.checked),
      getTotal: () => get().getSelectedItems().reduce((sum, i) => sum + i.price * i.qty, 0),
      getShipping: () => (get().deliveryMethod === 'express' ? 90 : 45),
      getGrandTotal: () => get().getTotal() + get().getShipping(),
    }),
    { name: 'viridian-cart' }
  )
);
