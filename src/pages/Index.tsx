import { LanguageProvider } from "@/contexts/LanguageContext";
import HeroSection from "@/components/HeroSection";
import ManifestoSection from "@/components/ManifestoSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import NoiseOverlay from "@/components/NoiseOverlay";
import LanguageSelector from "@/components/LanguageSelector";
import { useLang } from "@/contexts/LanguageContext";

const PageContent = () => {
  const { t } = useLang();

  return (
    <>
      <NoiseOverlay />
      <LanguageSelector />
      <HeroSection />
      <ProjectsSection />
      <ManifestoSection />
      <ContactSection />

      <footer className="border-t border-border/20 py-8 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
          {t.footer.rights}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground/30">
          stargaleski@gmail.com&nbsp;&nbsp;&nbsp;+55 45 9 9830-0601
        </span>
      </footer>
    </>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <PageContent />
    </LanguageProvider>
  );
};

export default Index;
