import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ProductFilter } from "./ProductFilter";
import useProductFilter from "../hooks/useProductFilter";

vi.mock("../hooks/useProductFilter");

describe("ProductFilter", () => {
  const onCategoryChangeMock = vi.fn();

  beforeEach(() => {
    onCategoryChangeMock.mockClear();
    vi.mocked(useProductFilter).mockReturnValue({
      category: "",
      onCategoryChange: onCategoryChangeMock,
    });
  });

  it("renderiza el select con su aria-label", () => {
    render(<ProductFilter />);

    expect(
      screen.getByRole("combobox", { name: "Filtrar por categoría" }),
    ).toBeInTheDocument();
  });

  it("renderiza la opción por defecto y todas las categorías", () => {
    render(<ProductFilter />);

    expect(
      screen.getByRole("option", { name: "Todas las categorías" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Cuenta" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Crédito" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Tarjeta" })).toBeInTheDocument();
  });

  it("refleja la categoría actual del hook como valor seleccionado", () => {
    vi.mocked(useProductFilter).mockReturnValue({
      category: "Crédito",
      onCategoryChange: onCategoryChangeMock,
    });

    render(<ProductFilter />);

    expect(
      screen.getByRole("combobox", { name: "Filtrar por categoría" }),
    ).toHaveValue("Crédito");
  });

  it("llama a onCategoryChange al seleccionar una categoría distinta", () => {
    render(<ProductFilter />);

    fireEvent.change(
      screen.getByRole("combobox", { name: "Filtrar por categoría" }),
      {
        target: { value: "Tarjeta" },
      },
    );

    expect(onCategoryChangeMock).toHaveBeenCalledTimes(1);
  });
});
