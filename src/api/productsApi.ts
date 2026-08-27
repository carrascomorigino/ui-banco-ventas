import type { Product } from "../features/catalog/types/product.types";
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
      const fixedSearch = search ? search.trim().toLowerCase() : "";

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
