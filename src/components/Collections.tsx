/* =========================
   components/Collections.tsx
========================= */
"use client";

import { useEffect, useMemo, useState } from "react";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { listCollections } from "@/lib/api";
import {
  collectionFallbackCards,
  collectionShowcase,
  mapApiCollectionToCard,
  type CollectionCard,
} from "@/lib/collections";

type ApiStatus = "idle" | "loading" | "ready" | "fallback";

export default function Collections() {
  const [items, setItems] = useState<CollectionCard[]>(collectionFallbackCards);
  const [status, setStatus] = useState<ApiStatus>("idle");

  useEffect(() => {
    let active = true;

    const loadCollections = async () => {
      setStatus("loading");
      try {
        const response = await listCollections(
          { page: 1, page_size: 6, status: "active" },
          { cache: "no-store" }
        );
        if (!active) return;
        const mapped = response.data.map((collection, index) =>
          mapApiCollectionToCard(collection, index)
        );
        setItems(mapped.length > 0 ? mapped : collectionFallbackCards);
        setStatus("ready");
      } catch (error) {
        if (!active) return;
        setItems(collectionFallbackCards);
        setStatus("fallback");
      }
    };

    loadCollections();

    return () => {
      active = false;
    };
  }, []);

  const subtitle = useMemo(() => {
    if (status === "loading") {
      return "Cargando colecciones desde el API...";
    }
    if (status === "fallback") {
      return "Mostrando colecciones de ejemplo mientras el API responde.";
    }
    return "Explora líneas listas para vender: esenciales, temporada y favoritos del equipo.";
  }, [status]);

  return (
    <section id="colecciones" className="py-6">
      <Container>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-[Cormorant_Garamond] text-3xl font-semibold tracking-wide">
              Colecciones
            </h3>
            <p className="mt-1 max-w-[65ch] text-sm leading-6 text-[#6B6B6B]">
              {subtitle}
            </p>
          </div>
          <a href="#catalogo">
            <Button>Ver todo</Button>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((o) => (
            <a
              key={o.id}
              href="#catalogo"
              className="group relative min-h-[120px] overflow-hidden rounded-[14px] border border-[#EFE6DD] bg-white/70 transition hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(43,43,43,0.10)]"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${o.img})` }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/40" />
              <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between gap-2 text-white">
                <span className="text-sm font-extrabold tracking-wide">
                  {o.title}
                </span>
                <span className="rounded-full border border-white/35 bg-white/10 px-3 py-1 text-xs font-extrabold backdrop-blur">
                  {o.tag}
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
