/* =========================
   components/ProductGrid.tsx
========================= */
"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { products, priceFor } from "@/lib/products";
import { useShopStore, type VariantKey } from "@/store/shopStore";

function Badge({ label }: { label: string }) {
  const premium = label === "Premium";
  return (
    <div
      className={
        "absolute left-3 top-3 rounded-full border bg-white/80 px-3 py-2 text-xs font-extrabold backdrop-blur " +
        (premium ? "border-[rgba(201,168,106,0.55)]" : "border-[#EFE6DD]")
      }
    >
      {label}
    </div>
  );
}

function Segment({
  productId,
  value,
}: {
  productId: string;
  value: VariantKey;
}) {
  const selected = useShopStore(
    (s) => s.selectedVariantByProduct[productId] ?? "S"
  );
  const setVariant = useShopStore((s) => s.setVariant);
  const active = selected === value;
  return (
    <button
      type="button"
      onClick={() => setVariant(productId, value)}
      className={
        "rounded-full border px-3 py-2 text-xs font-extrabold transition " +
        (active
          ? "border-[rgba(168,191,168,0.65)] bg-[rgba(168,191,168,0.22)] text-[#2c3c2c]"
          : "border-[#EFE6DD] bg-white/70 text-[#6B6B6B] hover:border-[#e3d7cd] hover:bg-white hover:text-[#2B2B2B]")
      }
    >
      {value}
    </button>
  );
}

export default function ProductGrid() {
  const addToCart = useShopStore((s) => s.addToCart);
  const selectedVariantByProduct = useShopStore(
    (s) => s.selectedVariantByProduct
  );

  return (
    <section id="catalogo" className="py-6">
      <Container>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-[Cormorant_Garamond] text-3xl font-semibold tracking-wide">
              Catálogo destacado
            </h3>
            <p className="mt-1 max-w-[65ch] text-sm leading-6 text-[#6B6B6B]">
              Selecciona talla o formato. Al finalizar, eliges envío, pago y
              cualquier personalización.
            </p>
          </div>
          <a href="#contacto">
            <Button>Solicitar cotización</Button>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => {
            const v = (selectedVariantByProduct[p.id] ??
              (p.variants[0] as VariantKey)) as VariantKey;
            const price = priceFor(v, p.basePrice);

            return (
              <article
                key={p.id}
                className="flex flex-col overflow-hidden rounded-[18px] border border-[#EFE6DD] bg-white/80 shadow-[0_6px_16px_rgba(43,43,43,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(43,43,43,0.10)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f3efe9]">
                  <div
                    className="absolute inset-0 scale-[1.02] bg-cover bg-center transition-transform duration-200 hover:scale-[1.06]"
                    style={{ backgroundImage: `url(${p.image})` }}
                    aria-label={p.name}
                    role="img"
                  />
                  {p.badge && <Badge label={p.badge} />}
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-[15px] font-extrabold leading-5">
                      {p.name}
                    </h4>
                    <div className="text-[15px] font-black">
                      ${price.toLocaleString("es-MX")}
                    </div>
                  </div>

                  <p className="text-[13px] leading-5 text-[#6B6B6B]">
                    {p.description}
                  </p>

                  <div
                    className="mt-1 flex flex-wrap gap-2"
                    aria-label="Variantes"
                  >
                    {p.variants.map((vv) => (
                      <Segment key={vv} productId={p.id} value={vv} />
                    ))}
                  </div>

                  <div className="mt-auto flex gap-2 pt-2">
                    <a href="#como-funciona" className="flex-1">
                      <Button
                        className="w-full"
                        aria-label={`Personalizar ${p.name}`}
                      >
                        Ver detalles
                      </Button>
                    </a>
                    <Button
                      variant="primary"
                      className="w-full flex-1"
                      onClick={() => addToCart(p.id)}
                      aria-label={`Agregar ${p.name} al carrito`}
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
