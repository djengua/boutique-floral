/* =========================
   components/Hero.tsx
========================= */
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export default function Hero() {
  return (
    <section className="py-8">
      <Container>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div className="relative overflow-hidden rounded-[18px] border border-[#EFE6DD] bg-white/80 p-6 shadow-[0_10px_30px_rgba(43,43,43,0.08)]">
            <div className="pointer-events-none absolute -right-24 -top-24 h-60 w-60 rotate-6 bg-[radial-gradient(circle_at_30%_30%,rgba(168,191,168,0.55),transparent_60%),radial-gradient(circle_at_70%_60%,rgba(201,168,106,0.35),transparent_55%)]" />

            <div className="relative inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-2 text-xs font-semibold text-[#6B6B6B]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M20 4s-8 0-12 4-4 12-4 12 8 0 12-4 4-12 4-12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 16c2-4 6-6 10-8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Colecciones curadas para tu tienda
            </div>

            <h2 className="relative mt-4 font-[Cormorant_Garamond] text-[46px] font-semibold leading-[1.03] tracking-wide sm:text-[54px]">
              Productos que cuentan historias.
            </h2>
            <p className="relative mt-2 max-w-[52ch] text-[15px] leading-7 text-[#6B6B6B]">
              Une categorías, colores y tallas en un solo escaparate. Tú eliges
              el estilo y el mensaje de tu marca; nosotros mantenemos la
              experiencia de compra clara, rápida y adaptable para papelería,
              moda o regalos.
            </p>

            <div className="relative mt-5 flex flex-wrap gap-2">
              <a href="#catalogo">
                <Button variant="primary">Comprar ahora</Button>
              </a>
              <a href="#como-funciona">
                <Button>Ver proceso</Button>
              </a>
            </div>

            <div className="relative mt-4 flex flex-wrap gap-2">
              <Chip>Envíos configurables</Chip>
              <Chip>Catálogo flexible</Chip>
              <Chip>Marca personalizable</Chip>
            </div>
          </div>

          <aside className="relative min-h-[420px] overflow-hidden rounded-[18px] border border-[#EFE6DD] bg-gradient-to-b from-[rgba(168,191,168,0.25)] to-white/70 shadow-[0_10px_30px_rgba(43,43,43,0.08)]">
            <div
              className="absolute inset-0 scale-[1.02] bg-cover bg-center"
              style={{
                backgroundImage: `
      linear-gradient(
        180deg,
        rgba(43,43,43,0.05),
        rgba(43,43,43,0.25)
      ),
      url("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80")
    `,
              }}
            />

            <div className="absolute bottom-4 left-4 flex max-w-[360px] gap-3 rounded-2xl border border-[#EFE6DD] bg-white/85 p-3 backdrop-blur">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[rgba(168,191,168,0.9)] to-[rgba(201,168,106,0.5)]" />
              <div>
                <div className="text-sm font-bold">Calidad consistente</div>
                <div className="text-xs leading-5 text-[#6B6B6B]">
                  Fotos reales, fichas claras y colecciones pensadas para vender
                  mejor sin importar el rubro.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
