'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";

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
      <div className="text-sm md:text-base text-neutral-800 dark:text-neutral-200 max-w-[70ch] text-right">{v}</div>
    </div>
  );
}

function FlipCard({ 
  title, 
  before, 
  after 
}: { 
  title: string; 
  before: string; 
  after: string; 
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-pressed={flipped}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20 dark:focus-visible:ring-white/20 rounded-2xl"
    >
      <div className="[perspective:1000px]">
        <div
          className={[
            "relative h-36 transition-transform duration-500 [transform-style:preserve-3d]",
            flipped ? "[transform:rotateY(180deg)]" : "",
          ].join(" ")}
        >
          {/* BEFORE (black) */}
          <div className="absolute inset-0 rounded-2xl bg-black text-white p-4 border border-black/20 [backface-visibility:hidden]">
            <div className="text-xs font-medium text-white/70">BEFORE</div>
            <div className="mt-1 text-sm font-semibold">{title}</div>
            <div className="mt-2 text-sm text-white/90">{before}</div>
            <div className="mt-3 text-xs text-white/60">Click to flip</div>
          </div>

          {/* AFTER (white) */}
          <div className="absolute inset-0 rounded-2xl bg-white text-black p-4 border border-black/10 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="text-xs font-medium text-neutral-500">AFTER</div>
            <div className="mt-1 text-sm font-semibold">{title}</div>
            <div className="mt-2 text-sm text-neutral-800">{after}</div>
            <div className="mt-3 text-xs text-neutral-500">Click to flip back</div>
          </div>
        </div>
      </div>
    </button>
  );
}

function BeforeAfterFlipCards() {
  const items = [
    {
      title: "Status updates",
      before: "Unstructured updates in threads",
      after: "Single dashboard with drill-downs",
    },
    {
      title: "Readiness criteria",
      before: "Ambiguous criteria across teams",
      after: "Standardized thresholds per team",
    },
    {
      title: "Decision timing",
      before: "Decisions after sync meetings",
      after: "Decisions on demand with live data",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((x) => (
        <FlipCard key={x.title} {...x} />
      ))}
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

const TOOLS = ['Jira DC (JQL)', 'Xray', 'Grafana', 'Snowflake', 'PostgreSQL', 'Jenkins', 'FastAPI', 'Python', 'Containers', 'GitHub'];

function DesignProcessInteractive() {
  const STEPS = [
    { key: 'discover', title: 'Discovery', blurb: 'Interviewed stakeholders to understand existing release readiness process and distinguish between trusted and ignored signals.' },
    { key: 'metrics', title: 'Define Metrics', blurb: 'Translated release health into measurable indicators, including development progress, test pass rates, and security and performance issue counts, and defines clear thresholds and weighting.' },
    { key: 'datamodel', title: 'Data Modeling', blurb: 'Designed a unified data model across Jira, Xray, Jenkins, and Grafana with well defined representations for features, readiness status, and blockers in PostgreSQL and Snowflake.' },
    { key: 'ux', title: 'UX Prototyping', blurb: 'Iterated from low-fidelity to high-fidelity dashboard designs, focusing on at-a-glance status, a clear triage view, and actionable drill-downs for feature owners.' },
    { key: 'build', title: 'Build & Integrate', blurb: 'Implemented FastAPI endpoints and Python aggregation services, validated queries against Jira using JQL, and deployed containerized services with robust error and empty state handling.' },
    { key: 'iterate', title: 'Iterate & Validate', blurb: 'Reviewed the system weekly with stakeholders, refined the thresholds, improved the loading behavior, and strengthened performance using real usage patterns.' },
  ];

  const [active, setActive] = React.useState<number | null>(null);
  const expanded = active !== null;
  const SIZE = 560;
  const CENTER = SIZE / 2;
  const RING_R = 190;
  const NODE_OUT = 130;
  const NODE_IN = 86;

  const points = React.useMemo(() => {
    return STEPS.map((_, i) => {
      const a = (i / STEPS.length) * 2 * Math.PI - Math.PI / 2;
      return { x: Math.cos(a) * RING_R + CENTER, y: Math.sin(a) * RING_R + CENTER };
    });
  }, []);

  const onCanvasClick = (e: React.MouseEvent) => {
    const target = e.target as Element;
    if (target.closest('button')) return;
    setActive(null);
  };

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <div className={`grid items-start gap-8 ${expanded ? 'md:grid-cols-12' : ''}`}>
        <div className={expanded ? 'md:col-span-6' : 'w-full flex justify-center'}>
          <div className={`relative mx-auto transition-transform duration-500 ${expanded ? 'md:-translate-x-10' : ''}`} onClick={onCanvasClick} style={{ width: SIZE, height: SIZE }}>
            <svg className="absolute inset-0 z-0" width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
              <circle cx={CENTER} cy={CENTER} r={RING_R} fill="none" className="stroke-[2.5] stroke-neutral-200/80 dark:stroke-white/10" />
              {points.map((p, i) => (<line key={`ln-${i}`} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y} className="stroke-neutral-300 dark:stroke-white/20" strokeWidth="6" strokeLinecap="round" />))}
            </svg>
            <div className="absolute z-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-white/20 flex items-center justify-center text-center" style={{ left: CENTER, top: CENTER, width: 170, height: 170, transform: 'translate(-50%, -50%)' }}>
              {expanded ? (
                <div className="px-4">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Design Process</p>
                  <button onClick={() => setActive(null)} className="text-sm underline underline-offset-4 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">Recenter</button>
                </div>
              ) : (
                <span className="text-sm italic text-neutral-400 dark:text-neutral-500">click to discover more</span>
              )}
            </div>
            {STEPS.map((s, i) => (<RingNode key={s.key} x={points[i].x} y={points[i].y} outer={NODE_OUT} inner={NODE_IN} selected={active === i} label={s.title} onClick={(e: React.MouseEvent) => { e.stopPropagation(); setActive(i); }} />))}
          </div>
        </div>
        {expanded && (
          <div className="md:col-span-6 w-full">
            <div className="mt-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-900 p-6 md:p-7 transition-all duration-500">
              <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">Design Process</p>
              <h3 className="mt-1 text-2xl font-semibold">{STEPS[active as number].title}</h3>
              <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">{STEPS[active as number].blurb}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RingNode({ x, y, outer, inner, selected, label, onClick }: { x: number; y: number; outer: number; inner: number; selected: boolean; label: string; onClick: (e: React.MouseEvent) => void; }) {
  return (
    <button onClick={onClick} style={{ left: x, top: y, width: outer, height: outer, transform: 'translate(-50%, -50%)' }} className={`absolute z-10 rounded-full grid place-items-center transition-transform duration-200 will-change-transform ${selected ? 'shadow-xl -translate-y-1' : ''} hover:-translate-y-2 hover:shadow-lg`} aria-pressed={selected}>
      <div className={`rounded-full grid place-items-center border-[10px] ${selected ? 'border-black' : 'border-neutral-300 dark:border-white/25'}`} style={{ width: outer, height: outer }}>
        <div className={`rounded-full bg-white dark:bg-neutral-900 text-center px-3 flex items-center justify-center ${selected ? 'text-black dark:text-black' : 'text-neutral-800 dark:text-neutral-200'}`} style={{ width: inner, height: inner }}>
          <span className="text-sm md:text-base leading-tight">{label}</span>
        </div>
      </div>
    </button>
  );
}

export default function R3Page() {
  return (
    <main className="bg-[#f5f5f7] text-black dark:bg-black dark:text-white">
      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-24 md:pt-28 pb-10">
        <Link href="/#selected-work" className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">← Back to Work</Link>
        <div className="mt-6 md:mt-8 flex items-center gap-3 md:gap-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">R3 Automation Dashboard</h1>
          <Image src="/logos/PsLogo.svg" alt="Pure Storage" width={44} height={44} className="h-8 w-auto md:h-11 md:w-auto" priority />
        </div>
        <p className="mt-3 text-neutral-600 dark:text-neutral-300 text-lg max-w-3xl">
          Technical Program Manager Intern - Flashblade Product · Summer 2025<br />
          Engineering Intelligence for Release Readiness
        </p>
      </section>

      <Section title="Overview" id="overview">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
              <span className="font-medium"> Release Readiness Review (R3) </span> is an engineering intelligence workflow for evaluating feature readiness across development, tesing, performance, and security teams before merging into the release branch. It standardizes readiness criteria, consolidates signals, and provides a single source of truth for release decisions.
            </p>
            <div className="rounded-xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400 mb-2">
                Problem
              </h3>
              <ul className="list-disc pl-5 text-sm text-neutral-700 dark:text-neutral-300 space-y-1">
                <li>Readiness signals scattered across Jira, Jenkins, Grafana, Xray, and Google Sheets.</li>
                <li>No shared definition of feature readiness across teams</li>
                <li>High coordination costs before every release cut.</li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4">
              <h3 className="text-base font-semibold">Context</h3>
              <div className="mt-3">
                <InfoRow k="Org" v="Pure Storage (FlashBlade)" />
                <InfoRow k="Stakeholders" v="TPMs, QA, Feature Owners, Performance & Security Teams, Engineering Managers" />
                <InfoRow k="Constraints" v="Data split across tools; must be auditable" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Process" id="process">
        <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
          I met each team, defined readiness signals and thresholds, mapped systems, and built the glue. Below is the interactive high‑level design process I followed.
        </p>
        <DesignProcessInteractive />
      </Section>

      <Section title="Solution" id="solution">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-lg font-semibold">Single source of truth on one centralized dashboard</h3>
            <p className="leading-relaxed text-neutral-700 dark:text-neutral-300">
              I standardized release readiness fields in Jira DC and aggregated live and historical signals from Jira, Jenkins, Xray, and Snowflake into PostgreSQL via FastAPI. These consolidated signals then powered Grafana dashboards that surfaced at-a-glance release readiness for features and releases, with drill-downs for owners to investigate risks and blockers.
            </p>
           </div>
          <div className="md:col-span-5">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4">
              <h3 className="text-base font-semibold">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {TOOLS.map((t) => (<Badge key={t}>{t}</Badge>))}
              </div>
            </div>
          </div>
        </div> 
        
        <div className="mt-10">
          <Image src="/logos/R3.png" alt="Final R3 Dashboard" width={1400} height={900} className="rounded-2xl border border-black/5 dark:border-white/10 w-full h-auto" />
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">Final implemented R3 dashboard visualization (Contains Mock Data).</p>
        </div>
      </Section>
      
      <Section title="Impact" id="impact">
        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-3">
          <KPI
            label="Cross-team alignment"
            value="Shared readiness rubric"
            sub="agree once, reuse forever"
          />
          <KPI
            label="Operational load"
            value="As-needed reviews"
            sub="no standing meetings"
          />
          <KPI
            label="Auditability"
            value="Queryable history"
            sub="Jira fields as the system of record"
          />
        </div>

        {/* Impact details */}
        <div className="mt-6 space-y-6">
          {/* BEFORE → AFTER */}
          <div className="rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-5">
            <h3 className="text-base font-semibold">Before → After</h3>
            <div className="mt-4">
              <BeforeAfterFlipCards />
            </div>
          </div>

          {/* MY SCOPE */}
          <div className="rounded-2xl bg-neutral-50 dark:bg-white/5 border border-neutral-200/70 dark:border-white/10 p-5">
            <h3 className="text-base font-semibold">My Scope (IC)</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-neutral-700 dark:text-neutral-300">
                <li>
                  Defined readiness metrics and team thresholds with TPM, QA, and Engineering, and mapped dependencies from performance and security → testing → release.
                </li>
                <li>
                  Designed the data model spanning Jira DC (JQL), Xray, Jenkins, and Grafana → a PostgreSQL schema.
                </li>
                <li>
                  Built the aggregation layer using FastAPI and Python, deployed as containerized services with clear error and empty-state handling.
                </li>
                <li>
                  Led dashboard UX for at-a-glance status, triage views, and drill-downs, progressing from
                  low-fidelity → high-fidelity through stakeholder reviews.
                </li>
                <li>
                  Produced technical documentation including API contracts, schemas, L0/L1 DFDs, ERDs, and operational runbooks.
                </li>
            </ul>
          </div>
        </div>
      </Section>


{/* APPENDIX: Artifacts */}
<Section title="Appendix — Artifacts" id="artifacts">
  <div className="grid gap-6 md:grid-cols-3">
    <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4">
      <h4 className="font-semibold">Data Flow (L0 → L1)</h4>
      <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
        System context and decomposition diagrams describing fetch → normalize → compute → visualize loops.
      </p>
    </div>
    <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4">
      <h4 className="font-semibold">Schema &amp; JQL</h4>
      <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
        Tables, keys, and canonical Jira custom fields with example JQL queries.
      </p>
    </div>
    <div className="rounded-2xl border border-black/5 dark:border-white/10 p-4">
      <h4 className="font-semibold">API Contracts</h4>
      <p className="text-sm mt-2 text-neutral-700 dark:text-neutral-300">
        FastAPI endpoints, payloads, and error semantics; pagination and freshness guarantees.
      </p>
    </div>
  </div>
</Section>
</main>
);
}

