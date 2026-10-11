import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { EASINGS } from '../easings';

interface Props {
  children: string;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  /** Animate on mount instead of when scrolled into view */
  immediate?: boolean;
}

const word = {
  hidden: { y: '110%', rotate: 2 },
  visible: (d: number) => ({ y: 0, rotate: 0, transition: { duration: 0.85, delay: d, ease: EASINGS.premium } }),
};

/**
 * Word-by-word mask reveal. The in-view trigger lives on the (unclipped) parent so the
 * IntersectionObserver isn't fooled by the words sitting outside their overflow masks.
 */
export default function RevealText({ children, className = '', delay = 0, tag = 'h2', immediate }: Props) {
  const Tag = motion[tag];
  let index = 0;
  return (
    <Tag
      className={`reveal ${className}`}
      aria-label={children.replace(/\n/g, ' ')}
      initial="hidden"
      {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, amount: 0.4 } })}
    >
      {children.split('\n').map((line, li) => (
        <span className="reveal__line" key={li} aria-hidden>
          {line.split(' ').map((w, wi) => (
            <Fragment key={wi}>
              {wi > 0 && ' '}
              <span className="reveal__mask">
                <motion.span style={{ display: 'inline-block' }} variants={word} custom={delay + index++ * 0.06}>
                  {w}
                </motion.span>
              </span>
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
