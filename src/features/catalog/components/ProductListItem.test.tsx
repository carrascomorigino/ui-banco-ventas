import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductListItem } from "./ProductListItem";
import { useAppSelector } from "../../../app/store";
import useCart from "../../cart/hooks/useCart";
import type { Product } from "../types/product.types";

vi.mock("../../../app/store", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("../../cart/hooks/useCart");

const product: Product = {
  id: 1,
  title: "Laptop Gamer",
  price: 1200,
  category: "Laptops",
  image: "https://via.placeholder.com/150",
};

describe("ProductListItem", () => {
  const addToCartHandler = vi.fn();
  const incrementHandler = vi.fn();
  const decrementHandler = vi.fn();
  const addToCartMock = vi.fn(() => addToCartHandler);
  const incrementItemMock = vi.fn(() => incrementHandler);
  const decrementItemMock = vi.fn(() => decrementHandler);

  beforeEach(() => {
    addToCartHandler.mockClear();
    incrementHandler.mockClear();
    decrementHandler.mockClear();
    addToCartMock.mockClear();
    incrementItemMock.mockClear();
    decrementItemMock.mockClear();

    vi.mocked(useCart).mockReturnValue({
      addToCart: addToCartMock,
      decrementItem: decrementItemMock,
      incrementItem: incrementItemMock,
      removeFromCart: vi.fn(),
    });
  });

  it('muestra el botón "Agregar" cuando el producto no está en el carrito', () => {
    vi.mocked(useAppSelector).mockReturnValue(0);

    render(<ProductListItem product={product} />);

    expect(
      screen.getByRole("button", { name: "Agregar" }),
    ).toBeInTheDocument();
  });

  it('agrega el producto al carrito al hacer click en "Agregar"', () => {
    vi.mocked(useAppSelector).mockReturnValue(0);

    render(<ProductListItem product={product} />);
    fireEvent.click(screen.getByRole("button", { name: "Agregar" }));

    expect(addToCartMock).toHaveBeenCalledWith(product);
    expect(addToCartHandler).toHaveBeenCalledTimes(1);
  });

  it("muestra el stepper de cantidad cuando el producto ya está en el carrito", () => {
    vi.mocked(useAppSelector).mockReturnValue(2);

    render(<ProductListItem product={product} />);

    expect(
      screen.queryByRole("button", { name: "Agregar" }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("incrementa y decrementa la cantidad desde el stepper", () => {
    vi.mocked(useAppSelector).mockReturnValue(2);

    render(<ProductListItem product={product} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Aumentar cantidad" }),
    );
    expect(incrementItemMock).toHaveBeenCalledWith(1);
    expect(incrementHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(
      screen.getByRole("button", { name: "Disminuir cantidad" }),
    );
    expect(decrementItemMock).toHaveBeenCalledWith(1);
    expect(decrementHandler).toHaveBeenCalledTimes(1);
  });
});
