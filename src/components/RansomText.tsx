import { useEffect, useState } from 'react';

interface RansomTextProps {
  text: string;
  className?: string;
  intervalMs?: number;
}

const fonts = [
  'Anton, sans-serif',
  '"Space Mono", monospace',
  'Impact, sans-serif',
  '"Arial Black", sans-serif'
];

const RansomText = ({ text, className = "", intervalMs = 4000 }: RansomTextProps) => {
  const [styles, setStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const generateStyles = () => {
      return text.split('').map((char) => {
        if (char === ' ') return { display: 'inline-block', width: '0.5em' };

        const isCutout = Math.random() > 0.55;
        const isPinkBg = Math.random() > 0.45;
        const isWhiteBg = Math.random() > 0.5;
        
        let bg = 'transparent';
        let color = 'inherit';
        
        if (isCutout) {
          bg = isPinkBg ? 'hsl(340 90% 56%)' : (isWhiteBg ? '#ffffff' : '#151515');
          color = bg === '#ffffff' ? '#151515' : (bg === '#151515' ? '#ffffff' : '#151515');
        } else {
          color = Math.random() > 0.8 ? 'hsl(340 90% 56%)' : 'inherit';
        }

        const rotate = `rotate(${Math.floor(Math.random() * 6) - 3}deg) translateY(${Math.floor(Math.random() * 3) - 1}px)`;
        const font = fonts[Math.floor(Math.random() * fonts.length)];
        const scale = 0.96 + Math.random() * 0.1;
        const useUpper = Math.random() > 0.15;

        return {
          display: 'inline-block',
          fontFamily: font,
          backgroundColor: bg,
          color: color,
          transform: `${rotate} scale(${scale})`,
          padding: isCutout ? '0 3px' : '0',
          margin: '0 0.5px',
          fontWeight: isCutout ? '900' : 'bold',
          textTransform: useUpper ? 'uppercase' : 'lowercase',
          boxShadow: isCutout && bg !== 'transparent' ? '2px 2px 0px rgba(0,0,0,0.4)' : 'none',
          clipPath: isCutout ? `polygon(${Math.random()*2}% ${Math.random()*2}%, ${98+Math.random()*2}% ${Math.random()*2}%, ${98+Math.random()*2}% ${98+Math.random()*2}%, ${Math.random()*2}% ${98+Math.random()*2}%)` : 'none',
          transition: `all 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        };
      });
    };

    setStyles(generateStyles());
    
    const interval = setInterval(() => {
      setStyles(generateStyles());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [text, intervalMs]);

  // If SSR or styles not generated yet, render generic
  if (styles.length === 0) {
    return <span className={className} style={{ whiteSpace: 'nowrap' }}>{text}</span>;
  }

  return (
    <span className={`inline-block ${className}`} style={{ whiteSpace: 'nowrap' }}>
      {text.split('').map((char, i) => {
        if (char === ' ') return <span key={i} style={styles[i]}>{'\u00A0'}</span>;
        return (
          <span key={i} style={styles[i]} className="will-change-transform">
            {styles[i]?.textTransform === 'uppercase' ? char.toUpperCase() : char.toLowerCase()}
          </span>
        );
      })}
    </span>
  );
};

export default RansomText;
