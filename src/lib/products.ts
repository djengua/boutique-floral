/* =========================
   lib/products.ts
========================= */
import type { Product } from "@/store/shopStore";

export const products: Product[] = [
  {
    id: "set-essentials",
    name: "Set Essentials",
    basePrice: 690,
    description:
      "Combo versátil con básicos listos para envío rápido y variedad de usos.",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80",
    badge: "Más vendido",
    variants: ["S", "M", "L", "Premium"],
  },
  {
    id: "linea-minimal",
    name: "Línea Minimal",
    basePrice: 1190,
    description: "Diseño limpio con acabados neutros para marcas sobrias.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    badge: "Premium",
    variants: ["M", "L", "Premium"],
  },
  {
    id: "kit-lifestyle",
    name: "Kit Lifestyle",
    basePrice: 840,
    description:
      "Opciones para regalos corporativos o compras personales en tendencia.",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
    badge: "Nuevo",
    variants: ["S", "M", "L"],
  },
  {
    id: "coleccion-urbana",
    name: "Colección Urbana",
    basePrice: 980,
    description:
      "Colores atemporales y materiales resistentes para uso diario.",
    image:
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=1200&q=80",
    badge: "Favorito",
    variants: ["M", "L", "Premium"],
  },
];

export function priceFor(variant: string, basePrice: number) {
  // Ajuste simple; cámbialo a tu lógica real
  const mult: Record<string, number> = { S: 1, M: 1.15, L: 1.35, Premium: 1.7 };
  return Math.round(basePrice * (mult[variant] ?? 1));
}
