/* =========================
   components/Header.tsx
========================= */
"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useShopStore } from "@/store/shopStore";

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="text-[#2B2B2B]/90">{children}</span>;
}

export default function Header() {
  const count = useShopStore((s) => s.cartCount());

  return (
    <header className="sticky top-0 z-50 border-b border-[#EFE6DD]/80 bg-[#FBF7F2]/75 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <a className="flex min-w-[220px] items-baseline gap-3" href="#">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#A8BFA8] to-[rgba(201,168,106,0.55)] shadow-[0_8px_20px_rgba(168,191,168,0.35)]" />
          <div>
            <div className="font-[Cormorant_Garamond] text-xl font-semibold tracking-wide">
              Boutique Floral
            </div>
            <div className="text-xs font-medium text-[#6B6B6B]">
              Natural • Elegante • Personalizable
            </div>
          </div>
        </a>

        <nav className="hidden text-sm text-[#6B6B6B] lg:block">
          <ul className="flex items-center gap-2">
            {[
              ["Arreglos", "#catalogo"],
              ["Ocasiones", "#ocasiones"],
              ["Cómo funciona", "#como-funciona"],
              ["Reseñas", "#testimonios"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <li key={href}>
                <a
                  className="rounded-full px-3 py-2 transition hover:bg-white/75 hover:text-[#2B2B2B]"
                  href={href}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex min-w-[220px] items-center justify-end gap-2">
          <Button variant="icon" aria-label="Buscar">
            <Icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M16.5 16.5 21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </Icon>
          </Button>

          <Button variant="icon" aria-label="Favoritos">
            <Icon>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 21s-7-4.4-9.5-8.5C.5 9 2.4 6 5.8 6c2 0 3.3 1 4.2 2.1C10.9 7 12.2 6 14.2 6c3.4 0 5.3 3 3.3 6.5C19 16.6 12 21 12 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </Icon>
          </Button>

          <a href="#catalogo" className="hidden sm:block">
            <Button variant="primary">Ver catálogo</Button>
          </a>

          <div className="relative">
            <Button variant="icon" aria-label="Carrito">
              <Icon>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 7h15l-1.5 10.5H7.2L6 7Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 7 5 3H2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                    fill="currentColor"
                  />
                </svg>
              </Icon>
            </Button>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#2B2B2B] px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
