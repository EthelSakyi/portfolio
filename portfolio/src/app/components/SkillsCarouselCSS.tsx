'use client';

import Image from 'next/image';

type Item = { name: string; src: string };

export default function SkillsCarouselCSS({ items }: { items: Item[] }) {
  // Duplicate list for seamless loop
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div
        className="flex items-center gap-8 animate-marquee [animation-duration:55s] hover:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {loop.map((it, i) => (
          <Image
            key={`${it.name}-${i}`}
            src={it.src}
            alt={it.name}
            width={48}
            height={48}
            className="h-12 w-12 object-contain opacity-90 hover:opacity-100 transition-transform duration-300 hover:scale-105"
            priority={i < 10}
          />
        ))}
      </div>
    </div>
  );
}
