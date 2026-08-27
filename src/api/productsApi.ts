import type { Product } from "../features/catalog/types/product.types";
import MOCK_PRODUCTS from "./mockProducts";

export async function fetchProducts({ search }: { search: string }) {
  return await new Promise<{ products: Array<Product> }>((resolve) =>
    setTimeout(() => {
      const fixedSearch = search.trim().toLowerCase();

      return resolve({
        products:
          fixedSearch !== ""
            ? MOCK_PRODUCTS.filter((item) =>
                item.title.toLowerCase().startsWith(fixedSearch),
              )
            : MOCK_PRODUCTS,
      });
    }, 1000),
  );
}
