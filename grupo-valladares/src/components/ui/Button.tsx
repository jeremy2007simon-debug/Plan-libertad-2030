import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "light";
  icon?: "arrow" | "arrowUpRight" | "none";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-tight transition-all duration-500 ease-out";

  const styles = {
    primary:
      "bg-blue text-white shadow-[0_10px_40px_-12px_var(--blue-glow)] hover:shadow-[0_18px_60px_-12px_var(--blue-glow)] hover:-translate-y-0.5",
    ghost:
      "border border-surface-border text-ink hover:border-blue-dim/50 hover:-translate-y-0.5",
    light:
      "bg-ink text-bg hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-14px_rgba(255,255,255,0.5)]",
  }[variant];

  const IconEl =
    icon === "arrow" ? ArrowRight : icon === "arrowUpRight" ? ArrowUpRight : null;

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {IconEl && (
        <IconEl className="size-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}
