/* =========================
   components/HowItWorksBand.tsx
========================= */
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";

export default function HowItWorksBand() {
  return (
    <section className="py-6">
      <Container>
        <div
          id="como-funciona"
          className="grid overflow-hidden rounded-[18px] border border-[#EFE6DD] bg-[linear-gradient(135deg,rgba(168,191,168,0.22),rgba(255,255,255,0.80))] shadow-[0_10px_30px_rgba(43,43,43,0.08)] lg:grid-cols-[1.2fr_.8fr]"
        >
          <div className="p-6">
            <h3 className="font-[Cormorant_Garamond] text-3xl font-semibold tracking-wide">
              Cómo funciona la compra
            </h3>
            <p className="mt-2 max-w-[60ch] text-sm leading-7 text-[#6B6B6B]">
              1) Elige categoría y formato • 2) Ajusta colores, talla o
              personalización • 3) Confirma envío y método de pago. Todo el flujo
              está pensado para adaptarse a papelería, moda o artículos de
              regalo.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Confirmación automática</Chip>
              <Chip>Inventario visible</Chip>
              <Chip>Opciones de empaque</Chip>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#contacto">
                <Button variant="primary">Iniciar compra</Button>
              </a>
              <a href="#catalogo">
                <Button>Explorar catálogo</Button>
              </a>
            </div>
          </div>
          <div
            className="min-h-[220px] bg-[linear-gradient(180deg,rgba(43,43,43,0.05),rgba(43,43,43,0.15)),url('https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center"
            aria-label="Imagen decorativa"
          />
        </div>
      </Container>
    </section>
  );
}
