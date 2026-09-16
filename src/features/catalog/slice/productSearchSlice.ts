import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { sanitizeSearchInput } from "../utils/searchValidation";

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
    // Se vuelve a sanitizar aquí (defensa en profundidad) para que el
    // estado de búsqueda quede validado sin importar desde dónde se
    // despache la acción, no solo desde el input controlado por
    // useProductSearch.
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = sanitizeSearchInput(action.payload);
    },
    updateCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { updateTitle, updateCategory } = cartSlice.actions;

export default cartSlice.reducer;
