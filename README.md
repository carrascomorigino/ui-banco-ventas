# E-Commerce SPA with Shopping Cart

Aplicación SPA desarrollada con React + Vite para explorar un catálogo de productos y gestionar un carrito de compras interactivo con persistencia local.

## 🛠️ Tech Stack

* **Core:** React 19+, Vite
* **Estado Servidor:** React Query (TanStack Query v5)
* **Estado Local & Persistencia:** Redux Toolkit
* **Estilos:** Tailwind CSS
* **Testing:** Vitest + React Testing Library

---

## 📐 Decisiones Técnicas

* **Separación Catálogo / Carrito:**
  * El catálogo opera como una vista de lectura optimizada mediante **React Query**, aprovechando el almacenamiento en caché para evitar re-peticiones innecesarias.
  * **Filtros Decoupled:** Los criterios de búsqueda por title residen en el estado local de Redux, permitiendo reaccionar de forma fluida sin reiniciar las peticiones de React Query innecesariamente.

---

## 🚀 Instalación y Ejecución

### Requisitos previos
* Node.js (v18 o superior)
* npm / pnpm / yarn

### Pasos

1. Clonar el repositorio e instalar dependencias:
   ```bash
   git clone <url-del-repositorio>
   cd shopping-cart-spa
   npm install

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