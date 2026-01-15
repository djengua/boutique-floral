/* =========================
   components/Testimonials.tsx
========================= */
import Container from "@/components/ui/Container";

const items = [
  {
    who: "Mariana",
    meta: "Compra en línea",
    text: "La navegación es clara y los productos tienen fotos reales. Fue fácil elegir talla y color.",
  },
  {
    who: "Diego",
    meta: "Pedido corporativo",
    text: "Pudimos ajustar cantidades y agregar branding. La cotización llegó rápido y todo salió a tiempo.",
  },
  {
    who: "Lucía",
    meta: "Regalo",
    text: "El empaque y los mensajes personalizados quedaron perfectos. Repetiré la compra.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-6">
      <Container>
        <div className="mb-4">
          <h3 className="font-[Cormorant_Garamond] text-3xl font-semibold tracking-wide">
            Reseñas
          </h3>
          <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
            Experiencias reales para diferentes tipos de tienda.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((q) => (
            <article
              key={q.who}
              className="rounded-[18px] border border-[#EFE6DD] bg-white/80 p-4 shadow-[0_6px_16px_rgba(43,43,43,0.06)]"
            >
              <div className="font-black tracking-widest text-[#C9A86A]">
                ★★★★★
              </div>
              <p className="mt-2 text-sm leading-7 text-[#6B6B6B]">
                “{q.text}”
              </p>
              <div className="mt-3 flex items-center justify-between gap-3">
                <strong className="text-sm">{q.who}</strong>
                <span className="text-xs text-[#6B6B6B]">{q.meta}</span>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
