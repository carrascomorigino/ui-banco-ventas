import { type InputEventHandler } from "react";
import debounce from "lodash.debounce";
import { useAppDispatch } from "../../../app/store";
import { updateTitle } from "../slice/productSearchSlice";
import { sanitizeSearchInput } from "../utils/searchValidation";

function useProductSearch() {
  const dispatch = useAppDispatch();

  const debounceSearch = debounce(updateStore, 500);

  const onSearch: InputEventHandler<HTMLInputElement> = (ev) => {
    debounceSearch(sanitizeSearchInput(ev.currentTarget.value));
  };

  function updateStore(value: string) {
    dispatch(updateTitle(value));
  }

  return { onSearch };
}

export default useProductSearch;
