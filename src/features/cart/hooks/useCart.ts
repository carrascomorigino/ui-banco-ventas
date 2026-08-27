import { useAppDispatch } from "../../../app/store";
import type { Product } from "../../catalog/types/product.types";
import { add, decrement, increment, remove } from "../slice/cartSlice";

function useCart() {
  const dispatch = useAppDispatch();

  function addToCart(product: Product) {
    return () => {
      dispatch(add(product));
    };
  }

  function decrementItem(id: number) {
    return () => {
      dispatch(decrement(id));
    };
  }

  function incrementItem(id: number) {
    return () => {
      dispatch(increment(id));
    };
  }

  function removeFromCart(id: number) {
    return () => {
      dispatch(remove(id));
    };
  }

  return { addToCart, decrementItem, incrementItem, removeFromCart };
}

export default useCart;
