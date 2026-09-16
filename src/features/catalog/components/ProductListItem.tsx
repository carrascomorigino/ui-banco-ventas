import { useAppSelector } from "../../../app/store";
import { QuantityStepper } from "../../cart/components/QuantityStepper";
import useCart from "../../cart/hooks/useCart";
import { selectQuantityById } from "../../cart/slice/cartSlice";
import type { Product } from "../types/product.types";

type ProductListItemProps = {
  product: Product;
};

export function ProductListItem({ product }: ProductListItemProps) {
  const { addToCart, decrementItem, incrementItem } = useCart();
  const quantity = useAppSelector(selectQuantityById(product.id));

  return (
    <li className="flex items-center gap-4 rounded-lg bg-gray-800 p-4 transition hover:bg-gray-700">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gray-700">
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="h-6 w-6 object-contain"
          />
        )}
      </div>

      <div className="flex flex-col w-full text-left">
        <h3 className="text-sm font-medium text-gray-100">{product.title}</h3>
        {product.price !== undefined && (
          <p className="text-sm text-gray-400">S/ {product.price}</p>
        )}
      </div>

      <div className="flex">
        <div className="mt-2">
          {quantity === 0 ? (
            <button
              onClick={addToCart(product)}
              className="w-28 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500"
            >
              Agregar
            </button>
          ) : (
            <QuantityStepper
              quantity={quantity}
              onIncrement={incrementItem(product.id)}
              onDecrement={decrementItem(product.id)}
            />
          )}
        </div>
      </div>
    </li>
  );
}
