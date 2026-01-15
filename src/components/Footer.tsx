/* =========================
   components/Footer.tsx
========================= */
import Container from "@/components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-8 border-t border-[#EFE6DD] bg-white/55 backdrop-blur">
      <Container className="grid gap-6 py-6 lg:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#A8BFA8] to-[rgba(201,168,106,0.55)]" />
            <div>
              <div className="font-[Cormorant_Garamond] text-xl font-semibold tracking-wide">
                Boutique Commerce
              </div>
              <div className="text-xs font-medium text-[#6B6B6B]">
                Flexible • Confiable • Multi-categoría
              </div>
            </div>
          </div>
          <p className="mt-3 text-sm leading-7 text-[#6B6B6B]">
            Tienda en línea con catálogo adaptable, experiencias de compra
            rápidas y comunicación clara con tus clientes.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide">Catálogo</h4>
          <div className="mt-2 space-y-2 text-sm text-[#6B6B6B]">
            <a className="block hover:text-[#2B2B2B]" href="#catalogo">
              Productos
            </a>
            <a className="block hover:text-[#2B2B2B]" href="#colecciones">
              Colecciones
            </a>
            <a className="block hover:text-[#2B2B2B]" href="#como-funciona">
              Cómo funciona
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-wide">Soporte</h4>
          <div className="mt-2 space-y-2 text-sm text-[#6B6B6B]">
            <a className="block hover:text-[#2B2B2B]" href="#contacto">
              Contacto
            </a>
            <a className="block hover:text-[#2B2B2B]" href="#">
              Políticas
            </a>
            <a className="block hover:text-[#2B2B2B]" href="#">
              Cambios y devoluciones
            </a>
          </div>
        </div>

        <div id="contacto">
          <h4 className="text-sm font-semibold tracking-wide">Redes</h4>
          <div className="mt-2 space-y-2 text-sm text-[#6B6B6B]">
            <a className="block hover:text-[#2B2B2B]" href="#">
              Instagram
            </a>
            <a className="block hover:text-[#2B2B2B]" href="#">
              WhatsApp
            </a>
            <a className="block hover:text-[#2B2B2B]" href="#">
              TikTok
            </a>
          </div>
        </div>
      </Container>

      <div className="border-t border-[#EFE6DD] py-4">
        <Container className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6B6B6B]">
          <span>
            © {year} Boutique Commerce. Todos los derechos reservados.
          </span>
          <span>Hecho con detalle — comercio moderno</span>
        </Container>
      </div>
    </footer>
  );
}
