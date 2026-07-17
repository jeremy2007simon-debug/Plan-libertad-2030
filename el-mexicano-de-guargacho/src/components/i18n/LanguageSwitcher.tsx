"use client";

import { useLanguage } from "./LanguageProvider";
import type { Locale } from "@/lib/i18n/types";

const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  es: { flag: "🇪🇸", label: "Español" },
  en: { flag: "🇬🇧", label: "English" },
};

// `variant="onDark"` se usa mientras el header flota transparente sobre el
// Hero (foto oscura); `variant="onLight"` cuando el header ya es sólido
// sobre el resto de la web (fondo arena claro).
export function LanguageSwitcher({
  variant = "onLight",
}: {
  variant?: "onDark" | "onLight";
}) {
  const { locale, setLocale } = useLanguage();

  const shellClass =
    variant === "onDark"
      ? "border-white/20 bg-white/10 backdrop-blur-md"
      : "border-hair bg-surface";

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border p-1 transition-colors duration-500 ${shellClass}`}
      role="group"
      aria-label="Idioma / Language"
    >
      {(Object.keys(LOCALE_META) as Locale[]).map((code) => {
        const active = locale === code;
        const activeClass =
          variant === "onDark"
            ? "bg-white/20"
            : "bg-cta/10 shadow-[0_2px_10px_-4px_var(--cta-glow)]";
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            aria-label={LOCALE_META[code].label}
            title={LOCALE_META[code].label}
            className={`flex size-7 items-center justify-center rounded-full text-[1rem] leading-none transition-all duration-300 ${
              active ? activeClass : "opacity-55 hover:opacity-100"
            }`}
          >
            <span aria-hidden="true">{LOCALE_META[code].flag}</span>
          </button>
        );
      })}
    </div>
  );
}
