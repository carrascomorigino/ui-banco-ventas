import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import cartReducer from "../features/cart/slice/cartSlice";
import productSearchReducer from "../features/catalog/slice/productSearchSlice";
import {
  useDispatch,
  type TypedUseSelectorHook,
  useSelector,
} from "react-redux";
import { CART_STORAGE_KEY } from "../features/cart/types/cart.types";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productSearch: productSearchReducer,
  },
});

let previousCartRecordState = store.getState().cart.record;

store.subscribe(() => {
  const currentCartRecordState = store.getState().cart.record;

  if (currentCartRecordState !== previousCartRecordState) {
    previousCartRecordState = currentCartRecordState;
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(currentCartRecordState),
    );
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
