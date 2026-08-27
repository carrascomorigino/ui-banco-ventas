import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CartCounter } from "./CartCounter";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { openCart } from "../slice/cartSlice";

vi.mock("../../../app/store", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../slice/cartSlice", () => ({
  openCart: vi.fn(() => ({ type: "cart/openCart" })),
  selectCount: vi.fn(),
}));

function mockCartState({ isOpen = false, totalItems = 0 } = {}) {
  vi.mocked(useAppSelector)
    .mockReturnValueOnce(isOpen)
    .mockReturnValueOnce(totalItems);
}

describe("CartCounter", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  it("renderiza el botón con su aria-label incluyendo la cantidad", () => {
    mockCartState({ totalItems: 3 });

    render(<CartCounter />);

    expect(
      screen.getByRole("button", { name: "Ver carrito, 3 productos" }),
    ).toBeInTheDocument();
  });

  it("refleja isOpen en aria-expanded", () => {
    mockCartState({ isOpen: true, totalItems: 3 });

    render(<CartCounter />);

    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("no muestra el badge cuando no hay productos", () => {
    mockCartState({ totalItems: 0 });

    render(<CartCounter />);

    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });

  it("muestra el badge con la cantidad cuando hay productos", () => {
    mockCartState({ totalItems: 5 });

    render(<CartCounter />);

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("despacha openCart al hacer click", () => {
    mockCartState({ totalItems: 2 });

    render(<CartCounter />);
    fireEvent.click(screen.getByRole("button"));

    expect(dispatchMock).toHaveBeenCalledWith(openCart());
  });
});
