import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductCatalog } from "./ProductCatalog";
import useProductSearch from "../hooks/useProductSearch";

vi.mock("../hooks/useProductSearch");

vi.mock("./ProductFilter", () => ({
  ProductFilter: () => <div data-testid="product-filter" />,
}));

vi.mock("./ProductList", () => ({
  ProductList: () => <div data-testid="product-list" />,
}));

vi.mock("../../cart/components/CartCounter", () => ({
  CartCounter: () => <div data-testid="cart-counter" />,
}));

vi.mock("../../cart/components/Cart", () => ({
  Cart: () => <div data-testid="cart" />,
}));

describe("ProductCatalog", () => {
  const onSearchMock = vi.fn();

  beforeEach(() => {
    onSearchMock.mockClear();
    vi.mocked(useProductSearch).mockReturnValue({ onSearch: onSearchMock });
  });

  it("renderiza el input de búsqueda con su aria-label", () => {
    render(<ProductCatalog />);

    expect(
      screen.getByRole("textbox", { name: "Buscar productos" }),
    ).toBeInTheDocument();
  });

  it("llama a onSearch al escribir en el input", () => {
    render(<ProductCatalog />);

    const input = screen.getByRole("textbox", { name: "Buscar productos" });
    fireEvent.input(input, { target: { value: "laptop" } });

    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  it("renderiza el filtro de categoría, el contador del carrito, la lista de productos y el carrito", () => {
    render(<ProductCatalog />);

    expect(screen.getByTestId("product-filter")).toBeInTheDocument();
    expect(screen.getByTestId("cart-counter")).toBeInTheDocument();
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    expect(screen.getByTestId("cart")).toBeInTheDocument();
  });
});
