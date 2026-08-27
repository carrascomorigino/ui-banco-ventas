import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useCart from "./useCart";
import { useAppDispatch } from "../../../app/store";
import { add, decrement, increment, remove } from "../slice/cartSlice";
import type { Product } from "../../catalog/types/product.types";

vi.mock("../../../app/store", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("../slice/cartSlice", () => ({
  add: vi.fn((product: Product) => ({ type: "cart/add", payload: product })),
  increment: vi.fn((id: number) => ({ type: "cart/increment", payload: id })),
  decrement: vi.fn((id: number) => ({ type: "cart/decrement", payload: id })),
  remove: vi.fn((id: number) => ({ type: "cart/remove", payload: id })),
}));

const product: Product = {
  id: 1,
  title: "Producto de prueba",
  price: 100,
} as Product;

describe("useCart", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  it("addToCart devuelve una función y no despacha hasta que se invoca", () => {
    const { result } = renderHook(() => useCart());

    const handler = result.current.addToCart(product);

    expect(typeof handler).toBe("function");
    expect(dispatchMock).not.toHaveBeenCalled();

    handler();

    expect(add).toHaveBeenCalledWith(product);
    expect(dispatchMock).toHaveBeenCalledWith(add(product));
  });

  it("incrementItem despacha increment con el id al invocarse", () => {
    const { result } = renderHook(() => useCart());

    result.current.incrementItem(1)();

    expect(increment).toHaveBeenCalledWith(1);
    expect(dispatchMock).toHaveBeenCalledWith(increment(1));
  });

  it("decrementItem despacha decrement con el id al invocarse", () => {
    const { result } = renderHook(() => useCart());

    result.current.decrementItem(1)();

    expect(decrement).toHaveBeenCalledWith(1);
    expect(dispatchMock).toHaveBeenCalledWith(decrement(1));
  });

  it("removeFromCart despacha remove con el id al invocarse", () => {
    const { result } = renderHook(() => useCart());

    result.current.removeFromCart(1)();

    expect(remove).toHaveBeenCalledWith(1);
    expect(dispatchMock).toHaveBeenCalledWith(remove(1));
  });
});
