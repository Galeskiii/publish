import { useLang } from "@/contexts/LanguageContext";

import RansomText from "./RansomText";
import TechLabel from "./TechLabel";

const ContactSection = () => {
  const { t } = useLang();
  const whatsappUrl = "https://wa.me/5545998300601";

  return (
    <section className="relative py-16 md:py-40 px-5 md:px-24 overflow-hidden w-full">
      <div className="absolute top-6 md:top-16 right-4 md:right-12 z-10">
        <TechLabel text={t.contact.label} />
      </div>

      <div className="absolute left-0 top-0 w-full h-px bg-border/20" />

      <div className="max-w-3xl mx-auto text-center mt-10 md:mt-0">
        <p className="font-mono text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] text-primary mb-4 md:mb-6 uppercase">{t.contact.heading}</p>
        <h2 className="font-display text-[clamp(1.8rem,10vw,5rem)] md:text-[clamp(3rem,6vw,5rem)] leading-[1.1] mb-5 md:mb-8 py-2 overflow-hidden w-full">
          <RansomText text={t.contact.titleLine1} className="block" intervalMs={5000} />
          <RansomText text={t.contact.titleLine2} className="block" intervalMs={6500} />
        </h2>

        <p className="font-mono text-[13px] md:text-base text-muted-foreground max-w-xs md:max-w-md mx-auto mb-10 md:mb-16 leading-relaxed">
          {t.contact.desc}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 w-full mb-12 md:mb-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative font-mono text-sm uppercase tracking-[0.2em] border border-primary bg-primary text-white px-8 py-4 transition-all duration-300 hover:bg-primary/80 w-full text-center"
          >
            <span className="relative z-10">{t.contact.cta}</span>
          </a>

          <button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText("stargaleski@gmail.com");
                const { toast } = await import("sonner");
                toast.success("E-mail copiado!");
              } catch {
                // Fallback for HTTP or denied permission
                const el = document.createElement("textarea");
                el.value = "stargaleski@gmail.com";
                el.style.position = "fixed";
                el.style.opacity = "0";
                document.body.appendChild(el);
                el.select();
                document.execCommand("copy");
                document.body.removeChild(el);
                const { toast } = await import("sonner");
                toast.success("E-mail copiado!");
              }
            }}
            className="group relative font-mono text-sm uppercase tracking-[0.15em] border border-border px-8 py-4 transition-all duration-300 hover:border-primary hover:text-primary w-full text-center"
          >
            <span className="relative z-10">STARGALESKI@GMAIL.COM</span>
          </button>
        </div>

        <div className="mt-8 md:mt-16 space-y-3 font-mono text-[12px] md:text-sm text-muted-foreground">
          <p>◆ +55 45 9 9830-0601</p>
          <p>◆ stargaleski@gmail.com</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
