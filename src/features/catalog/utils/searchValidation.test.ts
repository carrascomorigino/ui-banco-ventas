import { describe, expect, it } from "vitest";
import { SEARCH_MAX_LENGTH, sanitizeSearchInput } from "./searchValidation";

describe("sanitizeSearchInput", () => {
  it("deja pasar texto normal sin cambios", () => {
    expect(sanitizeSearchInput("laptop")).toBe("laptop");
  });

  it("conserva tildes, ñ y números", () => {
    expect(sanitizeSearchInput("Crédito Vehicular 4x4 ñandú")).toBe(
      "Crédito Vehicular 4x4 ñandú",
    );
  });

  it("recorta espacios al inicio y al final", () => {
    expect(sanitizeSearchInput("  laptop  ")).toBe("laptop");
  });

  it("elimina etiquetas y caracteres usados en XSS", () => {
    expect(sanitizeSearchInput("<script>alert(1)</script>")).toBe(
      "scriptalert1script",
    );
  });

  it("elimina comillas, punto y coma y backticks usados en inyección SQL/NoSQL", () => {
    expect(sanitizeSearchInput("Robert'); DROP TABLE Products;--")).toBe(
      "Robert DROP TABLE Products--",
    );
  });

  it("elimina caracteres de control y bytes nulos", () => {
    expect(sanitizeSearchInput("abc\x00def\x1F")).toBe("abcdef");
  });

  it("trunca a la longitud máxima permitida", () => {
    const longValue = "a".repeat(SEARCH_MAX_LENGTH + 50);

    const result = sanitizeSearchInput(longValue);

    expect(result).toHaveLength(SEARCH_MAX_LENGTH);
  });

  it("devuelve un string vacío si el valor no es un string", () => {
    expect(sanitizeSearchInput(undefined)).toBe("");
    expect(sanitizeSearchInput(null)).toBe("");
    expect(sanitizeSearchInput(123)).toBe("");
  });
});
