import { useEffect, useState } from 'react';

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}

/** Phones and small tablets — these get their own layouts and scroll effects. */
export const useIsMobile = () => useMedia('(max-width: 760px)');

/** Desktop with a real mouse — the only place heavy parallax is worth its cost. */
export const useIsDesktop = () => useMedia('(min-width: 981px) and (hover: hover) and (pointer: fine)');
