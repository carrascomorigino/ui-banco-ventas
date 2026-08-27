import { describe, expect, it } from "vitest";
import reducer, { updateCategory, updateTitle } from "./productSearchSlice";
import type { ProductSearchState } from "./productSearchSlice";

describe("productSearchSlice reducer", () => {
  it("updateTitle actualiza title sin tocar category", () => {
    const state: ProductSearchState = { category: "Tarjeta", title: "" };

    const next = reducer(state, updateTitle("laptop"));

    expect(next.title).toBe("laptop");
    expect(next.category).toBe("Tarjeta");
  });

  it("updateCategory actualiza category sin tocar title", () => {
    const state: ProductSearchState = { category: "", title: "laptop" };

    const next = reducer(state, updateCategory("Crédito"));

    expect(next.category).toBe("Crédito");
    expect(next.title).toBe("laptop");
  });

  it("updateTitle con string vacío limpia el título", () => {
    const state: ProductSearchState = { category: "", title: "laptop" };

    const next = reducer(state, updateTitle(""));

    expect(next.title).toBe("");
  });
});
