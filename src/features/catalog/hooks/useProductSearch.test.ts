import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import useProductSearch from "./useProductSearch";
import { useAppDispatch } from "../../../app/store";
import { updateTitle } from "../slice/productSearchSlice";

vi.mock("../../../app/store", () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock("../slice/productSearchSlice", () => ({
  updateTitle: vi.fn((value: string) => ({
    type: "productSearch/update",
    payload: value,
  })),
}));

describe("useProductSearch", () => {
  const dispatchMock = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    dispatchMock.mockClear();
    vi.mocked(useAppDispatch).mockReturnValue(dispatchMock);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("no despacha inmediatamente al llamar onSearch", () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.onSearch({
        currentTarget: { value: "laptop" },
      } as React.InputEvent<HTMLInputElement>);
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it("despacha update con el valor tras 500ms (debounce)", () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.onSearch({
        currentTarget: { value: "laptop" },
      } as React.InputEvent<HTMLInputElement>);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(updateTitle).toHaveBeenCalledWith("laptop");
    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(updateTitle("laptop"));
  });

  it("solo despacha el último valor si se llama varias veces dentro de los 500ms", () => {
    const { result } = renderHook(() => useProductSearch());

    act(() => {
      result.current.onSearch({
        currentTarget: { value: "a" },
      } as React.InputEvent<HTMLInputElement>);
      vi.advanceTimersByTime(200);

      result.current.onSearch({
        currentTarget: { value: "ab" },
      } as React.InputEvent<HTMLInputElement>);
      vi.advanceTimersByTime(200);

      result.current.onSearch({
        currentTarget: { value: "abc" },
      } as React.InputEvent<HTMLInputElement>);
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(updateTitle("abc"));
  });
});
