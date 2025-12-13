/* =========================
   components/ui/Button.tsx
========================= */
import * as React from "react";

type Variant = "primary" | "secondary" | "icon";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export default function Button({
  variant = "secondary",
  className = "",
  ...props
}: Props) {
  if (variant === "icon") {
    return (
      <button
        {...props}
        className={
          "grid h-11 w-11 place-items-center rounded-full border border-[#EFE6DD] bg-white/75 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_22px_rgba(43,43,43,0.10)] " +
          className
        }
      />
    );
  }

  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-[0_12px_22px_rgba(43,43,43,0.10)]";

  const styles =
    variant === "primary"
      ? "bg-[#2B2B2B] text-white hover:bg-[#1f1f1f]"
      : "border border-[#EFE6DD] bg-white/75 text-[#2B2B2B] hover:bg-white";

  return <button {...props} className={`${base} ${styles} ${className}`} />;
}
