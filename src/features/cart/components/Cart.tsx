import { Activity } from "react";
import useCart from "../hooks/useCart";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import {
  closeCart,
  selectCount,
  selectedItems,
  selectTotal,
} from "../slice/cartSlice";

export function Cart() {
  const dispatch = useAppDispatch();
  const { decrementItem, incrementItem, removeFromCart } = useCart();
  const [isOpen, items, totalItems, totalPrice] = useAppSelector((state) => [
    state.cart.isOpen,
    selectedItems(state),
    selectCount(state),
    selectTotal(state),
  ]);

  const hideCart = () => {
    dispatch(closeCart());
  };

  return (  
    <Activity mode={isOpen ? "visible" : "hidden"}>
      <div
        aria-hidden="true"
        onClick={hideCart}
        className="fixed inset-0 z-40 bg-black/50"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        className={`fixed left-0 top-0 z-50 flex h-full w-80 flex-col bg-gray-900 shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-800 p-4">
          <h2 id="cart-heading" className="text-sm font-semibold text-gray-100">
            Carrito ({totalItems})
          </h2>
          <button
            onClick={hideCart}
            className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-800 hover:text-gray-100"
            aria-label="Cerrar carrito"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="p-4 text-sm text-gray-400">
            Tu carrito está vacío.
          </div>
        ) : (
          <>
            <ul className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-lg bg-gray-800 p-3"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-100">
                      {item.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      S/ {item.price} c/u
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={decrementItem(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-gray-100 transition hover:bg-gray-600"
                      aria-label="Disminuir cantidad"
                    >
                      −
                    </button>
                    <span
                      aria-live="polite"
                      className="w-4 text-center text-sm text-gray-100"
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={incrementItem(item.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-700 text-gray-100 transition hover:bg-gray-600"
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                    <button
                      onClick={removeFromCart(item.id)}
                      className="ml-2 text-xs text-red-400 transition hover:text-red-300"
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-gray-800 p-4">
              <span className="text-sm font-medium text-gray-100">Total</span>
              <span className="text-sm font-semibold text-gray-100">
                S/ {totalPrice}
              </span>
            </div>
          </>
        )}
      </aside>
    </Activity>
  );
}
