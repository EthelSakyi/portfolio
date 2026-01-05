'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <>
      {/* HERO SECTION (unchanged) */}
      <section className="relative min-h-[84vh] text-white overflow-hidden hero-bg snap-start">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_800px_at_50%_120%,rgba(0,0,0,0.55),transparent_60%)]" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 md:pt-40 text-left">
          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight">
            Product  × Engineering
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl">
            I design interfaces, define systems, and drive execution from idea to delivery.
          </p>
          <div className="mt-10 flex gap-4">
            <Link href="#selected-work" className="inline-flex items-center justify-center rounded-2xl bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition">
              View Work
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-6 py-3 text-sm text-white/90 hover:border-white/40 transition">
              About
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTED WORK SECTION */}
      <section id="selected-work" className="min-h-[100svh] snap-start scroll-mt-24 bg-[#f5f5f7] text-black dark:bg-black dark:text-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            From Concept to Reality.{` `}
            <span className="text-neutral-500 dark:text-neutral-400">See what I&apos;ve been building.</span>
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* ===================== R3 CARD ===================== */}
            <Link
              href="/work/r3"
              className="relative h-[500px] rounded-[28px] overflow-hidden bg-black text-white ring-1 ring-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.10)] transition-transform duration-500 hover:-translate-y-1"
            >
              {/* (No background image/pattern) */}
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="text-3xl font-semibold">R3 Automation Dashboard</h3>
                <p className="mt-3 text-base text-white/85">Engineering intelligence for release readiness</p>
              </div>

              {/* Logo bottom-right: normalized box */}
              <div className="absolute bottom-6 right-6 w-[120px] h-[56px]">
                <Image
                  src="/logos/PsLogo.svg"
                  alt="Pure Storage logo"
                  fill
                  className="object-contain object-right-bottom"
                  priority
                />
              </div>
            </Link>

            {/* ===================== CAREGIVER CARD ===================== */}
            <Link
              href="/work/caregiver"
              className="relative h-[500px] rounded-[28px] overflow-hidden bg-white text-black ring-1 ring-black/5 dark:bg-neutral-900 dark:text-white dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="text-3xl font-semibold">Caregiver Mental Wellness</h3>
                <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
                  Automating clinician reporting for faster decisions
                </p>
              </div>

              {/* removed: background image */}
              {/* Logo bottom-right: normalized box */}
              <div className="absolute bottom-6 right-6 w-[120px] h-[56px]">
                <Image
                  src="/logos/caregiverlogo.png"
                  alt="Caregiver Mental Wellness logo"
                  fill
                  className="object-contain object-right-bottom"
                  priority
                />
              </div>
            </Link>

            {/* ===================== PARKING VALIDATION CARD ===================== */}
            <Link
              href="/work/parking"
              className="relative h-[500px] rounded-[28px] overflow-hidden bg-white text-black ring-1 ring-black/5 dark:bg-neutral-900 dark:text-white dark:ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="text-3xl font-semibold">Parking Validation & Enforcement App</h3>
                <p className="mt-3 text-base text-neutral-600 dark:text-neutral-300">
                  Towing validation and guest vehicle verification for Cambria Hotel
                </p>
              </div>

              {/* removed: background image */}
              {/* Logo bottom-right: normalized box */}
              <div className="absolute bottom-6 right-6 w-[120px] h-[56px]">
                <Image
                  src="/logos/cambrialogo.png"
                  alt="Cambria Hotel logo"
                  fill
                  className="object-contain object-right-bottom"
                  priority
                />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
