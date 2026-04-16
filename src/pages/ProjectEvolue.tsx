import { LanguageProvider, useLang } from "@/contexts/LanguageContext";
import NoiseOverlay from "@/components/NoiseOverlay";
import TechLabel from "@/components/TechLabel";
import GlitchText from "@/components/GlitchText";
import LanguageSelector from "@/components/LanguageSelector";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
        {(t as any).common.close}
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground tracking-widest">
        {index + 1} / {images.length}
      </div>
    </div>
  );
};

const MobileCarousel = ({ images, onOpen }: { images: typeof images_data, onOpen: (i: number) => void }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, skipSnaps: false, align: "center", dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    emblaApi.on("scroll", () => {
      if (!hasScrolled) setHasScrolled(true);
    });
  }, [emblaApi, hasScrolled]);

  return (
    <div className="md:hidden w-[calc(100%+3rem)] -mx-6 mb-8 relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y items-start" style={{ backfaceVisibility: "hidden" }}>
          {images.map((img, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_85%] min-w-0 pl-6 first:pl-6"
              onClick={() => onOpen(index)}
              style={{ transform: "translate3d(0, 0, 0)" }}
            >
              <div className="relative w-full overflow-hidden border border-[#2A2D35]/30 bg-[#0a0a0c] active:scale-[0.98] transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto max-h-[50vh] object-contain grayscale-[30%] active:grayscale-0 transition-all"
                  loading="lazy"
                />
                <TechLabel
                  text={`IMG_${String(index + 1).padStart(3, "0")}`}
                  className="absolute bottom-4 left-4 text-white bg-[#D9EA01]/20 border border-[#D9EA01]/30 backdrop-blur-sm"
                />
              </div>
            </div>
          ))}
          {/* spacer at end to prevent clipping */}
          <div className="flex-[0_0_1.5rem]" /> 
        </div>
      </div>
      
      {/* Swipe Overlay */}
      <div 
        className={`absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 ${hasScrolled ? "opacity-0" : "opacity-100 animate-pulse"}`}
      >
        <div className="bg-background/90 backdrop-blur px-4 py-2 border border-[#2A2D35]/50 flex items-center gap-2 shadow-2xl rounded-xs">
          <span className="font-mono text-[9px] text-[#D9EA01] uppercase tracking-[0.2em] whitespace-nowrap">
            {(t as any).common.swipeHint}
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D9EA01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </div>
      </div>

      <div className="mt-8 flex justify-center items-center gap-1.5">
        {images.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 transition-all duration-300 ${i === selectedIndex ? "w-4 bg-[#D9EA01]" : "w-1 bg-[#2A2D35]/50"}`}
          />
        ))}
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

      <div className="min-h-screen pt-8 pb-4 md:py-12 px-6 md:px-16 lg:px-24 overflow-hidden flex flex-col items-center">
        <LanguageSelector />
        {/* Top Navigation */}
        <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0 mb-4 md:mb-24 max-w-7xl relative z-20">
          <Link
            to="/"
            className="font-mono text-sm text-muted-foreground hover:text-white transition-colors duration-300 uppercase"
          >
            {(t as any).common.back}
          </Link>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-6">
            <TechLabel text="PRJ_001" />
            <div className="w-px h-4 bg-[#2A2D35]" />
            <TechLabel text="EVOLUE_MURAL_SYSTEM" />
          </div>
        </div>

        {/* Diagonal Stack Mural Layout */}
        <div className="w-full max-w-7xl flex flex-col md:grid md:grid-cols-1 lg:grid-cols-12 gap-4 md:gap-16 items-start mt-2 md:mt-0">
          
          {/* Header Description (Sticky) */}
          <header className="lg:col-span-4 text-left relative z-20 md:sticky md:top-24 w-full">
            <TechLabel text={t.projects.items[0].tag} className="mb-4 md:mb-6 inline-block text-[9px] tracking-widest text-[#D9EA01]" />
            <h1 className="font-display text-[clamp(4.5rem,15vw,5.5rem)] leading-[0.85] text-foreground mb-6 md:mb-8 tracking-tighter w-full">
              <GlitchText text="EVOLUE" glitchColor="#D9EA01" />
            </h1>
            <div className="w-12 h-px bg-[#D9EA01] mb-6 md:mb-8" />
            <p className="font-mono text-[13px] md:text-[15px] text-muted-foreground/70 leading-loose max-w-sm">
              {t.projects.items[0].desc}
            </p>
            
            <div className="mt-10 md:mt-12 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#D9EA01]" />
                  <span className="font-mono text-[9px] md:text-[10px] text-muted-foreground/60 uppercase tracking-widest">{(t as any).projects.items[0].type}</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#2A2D35]" />
                  <span className="font-mono text-[9px] md:text-[10px] text-muted-foreground/60 uppercase tracking-widest">{(t as any).projects.items[0].focus}</span>
               </div>
            </div>
          </header>

          <MobileCarousel images={images_data} onOpen={openLightbox} />

          {/* Mural (Asymmetric Stack) - Hidden on mobile */}
          <div className="hidden md:block lg:col-span-8 relative min-h-[600px] md:min-h-[800px] w-full">
             {/* Integrating micro elements: grid-like lines */}
             <div className="absolute top-0 right-0 w-full h-px bg-[#2A2D35]/20 z-0" />
             <div className="absolute top-0 right-0 w-px h-full bg-[#2A2D35]/20 z-0" />
             
             {images_data.map((img, i) => (
               <ProjectImage key={i} img={img} index={i} onOpen={openLightbox} />
             ))}
          </div>
        </div>

        <div className="mt-4 md:mt-32 flex items-center gap-3 text-muted-foreground/20">
          <div className="w-full h-px bg-[#2A2D35]" />
          <span className="font-mono text-[9px] tracking-[0.5em] whitespace-nowrap">{t.projects.end}</span>
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
