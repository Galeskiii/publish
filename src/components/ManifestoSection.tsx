import React, { useEffect, useRef, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";
import TechLabel from "./TechLabel";

const ManifestoSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const services = t.about.services;

  return (
    <section ref={ref} className="relative py-16 md:py-32 px-5 md:px-24 overflow-hidden w-full">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle, hsl(0 0% 96%) 1px, transparent 1px)",
        backgroundSize: "8px 8px"
      }} />

      <div className="absolute top-6 md:top-12 right-4 md:right-8 z-10">
        <TechLabel text={t.about.section} />
      </div>

      {/* Services cards */}
      <div className={`mt-16 md:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto transition-all duration-700 delay-150 w-full ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        {services.map((service) => {
          const icons: Record<string, React.ReactNode> = {
            // Design Gráfico / Graphic Design — composition layout
            [t.about.services[0].title]: (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
                <rect x="3" y="3" width="18" height="18" />
                <rect x="7" y="7" width="6" height="6" />
                <line x1="15" y1="7" x2="19" y2="7" />
                <line x1="15" y1="11" x2="19" y2="11" />
                <line x1="3" y1="15" x2="21" y2="15" />
              </svg>
            ),
            // Social Media — person silhouette
            [t.about.services[1].title]: (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
                <circle cx="12" cy="7" r="4" />
                <path d="M2 22 C2 15 22 15 22 22" />
              </svg>
            ),
            // Branding — diamond / identity mark
            [t.about.services[2].title]: (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
                <polygon points="12,2 22,12 12,22 2,12" />
                <polygon points="12,7 17,12 12,17 7,12" />
              </svg>
            ),
            // UX/UI Design — screen wireframe
            [t.about.services[3].title]: (
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" strokeLinejoin="miter">
                <rect x="2" y="4" width="20" height="14" />
                <line x1="6" y1="22" x2="18" y2="22" />
                <line x1="12" y1="18" x2="12" y2="22" />
                <line x1="6" y1="9" x2="18" y2="9" />
                <line x1="6" y1="13" x2="13" y2="13" />
              </svg>
            ),
          };

          const icon = icons[service.title];

          return (
            <div
              key={service.title}
              className="border border-border/40 p-6 md:p-12 relative group hover:border-primary/60 transition-all duration-500 w-full bg-card/20 backdrop-blur-sm"
            >
              <span className="text-primary w-6 h-6 md:w-9 md:h-9 block mb-3 md:mb-4">
                {icon}
              </span>
              <h3 className="font-display text-lg md:text-2xl mb-2 md:mb-3 leading-[1.2] group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="font-mono text-[12px] md:text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-10 md:mt-20 flex flex-col items-center gap-4 text-muted-foreground/30">
        <div className="flex items-center gap-4 w-full">
          <span className="font-mono text-xs">◆ ◆ ◆</span>
          <div className="flex-1 h-px bg-border/30" />
          <div className="flex-1 h-px bg-border/30" />
          <span className="font-mono text-xs">◆ ◆ ◆</span>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
