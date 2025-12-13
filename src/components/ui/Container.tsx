/* =========================
   components/ui/Container.tsx
========================= */
export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[min(1200px,calc(100%-32px))] ${className}`}>
      {children}
    </div>
  );
}
