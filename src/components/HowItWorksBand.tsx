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
              Cómo funciona el pedido
            </h3>
            <p className="mt-2 max-w-[60ch] text-sm leading-7 text-[#6B6B6B]">
              1) Elige un arreglo y tamaño • 2) Añade mensaje y extras • 3)
              Selecciona fecha/hora de entrega. Armamos tu pedido con flores de
              temporada manteniendo el estilo natural del catálogo.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>Confirmación por WhatsApp</Chip>
              <Chip>Fotos reales antes de enviar</Chip>
              <Chip>Empaque boutique incluido</Chip>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="#contacto">
                <Button variant="primary">Hacer pedido</Button>
              </a>
              <a href="#catalogo">
                <Button>Ver catálogo</Button>
              </a>
            </div>
          </div>
          <div
            className="min-h-[220px] bg-[linear-gradient(180deg,rgba(43,43,43,0.05),rgba(43,43,43,0.15)),url('https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center"
            aria-label="Imagen decorativa"
          />
        </div>
      </Container>
    </section>
  );
}
