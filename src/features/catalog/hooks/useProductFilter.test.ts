import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useProductFilter from "./useProductFilter";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { updateCategory } from "../slice/productSearchSlice";

vi.mock("../../../app/store", () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock("../slice/productSearchSlice", () => ({
  updateCategory: vi.fn((value: string) => ({
    type: "productSearch/updateCategory",
    payload: value,
  })),
}));

describe("useProductFilter", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    dispatchMock.mockClear();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
    vi.mocked(useAppSelector).mockImplementation((selector) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      selector({ productSearch: { category: "Crédito" } } as any),
    );
  });

  it("devuelve la categoría actual desde el estado", () => {
    const { result } = renderHook(() => useProductFilter());

    expect(result.current.category).toBe("Crédito");
  });

  it("despacha updateCategory con el valor seleccionado", () => {
    const { result } = renderHook(() => useProductFilter());

    act(() => {
      result.current.onCategoryChange({
        target: { value: "Tarjeta" },
      } as React.ChangeEvent<HTMLSelectElement>);
    });

    expect(updateCategory).toHaveBeenCalledWith("Tarjeta");
    expect(dispatchMock).toHaveBeenCalledWith(updateCategory("Tarjeta"));
  });
});
