'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  delay?: number;
};

export default function Reveal({
  children,
  className,
  as: Tag = 'section',
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLElement>} //  no any (unknown cast is allowed)
      className={clsx(
        'transition-all duration-700 ease-out will-change-transform will-change-opacity',
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        className
      )}
    >
      {children}
    </Tag>
  );
}
