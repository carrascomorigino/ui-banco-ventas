import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fetchProducts } from "./productsApi";

vi.mock("./mockProducts", () => ({
  default: [
    { id: 1, title: "Laptop Gamer", price: 3500, category: "Tecnología" },
    { id: 2, title: "Mouse inalámbrico", price: 50, category: "Tecnología" },
    { id: 3, title: "Silla de oficina", price: 400, category: "Hogar" },
  ],
}));

describe("fetchProducts", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  async function resolveFetch(filter: string, search: string) {
    const promise = fetchProducts({ filter, search });
    vi.advanceTimersByTime(1000);
    return promise;
  }

  it("devuelve todos los productos sin filtro ni búsqueda", async () => {
    const { products } = await resolveFetch("", "");

    expect(products).toHaveLength(3);
  });

  it("filtra por categoría cuando hay filter pero no search", async () => {
    const { products } = await resolveFetch("Tecnología", "");

    expect(products.map((p) => p.title)).toEqual([
      "Laptop Gamer",
      "Mouse inalámbrico",
    ]);
  });

  it("filtra por título cuando hay search pero no filter", async () => {
    const { products } = await resolveFetch("", "mouse");

    expect(products.map((p) => p.title)).toEqual(["Mouse inalámbrico"]);
  });

  it("aplica search y filter juntos", async () => {
    const { products } = await resolveFetch("Hogar", "laptop");

    expect(products).toHaveLength(0);
  });

  it("el search no distingue mayúsculas ni espacios extra", async () => {
    const { products } = await resolveFetch("", "  LAPTOP  ");

    expect(products.map((p) => p.title)).toEqual(["Laptop Gamer"]);
  });

  it("devuelve un array vacío si nada coincide con el filtro", async () => {
    const { products } = await resolveFetch("Ropa", "");

    expect(products).toEqual([]);
  });
});
