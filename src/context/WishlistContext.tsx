"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

type WishlistItem = { id: string; slug: string };
type WishlistState = { items: WishlistItem[] };
type WishlistAction =
  | { type: "TOGGLE"; payload: WishlistItem }
  | { type: "HYDRATE"; payload: WishlistItem[] };

type WishlistContextType = {
  items: WishlistItem[];
  toggle: (id: string, slug: string) => void;
  isWished: (id: string) => boolean;
  count: number;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };
    case "TOGGLE": {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        return { items: state.items.filter((i) => i.id !== action.payload.id) };
      }
      return { items: [...state.items, action.payload] };
    }
    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("igt-wishlist");
      if (saved) dispatch({ type: "HYDRATE", payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("igt-wishlist", JSON.stringify(state.items));
  }, [state.items]);

  return (
    <WishlistContext.Provider
      value={{
        items: state.items,
        toggle: (id, slug) => dispatch({ type: "TOGGLE", payload: { id, slug } }),
        isWished: (id) => state.items.some((i) => i.id === id),
        count: state.items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
