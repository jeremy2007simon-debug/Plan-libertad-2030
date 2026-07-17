"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { defaultLocale, dictionaries } from "@/lib/i18n/config";
import type { Locale, Translations } from "@/lib/i18n/types";

type LanguageContextValue = {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Español por defecto en cada visita (coincide con el HTML servido, sin
// persistencia entre sesiones) — cambiar de idioma actualiza al instante
// todo el contenido de la página sin recargar.
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, t: dictionaries[locale], setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}

// Atajo para componentes que solo necesitan el diccionario de textos.
export function useT() {
  return useLanguage().t;
}
