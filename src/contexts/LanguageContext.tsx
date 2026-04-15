import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Language } from "@/i18n/translations";

type TranslationType = (typeof translations)[keyof typeof translations];

interface LanguageContextType {
  lang: Language;
  t: TranslationType;
  toggleLang: () => void;
  setLang: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("pt");
  const toggleLang = () => setLang((l) => (l === "pt" ? "en" : "pt"));
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be inside LanguageProvider");
  return ctx;
};
