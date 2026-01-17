/* =========================
   components/admin/ProductForm.tsx
========================= */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { createProduct, listCategories, type ApiCategory } from "@/lib/api";

const currencyOptions = ["MXN", "USD", "EUR"];
const statusOptions = ["active", "inactive"];

const parseImages = (value: string) =>
  value
    .split(/[\n,]+/)
    .map((entry) => entry.trim())
    .filter(Boolean);

export default function ProductForm() {
  const router = useRouter();
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("MXN");
  const [status, setStatus] = useState("active");
  const [categoryId, setCategoryId] = useState("");
  const [imagesText, setImagesText] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [categoriesError, setCategoriesError] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadCategories = async () => {
      setIsLoadingCategories(true);
      setCategoriesError("");
      try {
        const response = await listCategories(
          { page_size: 100 },
          { cache: "no-store" }
        );
        if (isActive) {
          setCategories(response.data);
          if (response.data.length > 0) {
            setCategoryId((prev) => prev || response.data[0].id);
          }
        }
      } catch (err) {
        if (isActive) {
          setCategoriesError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar las categorías."
          );
        }
      } finally {
        if (isActive) {
          setIsLoadingCategories(false);
        }
      }
    };

    loadCategories();

    return () => {
      isActive = false;
    };
  }, []);

  const imagesPreview = useMemo(() => parseImages(imagesText), [imagesText]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!sku.trim()) {
      setError("El SKU es obligatorio.");
      return;
    }

    if (!name.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    const parsedPrice = Number(price);
    if (!price || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setError("Ingresa un precio válido.");
      return;
    }

    if (!currency.trim()) {
      setError("Selecciona una moneda válida.");
      return;
    }

    if (!categoryId) {
      setError("Selecciona una categoría válida.");
      return;
    }

    const parsedStock = stock ? Number(stock) : 0;
    if (stock && (Number.isNaN(parsedStock) || parsedStock! < 0)) {
      setError("Ingresa un stock válido.");
      return;
    }

    setIsSubmitting(true);

    try {
      await createProduct({
        sku: sku.trim(),
        name: name.trim(),
        description: description.trim() ? description.trim() : undefined,
        price: parsedPrice,
        currency,
        status,
        category_id: categoryId,
        images: imagesPreview.length > 0 ? imagesPreview : undefined,
        stock: parsedStock,
      });
      setSuccess("Producto creado correctamente.");
      setSku("");
      setName("");
      setDescription("");
      setPrice("");
      setCurrency("MXN");
      setStatus("active");
      setImagesText("");
      setStock("");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo crear el producto."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="product-sku"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            SKU
          </label>
          <input
            id="product-sku"
            name="sku"
            value={sku}
            onChange={(event) => setSku(event.target.value)}
            placeholder="Ej. ROS-002"
            className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
          />
        </div>

        <div>
          <label
            htmlFor="product-name"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            Nombre
          </label>
          <input
            id="product-name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Ej. Conjunto de bebé 3T"
            className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="product-description"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
        >
          Descripción
        </label>
        <textarea
          id="product-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Ej. Conjunto para bebé de 3 años"
          rows={3}
          className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <label
            htmlFor="product-price"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            Precio
          </label>
          <input
            id="product-price"
            name="price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            placeholder="120.00"
            inputMode="decimal"
            className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
          />
        </div>

        <div>
          <label
            htmlFor="product-currency"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            Moneda
          </label>
          <select
            id="product-currency"
            name="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
          >
            {currencyOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="product-status"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            Estado
          </label>
          <select
            id="product-status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="product-category"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            Categoría
          </label>
          {isLoadingCategories ? (
            <div className="mt-2 rounded-2xl border border-[#EFE6DD] bg-[#FBF7F2] px-4 py-3 text-sm text-[#6B6B6B]">
              Cargando categorías...
            </div>
          ) : categoriesError ? (
            <div className="mt-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {categoriesError}
            </div>
          ) : categories.length === 0 ? (
            <div className="mt-2 rounded-2xl border border-[#EFE6DD] bg-[#FBF7F2] px-4 py-3 text-sm text-[#6B6B6B]">
              No hay categorías activas. Crea una antes de registrar productos.
            </div>
          ) : (
            <select
              id="product-category"
              name="category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}
          <p className="mt-2 text-xs text-[#6B6B6B]">
            El category_id debe pertenecer a una categoría existente.
          </p>
        </div>

        <div>
          <label
            htmlFor="product-stock"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
          >
            Stock
          </label>
          <input
            id="product-stock"
            name="stock"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            placeholder="1"
            inputMode="numeric"
            className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
          />
          <p className="mt-2 text-xs text-[#6B6B6B]">
            Opcional: deja en blanco si no aplica.
          </p>
        </div>
      </div>

      <div>
        <label
          htmlFor="product-images"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
        >
          Imágenes
        </label>
        <textarea
          id="product-images"
          name="images"
          value={imagesText}
          onChange={(event) => setImagesText(event.target.value)}
          placeholder="https://cdn.example.com/products/rosas-1.jpg"
          rows={3}
          className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
        />
        <p className="mt-2 text-xs text-[#6B6B6B]">
          Agrega una URL por línea o separa por comas.
        </p>
        {imagesPreview.length > 0 ? (
          <ul className="mt-3 space-y-2 text-xs text-[#6B6B6B]">
            {imagesPreview.map((url, index) => (
              <li key={`${url}-${index}`} className="truncate">
                {url}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="rounded-2xl border border-[#CBE6D5] bg-[#F0FBF4] px-4 py-3 text-sm text-[#2B2B2B]">
          {success}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting || categories.length === 0}
        >
          {isSubmitting ? "Guardando..." : "Crear producto"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/products")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
