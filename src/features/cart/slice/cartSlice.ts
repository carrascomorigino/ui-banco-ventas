import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../catalog/types/product.types";
import { CART_STORAGE_KEY } from "../types/cart.types";

type CartItem = Pick<Product, "id" | "price" | "title"> & { quantity: number };

interface CartState {
  isOpen: boolean;
  record: Record<number, CartItem>;
}

interface CartRootState {
  cart: CartState;
}

const initialState: CartState = {
  isOpen: false,
  record: loadCartFromStorage(),
};

function loadCartFromStorage(): CartState["record"] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const { id, price, title } = action.payload;
      const prevQuantity = state.record[id]?.quantity ?? 0;

      state.record[id] = { id, price, quantity: prevQuantity + 1, title };
    },
    increment: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      if (state.record[id]) {
        state.record[id].quantity += 1;
      }
    },
    decrement: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const prevQuantity = state.record[id]?.quantity ?? 0;

      if (prevQuantity === 1) {
        delete state.record[id];
      } else {
        state.record[id].quantity -= 1;
      }
    },
    remove: (state, action: PayloadAction<number>) => {
      delete state.record[action.payload];
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { add, decrement, increment, remove, openCart, closeCart } =
  cartSlice.actions;

export const selectCount = (state: CartRootState) =>
  Object.keys(state.cart.record).length;
export const selectedItems = (state: CartRootState) => {
  return Object.values(state.cart.record);
};

export const selectTotal = (state: CartRootState) =>
  Object.values(state.cart.record).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
export default cartSlice.reducer;
