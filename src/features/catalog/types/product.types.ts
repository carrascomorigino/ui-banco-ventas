import type { InputEventHandler } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
};

export type UseProductSearch = {
  onSearch: InputEventHandler<HTMLInputElement>;
};
