import { useLang } from "@/contexts/LanguageContext";

const LanguageSelector = () => {
  const { lang, setLang } = useLang();

  return (
    <div className="fixed bottom-6 right-4 md:bottom-auto md:top-6 md:right-6 z-[100] flex items-center p-1 bg-black/60 border border-white/10 backdrop-blur-md rounded-none font-mono text-[10px] uppercase tracking-[0.2em]">
      <button
        id="lang-pt"
        onClick={() => setLang("pt")}
        className={`relative font-bold px-4 py-1.5 transition-all duration-300 ${
          lang === "pt"
            ? "text-white bg-primary"
            : "text-white/50 hover:text-white"
        }`}
      >
        PT-BR
      </button>
      <button
        id="lang-en"
        onClick={() => setLang("en")}
        className={`relative font-bold px-4 py-1.5 transition-all duration-300 ${
          lang === "en"
            ? "text-white bg-primary"
            : "text-white/50 hover:text-white"
        }`}
      >
        EN-US
      </button>
      
      {/* Technical detail — only on desktop */}
      <div className="absolute -bottom-4 right-0 font-mono text-[7px] text-muted-foreground/40 tracking-[0.3em] pointer-events-none hidden md:block">
        LOCALE // {lang === "pt" ? "BR_01" : "US_01"}
      </div>
    </div>
  );
};

export default LanguageSelector;
