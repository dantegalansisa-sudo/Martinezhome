import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '../useMedia';

export function useParallax(distance = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Softer on touch devices: still alive while scrolling, but cheaper and less dizzying.
  const d = useIsDesktop() ? distance : distance * 0.5;
  const y = useTransform(scrollYProgress, [0, 1], [-d, d]);
  return { ref, y };
}
