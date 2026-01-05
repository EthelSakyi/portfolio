import Hero from './components/Hero'

export default function Home() {
  return (
    <>
      <Hero />
      {/* Palantir-style section */}
      <section className="mx-auto max-w-6xl px-6 py-24 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-semibold">Selected Work</h2>
        <p className="mt-4 text-white/70 max-w-2xl">
          Case studies spanning UI/UX, platform automation, and data-driven delivery.
        </p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'R3 Automation Dashboard', href: '/work/r3' },
            { title: 'Caregiver Report Generator', href: '/work/caregiver' },
            { title: 'Rho Delta Space Station', href: '/work/rho-delta' },
          ].map((c) => (
            <a key={c.title} href={c.href}
               className="group rounded-3xl p-6 border border-white/10 hover:border-white/30 transition">
              <div className="h-28 rounded-2xl bg-white/5 mb-4 group-hover:bg-white/10 transition" />
              <div className="text-lg font-medium">{c.title}</div>
              <div className="text-sm text-white/60 mt-2">Read case study →</div>
            </a>
          ))}
        </div>
      </section>
    </>
  )
}
