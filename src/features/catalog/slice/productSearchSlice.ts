import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ProductSearchState {
  category: string;
  title: string;
}

const initialState: ProductSearchState = {
  category: "",
  title: "",
};

export const cartSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { updateTitle, updateCategory } = cartSlice.actions;

export default cartSlice.reducer;
