import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
}

export default function MagneticButton({ children, href, onClick, className = '', type = 'button', strength = 0.3, external, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength });
  };

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.4 }}
    >
      {href ? (
        <a href={href} className={className} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {children}
        </a>
      ) : (
        <button type={type} onClick={onClick} className={className} aria-label={ariaLabel}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
