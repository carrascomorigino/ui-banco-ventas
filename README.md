# E-Commerce SPA with Shopping Cart

Aplicación SPA desarrollada con React + Vite para explorar un catálogo de productos y gestionar un carrito de compras interactivo con persistencia local.

## 🛠️ Tech Stack

- **Core:** React 19+, Vite
- **Estado Servidor:** React Query (TanStack Query v5)
- **Estado Local & Persistencia:** Redux Toolkit + LocalStorage API
- **Estilos:** Tailwind CSS
- **Testing:** Vitest + React Testing Library

---

## 📐 Decisiones Técnicas

- **Separación Catálogo / Carrito:**
  - El catálogo opera como una vista de lectura optimizada mediante **React Query**, aprovechando el almacenamiento en caché para evitar re-peticiones innecesarias.
  - El carrito gestiona sus operaciones de adición, incremento, decremento y eliminación dentro de un slice dedicado de **Redux Toolkit**.
- **Persistencia en LocalStorage:** El estado del carrito se sincroniza automáticamente con el `localStorage` del navegador. Al iniciar la aplicación, Redux rehidrata el estado inicial desde esta fuente para preservar la sesión del usuario.
- **Filtros Decoupled:** Los criterios de búsqueda y filtrado por categoría residen en el estado local de Redux, permitiendo reaccionar de forma fluida sin reiniciar las peticiones de React Query innecesariamente.

---

## 🔮 Oportunidades de Mejora

- **Stepper de cantidad reutilizable:** Actualmente `ProductList` solo ofrece un botón "Agregar" que no refleja si el producto ya está en el carrito ni su cantidad, mientras que `Cart` sí cuenta con controles de incremento/decremento. Una mejora natural sería extraer ese stepper (+/-) en un componente reutilizable y usarlo también en la lista de productos, para que el catálogo muestre en tiempo real la cantidad seleccionada de cada producto sin necesidad de abrir el carrito.

---

## 🚀 Instalación y Ejecución

### Requisitos previos

- Node.js (v18 o superior)
- npm / pnpm / yarn

### Pasos

1. Clonar el repositorio e instalar dependencias:

   ```bash
   git clone <url-del-repositorio>
   cd shopping-cart-spa
   npm install

   ```

2. Iniciar el servidor de desarrollo:

```bash
   npm run dev
```

La aplicación quedará disponible en `http://localhost:5173`.

3. Ejecutar los tests:

```bash
   npm run test
```

4. Generar el build de producción y previsualizarlo:

```bash
   npm run build
   npm run preview
```
