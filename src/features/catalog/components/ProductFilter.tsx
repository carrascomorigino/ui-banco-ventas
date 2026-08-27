import useProductFilter from "../hooks/useProductFilter";

const CATEGORIES = ["Cuenta", "Crédito", "Tarjeta"];

export function ProductFilter() {
  const { category, onCategoryChange } = useProductFilter();

  return (
    <select
      aria-label="Filtrar por categoría"
      value={category}
      onChange={onCategoryChange}
      className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-100 outline-none transition focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Todas las categorías</option>
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
