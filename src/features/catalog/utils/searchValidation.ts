/**
 * Validación/sanitización del término de búsqueda de productos.
 *
 * Sigue las recomendaciones de OWASP (ASVS V5 - Validation, Sanitization
 * and Encoding / Input Validation Cheat Sheet) para un campo de texto
 * libre que:
 *  - No debe permitir payloads de XSS (etiquetas, atributos de evento).
 *  - No debe permitir meta-caracteres típicos de inyección
 *    (SQL/NoSQL/command injection): comillas, punto y coma, backticks,
 *    paréntesis, etc.
 *  - Debe tener una longitud máxima para evitar abuso/DoS.
 *  - Debe normalizarse (trim) antes de usarse como criterio de búsqueda.
 *
 * Esta validación ocurre en el cliente como primera línea de defensa y
 * para dar una mejor UX, pero NO reemplaza la validación que debe
 * hacerse en el backend (que hoy es un mock) cuando la búsqueda viaje
 * a una API real: ahí también se debe validar/parametrizar la consulta.
 */

// Longitud máxima razonable para un término de búsqueda de productos.
export const SEARCH_MAX_LENGTH = 100;

// Caracteres de control (incluye el byte nulo) que nunca deberían llegar
// a un campo de texto.
// eslint-disable-next-line no-control-regex
const CONTROL_CHARACTERS_REGEX = /[\x00-\x1F\x7F]/g;

// Lista blanca: letras (incluye tildes y ñ), números, espacios y
// puntuación básica. Todo lo demás se descarta, incluyendo <, >, ", ',
// ;, `, (, ), {, }, \, /, etc., que son los caracteres que habilitan
// XSS e inyección SQL/NoSQL.
const DISALLOWED_CHARACTERS_REGEX = /[^\p{L}\p{N}\s.,-]/gu;

export function sanitizeSearchInput(rawValue: unknown): string {
  if (typeof rawValue !== "string") {
    return "";
  }

  const withoutControlChars = rawValue.replace(CONTROL_CHARACTERS_REGEX, "");
  const withoutForbiddenChars = withoutControlChars.replace(
    DISALLOWED_CHARACTERS_REGEX,
    "",
  );

  return withoutForbiddenChars.trim().slice(0, SEARCH_MAX_LENGTH);
}
