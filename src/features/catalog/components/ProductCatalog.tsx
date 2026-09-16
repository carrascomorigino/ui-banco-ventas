import useProductSearch from "../hooks/useProductSearch";
import { SEARCH_MAX_LENGTH } from "../utils/searchValidation";
import { ProductFilter } from "./ProductFilter";
import { ProductList } from "./ProductList";
import { CartCounter } from "../../cart/components/CartCounter";
import { Cart } from "../../cart/components/Cart";

export function ProductCatalog() {
  const { onSearch } = useProductSearch();

  return (
    <>
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <input
          onInput={onSearch}
          type="text"
          inputMode="search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={SEARCH_MAX_LENGTH}
          aria-label="Buscar productos"
          placeholder="Buscar productos..."
          className="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-100 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-blue-500"
        />
        <ProductFilter />
        <CartCounter />
      </div>
      <ProductList />
      <Cart />
    </>
  );
}
