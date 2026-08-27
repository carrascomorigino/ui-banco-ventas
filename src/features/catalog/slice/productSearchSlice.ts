import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ProductSearchState {
  value: string;
}

const initialState: ProductSearchState = {
  value: "",
};

export const cartSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { update } = cartSlice.actions;

export default cartSlice.reducer;
