import { useEffect } from 'react';

const BASE = 'Martínez Home RD';

export function useTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Inmobiliaria en Santo Domingo Este`;
  }, [title]);
}
