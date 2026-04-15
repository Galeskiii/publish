import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  glitchOnHover?: boolean;
  glitchColor?: string;
}

const GlitchText = ({ text, className = "", as: Tag = "span", glitchOnHover = false, glitchColor }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [loadGlitch, setLoadGlitch] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoadGlitch(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const active = loadGlitch || isGlitching;
  const color = glitchColor || "hsl(340, 90%, 56%)";

  return (
    <Tag
      className={`relative inline-block ${className}`}
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      {text}
      {active && (
        <>
          <span
            className="absolute inset-0 animate-glitch-1 opacity-80"
            aria-hidden
            style={{ left: "2px", color }}
          >
            {text}
          </span>
          <span
            className="absolute inset-0 animate-glitch-2 opacity-80"
            aria-hidden
            style={{ left: "-2px", color }}
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
};

export default GlitchText;
