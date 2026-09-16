import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../api/productsApi";
import { useAppSelector } from "../../../app/store";
import { ProductListItem } from "./ProductListItem";

export function ProductList() {
  const filter = useAppSelector((state) => state.productSearch.category);
  const search = useAppSelector((state) => state.productSearch.title);

  const { data, isFetching } = useQuery({
    queryKey: [filter, search],
    queryFn: async () =>
      await fetchProducts({ filter: filter, search: search }),
  });

  return isFetching ? (
    <div className="flex items-center justify-center py-16 text-sm text-gray-500">
      Cargando...
    </div>
  ) : (
    <ul className="list-none flex flex-col gap-3 p-4">
      {data?.products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ul>
  );
}
