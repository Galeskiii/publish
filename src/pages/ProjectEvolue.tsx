import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import NoiseOverlay from "@/components/NoiseOverlay";
import TechLabel from "@/components/TechLabel";
import GlitchText from "@/components/GlitchText";
import LanguageSelector from "@/components/LanguageSelector";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";

import evolue1 from "@/assets/evolue-1.jpg";
import evolue2 from "@/assets/evolue-2.png";
import evolue3 from "@/assets/evolue-3.png";
import evolue4 from "@/assets/evolue-4.jpg";
import evolue5 from "@/assets/evolue-5.jpg";

const images_data = [
  // HIERARCHY: 1 Main (Sharp, Foreground), 4 Secondary (Blurred, Background Stacks)
  { src: evolue3, alt: "Evolue - Principal", rotate: "-2deg", z: 50, left: "20%", top: "25%", w: "55%", filter: "brightness(1.1) contrast(1.1)", blur: "0px" },
  
  { src: evolue1, alt: "Evolue - Context 1", rotate: "4deg", z: 30, left: "10%", top: "15%", w: "45%", filter: "brightness(0.8) contrast(0.9)", blur: "1px" },
  { src: evolue5, alt: "Evolue - Context 2", rotate: "-6deg", z: 20, left: "15%", top: "45%", w: "48%", filter: "brightness(0.7) contrast(0.8)", blur: "1.5px" },
  { src: evolue4, alt: "Evolue - Context 3", rotate: "5deg", z: 10, left: "40%", top: "15%", w: "42%", filter: "brightness(0.6) contrast(0.7)", blur: "2px" },
  { src: evolue2, alt: "Evolue - Context 4", rotate: "-3deg", z: 5, left: "38%", top: "55%", w: "46%", filter: "brightness(0.5) contrast(0.6)", blur: "2.5px" },
];

const ProjectImage = ({ img, index, onOpen }: { img: typeof images_data[0]; index: number; onOpen: (index: number) => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const mobileWidth = (w: string) => {
    const num = parseInt(w);
    return `${Math.min(num * 1.8, 90)}%`;
  };

  return (
    <div
      ref={ref}
      className={`absolute transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${visible ? "opacity-100" : "opacity-0 translate-y-12 scale-90"}`}
      style={{ 
        zIndex: isHovered ? 100 : img.z,
        left: isMobile ? "50%" : img.left,
        top: img.top,
        width: isMobile ? mobileWidth(img.w) : img.w,
        transformOrigin: "center center",
        transform: isMobile ? "translateX(-50%)" : "none",
        transitionDelay: visible ? `${index * 150}ms` : '0ms'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative group cursor-pointer border border-[#2A2D35]/30 bg-[#0a0a0c] hover:border-[#D9EA01]/60 transition-all duration-500 w-full overflow-hidden flex items-center justify-center p-1 md:p-2 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        onClick={() => onOpen(index)}
        style={{ 
          transform: `rotate(${img.rotate}) ${isHovered ? 'scale(1.01) translateY(-4px)' : 'scale(1) translateY(0)'}`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s",
          filter: isHovered ? "none" : `${img.filter} blur(${img.blur})`,
        }}
      >
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-auto object-cover block transition-all duration-700 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[#D9EA01]/0 group-hover:bg-[#D9EA01]/5 transition-colors duration-300 pointer-events-none" />
        <TechLabel
          text={`IMG_${String(index + 1).padStart(3, "0")}`}
          className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-[#D9EA01]/20 border border-[#D9EA01]/30 backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

const Lightbox = ({ index, images, onClose, onPrev, onNext }: { 
  index: number; 
  images: typeof images_data; 
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-md cursor-pointer animate-fade-in"
      onClick={onClose}
      style={{ animation: "fade-in 0.3s ease-out" }}
    >
      <div className="relative flex items-center justify-center w-full h-full px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-8 p-4 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Previous image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <img
          src={current.src}
          alt={current.alt}
          className="max-w-full max-h-[85vh] object-contain border border-[#2A2D35] select-none shadow-2xl"
        />

        <button
          onClick={onNext}
          className="absolute right-4 md:right-8 p-4 text-white/50 hover:text-white transition-colors z-10"
          aria-label="Next image"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 font-mono text-sm text-muted-foreground hover:text-white transition-colors flex items-center gap-2"
      >
        ✕ FECHAR
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground tracking-widest">
        {index + 1} / {images.length}
      </div>
    </div>
  );
};

const PageContent = () => {
  const { t } = useLang();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images_data.length : null));
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images_data.length) % images_data.length : null));
  }, []);

  return (
    <>
      <NoiseOverlay />
      {lightboxIndex !== null && (
        <Lightbox 
          index={lightboxIndex} 
          images={images_data} 
          onClose={closeLightbox} 
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}

      <div className="min-h-screen py-12 px-6 md:px-16 lg:px-24 overflow-hidden flex flex-col items-center">
        <LanguageSelector />
        {/* Top Navigation */}
        <div className="w-full flex items-center justify-between mb-24 max-w-7xl relative z-20">
          <Link
            to="/"
            className="font-mono text-sm text-muted-foreground hover:text-white transition-colors duration-300 uppercase"
          >
            ← VOLTAR
          </Link>
          <div className="flex items-center gap-6">
            <TechLabel text="PRJ_001" />
            <div className="w-px h-4 bg-[#2A2D35]" />
            <TechLabel text="EVOLUE_MURAL_SYSTEM" />
          </div>
        </div>

        {/* Diagonal Stack Mural Layout */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Header Description (Sticky) */}
          <header className="lg:col-span-4 text-left px-4 relative z-20 md:sticky md:top-24">
            <TechLabel text="SOCIAL CONTENT" className="mb-4 inline-block text-[10px] tracking-widest text-[#D9EA01]" />
            <h1 className="font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.85] text-foreground mb-8 tracking-tighter">
              <GlitchText text="EVOLUE" glitchColor="#D9EA01" />
            </h1>
            <div className="w-12 h-px bg-[#D9EA01] mb-8" />
            <p className="font-mono text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-sm">
              {t.projects.items[0].desc}
            </p>
            
            <div className="mt-12 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#D9EA01]" />
                 <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Type: 4-Phase Mural</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#2A2D35]" />
                 <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">Focus: Dynamic Harmony</span>
               </div>
            </div>
          </header>

          {/* Mural (Asymmetric Stack) */}
          <div className="lg:col-span-8 relative min-h-[600px] md:min-h-[800px] w-full">
             {/* Integrating micro elements: grid-like lines */}
             <div className="absolute top-0 right-0 w-full h-px bg-[#2A2D35]/20 z-0" />
             <div className="absolute top-0 right-0 w-px h-full bg-[#2A2D35]/20 z-0" />
             
             {images_data.map((img, i) => (
               <ProjectImage key={i} img={img} index={i} onOpen={openLightbox} />
             ))}
          </div>
        </div>

        <div className="mt-32 flex items-center gap-3 text-muted-foreground/20">
          <div className="w-full h-px bg-[#2A2D35]" />
          <span className="font-mono text-[9px] tracking-[0.5em] whitespace-nowrap">END_OF_PROJECT</span>
          <div className="w-full h-px bg-[#2A2D35]" />
        </div>
      </div>
    </>
  );
};

const ProjectEvolue = () => (
  <LanguageProvider>
    <PageContent />
  </LanguageProvider>
);

export default ProjectEvolue;
