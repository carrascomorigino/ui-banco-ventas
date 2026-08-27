import useProductSearch from "../hooks/useProductSearch";
import { ProductList } from "./ProductList";

export function ProductCatalog() {
  const { onSearch } = useProductSearch();

  return (
    <>
      <div className="p-4">
        <input
          onInput={onSearch}
          type="text"
          placeholder="Buscar productos..."
          className="w-full rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-100 placeholder-gray-400 outline-none transition focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <ProductList />
    </>
  );
}
