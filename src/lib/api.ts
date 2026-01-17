/* =========================
   lib/api.ts
========================= */

export type ApiErrorResponse = {
  error: string;
  message: string;
  status: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  page_size: number;
  total: number;
};

export type ApiProduct = {
  id: string;
  sku: string;
  name: string;
  description?: string | null;
  price: number;
  currency: string;
  status: string;
  category_id: string;
  collection_ids?: string[];
  images?: string[];
  stock?: number | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type ApiCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
};

export type ApiCollection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: string;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api/v1";

type RequestOptions = RequestInit & { token?: string };

type QueryParams = Record<string, string | number | boolean | undefined | null>;

const buildQuery = (params?: QueryParams) => {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

const buildHeaders = (options?: RequestOptions) => {
  const headers = new Headers(options?.headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }
  if (options?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (options?.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }
  return headers;
};

async function fetchJson<T>(path: string, options?: RequestOptions) {
  const response = await fetch(path, {
    ...options,
    headers: buildHeaders(options),
  });

  if (!response.ok) {
    let payload: ApiErrorResponse | null = null;
    try {
      payload = (await response.json()) as ApiErrorResponse;
    } catch {
      payload = null;
    }

    const error = new Error(
      payload?.message ?? `Error ${response.status} al conectar con el API.`
    );
    throw error;
  }

  return (await response.json()) as T;
}

export const listProducts = async (
  params?: QueryParams,
  options?: RequestOptions
) => {
  const result = await fetchJson<ApiProduct[] | PaginatedResponse<ApiProduct>>(
    `${API_BASE_URL}/products${buildQuery(params)}`,
    options
  );

  if (Array.isArray(result)) {
    return {
      data: result,
      page: 1,
      page_size: result.length,
      total: result.length,
    } satisfies PaginatedResponse<ApiProduct>;
  }

  return result;
};

export const getProduct = (id: string, options?: RequestOptions) =>
  fetchJson<ApiProduct>(`${API_BASE_URL}/products/${id}`, options);

export const createProduct = (
  payload: Omit<ApiProduct, "id" | "created_at" | "updated_at" | "deleted_at">,
  options?: RequestOptions
) =>
  fetchJson<ApiProduct>(`${API_BASE_URL}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
    ...options,
  });

export const updateProduct = (
  id: string,
  payload: Partial<Omit<ApiProduct, "id">>,
  options?: RequestOptions
) =>
  fetchJson<ApiProduct>(`${API_BASE_URL}/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    ...options,
  });

export const deleteProduct = (id: string, options?: RequestOptions) =>
  fetchJson<{ ok: boolean }>(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    ...options,
  });

export const listCategories = async (
  params?: QueryParams,
  options?: RequestOptions
) => {
  const result = await fetchJson<
    ApiCategory[] | PaginatedResponse<ApiCategory>
  >(`${API_BASE_URL}/categories${buildQuery(params)}`, options);

  // Si el API regresa arreglo plano: [...]
  if (Array.isArray(result)) {
    return {
      data: result,
      page: 1,
      page_size: result.length,
      total: result.length,
    } satisfies PaginatedResponse<ApiCategory>;
  }

  // Si regresa paginado: { data, page, page_size, total }
  return result;
};

export const getCategory = (id: string, options?: RequestOptions) =>
  fetchJson<ApiCategory>(`${API_BASE_URL}/categories/${id}`, options);

export const createCategory = (
  payload: Omit<ApiCategory, "id">,
  options?: RequestOptions
) =>
  fetchJson<ApiCategory>(`${API_BASE_URL}/categories`, {
    method: "POST",
    body: JSON.stringify(payload),
    ...options,
  });

export const updateCategory = (
  id: string,
  payload: Partial<Omit<ApiCategory, "id">>,
  options?: RequestOptions
) =>
  fetchJson<ApiCategory>(`${API_BASE_URL}/categories/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    ...options,
  });

export const deleteCategory = (id: string, options?: RequestOptions) =>
  fetchJson<{ ok: boolean }>(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
    ...options,
  });

export const listCollections = async (
  params?: QueryParams,
  options?: RequestOptions
) => {
  const result = await fetchJson<
    ApiCollection[] | PaginatedResponse<ApiCollection>
  >(`${API_BASE_URL}/collections${buildQuery(params)}`, options);

  if (Array.isArray(result)) {
    return {
      data: result,
      page: 1,
      page_size: result.length,
      total: result.length,
    } satisfies PaginatedResponse<ApiCollection>;
  }

  return result;
};

export const getCollection = (id: string, options?: RequestOptions) =>
  fetchJson<ApiCollection>(`${API_BASE_URL}/collections/${id}`, options);

export const createCollection = (
  payload: Omit<ApiCollection, "id">,
  options?: RequestOptions
) =>
  fetchJson<ApiCollection>(`${API_BASE_URL}/collections`, {
    method: "POST",
    body: JSON.stringify(payload),
    ...options,
  });

export const updateCollection = (
  id: string,
  payload: Partial<Omit<ApiCollection, "id">>,
  options?: RequestOptions
) =>
  fetchJson<ApiCollection>(`${API_BASE_URL}/collections/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    ...options,
  });

export const deleteCollection = (id: string, options?: RequestOptions) =>
  fetchJson<{ ok: boolean }>(`${API_BASE_URL}/collections/${id}`, {
    method: "DELETE",
    ...options,
  });
