import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/contexts/LanguageContext";
import GlitchText from "./GlitchText";
import RansomText from "./RansomText";
import TechLabel from "./TechLabel";
import { FolderOpen, Eye } from "lucide-react";

const projectRoutes: Record<string, string> = {
  EVOLUE: "/project/evolue",
  SAUVEL: "/project/sauvel",
};

const ProjectCard = ({ project, index }: { project: { title: string; tag: string; year: string; desc: string }; index: number }) => {
  const { t } = useLang();
  const navigate = useNavigate();
  const route = projectRoutes[project.title];
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);



  const brandColors: Record<string, string> = {
    EVOLUE: "#D9EA01",
    SAUVEL: "#2959A0"
  };
  const brandColor = brandColors[project.title] || "hsl(var(--primary))";

  return (
    <div
      ref={ref}
      className={`relative group cursor-pointer transition-all duration-700 w-full ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => route && navigate(route)}
    >
      {/* Visual Stack Effect (Background layers) */}
      <div 
        className={`absolute -top-1.5 -right-1.5 w-full h-full border border-border/10 bg-card/5 transition-all duration-500 rounded-xs ${hovered ? "translate-x-1 translate-y-1 opacity-0" : "opacity-100"}`}
        style={{ zIndex: -1 }}
      />
      <div 
        className={`absolute -top-3 -right-3 w-full h-full border border-border/10 bg-card/5 transition-all duration-500 rounded-xs ${hovered ? "translate-x-2 translate-y-2 opacity-0" : "opacity-100"}`}
        style={{ zIndex: -2 }}
      />

      <div 
        className={`relative border border-border/40 px-6 pt-16 pb-12 md:p-14 min-h-[300px] md:min-h-[420px] flex flex-col justify-end transition-all duration-500 w-full overflow-hidden ${hovered ? "bg-card/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]" : "bg-card/10 backdrop-blur-sm"}`}
        style={{ borderColor: hovered ? brandColor : undefined }}
      >
        {/* Folder Tab Effect */}
        <div 
          className="absolute top-0 right-0 w-32 h-8 bg-border/10 border-b border-l border-border/40 flex items-center justify-center gap-2 transition-all duration-500"
          style={{ 
            borderColor: hovered ? `${brandColor}40` : undefined,
            backgroundColor: hovered ? `${brandColor}10` : undefined
          }}
        >
          <FolderOpen size={10} className="text-muted-foreground" style={{ color: hovered ? brandColor : undefined }} />
          <span className="font-mono text-[8px] tracking-widest text-muted-foreground uppercase">Project_Files</span>
        </div>

        {hovered && (
          <div 
            className="absolute inset-0 animate-flicker pointer-events-none opacity-[0.05]" 
            style={{ backgroundColor: brandColor }}
          />
        )}

        <TechLabel text={`PRJ_${String(index + 1).padStart(3, "0")}`} className="absolute top-5 left-6" />

        <div className="relative z-10 w-full">
          <span 
            className="font-mono text-[10px] uppercase tracking-[0.2em] mb-4 block transition-colors"
            style={{ color: hovered ? brandColor : "hsl(var(--muted-foreground))" }}
          >
            {project.tag}
          </span>
          <h3 
            className="font-display text-[2.8rem] md:text-7xl leading-[1] transition-colors duration-200"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {hovered ? <GlitchText text={project.title} glitchColor={brandColor} /> : project.title}
          </h3>
          <p className="font-mono text-[13px] text-muted-foreground mt-5 leading-relaxed max-w-[90%]">{project.desc}</p>
          
          {/* Gallery Hint Button - Always visible with blink */}
          <div 
            className={`mt-8 flex items-center gap-3 transition-all duration-500 animate-soft-blink ${hovered ? "scale-[1.02]" : "scale-100"}`}
          >
            <div 
              className="px-4 py-2 border flex items-center gap-2 rounded-xs transition-colors duration-500"
              style={{ 
                borderColor: hovered ? brandColor : `${brandColor}40`, 
                backgroundColor: hovered ? `${brandColor}20` : `${brandColor}05` 
              }}
            >
              <Eye size={12} style={{ color: brandColor }} />
              <span className="font-mono text-[10px] md:text-[11px] tracking-tighter font-bold" style={{ color: brandColor }}>
                {t.projects.viewGallery}
              </span>
            </div>
            <div className="flex-1 h-px opacity-30" style={{ backgroundColor: brandColor }} />
          </div>
        </div>

        <div 
          className="absolute bottom-0 right-0 w-10 h-10 border-b border-r transition-colors" 
          style={{ borderColor: hovered ? brandColor : "hsl(var(--border))" }} 
        />
        <div 
          className="absolute top-0 left-0 w-10 h-10 border-t border-l transition-colors" 
          style={{ borderColor: hovered ? brandColor : "hsl(var(--border))" }} 
        />
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const { t } = useLang();

  const projects = t.projects.items;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-24 w-full overflow-hidden">
      <div className="absolute top-8 md:top-16 left-6 md:left-12 z-10">
        <TechLabel text={t.projects.label} />
      </div>

      <h2 className="font-display text-[clamp(3rem,12vw,6rem)] md:text-[clamp(3rem,10vw,6rem)] leading-[1.1] mb-8 mt-12 md:mt-0 w-full break-words py-4">
        <div className="w-full">
          <RansomText text={t.projects.titleLine1} className="inline-block" intervalMs={5500} />
        </div>
        <div className="w-full md:ml-[5vw] mt-2">
          <RansomText text={t.projects.titleLine2} className="inline-block" intervalMs={6000} />
        </div>
      </h2>

      <p className="font-mono text-sm text-muted-foreground max-w-sm mb-10 md:mb-16 md:ml-[5vw]">
        {t.projects.desc}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto w-full">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <div className="mt-12 md:mt-16 flex items-center gap-3 text-muted-foreground/20">
        <div className="w-full h-px bg-border/20" />
        <span className="font-mono text-[9px] tracking-[0.5em] whitespace-nowrap">{t.projects.end}</span>
        <div className="w-full h-px bg-border/20" />
      </div>
    </section>
  );
};

export default ProjectsSection;
