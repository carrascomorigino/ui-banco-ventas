import type { ChangeEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { updateCategory } from "../slice/productSearchSlice";

function useProductFilter() {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.productSearch.category);

  const onCategoryChange: ChangeEventHandler<HTMLSelectElement> = (ev) => {
    dispatch(updateCategory(ev.target.value));
  };

  return { category, onCategoryChange };
}

export default useProductFilter;
