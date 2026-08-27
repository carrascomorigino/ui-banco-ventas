import { useAppDispatch, useAppSelector } from "../../../app/store";
import { openCart, selectCount } from "../slice/cartSlice";

export function CartCounter() {
  const isOpen = useAppSelector((state) => state.cart.isOpen);
  const totalItems = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  const showCart = () => {
    dispatch(openCart());
  };

  return (
    <button
      onClick={showCart}
      className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-100 transition hover:bg-gray-700"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-label={`Ver carrito, ${totalItems} productos`}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.972-4.712 2.545-7.223.324-1.415-.784-2.774-2.235-2.774H5.106M7.5 14.25 5.106 5.272M6 18.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm12 0a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Z"
        />
      </svg>

      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">
          {totalItems}
        </span>
      )}
    </button>
  );
}
