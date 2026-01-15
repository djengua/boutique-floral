# Estructura del código

Este proyecto está construido con Next.js (App Router) y una capa ligera de estado global para el carrito.
A continuación se describe la organización principal del repositorio.

## Raíz del repositorio

- `src/`: Código fuente principal.
- `public/`: Recursos estáticos (iconos, imágenes, etc.).
- `package.json`: Dependencias y scripts.
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`: Configuración de build, TypeScript y linting.

## `src/app`

- `layout.tsx`: Layout raíz, metadatos y estilos globales.
- `page.tsx`: Ensambla la página principal con las secciones de la tienda.
- `globals.css`: Estilos globales del proyecto.

## `src/components`

- Componentes de UI y secciones de la landing:
  - `Header.tsx`: Navegación, marca y acceso al carrito.
  - `Hero.tsx`: Mensaje principal y llamada a la acción.
  - `Occasions.tsx`: Sección de colecciones/categorías destacadas.
  - `ProductGrid.tsx`: Catálogo con tarjetas de producto y variantes.
  - `HowItWorksBand.tsx`: Explicación del flujo de compra.
  - `Testimonials.tsx`: Reseñas de clientes.
  - `Footer.tsx`: Enlaces de soporte y cierre.
- `components/ui/`: Componentes atómicos reutilizables como `Button`, `Chip` y `Container`.

## `src/lib`

- Datos estáticos y utilidades:
  - `products.ts`: Listado de productos y lógica de precio por variante.
  - `occasions.ts`: Colecciones o categorías destacadas.

## `src/store`

- Estado global con Zustand:
  - `shopStore.ts`: Estado del carrito, selección de variantes y acciones.

---

Si necesitas ampliar el catálogo, puedes editar `src/lib/products.ts` y `src/lib/occasions.ts`.
Para modificar el flujo visual, revisa los componentes en `src/components`.
