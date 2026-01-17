/* =========================
   components/admin/CollectionForm.tsx
========================= */
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { createCollection } from "@/lib/api";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

export default function CollectionForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const helperSlug = useMemo(() => slugify(name), [name]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("El nombre de la colección es obligatorio.");
      return;
    }

    const finalSlug = slug.trim() || helperSlug;

    if (!finalSlug) {
      setError("El slug es obligatorio.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createCollection({
        name: name.trim(),
        slug: finalSlug,
        description,
        status: "active",
      });
      setSuccess("Colección creada correctamente.");
      setName("");
      setSlug("");
      setDescription("");
      router.push("/admin/collections");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No se pudo crear la colección."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="collection-name"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
        >
          Nombre
        </label>
        <input
          id="collection-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. Edición verano"
          className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
        />
        <p className="mt-2 text-xs text-[#6B6B6B]">
          Recomendado: usa un nombre corto y memorable.
        </p>
      </div>

      <div>
        <label
          htmlFor="collection-description"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
        >
          Descripción
        </label>
        <input
          id="collection-description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder={"ej. Colección para San Valentin"}
          className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
        />
        {/* <p className="mt-2 text-xs text-[#6B6B6B]">
          {helperSlug
            ? `Sugerencia automática: ${helperSlug}`
            : "Usa minúsculas y guiones para separar palabras."}
        </p> */}
      </div>
      <div>
        <label
          htmlFor="collection-slug"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]"
        >
          Slug
        </label>
        <input
          id="collection-slug"
          name="slug"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder={helperSlug || "ej.-edicion-verano"}
          className="mt-2 w-full rounded-2xl border border-[#EFE6DD] bg-white/90 px-4 py-3 text-sm text-[#2B2B2B] shadow-[0_10px_30px_rgba(43,43,43,0.08)] outline-none focus:border-[#2B2B2B]"
        />
        <p className="mt-2 text-xs text-[#6B6B6B]">
          {helperSlug
            ? `Sugerencia automática: ${helperSlug}`
            : "Usa minúsculas y guiones para separar palabras."}
        </p>
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
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Crear colección"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/collections")}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
