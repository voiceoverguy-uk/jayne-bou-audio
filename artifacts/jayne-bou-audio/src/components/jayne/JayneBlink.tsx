import { useEffect, useState } from 'react';

interface JayneBlinkProps {
  baseSrc: string;
  blinkSrc: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  minDelayMs?: number;
  maxDelayMs?: number;
  blinkDurationMs?: number;
}

export function JayneBlink({
  baseSrc,
  blinkSrc,
  alt,
  className,
  imgClassName = 'w-full h-auto object-contain drop-shadow-md',
  minDelayMs = 3200,
  maxDelayMs = 6200,
  blinkDurationMs = 160,
}: JayneBlinkProps) {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    let mounted = true;
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = minDelayMs + Math.random() * (maxDelayMs - minDelayMs);
      timeoutId = setTimeout(() => {
        if (!mounted) return;
        setBlinking(true);
        timeoutId = setTimeout(() => {
          if (!mounted) return;
          setBlinking(false);
          scheduleNext();
        }, blinkDurationMs);
      }, delay);
    };

    scheduleNext();
    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [minDelayMs, maxDelayMs, blinkDurationMs]);

  return (
    <div className={`relative ${className ?? ''}`} data-testid="jayne-blink">
      <img src={baseSrc} alt={alt} className={imgClassName} />
      <img
        src={blinkSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 ${imgClassName} transition-opacity duration-75 ${blinking ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
