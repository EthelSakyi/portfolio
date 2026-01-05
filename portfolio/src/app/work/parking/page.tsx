'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200/70 dark:border-white/10 px-3 py-1 text-xs md:text-sm text-neutral-700 dark:text-neutral-200 bg-white/70 dark:bg-white/5 backdrop-blur">
      {children}
    </span>
  );
}

function KPI({
  label,
  value,
  sub,
  variant = 'light',
}: {
  label: string;
  value: string;
  sub?: string;
  variant?: 'light' | 'dark';
}) {
  const isDark = variant === 'dark';

  return (
    <div
      className={[
        'rounded-2xl border p-4 md:p-5',
        isDark
          ? 'bg-neutral-950 border-white/10'
          : 'bg-white dark:bg-neutral-900 border-black/5 dark:border-white/10',
      ].join(' ')}
    >
      <div
        className={[
          'text-xs uppercase tracking-wide',
          isDark ? 'text-neutral-300/80' : 'text-neutral-500 dark:text-neutral-400',
        ].join(' ')}
      >
        {label}
      </div>

      <div
        className={[
          'mt-1 text-2xl md:text-3xl font-semibold',
          isDark ? 'text-white' : 'text-black dark:text-white',
        ].join(' ')}
      >
        {value}
      </div>

      {sub && (
        <div
          className={[
            'text-xs mt-1',
            isDark ? 'text-neutral-200/70' : 'text-neutral-500 dark:text-neutral-400',
          ].join(' ')}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b last:border-b-0 border-neutral-200/70 dark:border-white/10">
      <div className="text-sm text-neutral-500 dark:text-neutral-400">{k}</div>
      <div className="text-sm md:text-base text-neutral-800 dark:text-neutral-200 max-w-[70ch] text-right">
        {v}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  id,
  subtitle,
}: {
  title: string;
  children: React.ReactNode;
  id?: string;
  subtitle?: string;
}) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/10 p-6 md:p-8">
        <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
          <div>
            <h2 className="text-2xl md:text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div className="mt-5 space-y-5">{children}</div>
      </div>
    </section>
  );
}

function Figure({
  src,
  alt,
  caption,
  maxH = 520,
}: {
  src: string;
  alt: string;
  caption?: string;
  maxH?: number;
}) {
  return (
    <figure className="rounded-2xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-3 md:p-4">
      <div
        className="relative w-full overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-950"
        style={{ maxHeight: maxH }}
      >
        <div className="relative w-full" style={{ height: maxH }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1100px"
            priority={false}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function HorizontalGallery({
  items,
}: {
  items: Array<{ src: string; alt: string; caption?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">Screens</h3>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory pb-2">
          {items.map((it) => (
            <div
              key={it.src}
              className="snap-start shrink-0 w-[92%] sm:w-[70%] md:w-[56%] lg:w-[48%]"
            >
              <Figure src={it.src} alt={it.alt} caption={it.caption} maxH={460} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccordionItem({
  title,
  children,
  open,
  onToggle,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900">
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
        aria-expanded={open}
      >
        <span className="font-medium">{title}</span>
        <span
          className={`text-neutral-500 transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden px-5 pb-5">
          <div className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function BarcodeAccordion() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  const items = [
    {
      title: 'Barcode design (what gets encoded)',
      body: (
        <>
          <p>
            Each printed pass includes a scannable barcode that maps to a single
            parking registration record. The barcode encodes a compact, unique
            identifier (not guest Personally Identifiable Information) so towing
            can verify a vehicle quickly without exposing sensitive info.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              The encoded ID links to a record with guest stay window and pass
              expiration.
            </li>
            <li>
              The printed pass can show human-readable details (for example,
              expiration) while the barcode stays minimal.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Validation flow (what happens when it’s scanned)',
      body: (
        <>
          <p>
            When towing scans the barcode, the system checks whether that ID is
            registered and still valid. This turns “Is this car allowed?” into a
            fast yes or no answer, backed by the system of record.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Lookup the registration by barcode ID and confirm it exists.</li>
            <li>Check expiration (and optionally arrival and departure dates).</li>
            <li>Return a clear result: valid, expired, or not found.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Batch generation (arrival list to printed passes)',
      body: (
        <>
          <p>
            Front desk uploads the daily arrival list once. The system parses it,
            matches arrivals, and generates the passes in a predictable print
            order so the workflow stays fast at check-in.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>
              Removes repetitive manual typing and reduces “missed or wrong plate”
              issues.
            </li>
            <li>
              Produces two passes per arriving reservation and stores a record
              for verification.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Why this mattered operationally',
      body: (
        <>
          <p>
            This replaced a high-friction process with a consistent workflow that
            front desk and towing could both trust.
          </p>
          <ul className="mt-3 list-disc pl-5 space-y-2">
            <li>Less front desk time spent on pen-and-paper passes.</li>
            <li>Fewer disputes because validation is auditable.</li>
            <li>Clear expiration prevents outdated passes from circulating.</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <AccordionItem
          key={it.title}
          title={it.title}
          open={openIdx === idx}
          onToggle={() => setOpenIdx((v) => (v === idx ? null : idx))}
        >
          {it.body}
        </AccordionItem>
      ))}
    </div>
  );
}

const STACK = [
  'Python',
  'Flask / Web Service',
  'PDF parsing',
  'ReportLab (PDF generation and barcodes)',
  'python-barcode (barcode generation option)',
  'Render (hosting)',
  'Operational workflow design',
];

export default function ParkingPage() {
  return (
    <main className="bg-[#f5f5f7] text-black dark:bg-black dark:text-white">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-10">
        <Link
          href="/#selected-work"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          ← Back to Work
        </Link>

        <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Parking Validation System
          </h1>
          <Image
            src="/logos/cambrialogo.png"
            alt="Cambria Hotels"
            width={40}
            height={40}
            className="h-8 w-auto md:h-11 md:w-auto"
            priority
          />
        </div>

        <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-lg max-w-3xl">
          Automating parking registration, pass printing, and scan-based
          verification for front desk and towing operations.
        </p>
      </section>

      {/* OVERVIEW */}
      <Section
        title="Overview"
        id="overview"
        subtitle="I built an MVP that replaced pen-and-paper passes with a structured system that prints scannable parking passes and verifies them in seconds."
      >
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <div className="rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
                Problem
              </h3>
              <ul className="list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>
                  Front desk relied on manual passes (pen-and-paper) and ad-hoc
                  validation.
                </li>
                <li>
                  Limited traceability when towing needed to confirm guest
                  registration.
                </li>
                <li>High operational overhead on busy arrival days.</li>
              </ul>

              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
                Solution
              </h3>
              <ul className="list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>
                  Upload the daily arrival list once and generate two printed
                  passes per arriving guest.
                </li>
                <li>
                  Register vehicles to the guest profile and attach expiration
                  logic.
                </li>
                <li>
                  Let towing scan a barcode to confirm registration and expiry
                  instantly.
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold">My Role</h3>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-neutral-700 dark:text-neutral-300">
                <li>
                  Designed the workflow and UI to match real front desk timing
                  and constraints.
                </li>
                <li>
                  Built the MVP end-to-end and shipped it as a hosted service
                  used by the hotel.
                </li>
                <li>
                  Optimized for reliability and clarity so non-technical staff
                  could operate it confidently.
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-5 space-y-6">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold">Context</h3>
              <div className="mt-3">
                <InfoRow k="Client" v="Cambria Hotel Rock Hill" />
                <InfoRow k="Primary users" v="Front Desk and Towing" />
                <InfoRow k="Core Duty" v="Issue and verify valid passes fast" />
                <InfoRow k="Deployment" v="Hosted MVP on Render" />
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {STACK.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* IMPACT */}
      <Section title="Impact" id="impact">
        <div className="grid gap-4 md:grid-cols-3">
          <KPI
            label="Front desk workflow"
            value="No more pen-and-paper"
            sub="passes are generated from arrivals"
            variant="dark"
          />
          <KPI
            label="Verification"
            value="Scan to validate"
            sub="clear valid, expired, or not found"
            variant="dark"
          />
          <KPI
            label="Operational trust"
            value="Auditable records"
            sub="registration tied to a system record"
            variant="dark"
          />
        </div>
      </Section>

      {/* UI / SCREENS */}
      <Section
        title="UI Walkthrough"
        id="ui"
        subtitle="A simple flow: upload arrivals → generate passes → towing scans to verify."
      >
        <HorizontalGallery
          items={[
            {
              src: '/wireframes/frontdeskview.png',
              alt: 'Front desk view for uploading arrival list and generating passes',
              caption:
                'Front desk interface: upload the daily arrival list and generate passes.',
            },
            {
              src: '/wireframes/ParkingPass.png',
              alt: 'Generated parking pass with barcode for towing verification',
              caption:
                'Printed parking pass: barcode enables quick towing verification and expiry checks.',
            },
          ]}
        />
      </Section>

      {/* BARCODE EXPLANATION */}
      <Section
        title="Barcode and Validation Logic"
        id="barcode"
        subtitle="Semi-technical overview of how the system keeps validation fast, consistent, and safe."
      >
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <BarcodeAccordion />
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-5">
              <h3 className="text-base font-semibold">Design goals</h3>
              <ul className="mt-3 space-y-2 list-disc pl-5 text-neutral-700 dark:text-neutral-300">
                <li>
                  Minimize Personally Identifiable Information exposure (barcode
                  maps to an internal record).
                </li>
                <li>
                  Make outcomes unambiguous for towing (valid, expired, or not
                  found).
                </li>
                <li>Keep front desk steps minimal on busy arrival days.</li>
              </ul>
            </div>

            <div className="mt-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
              <h3 className="text-base font-semibold">MVP outcome</h3>
              <p className="mt-2 text-neutral-700 dark:text-neutral-300 leading-relaxed">
                The MVP worked well operationally, and the team adopted it
                instead of returning to manual passes. The workflow reduced
                overhead for front desk and gave towing a reliable way to verify
                registration and expiration.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* APPENDIX */}
      <Section title="Appendix" id="appendix">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
            <h4 className="font-semibold">Arrival list ingestion</h4>
            <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
              Upload once per day. The system generates passes in a predictable
              order so printing stays fast and consistent.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
            <h4 className="font-semibold">Pass lifecycle</h4>
            <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
              Passes are tied to a record with an expiration rule to reduce
              stale and invalid parking claims.
            </p>
          </div>
          <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
            <h4 className="font-semibold">Verification UX</h4>
            <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
              Clear results for towing: valid, expired, or not found, so
              decisions don’t depend on guesswork.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
