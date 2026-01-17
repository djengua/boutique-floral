/* =========================
   app/admin/categories/new/page.tsx
========================= */
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <>
      <div className="border-b border-[#EFE6DD] bg-white/65 backdrop-blur">
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] items-center justify-between gap-3 py-2 text-sm text-[#6B6B6B]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#A8BFA8]" />
            Admin • Nueva categoría
          </div>
          <Link
            href="/admin/categories"
            className="rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-1 text-xs font-semibold text-[#2B2B2B] transition hover:bg-white"
          >
            Volver a categorías
          </Link>
        </div>
      </div>

      <Header />

      <main className="mx-auto w-[min(900px,calc(100%-32px))] py-12">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]">
            Panel de administración
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[#2B2B2B]">
            Crear nueva categoría
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6B6B6B]">
            Completa los datos para dar de alta una nueva categoría en el
            catálogo.
          </p>
        </div>

        <section className="mt-10 rounded-3xl border border-[#EFE6DD] bg-white/80 p-6 shadow-[0_18px_50px_rgba(43,43,43,0.08)]">
          <CategoryForm />
        </section>
      </main>

      <Footer />
    </>
  );
}
