import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion';

/** Elements where the native cursor is more useful than the mascot (typing, sliders, dropdowns). */
const NATIVE = 'input, textarea, select, [contenteditable], .leaflet-container, [data-native-cursor]';
const INTERACTIVE = 'a, button, label, [role="button"], [role="tab"], [role="radio"], .prop, .reel';

// Drawn in a 48×60 box; the click point (hotspot) sits between the two hands.
const W = 40;
const H = 50;
const HOT_X = (24 / 48) * W;
const HOT_Y = (9 / 60) * H;

export type Pose = 'idle' | 'hover' | 'press';

const ARMS: Record<Pose, { l: string; r: string; hl: [number, number]; hr: [number, number] }> = {
  idle: { l: 'M11 41 C 4 38, 4 22, 15 12', r: 'M37 41 C 44 38, 44 22, 33 12', hl: [15, 12], hr: [33, 12] },
  hover: { l: 'M11 41 C 2 37, -1 20, 7 9', r: 'M37 41 C 46 37, 49 20, 41 9', hl: [7, 9], hr: [41, 9] },
  press: { l: 'M11 41 C 5 35, 9 17, 21.5 9', r: 'M37 41 C 43 35, 39 17, 26.5 9', hl: [21.5, 9], hr: [26.5, 9] },
}

const INK = '#1b2433';
const RED = '#e1141b';
const SPRING = { type: 'spring', stiffness: 520, damping: 22, mass: 0.6 } as const;

/** The mascot itself — shared by the live cursor and the /casita preview page. */
export function HouseFigure({ pose, width, height, style }: { pose: Pose; width: number; height: number; style?: MotionStyle }) {
  const a = ARMS[pose];
  const handFill = pose === 'press' ? RED : '#fff';
  return (
    <motion.svg
      viewBox="0 0 48 60"
      width={width}
      height={height}
      style={{ ...style, overflow: 'visible' }}
      animate={{ scale: pose === 'hover' ? 1.1 : 1 }}
      transition={SPRING}
    >
      {/* Arms sit behind the body */}
      <motion.path d={a.l} animate={{ d: a.l }} transition={SPRING} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
      <motion.path d={a.r} animate={{ d: a.r }} transition={SPRING} fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />

      {/* House body — nudges up toward the click point while pressing */}
      <motion.g animate={{ y: pose === 'press' ? -2.5 : 0, scaleY: pose === 'press' ? 0.94 : 1 }} transition={SPRING} style={{ originY: 1 }}>
        <motion.g className="house-cursor__bob">
          <rect x="31" y="21" width="4.5" height="8" rx="1" fill={INK} />
          <path d="M24 19 L6 33.5 H42 Z" fill={RED} stroke={INK} strokeWidth={1.8} strokeLinejoin="round" />
          <rect x="10.5" y="32" width="27" height="21" rx="3" fill="#fff" stroke={INK} strokeWidth={1.8} />
          <path d="M20 46 v-6 a4 4 0 0 1 8 0 v6 z" fill={INK} />
          <path d="M24 36.4 V46 M20 41.6 H28" stroke="#fff" strokeWidth={1.1} />
          <ellipse cx="17" cy="55.5" rx="3.6" ry="2" fill={INK} />
          <ellipse cx="31" cy="55.5" rx="3.6" ry="2" fill={INK} />
        </motion.g>
      </motion.g>

      {/* Hands — they "clap" on the hotspot when clicking */}
      <motion.circle r={3.2} animate={{ cx: a.hl[0], cy: a.hl[1], fill: handFill }} initial={false} transition={SPRING} stroke={INK} strokeWidth={1.8} />
      <motion.circle r={3.2} animate={{ cx: a.hr[0], cy: a.hr[1], fill: handFill }} initial={false} transition={SPRING} stroke={INK} strokeWidth={1.8} />
    </motion.svg>
  );
}

export default function HouseCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const vx = useMotionValue(0);
  // Lean in the direction of travel — purely cosmetic, the position itself has no lag.
  const tilt = useSpring(useTransform(vx, [-40, 0, 40], [-14, 0, 14]), { stiffness: 200, damping: 18 });
  const [pose, setPose] = useState<Pose>('idle');
  const [hidden, setHidden] = useState(true);
  const [ripples, setRipples] = useState<number[]>([]);
  const last = useRef(0);
  const hovering = useRef(false);

  useEffect(() => {
    document.documentElement.classList.add('has-house');

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      vx.set(e.clientX - (last.current || e.clientX));
      last.current = e.clientX;
      x.set(e.clientX - HOT_X);
      y.set(e.clientY - HOT_Y);
      const t = e.target as Element;
      const native = !!t.closest?.(NATIVE);
      setHidden(native);
      hovering.current = !native && !!t.closest?.(INTERACTIVE);
      setPose((p) => (p === 'press' ? p : hovering.current ? 'hover' : 'idle'));
    };
    const settle = setInterval(() => vx.set(0), 120);
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      setPose('press');
      const id = Date.now();
      setRipples((r) => [...r, id]);
      setTimeout(() => setRipples((r) => r.filter((v) => v !== id)), 600);
    };
    const up = () => setPose(hovering.current ? 'hover' : 'idle');
    const leave = () => setHidden(true);

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);
    return () => {
      clearInterval(settle);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseleave', leave);
      document.documentElement.classList.remove('has-house');
    };
  }, [x, y, vx]);

  return (
    <motion.div className="house-cursor" style={{ x, y, width: W, height: H }} animate={{ opacity: hidden ? 0 : 1 }} transition={{ duration: 0.15 }} aria-hidden>
      <AnimatePresence>
        {ripples.map((id) => (
          <motion.span
            key={id}
            className="house-cursor__ripple"
            style={{ left: HOT_X, top: HOT_Y }}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      <HouseFigure pose={pose} width={W} height={H} style={{ rotate: tilt, originX: HOT_X / W, originY: HOT_Y / H }} />
    </motion.div>
  );
}

/** Desktop + fine pointer only, opt-in via ?casita=1 while the client evaluates it (?casita=0 turns it off). */
export function useHouseCursorEnabled() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const q = new URLSearchParams(window.location.search).get('casita');
    try {
      if (q === '1') sessionStorage.setItem('mh:casita', '1');
      if (q === '0') sessionStorage.removeItem('mh:casita');
      setOn(mq.matches && sessionStorage.getItem('mh:casita') === '1');
    } catch {
      setOn(mq.matches && q === '1');
    }
  }, []);
  return on;
}
