import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Cart } from "./Cart";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { closeCart } from "../slice/cartSlice";
import useCart from "../hooks/useCart";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    Activity: ({
      children,
      mode,
    }: {
      children: React.ReactNode;
      mode: "visible" | "hidden";
    }) => (mode === "visible" ? children : null),
  };
});

vi.mock("../../../app/store", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../slice/cartSlice", () => ({
  closeCart: vi.fn(() => ({ type: "cart/closeCart" })),
  selectCount: vi.fn(),
  selectedItems: vi.fn(),
  selectTotal: vi.fn(),
}));

vi.mock("../hooks/useCart");

const items = [
  { id: 1, title: "Laptop", price: 3500, quantity: 2 },
  { id: 2, title: "Mouse", price: 50, quantity: 1 },
];

function mockCartState({
  isOpen = true,
  cartItems = items,
  totalItems = 3,
  totalPrice = 7050,
} = {}) {
  vi.mocked(useAppSelector).mockReturnValue([
    isOpen,
    cartItems,
    totalItems,
    totalPrice,
  ]);
}

describe("Cart", () => {
  const dispatchMock = vi.fn();
  const decrementHandler = vi.fn();
  const incrementHandler = vi.fn();
  const removeHandler = vi.fn();
  const decrementItemMock = vi.fn(() => decrementHandler);
  const incrementItemMock = vi.fn(() => incrementHandler);
  const removeFromCartMock = vi.fn(() => removeHandler);

  beforeEach(() => {
    dispatchMock.mockClear();
    decrementHandler.mockClear();
    incrementHandler.mockClear();
    removeHandler.mockClear();
    decrementItemMock.mockClear();
    incrementItemMock.mockClear();
    removeFromCartMock.mockClear();

    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
    vi.mocked(useCart).mockReturnValue({
      addToCart: vi.fn(),
      decrementItem: decrementItemMock,
      incrementItem: incrementItemMock,
      removeFromCart: removeFromCartMock,
    });
  });

  it("no renderiza nada cuando isOpen es false", () => {
    mockCartState({ isOpen: false });

    render(<Cart />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("muestra el mensaje de carrito vacío", () => {
    mockCartState({ cartItems: [], totalItems: 0, totalPrice: 0 });

    render(<Cart />);

    expect(
      screen.getByRole("dialog", { name: "Carrito (0)" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Tu carrito está vacío.")).toBeInTheDocument();
  });

  it("renderiza los items, cantidades y el total", () => {
    mockCartState();

    render(<Cart />);

    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("S/ 3500 c/u")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("S/ 7050")).toBeInTheDocument();
  });

  it("cierra el carrito al hacer click en el backdrop", () => {
    mockCartState();

    const { container } = render(<Cart />);
    const backdrop = container.querySelector('[aria-hidden="true"]');

    fireEvent.click(backdrop as Element);

    expect(dispatchMock).toHaveBeenCalledWith(closeCart());
  });

  it("cierra el carrito al hacer click en el botón de cerrar", () => {
    mockCartState();

    render(<Cart />);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar carrito" }));

    expect(dispatchMock).toHaveBeenCalledWith(closeCart());
  });

  it("incrementa, decrementa y quita un producto al hacer click en sus botones", () => {
    mockCartState();

    render(<Cart />);

    fireEvent.click(
      screen.getAllByRole("button", { name: "Aumentar cantidad" })[0],
    );
    expect(incrementItemMock).toHaveBeenCalledWith(1);
    expect(incrementHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(
      screen.getAllByRole("button", { name: "Disminuir cantidad" })[0],
    );
    expect(decrementItemMock).toHaveBeenCalledWith(1);
    expect(decrementHandler).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getAllByRole("button", { name: "Quitar" })[0]);
    expect(removeFromCartMock).toHaveBeenCalledWith(1);
    expect(removeHandler).toHaveBeenCalledTimes(1);
  });
});
