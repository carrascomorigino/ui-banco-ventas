import { type InputEventHandler } from "react";
import debounce from "lodash.debounce";
import type { UseProductSearch } from "../types/product.types";
import { useAppDispatch } from "../../../app/store";
import { update } from "../slice/productSearchSlice";

function useProductSearch(): UseProductSearch {
  const dispatch = useAppDispatch();

  const debounceSearch = debounce(updateStore, 500);

  const onSearch: InputEventHandler<HTMLInputElement> = (ev) => {
    debounceSearch(ev.currentTarget.value);
  };

  function updateStore(value: string) {
    dispatch(update(value));
  }

  return { onSearch };
}

export default useProductSearch;
