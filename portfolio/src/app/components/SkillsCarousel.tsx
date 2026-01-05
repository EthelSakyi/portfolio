'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Item = { name: string; src: string };

export default function SkillsCarousel({ items }: { items: Item[] }) {
  const track = useRef<HTMLDivElement>(null);
  const raf = useRef<number | null>(null);
  const [paused, setPaused] = useState(false);

  // tweak speed here (px per frame @ ~60fps)
  const SPEED = 0.25;

  useEffect(() => {
    const el = track.current;
    if (!el) return;

    const tick = () => {
      if (!el) return;
      // seamless loop: render items twice; when past halfway, jump back by half
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft -= el.scrollWidth / 2;
      if (!paused) el.scrollLeft += SPEED;
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* scroller (NO fade overlays) */}
      <div
        ref={track}
        className="no-scrollbar flex items-center gap-6 overflow-x-auto px-2 py-2"
      >
        {[...items, ...items].map((it, i) => (
          <div key={`${it.name}-${i}`} className="shrink-0">
            <Image
              src={it.src}
              alt={it.name}
              width={48}
              height={48}
              className="h-12 w-12 object-contain opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-105"
              priority={i < 10}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
