# API REST (Golang) + Prometheus: Definición de entidades

Este documento describe **las entidades principales** del portal (productos, categorías y colecciones), sus campos sugeridos y los **endpoints REST** necesarios para administrar y consultar la información. El objetivo es que cualquier desarrollador pueda entender y modificar la API con facilidad.

> Nota: La API se plantea en Golang y expone métricas para Prometheus en `/metrics`.

---

## 1) Convenciones generales

- **Base URL** sugerida: `/api/v1`
- **Formato**: JSON (`Content-Type: application/json`)
- **IDs**: UUID o entero autoincremental (definir según base de datos)
- **Fechas**: `ISO-8601` en UTC (ej: `2025-03-15T12:34:56Z`)
- **Soft-delete** recomendado: `deleted_at` opcional
- **Paginación** (listados): `page`, `page_size`
- **Filtros**: por `status`, `category_id`, `collection_id`, etc.

### Métricas Prometheus

- **Endpoint**: `GET /metrics`
- Exponer métricas de latencia y conteo de requests (ej. `http_requests_total`, `http_request_duration_seconds`).

---

## 2) Entidades

### 2.1 Producto

Representa un ítem vendible en el portal.

**Campos sugeridos**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | string | Sí | Identificador del producto |
| sku | string | Sí | Código interno único |
| name | string | Sí | Nombre visible del producto |
| description | string | No | Descripción extendida |
| price | number | Sí | Precio actual |
| currency | string | Sí | Moneda (ej. `USD`, `COP`) |
| status | string | Sí | `active`, `inactive`, `draft` |
| category_id | string | Sí | Relación con categoría |
| collection_ids | array | No | Colecciones asociadas |
| images | array | No | URLs de imágenes |
| stock | integer | No | Inventario disponible |
| created_at | string | Sí | Fecha de creación |
| updated_at | string | Sí | Fecha de actualización |
| deleted_at | string | No | Fecha de borrado lógico |

**Relaciones**
- Pertenece a una **categoría**.
- Puede pertenecer a **0..n colecciones**.

---

### 2.2 Categoría

Agrupa productos por temática o tipo.

**Campos sugeridos**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | string | Sí | Identificador de categoría |
| name | string | Sí | Nombre visible |
| slug | string | Sí | URL-friendly (único) |
| description | string | No | Detalle descriptivo |
| status | string | Sí | `active`, `inactive` |
| created_at | string | Sí | Fecha de creación |
| updated_at | string | Sí | Fecha de actualización |
| deleted_at | string | No | Fecha de borrado lógico |

**Relaciones**
- Contiene **0..n productos**.

---

### 2.3 Colección

Agrupa productos con fines promocionales o curaduría (ej. "Día de la madre").

**Campos sugeridos**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| id | string | Sí | Identificador de colección |
| name | string | Sí | Nombre visible |
| slug | string | Sí | URL-friendly (único) |
| description | string | No | Detalle descriptivo |
| status | string | Sí | `active`, `inactive` |
| start_date | string | No | Fecha inicio campaña |
| end_date | string | No | Fecha fin campaña |
| created_at | string | Sí | Fecha de creación |
| updated_at | string | Sí | Fecha de actualización |
| deleted_at | string | No | Fecha de borrado lógico |

**Relaciones**
- Contiene **0..n productos**.

---

## 3) Endpoints REST

> Prefijo común: `/api/v1`

### 3.1 Productos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/products` | Listar productos (paginado + filtros) |
| GET | `/products/{id}` | Obtener producto por ID |
| POST | `/products` | Crear producto |
| PUT | `/products/{id}` | Reemplazar producto |
| PATCH | `/products/{id}` | Actualizar parcialmente |
| DELETE | `/products/{id}` | Borrado lógico |

**Filtros sugeridos**: `status`, `category_id`, `collection_id`, `min_price`, `max_price`, `q` (búsqueda por nombre/sku)

---

### 3.2 Categorías

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/categories` | Listar categorías |
| GET | `/categories/{id}` | Obtener categoría por ID |
| POST | `/categories` | Crear categoría |
| PUT | `/categories/{id}` | Reemplazar categoría |
| PATCH | `/categories/{id}` | Actualizar parcialmente |
| DELETE | `/categories/{id}` | Borrado lógico |

---

### 3.3 Colecciones

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/collections` | Listar colecciones |
| GET | `/collections/{id}` | Obtener colección por ID |
| POST | `/collections` | Crear colección |
| PUT | `/collections/{id}` | Reemplazar colección |
| PATCH | `/collections/{id}` | Actualizar parcialmente |
| DELETE | `/collections/{id}` | Borrado lógico |

---

## 4) Ejemplos de respuestas

### Producto (GET /products/{id})

```json
{
  "id": "prod_123",
  "sku": "ROS-001",
  "name": "Ramo de rosas rojas",
  "description": "Ramo premium de 24 rosas rojas.",
  "price": 120.0,
  "currency": "USD",
  "status": "active",
  "category_id": "cat_rosas",
  "collection_ids": ["col_san_valentin"],
  "images": [
    "https://cdn.example.com/products/rosas-1.jpg",
    "https://cdn.example.com/products/rosas-2.jpg"
  ],
  "stock": 15,
  "created_at": "2025-03-15T12:34:56Z",
  "updated_at": "2025-03-16T09:12:33Z"
}
```

---

## 5) Consideraciones adicionales

- **Validaciones**: SKU único, precio > 0, slug único.
- **Seguridad**: autenticación y autorización en endpoints de escritura.
- **Observabilidad**: métricas Prometheus + logs estructurados.
- **Versionado**: mantener `/api/v1` para cambios compatibles.

---

## 6) Checklist para futuros cambios

- [ ] Actualizar definición de entidad
- [ ] Ajustar endpoint y ejemplos
- [ ] Agregar o modificar validaciones
- [ ] Revisar métricas y logging asociados

