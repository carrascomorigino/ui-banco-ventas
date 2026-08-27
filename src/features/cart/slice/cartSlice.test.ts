import { describe, expect, it } from "vitest";
import reducer, {
  add,
  decrement,
  increment,
  remove,
  openCart,
  closeCart,
  selectCount,
  selectedItems,
  selectTotal,
} from "./cartSlice";
import type { Product } from "../../catalog/types/product.types";

const product = { id: 1, title: "Laptop", price: 3500 } as Product;

function buildState(
  record: Record<
    number,
    { id: number; title: string; price: number; quantity: number }
  >,
  isOpen = false,
) {
  return { isOpen, record };
}

describe("cartSlice reducer", () => {
  it("agrega un producto nuevo con quantity 1", () => {
    const state = buildState({});

    const next = reducer(state, add(product));

    expect(next.record[1]).toEqual({
      id: 1,
      title: "Laptop",
      price: 3500,
      quantity: 1,
    });
  });

  it("incrementa la cantidad si el producto ya existe al agregar", () => {
    const state = buildState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 1 },
    });

    const next = reducer(state, add(product));

    expect(next.record[1].quantity).toBe(2);
  });

  it("increment aumenta la cantidad de un item existente", () => {
    const state = buildState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 1 },
    });

    const next = reducer(state, increment(1));

    expect(next.record[1].quantity).toBe(2);
  });

  it("decrement reduce la cantidad si es mayor a 1", () => {
    const state = buildState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 2 },
    });

    const next = reducer(state, decrement(1));

    expect(next.record[1].quantity).toBe(1);
  });

  it("decrement elimina el item cuando la cantidad llega a 0", () => {
    const state = buildState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 1 },
    });

    const next = reducer(state, decrement(1));

    expect(next.record[1]).toBeUndefined();
  });

  it("remove elimina el item sin importar la cantidad", () => {
    const state = buildState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 5 },
    });

    const next = reducer(state, remove(1));

    expect(next.record[1]).toBeUndefined();
  });

  it("openCart pone isOpen en true", () => {
    const next = reducer(buildState({}, false), openCart());
    expect(next.isOpen).toBe(true);
  });

  it("closeCart pone isOpen en false", () => {
    const next = reducer(buildState({}, true), closeCart());
    expect(next.isOpen).toBe(false);
  });
});

describe("cartSlice selectors", () => {
  function buildRootState(
    record: Record<
      number,
      { id: number; title: string; price: number; quantity: number }
    >,
  ) {
    return { cart: { isOpen: false, record } };
  }

  it("selectCount devuelve la cantidad de productos distintos", () => {
    const state = buildRootState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 2 },
      2: { id: 2, title: "Mouse", price: 50, quantity: 1 },
    });

    expect(selectCount(state)).toBe(2);
  });

  it("selectedItems devuelve los items como array", () => {
    const state = buildRootState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 2 },
    });

    expect(selectedItems(state)).toEqual([
      { id: 1, title: "Laptop", price: 3500, quantity: 2 },
    ]);
  });

  it("selectTotal suma price * quantity de todos los items", () => {
    const state = buildRootState({
      1: { id: 1, title: "Laptop", price: 3500, quantity: 2 },
      2: { id: 2, title: "Mouse", price: 50, quantity: 3 },
    });

    expect(selectTotal(state)).toBe(3500 * 2 + 50 * 3);
  });

  it("selectCount y selectTotal devuelven 0 cuando el carrito está vacío", () => {
    const state = buildRootState({});

    expect(selectCount(state)).toBe(0);
    expect(selectTotal(state)).toBe(0);
  });
});
