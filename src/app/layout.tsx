import "./globals.css";

/* =========================
   app/layout.tsx
========================= */
export const metadata = {
  title: "Boutique Floral — Por pedido",
  description:
    "Boutique floral natural por pedido. Arreglos elegantes, personalizados y con entrega programada.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[radial-gradient(1200px_500px_at_15%_0%,#EAF1EA,transparent_55%),radial-gradient(1000px_420px_at_85%_10%,rgba(201,168,106,0.18),transparent_55%),#FBF7F2] text-[#2B2B2B]">
        {children}
      </body>
    </html>
  );
}
