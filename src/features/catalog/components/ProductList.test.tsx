import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest"; // <-- Añade esta línea
import { screen, waitFor } from "@testing-library/react";
import { ProductList } from "./ProductList";
import * as productsApi from "../../../api/productsApi";
import type { Product } from "../types/product.types";
import { renderWithProviders } from "../../../test-utils";

// Mock de la API
vi.mock("../../../api/productsApi", () => ({
  fetchProducts: vi.fn(),
}));

const mockFetchProducts = vi.mocked(productsApi.fetchProducts);

const mockData: { products: Product[] } = {
  products: [
    {
      id: 1,
      title: "Laptop Gamer",
      price: 1200,
      category: "Laptops",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Mouse Inalámbrico",
      price: 25,
      category: "Accesorios",
      image: "https://via.placeholder.com/150",
    },
  ],
};

describe("Product List", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe mostrar "Cargando..." mientras se realiza la petición', () => {
    // Retornamos una promesa pendiente para simular el estado de carga
    mockFetchProducts.mockReturnValue(new Promise(() => {}));

    renderWithProviders(<ProductList />);

    expect(screen.getByText("Cargando...")).toBeInTheDocument();
  });

  it("debe renderizar la lista de productos cuando la consulta es exitosa", async () => {
    mockFetchProducts.mockResolvedValue(mockData);

    renderWithProviders(<ProductList />);

    // Esperamos a que desaparezca el estado de carga y se renderice la lista
    await waitFor(() => {
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    });

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
  });
});
