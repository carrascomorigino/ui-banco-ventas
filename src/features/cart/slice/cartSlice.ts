import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "../../../app/store";
import type { Product } from "../../catalog/types/product.types";

interface CartState {
  cart: Record<number, Pick<Product, "id" | "price" | "image">>;
}

const initialState: CartState = {
  cart: {},
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Product>) => {
      const { id, price, image } = action.payload;

      state.cart[id] = { id, price, image };
    },
    remove: (state, action: PayloadAction<number>) => {
      delete state.cart[action.payload];
    },
  },
});

export const { add, remove } = cartSlice.actions;

export const selectCount = (state: RootState) => Object.keys(state.cart).length;

export default cartSlice.reducer;
