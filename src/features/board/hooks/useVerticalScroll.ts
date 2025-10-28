import { useEffect, useRef } from 'react';

export const useVerticalScroll = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleScroll = () => {
      savedCallback.current?.();
    };

    const container = ref.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return ref;
};
