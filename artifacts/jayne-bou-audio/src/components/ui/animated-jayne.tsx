import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedJayneProps {
  staticSrc: string;
  animSrc: string;
  alt: string;
  className?: string;
  trigger?: 'hover' | 'inview' | 'always';
  delay?: number;
}

export function AnimatedJayne({
  staticSrc,
  animSrc,
  alt,
  className = '',
  trigger = 'hover',
  delay = 0,
}: AnimatedJayneProps) {
  const [src, setSrc] = useState(trigger === 'always' ? animSrc : staticSrc);
  const [hasTriggered, setHasTriggered] = useState(trigger === 'always');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (trigger === 'inview' && isInView && !hasTriggered) {
      const timer = setTimeout(() => {
        setSrc(animSrc);
        setHasTriggered(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, trigger, hasTriggered, animSrc, delay]);

  function handleMouseEnter() {
    if (trigger === 'hover') {
      setSrc(animSrc);
    }
  }

  function handleMouseLeave() {
    if (trigger === 'hover') {
      setSrc(staticSrc);
    }
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView || trigger === 'always' ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain drop-shadow-md"
        loading="lazy"
      />
    </motion.div>
  );
}
