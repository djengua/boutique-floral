/* =========================
   lib/products.ts
========================= */
import type { Product } from "@/store/shopStore";

export const products: Product[] = [
  {
    id: "bosque-suave",
    name: "Bosque Suave",
    basePrice: 790,
    description:
      'Verdes naturales, blancos cremosos y textura botánica. Perfecto para "cualquier día".',
    image:
      "https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80",
    badge: "Más vendido",
    variants: ["S", "M", "L", "Premium"],
  },
  {
    id: "jardin-minimal",
    name: "Jardín Minimal",
    basePrice: 1290,
    description: "Composición limpia y elegante con follaje de temporada.",
    image:
      "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80",
    badge: "Premium",
    variants: ["M", "L", "Premium"],
  },
  {
    id: "aura-blanca",
    name: "Aura Blanca",
    basePrice: 890,
    description:
      "Blancos suaves + verdes salvia. Ideal para agradecimiento, hogar u oficina.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80",
    badge: "Nuevo",
    variants: ["S", "M", "L"],
  },
  {
    id: "verde-sereno",
    name: "Verde Sereno",
    basePrice: 990,
    description:
      "Tonos neutros, textura natural y diseño calmado. Para momentos que requieren sutileza.",
    image:
      "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?auto=format&fit=crop&w=1200&q=80",
    badge: "Sereno",
    variants: ["M", "L", "Premium"],
  },
];

export function priceFor(variant: string, basePrice: number) {
  // Ajuste simple; cámbialo a tu lógica real
  const mult: Record<string, number> = { S: 1, M: 1.15, L: 1.35, Premium: 1.7 };
  return Math.round(basePrice * (mult[variant] ?? 1));
}
