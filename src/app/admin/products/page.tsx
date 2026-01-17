/* =========================
   app/admin/products/page.tsx
========================= */
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { listCategories, listProducts } from "@/lib/api";

const buttonClass =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(43,43,43,0.10)] bg-[#2B2B2B] text-white hover:bg-[#1f1f1f]";

export default async function ProductsPage() {
  let products = [] as Awaited<ReturnType<typeof listProducts>>["data"];
  let categories = [] as Awaited<ReturnType<typeof listCategories>>["data"];
  let errorMessage = "";

  try {
    const [productsResponse, categoriesResponse] = await Promise.all([
      listProducts({ page_size: 50 }, { cache: "no-store" }),
      listCategories({ page_size: 100 }, { cache: "no-store" }),
    ]);
    products = productsResponse.data;
    categories = categoriesResponse.data;
  } catch (error) {
    errorMessage = error instanceof Error ? error.message : "Error inesperado.";
  }

  const categoryLookup = new Map(
    categories.map((category) => [category.id, category.name])
  );

  return (
    <>
      <div className="border-b border-[#EFE6DD] bg-white/65 backdrop-blur">
        <div className="mx-auto flex w-[min(1200px,calc(100%-32px))] items-center justify-between gap-3 py-2 text-sm text-[#6B6B6B]">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-[#A8BFA8]" />
            Admin • Productos
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-1">
            Gestión de catálogo • Vista general
          </div>
        </div>
      </div>

      <Header />

      <main className="mx-auto w-[min(1100px,calc(100%-32px))] py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A68C72]">
              Panel de administración
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-[#2B2B2B]">
              Productos
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[#6B6B6B]">
              Gestiona los productos del catálogo. Consulta precios, SKU,
              categorías y crea nuevos registros.
            </p>
          </div>
          <Link href="/admin/products/new" className={buttonClass}>
            + Nuevo producto
          </Link>
        </div>

        <section className="mt-10 rounded-3xl border border-[#EFE6DD] bg-white/80 p-6 shadow-[0_18px_50px_rgba(43,43,43,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-[#2B2B2B]">
              Lista de productos
            </h2>
            <span className="rounded-full border border-[#EFE6DD] bg-[#FBF7F2] px-3 py-1 text-xs font-semibold text-[#6B6B6B]">
              {products.length ?? 0} registros
            </span>
          </div>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : products.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-[#EFE6DD] bg-[#FBF7F2] px-4 py-6 text-sm text-[#6B6B6B]">
              Aún no hay productos registrados.
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left text-sm">
                <thead className="text-xs uppercase tracking-[0.2em] text-[#A68C72]">
                  <tr>
                    <th className="px-4">Nombre</th>
                    <th className="px-4">SKU</th>
                    <th className="px-4">Precio</th>
                    <th className="px-4">Categoría</th>
                    <th className="px-4">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="rounded-2xl border border-[#EFE6DD] bg-white/90 shadow-[0_8px_20px_rgba(43,43,43,0.08)]"
                    >
                      <td className="px-4 py-3 font-semibold text-[#2B2B2B]">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 text-[#6B6B6B]">
                        {product.sku}
                      </td>
                      <td className="px-4 py-3 text-[#2B2B2B]">
                        {product.currency} {product.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-[#6B6B6B]">
                        {categoryLookup.get(product.category_id) ??
                          "Sin categoría"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-[#FBF7F2] px-3 py-1 text-xs font-semibold text-[#6B6B6B]">
                          <span className="h-2 w-2 rounded-full bg-[#A8BFA8]" />
                          {product.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
