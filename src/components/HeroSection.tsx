import { useLang } from "@/contexts/LanguageContext";

import RansomText from "./RansomText";
import TechLabel from "./TechLabel";

const HeroSection = () => {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24">
      <div className="absolute top-6 md:top-8 left-4 md:left-6 flex flex-col gap-1 z-20">
        <TechLabel text="SYS.LOAD_0x7F2" />
        <TechLabel text="LAT 34.9889 / LNG -106.6144" />
      </div>

      <svg className="absolute top-24 md:top-20 right-8 md:right-32 text-primary animate-flicker w-4 h-4 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" />
      </svg>
      <svg className="absolute bottom-24 md:bottom-40 left-6 md:left-16 text-accent w-3 h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="12,0 15,9 24,12 15,15 12,24 9,15 0,12 9,9" />
      </svg>

      <div className="absolute top-0 left-1/3 w-px h-[60%] bg-border opacity-30" />
      <div className="absolute bottom-0 right-1/4 w-px h-[40%] bg-primary/20" />
      <div className="absolute top-1/2 left-0 w-[30%] h-px bg-border opacity-20" />

      <div className="absolute bottom-10 right-4 md:right-12 text-muted-foreground font-mono text-[10px] md:text-xs rotate-90 tracking-widest hidden sm:block">
        SCROLL ↓↓↓
      </div>

      <div className="relative z-10 px-5 md:px-16 lg:px-24 w-full max-w-[100vw]">
        <div className="animate-hero-enter grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start">
          {/* Title block */}
          <div className="md:col-span-5 mt-6 md:mt-0">
            <h1 className="font-display text-[clamp(3rem,18vw,6rem)] md:text-[clamp(4.5rem,14vw,12rem)] leading-[1.0] tracking-tighter w-full overflow-hidden py-2">
              <RansomText text="GALESKI" className="block" intervalMs={5000} />
            </h1>
            <div className="mt-6 md:mt-12 flex flex-col gap-3 opacity-80">
              <div className="w-12 md:w-24 h-px bg-primary/60" />
              <div className="font-mono text-[9px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground">
                V.LAYOUT_2026 // STATUS: COMPLETED
              </div>
            </div>
          </div>

          {/* About box */}
          <div className="md:col-span-7 flex items-center md:pl-8 mt-8 md:mt-0 pb-12 md:pb-0">
            <div className="border border-border/40 bg-card/20 backdrop-blur-sm px-6 md:px-12 py-10 md:py-14 relative w-full" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
              <TechLabel text="ABOUT_ME" className="absolute -top-3 left-6 md:left-8 bg-background px-2 text-[10px]" />
              <p className="font-mono text-[13px] md:text-[15px] leading-[1.9] md:leading-[2.2] text-muted-foreground whitespace-pre-line text-left">
                {t.about.text}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-5 gap-1 opacity-20" style={{ transform: "rotate(3deg)" }}>
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 ${[0,1,3,5,6,8,10,12,14,16,18,20,21,23,24].includes(i) ? "bg-foreground" : "bg-transparent"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
