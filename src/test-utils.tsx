// src/test-utils.tsx
import type { PropsWithChildren, ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import productSearchReducer from "./features/catalog/slice/productSearchSlice";
import cartReducer from "./features/cart/slice/cartSlice";

export function renderWithProviders(ui: ReactElement, preloadedState?: object) {
  const store = configureStore({
    reducer: { productSearch: productSearchReducer, cart: cartReducer },
    preloadedState,
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper });
}
