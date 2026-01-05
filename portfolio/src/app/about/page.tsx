'use client';

import React from 'react';
import Link from 'next/link';

function Section({
  title,
  subtitle,
  children,
  id,
  centerHead = false,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
  centerHead?: boolean;
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/10 p-6 md:p-8 overflow-hidden">
        <div className={centerHead ? 'text-center' : ''}>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>

          {subtitle ? (
            <p
              className={[
                'mt-2 text-neutral-600 dark:text-neutral-300 leading-relaxed',
                centerHead ? 'max-w-3xl mx-auto' : 'max-w-3xl',
              ].join(' ')}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

type RoleCard = {
  title: string;
  short: 'PM' | 'TPM' | 'SWE';
  tone: 'light' | 'dark';
  bullets: string[];
};

function FlipCard({
  title,
  short,
  tone,
  bullets,
  flipped,
  onToggle,
}: RoleCard & { flipped: boolean; onToggle: () => void }) {
  const isDark = tone === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      className="group text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
      aria-pressed={flipped}
      aria-label={`Flip card for ${title}`}
    >
      <div className="relative h-[420px] sm:h-[460px] md:h-[520px] w-full [perspective:1200px]">
        <div
          className={[
            'absolute inset-0 rounded-2xl transition-transform duration-500 [transform-style:preserve-3d]',
            flipped ? '[transform:rotateY(180deg)]' : '',
          ].join(' ')}
        >
          {/* FRONT */}
          <div
            className={[
              'absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm',
              'p-7 md:p-8 flex flex-col justify-between',
              '[backface-visibility:hidden]',
              isDark
                ? 'bg-black text-white'
                : 'bg-white dark:bg-neutral-900 text-black dark:text-white',
            ].join(' ')}
          >
            <div>
              <div
                className={[
                  'text-xs uppercase tracking-[0.25em] opacity-70',
                  isDark
                    ? 'text-white/70'
                    : 'text-neutral-500 dark:text-neutral-400',
                ].join(' ')}
              >
                Click to flip
              </div>

              <h3 className="mt-5 text-3xl md:text-4xl font-semibold leading-tight">
                {title}
              </h3>

              <p
                className={[
                  'mt-4 text-base md:text-lg leading-relaxed',
                  isDark ? 'text-white/80' : 'text-neutral-600 dark:text-neutral-300',
                ].join(' ')}
              >
                Tap to see how I approach work in this lane.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div
                className={[
                  'text-sm opacity-70',
                  isDark
                    ? 'text-white/70'
                    : 'text-neutral-500 dark:text-neutral-400',
                ].join(' ')}
              >
                Tap again to flip back
              </div>

              <div
                className={[
                  'h-11 w-11 rounded-full flex items-center justify-center text-xl font-semibold',
                  isDark ? 'bg-white/10' : 'bg-black/5 dark:bg-white/10',
                ].join(' ')}
                aria-hidden="true"
              >
                +
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className={[
              'absolute inset-0 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm',
              'p-7 md:p-8 flex flex-col',
              '[backface-visibility:hidden] [transform:rotateY(180deg)]',
              isDark
                ? 'bg-black text-white'
                : 'bg-white dark:bg-neutral-900 text-black dark:text-white',
            ].join(' ')}
          >
            <div className="flex-1 min-h-0 flex flex-col">
              <div
                className={[
                  'text-xs uppercase tracking-[0.25em] opacity-70',
                  isDark
                    ? 'text-white/70'
                    : 'text-neutral-500 dark:text-neutral-400',
                ].join(' ')}
              >
                What you can expect
              </div>

              <h3 className="mt-4 text-xl md:text-2xl font-semibold">
                {short}
              </h3>

              <div
                className="mt-5 flex-1 overflow-y-auto pr-2"
                style={{ scrollbarWidth: 'thin' }}
              >
                <ul
                  className={[
                    'space-y-4 list-disc pl-5 leading-relaxed',
                    'text-[15px] md:text-base',
                    isDark ? 'text-white/90' : 'text-neutral-700 dark:text-neutral-300',
                  ].join(' ')}
                >
                  {bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between">
              <div
                className={[
                  'text-sm opacity-70',
                  isDark
                    ? 'text-white/70'
                    : 'text-neutral-500 dark:text-neutral-400',
                ].join(' ')}
              >
                Tap again to flip back
              </div>

              <div
                className={[
                  'h-11 w-11 rounded-full flex items-center justify-center text-xl font-semibold',
                  isDark ? 'bg-white/10' : 'bg-black/5 dark:bg-white/10',
                ].join(' ')}
                aria-hidden="true"
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scoped scrollbar styling */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.22);
          border-radius: 999px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.32);
        }
        :global(.dark) div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.22);
        }
        :global(.dark) div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.32);
        }
      `}</style>
    </button>
  );
}

const ROLES: RoleCard[] = [
  {
    title: 'Product Manager',
    short: 'PM',
    tone: 'dark',
    bullets: [
      'Define the user, the constraint, and the measurable outcome before selecting features.',
      'Write requirements and acceptance criteria that remove ambiguity for execution.',
      'Prioritize with impact, risk, and adoption so teams ship the right things first.',
      'Design workflows that make the correct action the easiest action for real operators.',
    ],
  },
  {
    title: 'Technical Program Manager',
    short: 'TPM',
    tone: 'light',
    bullets: [
      'Translate goals into milestones with owners, dependencies, risks, and delivery criteria.',
      'Run predictable execution with lightweight check ins, crisp status, and documented decisions.',
      'Unblock teams early by aligning stakeholders, surfacing tradeoffs, and closing open loops.',
      'Hold quality and reliability as non negotiable when systems affect operations.',
    ],
  },
  {
    title: 'Software Engineer',
    short: 'SWE',
    tone: 'light',
    bullets: [
      'Build clean interfaces that are easy to learn and fast to use.',
      'Implement the supporting logic and integration points that keep the product reliable.',
      'Ship MVPs quickly with maintainable structure, reusable components, and careful UX details.',
      'Treat UI like a product surface where consistency, accessibility, and clarity matter.',
    ],
  },
];

const TOOL_PILLS = ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Figma', 'GitHub'];

export default function AboutPage() {
  const [flippedIdx, setFlippedIdx] = React.useState<number | null>(null);

  return (
    <main className="bg-[#f5f5f7] text-black dark:bg-black dark:text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-8">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-10 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            <span>Hello, </span>
            <span className="text-neutral-500 dark:text-neutral-400">I am Ethel</span>
          </h1>

          <p className="mt-5 text-lg text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            I build products and operational systems that make teams faster and decisions more reliable. I work across product thinking, program execution, and front end engineering, which means I can define the right outcome, drive delivery with clear systems, and implement the parts that matter.
          </p>

          <p className="mt-4 text-base text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            I am strongest in environments where the work requires structure, ownership, and a high bar for quality.
          </p>
        </div>
      </section>

      {/* HOW I OPERATE */}
      <Section
        title="How I Operate"
        subtitle="I define outcomes clearly, drive execution with structure, and build what needs to be built when it matters."
        id="how-i-operate"
        centerHead
      >
        <div className="grid gap-5 md:gap-6 md:grid-cols-3">
          {ROLES.map((r, idx) => (
            <FlipCard
              key={r.title}
              {...r}
              flipped={flippedIdx === idx}
              onToggle={() => setFlippedIdx((v) => (v === idx ? null : idx))}
            />
          ))}
        </div>
      </Section>

      {/* PORTFOLIO AS A PROJECT */}
      <Section
        title="This portfolio is also a project"
        subtitle="I built this portfolio to be fast, structured, and easy to explore."
        id="portfolio-project"
        centerHead
      >
        <div className="flex flex-col items-center text-center">
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            This portfolio is powered by:
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            {TOOL_PILLS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2 text-sm text-neutral-800 dark:text-neutral-200"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-black text-white px-6 py-3 text-sm font-medium hover:opacity-90"
            >
              Contact
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
