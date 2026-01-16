/* =========================
   lib/collections.ts
========================= */
import type { ApiCollection } from "@/lib/api";

export type CollectionCard = {
  id: string;
  title: string;
  tag: string;
  img: string;
};

type CollectionShowcase = Omit<CollectionCard, "id"> & {
  slug?: string;
};

export const collectionShowcase: CollectionShowcase[] = [
  {
    title: "Novedades",
    tag: "Top",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=70",
    slug: "novedades",
  },
  {
    title: "Regalos",
    tag: "Popular",
    img: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=70",
    slug: "regalos",
  },
  {
    title: "Oficina",
    tag: "Nuevo",
    img: "https://images.unsplash.com/photo-1507209696998-3c532be9b2b5?auto=format&fit=crop&w=900&q=70",
    slug: "oficina",
  },
  {
    title: "Básicos",
    tag: "Clásico",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=70",
    slug: "basicos",
  },
  {
    title: "Temporada",
    tag: "Sereno",
    img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=70",
    slug: "temporada",
  },
  {
    title: "Personalizables",
    tag: "Sutil",
    img: "https://images.unsplash.com/photo-1519337265831-281ec6cc8514?auto=format&fit=crop&w=900&q=70",
    slug: "personalizables",
  },
];

export const collectionFallbackCards: CollectionCard[] = collectionShowcase.map(
  (collection, index) => ({
    id: collection.slug ?? `fallback-${index}`,
    title: collection.title,
    tag: collection.tag,
    img: collection.img,
  })
);

const normalize = (value?: string) => value?.trim().toLowerCase();

export const mapApiCollectionToCard = (
  apiCollection: ApiCollection,
  index: number
): CollectionCard => {
  const match = collectionShowcase.find(
    (collection) =>
      normalize(collection.slug) === normalize(apiCollection.slug) ||
      normalize(collection.title) === normalize(apiCollection.name)
  );
  const fallback = collectionShowcase[index % collectionShowcase.length];

  return {
    id: apiCollection.id,
    title: apiCollection.name,
    tag: match?.tag ?? fallback?.tag ?? "Nuevo",
    img: match?.img ?? fallback?.img ?? "",
  };
};
