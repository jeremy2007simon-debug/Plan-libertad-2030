import Link from "next/link";
import { Icon } from "./Icon";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const base =
    "group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-out";
  const styles =
    variant === "primary"
      ? "bg-cta text-ink shadow-[0_10px_40px_-12px_var(--cta-glow)] hover:shadow-[0_16px_55px_-10px_var(--cta-glow)] hover:-translate-y-0.5"
      : "border border-surface-border text-ink hover:border-terracota/50 hover:text-terracota hover:-translate-y-0.5";

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <Icon
        name="arrowRight"
        className="size-4 transition-transform duration-500 group-hover:translate-x-1"
      />
    </Link>
  );
}
