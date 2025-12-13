/* =========================
   components/ui/Chip.tsx
========================= */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#EFE6DD] bg-white/70 px-3 py-2 text-xs font-semibold text-[#6B6B6B]">
      <span className="h-2.5 w-2.5 rounded-full bg-[#A8BFA8] shadow-[0_0_0_3px_rgba(168,191,168,0.18)]" />
      {children}
    </div>
  );
}
