/* =========================
   components/Collections.tsx
========================= */
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { collections } from "@/lib/collections";

export default function Collections() {
  return (
    <section id="colecciones" className="py-6">
      <Container>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-[Cormorant_Garamond] text-3xl font-semibold tracking-wide">
              Colecciones
            </h3>
            <p className="mt-1 max-w-[65ch] text-sm leading-6 text-[#6B6B6B]">
              Explora líneas listas para vender: esenciales, temporada y
              favoritos del equipo.
            </p>
          </div>
          <a href="#catalogo">
            <Button>Ver todo</Button>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {collections.map((o) => (
            <a
              key={o.title}
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
