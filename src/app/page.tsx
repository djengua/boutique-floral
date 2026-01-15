/* =========================
   app/page.tsx
========================= */
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import ProductGrid from "@/components/ProductGrid";
import HowItWorksBand from "@/components/HowItWorksBand";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <div className="border-b border-[#EFE6DD] bg-white/65 backdrop-blur">
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] items-center justify-between gap-3 py-2 text-sm text-[#6B6B6B]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#A8BFA8]" />
            Compra en línea • Envíos nacionales
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-1">
            Atención: Soporte en vivo • 10:00–19:00
          </div>
        </div>
      </div>

      <Header />

      <main className="mx-auto w-[min(1200px,calc(100%-32px))]">
        <Hero />
        <Collections />
        <ProductGrid />
        <HowItWorksBand />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
