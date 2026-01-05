'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Pill = { label: string; value: string };
type CarouselItem = { src: string; label: string; note?: string };

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200/70 dark:border-white/10 px-3 py-1 text-xs md:text-sm text-neutral-700 dark:text-neutral-200 bg-white/70 dark:bg-white/5 backdrop-blur">
      {children}
    </span>
  );
}

function KPI({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-4 md:p-5">
      <div className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">{label}</div>
      <div className="mt-1 text-2xl md:text-3xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1 text-neutral-500 dark:text-neutral-400">{sub}</div>}
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

function Section({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <section id={id} className="max-w-6xl mx-auto px-6 md:px-8 py-12">
      <div className="rounded-2xl bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/10 p-6 md:p-8">
        <h2 className="text-2xl md:text-2xl font-semibold tracking-tight">{title}</h2>
        <div className="mt-4 space-y-4">{children}</div>
      </div>
    </section>
  );
}

function ZoomModal({
  open,
  onClose,
  title,
  src,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  src: string;
}) {
  React.useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => {
        // click outside to close
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-5xl rounded-2xl bg-white dark:bg-neutral-950 border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/5 dark:border-white/10">
          <div className="text-sm md:text-base font-semibold">{title}</div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
          >
            Close
          </button>
        </div>

        <div className="p-4">
          <div className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-3 flex justify-center">
            <Image
              src={src}
              alt={title}
              width={1800}
              height={1200}
              className="max-h-[78vh] w-auto object-contain rounded-lg"
              priority
            />
          </div>
          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            Tip: press <span className="font-medium">Esc</span> to close.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Horizontal carousel:
 * - drag/scroll on trackpad
 * - buttons
 * - keyboard arrows when focused
 * - click image to open zoom modal
 */
function HorizontalCarousel({
  items,
  title,
  onZoom,
}: {
  items: CarouselItem[];
  title: string;
  onZoom: (item: CarouselItem) => void;
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(0);

  const scrollToIndex = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const children = Array.from(el.querySelectorAll('[data-card="true"]')) as HTMLElement[];
    const card = children[idx];
    if (!card) return;

    card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setActive(idx);
  };

  const prev = () => scrollToIndex(Math.max(0, active - 1));
  const next = () => scrollToIndex(Math.min(items.length - 1, active + 1));

  // Keep active in sync with scroll (approx) so arrow buttons work after manual scroll.
  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('[data-card="true"]')) as HTMLElement[];
    if (!cards.length) return;

    const left = el.scrollLeft;
    let best = 0;
    let bestDist = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const dist = Math.abs(cards[i].offsetLeft - left);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    setActive(best);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  return (
    <div className="rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold">{title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
            Click a screen to zoom.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={prev}
            disabled={active === 0}
            className="rounded-full px-3 py-1.5 text-sm border border-black/10 dark:border-white/10 disabled:opacity-40 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Previous"
          >
            ←
          </button>
          <button
            type="button"
            onClick={next}
            disabled={active === items.length - 1}
            className="rounded-full px-3 py-1.5 text-sm border border-black/10 dark:border-white/10 disabled:opacity-40 hover:bg-black/5 dark:hover:bg-white/10"
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-4 flex gap-6 overflow-x-auto snap-x snap-mandatory pb-3 focus:outline-none"
        tabIndex={0}
        role="region"
        aria-label={`${title} carousel`}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
      >
        {items.map((item, i) => (
          <div
            key={item.src}
            data-card="true"
            className="snap-start shrink-0 w-[300px] sm:w-[360px] md:w-[420px]"
          >
            <button
              type="button"
              onClick={() => onZoom(item)}
              className="w-full text-left rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20"
              aria-label={`Zoom ${item.label}`}
            >
              <div
                className={[
                  'rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-3 transition-transform duration-200',
                  i === active ? 'shadow-sm' : '',
                ].join(' ')}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  width={1100}
                  height={800}
                  className="h-[220px] md:h-[240px] w-full object-contain rounded-xl border border-black/5 dark:border-white/10 bg-white"
                />
                <div className="mt-2">
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{item.label}</p>
                  {item.note && (
                    <p className="text-xs mt-1 text-neutral-500 dark:text-neutral-400">{item.note}</p>
                  )}
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>

      <div className="text-xs text-neutral-500 dark:text-neutral-400">
        {active + 1} / {items.length}
      </div>
    </div>
  );
}

function OwnedCallout({
  items,
  note,
}: {
  items: Pill[];
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
      <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">What I owned</p>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {items.map((x) => (
          <div key={x.label} className="rounded-xl border border-black/5 dark:border-white/10 bg-neutral-50 dark:bg-white/5 p-4">
            <div className="text-sm font-semibold">{x.label}</div>
            <div className="mt-1 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">{x.value}</div>
          </div>
        ))}
      </div>
      {note && <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{note}</p>}
    </div>
  );
}

/** ===== Page Content Data ===== */

const TECH = [
  'JavaScript',
  'React',
  'Figma',
  'Electron',
  'Django REST Framework',
  'JWT Authentication',
  'SQL',
  'python-docx',
  'openpyxl',
  'xhtml2pdf',
  'GitHub',
  'Docker (local dev)',
  'Visily',
];

const WIREFRAMES: CarouselItem[] = [
  { src: '/wireframes/Accessing_Restricted_Information.png', label: 'Accessing Restricted Information', note: 'Permission gating with clear messaging and safe defaults.' },
  { src: '/wireframes/Dashboard_Homescreen.png', label: 'Dashboard Homescreen', note: 'At-a-glance view of reporting areas and activity.' },
  { src: '/wireframes/Create_Custom_Report.png', label: 'Create Custom Report', note: 'Custom report builder with configurable columns and templates.' },
  { src: '/wireframes/Reporting.png', label: 'Reporting', note: 'Consistent table patterns, sorting, filters, and export entry points.' },
  { src: '/wireframes/Social_Media_View.png', label: 'Social Media View', note: 'Structured social tracking with engagement-friendly fields.' },
  { src: '/wireframes/Sponsorships_and_Grants_View.png', label: 'Sponsorships & Grants', note: 'Donation and sponsorship records with status and history.' },
  { src: '/wireframes/User_Management_Settings.png', label: 'User Management & Settings', note: 'Role assignment, access control, and admin tooling.' },
  { src: '/wireframes/Saved.png', label: 'Saved Reports', note: 'Saved report artifacts with export options.' },
  { src: '/wireframes/Documentation.png', label: 'Documentation', note: 'Built-in guidance for non-technical users.' },
];

const ARCHITECTURE: CarouselItem[] = [
  { src: '/wireframes/image19.png', label: 'System Context Diagram', note: 'Roles, access requests, and reporting flows around the core system.' },
  { src: '/wireframes/image16.png', label: 'Filter Flow (DFD)', note: 'Date filtering and query flow into the report retrieval step.' },
  { src: '/wireframes/image14.png', label: 'Authentication & RBAC Flow', note: 'Credential validation, permission assignment, and alerting on failures.' },
  { src: '/wireframes/image10.png', label: 'Data Model (ERD)', note: 'Normalized entities to reduce duplication and support consistent exports.' },
  { src: '/wireframes/image4.png', label: 'Report Lifecycle Flow', note: 'Login → Create/Edit → Export, with DB boundaries and stakeholders.' },
  { src: '/wireframes/image1.png', label: 'Event Input + Validation Flow', note: 'Validation and error handling to prevent incomplete or inconsistent entries.' },
];

const OWNED: Pill[] = [
  {
    label: 'Frontend UI (React)',
    value: 'Designed and implemented core screens, reusable components, navigation patterns, and export UX for non-technical users.',
  },
  {
    label: 'System design artifacts',
    value: 'Produced the context diagram, DFDs, and ERD to align the team on flows, entities, and validation boundaries.',
  },
  {
    label: 'Data integrity & UX safeguards',
    value: 'Partnered with the team to enforce input validation, role-based access patterns, and clear empty/error states.',
  },
  {
    label: 'Collaboration & delivery',
    value: 'Worked closely with backend and testing to ensure UI matched API contracts and edge cases were covered end-to-end.',
  },
];

type Persona = 'SWE' | 'Product';

const COPY: Record<Persona, { overview: string; valueProp: string; impactBullets: string[] }> = {
  SWE: {
    overview:
      'Caregiver Mental Wellness, Inc. was managing programs, donations, and social media reporting using shared Excel spreadsheets. As the dataset grew, this created frequent data-entry errors, inconsistent fields, and a painful workflow for generating stakeholder reports.',
    valueProp:
      'I helped design and build a unified desktop reporting platform that centralized organizational data, enforced validation and role-based access, and enabled repeatable report generation with exports to PDF, Word, and Excel.',
    impactBullets: [
      'Reduced field inconsistency by moving from freeform spreadsheet inputs to validated forms and normalized data structures.',
      'Improved collaboration by replacing shared spreadsheets with role-based access and auditable edits.',
      'Streamlined reporting by supporting structured exports (PDF/Word/Excel) from a consistent data model.',
    ],
  },
  Product: {
    overview:
      'The organization relied on shared Excel files to track operations and prepare stakeholder updates. The approach didn’t scale: teams fought the same sheets, fields drifted, and reporting became slow and error-prone.',
    valueProp:
      'We proposed and delivered a desktop reporting system that made reporting reliable: standardized inputs, clear permissions, and repeatable exports so leadership could trust the numbers.',
    impactBullets: [
      'Created a single place to track operational activity instead of scattered spreadsheets.',
      'Introduced clear roles and permissions so teams could collaborate without overwriting each other.',
      'Made reporting repeatable by standardizing data capture and offering consistent exports.',
    ],
  },
};

export default function CaregiverPage() {
  const [persona, setPersona] = React.useState<Persona>('SWE');

  const [zoom, setZoom] = React.useState<{ open: boolean; title: string; src: string }>({
    open: false,
    title: '',
    src: '',
  });

  const openZoom = (item: CarouselItem) => setZoom({ open: true, title: item.label, src: item.src });
  const closeZoom = () => setZoom({ open: false, title: '', src: '' });

  return (
    <main className="bg-[#f5f5f7] text-black dark:bg-black dark:text-white">
      <ZoomModal open={zoom.open} onClose={closeZoom} title={zoom.title} src={zoom.src} />

      {/* Header */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-10">
        <Link href="/#selected-work" className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
          ← Back to Work
        </Link>

        <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Report Management System
          </h1>
          <Image
            src="/logos/caregiverlogo.png"
            alt="Caregiver Mental Wellness"
            width={64}
            height={64}
            className="h-9 w-auto md:h-12 md:w-auto"
            priority
          />
        </div>

        <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-lg max-w-3xl">
          Software Engineer · Product Manager · Caregiver Mental Wellness, Inc.<br />
          Desktop reporting and operations platform for a non-profit
        </p>

        {/* Persona toggle */}
        <div className="mt-6 flex items-center gap-2">
          <div className="rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur p-1">
            {(['SWE', 'Product'] as Persona[]).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPersona(p)}
                className={[
                  'px-3 py-1.5 rounded-full text-sm transition-colors',
                  persona === p ? 'bg-black text-white' : 'text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10',
                ].join(' ')}
                aria-pressed={persona === p}
              >
                {p} view
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + Context */}
      <Section title="Overview" id="overview">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
              {COPY[persona].overview}
            </p>
            <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
              {COPY[persona].valueProp}
            </p>

            {/* Problem / Solution mini card */}
            <div className="rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Problem
              </h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>Shared Excel sheets with weak validation led to inconsistent fields and frequent errors.</li>
                <li>Multiple contributors editing the same files created coordination friction and overwrites.</li>
                <li>Stakeholder reporting was manual, slow, and difficult to standardize across programs.</li>
              </ul>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Proposed solution
              </h3>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>A centralized desktop system for tracking operations and generating reports.</li>
                <li>Role-based access and input validation to prevent inconsistent entries.</li>
                <li>Dynamic reporting with exports to PDF, Word, and Excel.</li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-5 space-y-5">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold">Context</h3>
              <div className="mt-3">
                <InfoRow k="Org" v="Caregiver Mental Wellness, Inc. (Non-profit)" />
                <InfoRow k="Users" v="Administrators, Co-administrators, Contributors" />
                <InfoRow k="Primary goal" v="Reliable reporting + centralized operational tracking" />
                <InfoRow k="Delivery" v="Cross-platform desktop app (Electron)" />
              </div>
            </div>

            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900">
              <h3 className="text-base font-semibold">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Ownership callout */}
      <Section title="My Contributions" id="contributions">
        <OwnedCallout
          items={OWNED}
          note="Note: I also implemented frontend functionality — not only the UI. I owned the UI build-out and the system/design artifacts that aligned the team on validation, roles, and reporting flows."
        />
      </Section>

      {/* Impact */}
      <Section title="Impact" id="impact">
        <div className="grid gap-4 md:grid-cols-3">
          <KPI label="Data quality" value="Fewer input errors" sub="Validated forms + consistent fields" />
          <KPI label="Collaboration" value="Clear roles & access" sub="Avoid spreadsheet collisions" />
          <KPI label="Reporting" value="Repeatable exports" sub="PDF / Word / Excel formats" />
        </div>

        <div className="rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-5 mt-6">
          <h3 className="text-base font-semibold">What changed</h3>
          <ul className="mt-3 space-y-2 list-disc pl-5 text-neutral-700 dark:text-neutral-300">
            {COPY[persona].impactBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* UI Wireframes (Swipe) */}
      <Section title="UI Wireframes" id="ui">
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          I designed and implemented the UI to make reporting workflows predictable for non-technical users: consistent table patterns, clear navigation,
          and safe validation boundaries. Below are key screens (swipe to explore).
        </p>
        <HorizontalCarousel items={WIREFRAMES} title="Key Screens" onZoom={openZoom} />
      </Section>

      {/* Architecture & Diagrams (Swipe + Zoom; constrained sizes) */}
      <Section title="System Architecture & Diagrams" id="architecture">
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          To align engineering and product decisions, I produced system artifacts that clarified roles, validation boundaries, data flow, and the underlying data model.
          The diagrams below are kept intentionally compact for readability (click to zoom).
        </p>
        <HorizontalCarousel items={ARCHITECTURE} title="Architecture Artifacts" onZoom={openZoom} />
      </Section>

      {/* Implementation Notes */}
      <Section title="Implementation Notes" id="implementation">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
            <h3 className="text-base font-semibold">Validation & Permissions</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              The UI was built around validated inputs and role-based access patterns so contributors could enter data safely,
              while administrators controlled permissions and visibility.
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
            <h3 className="text-base font-semibold">Report Generation</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Reporting workflows were structured to be repeatable: consistent filtering, predictable table behavior, and export entry points that map cleanly
              to the backend export pipeline (PDF, Word, Excel).
            </p>
          </div>

          <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-5">
            <h3 className="text-base font-semibold">UX for Non-technical Users</h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              I prioritized clarity: empty states, error feedback, and consistent navigation patterns.
              The goal was to make the “right way” the easiest way for day-to-day operations.
            </p>
          </div>
        </div>
      </Section>

      {/* Footer spacing */}
      <div className="h-10" />
    </main>
  );
}
