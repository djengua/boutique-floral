/* =========================
   store/shopStore.ts
========================= */
"use client";

import { create } from "zustand";

export type VariantKey = "S" | "M" | "L" | "Premium";

export type Product = {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  image: string;
  badge?: "Más vendido" | "Nuevo" | "Premium" | "Sereno";
  variants: VariantKey[];
};

export type CartItem = {
  productId: string;
  variant: VariantKey;
  qty: number;
};

type ShopState = {
  selectedVariantByProduct: Record<string, VariantKey>;
  cart: CartItem[];
  favorites: string[];

  setVariant: (productId: string, variant: VariantKey) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string, variant: VariantKey) => void;
  incQty: (productId: string, variant: VariantKey) => void;
  decQty: (productId: string, variant: VariantKey) => void;
  toggleFavorite: (productId: string) => void;

  cartCount: () => number;
};

export const useShopStore = create<ShopState>((set, get) => ({
  selectedVariantByProduct: {},
  cart: [],
  favorites: [],

  setVariant: (productId, variant) =>
    set((s) => ({
      selectedVariantByProduct: {
        ...s.selectedVariantByProduct,
        [productId]: variant,
      },
    })),

  addToCart: (productId) => {
    const variant = get().selectedVariantByProduct[productId] ?? "S";
    set((s) => {
      const idx = s.cart.findIndex(
        (c) => c.productId === productId && c.variant === variant
      );
      if (idx >= 0) {
        const next = [...s.cart];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return { cart: next };
      }
      return { cart: [...s.cart, { productId, variant, qty: 1 }] };
    });
  },

  removeFromCart: (productId, variant) =>
    set((s) => ({
      cart: s.cart.filter(
        (c) => !(c.productId === productId && c.variant === variant)
      ),
    })),

  incQty: (productId, variant) =>
    set((s) => ({
      cart: s.cart.map((c) =>
        c.productId === productId && c.variant === variant
          ? { ...c, qty: c.qty + 1 }
          : c
      ),
    })),

  decQty: (productId, variant) =>
    set((s) => ({
      cart: s.cart
        .map((c) =>
          c.productId === productId && c.variant === variant
            ? { ...c, qty: Math.max(1, c.qty - 1) }
            : c
        )
        .filter((c) => c.qty > 0),
    })),

  toggleFavorite: (productId) =>
    set((s) =>
      s.favorites.includes(productId)
        ? { favorites: s.favorites.filter((id) => id !== productId) }
        : { favorites: [...s.favorites, productId] }
    ),

  cartCount: () => get().cart.reduce((acc, x) => acc + x.qty, 0),
}));
