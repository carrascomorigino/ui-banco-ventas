import type { Product } from "../features/catalog/types/product.types";
import { sanitizeSearchInput } from "../features/catalog/utils/searchValidation";
import MOCK_PRODUCTS from "./mockProducts";

export async function fetchProducts({
  filter,
  search,
}: {
  filter: string;
  search: string;
}) {
  return await new Promise<{ products: Array<Product> }>((resolve) =>
    setTimeout(() => {
      // Se vuelve a sanitizar en el límite con la API: cuando esto se
      // conecte a un backend real, este es el punto donde el término de
      // búsqueda viajaría en la petición (query param), así que debe
      // quedar validado sin importar quién invoque a fetchProducts.
      const sanitizedSearch = sanitizeSearchInput(search);
      const fixedSearch = sanitizedSearch ? sanitizedSearch.toLowerCase() : "";

      return resolve({
        products: fixedSearch
          ? MOCK_PRODUCTS.filter(
              (item) =>
                item.title.toLowerCase().includes(fixedSearch) &&
                (filter ? filter === item.category : true),
            )
          : (filter &&
              MOCK_PRODUCTS.filter((item) =>
                filter ? filter === item.category : true,
              )) ||
            MOCK_PRODUCTS,
      });
    }, 1000),
  );
}
