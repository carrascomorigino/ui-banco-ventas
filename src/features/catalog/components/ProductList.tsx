import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../api/productsApi";
import { useAppSelector } from "../../../app/store";
import useCart from "../../cart/hooks/useCart";

export function ProductList() {
  const filter = useAppSelector((state) => state.productSearch.category);
  const search = useAppSelector((state) => state.productSearch.title);
  const { addToCart } = useCart();

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
        <li
          key={product.id}
          className="flex items-center gap-4 rounded-lg bg-gray-800 p-4 transition hover:bg-gray-700"
        >
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
            {product.image && (
              <img
                src={product.image}
                alt={product.title}
                className="h-6 w-6 object-contain"
              />
            )}
          </div>

          <div className="flex flex-col">
            <h3 className="text-sm font-medium text-gray-100">
              {product.title}
            </h3>
            {product.price !== undefined && (
              <p className="text-sm text-gray-400">S/ {product.price}</p>
            )}
            <button
              onClick={addToCart(product)}
              className="mt-2 w-28 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500"
            >
              Agregar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
