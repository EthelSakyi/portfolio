'use client';
import { useEffect } from 'react';

type LenisInstance = {
  raf: (time: number) => void;
  destroy: () => void;
};

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let lenis: LenisInstance | null = null;
    let rafId: number;
    let mounted = true;

    (async () => {
      const { default: Lenis } = await import('@studio-freight/lenis');
      if (!mounted) return;

      lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        wheelMultiplier: 1,
        easing: (t: number) => t,
      }) as LenisInstance;

      const raf = (time: number) => {
        if (!lenis) return;
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    })();

    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
