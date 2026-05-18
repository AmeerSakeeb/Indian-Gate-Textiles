"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { Product } from "@/lib/mock-data";

// =============================================
// TYPES
// =============================================
type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: string; color: string } }
  | { type: "UPDATE_QTY"; payload: { id: string; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

type CartContextType = {
  state: CartState;
  addItem: (product: Product, size: string, color: string, qty?: number) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQty: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotal: number;
};

// =============================================
// REDUCER
// =============================================
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, items: action.payload };

    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (i) =>
          i.product.id === action.payload.product.id &&
          i.size === action.payload.size &&
          i.color === action.payload.color
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + action.payload.quantity,
        };
        return { ...state, items: updated, isOpen: true };
      }
      return { ...state, items: [...state.items, action.payload], isOpen: true };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.payload.id &&
              i.size === action.payload.size &&
              i.color === action.payload.color
            )
        ),
      };

    case "UPDATE_QTY": {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) =>
              !(
                i.product.id === action.payload.id &&
                i.size === action.payload.size &&
                i.color === action.payload.color
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.payload.id &&
          i.size === action.payload.size &&
          i.color === action.payload.color
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    case "OPEN_CART":
      return { ...state, isOpen: true };

    case "CLOSE_CART":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

// =============================================
// CONTEXT
// =============================================
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("igt-cart");
      if (saved) {
        dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
      }
    } catch {}
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("igt-cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem: (product, size, color, qty = 1) =>
          dispatch({ type: "ADD_ITEM", payload: { product, size, color, quantity: qty } }),
        removeItem: (id, size, color) =>
          dispatch({ type: "REMOVE_ITEM", payload: { id, size, color } }),
        updateQty: (id, size, color, quantity) =>
          dispatch({ type: "UPDATE_QTY", payload: { id, size, color, quantity } }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
        openCart: () => dispatch({ type: "OPEN_CART" }),
        closeCart: () => dispatch({ type: "CLOSE_CART" }),
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
