import Link from 'next/link';
import Reveal from '../components/Reveal';
import SkillsCarousel from '../components/SkillsCarouselCSS';

// ==== skills: make sure filenames match exactly in /public/logos ====
const skillItems = [
  { name: 'Python', src: '/logos/pythonlogo.png' },
  { name: 'React', src: '/logos/React.png' },
  { name: 'Next.js', src: '/logos/Next.js.svg' },
  { name: 'Tailwind', src: '/logos/CSS3.png' },
  { name: 'FastAPI', src: '/logos/FastAPI.svg' },
  { name: 'Django', src: '/logos/Django.png' },
  { name: 'TypeScript', src: '/logos/TypeScript.svg' },
  { name: 'JavaScript', src: '/logos/JavaScript.png' },
  { name: 'PHP', src: '/logos/PHP.svg' },
  { name: 'PostgreSQL', src: '/logos/PostgresSQL.png' },
  { name: 'MySQL', src: '/logos/MySQL.png' },
  { name: 'MongoDB', src: '/logos/MongoDB.png' },
  { name: 'Grafana', src: '/logos/Grafana.png' },
  { name: 'Jenkins', src: '/logos/Jenkins.png' },
  { name: 'Jira DC', src: '/logos/Jira.png' },
  { name: 'Confluence', src: '/logos/Confluence.png' },
  { name: 'GitHub', src: '/logos/GitHub.svg' },
  { name: 'LaTeX', src: '/logos/LaTeX.png' },
  { name: 'MATLAB', src: '/logos/MATLAB.svg' },
  { name: 'RStudio', src: '/logos/RStudio.png' },
  { name: 'Ubuntu', src: '/logos/Ubuntu.png' },
  { name: 'Homebrew', src: '/logos/Homebrew.svg' },
  { name: 'Trello', src: '/logos/Trello.svg' },
  { name: 'AWS', src: '/logos/AWS.png' },
];

// ==== education: unchanged content ====
const education = {
  school: 'Winthrop University, Rock Hill- SC',
  dates: '8/22 – Present',
  degree: 'B.S. Candidate Computer Science | Minor in Mathematics and Applied Physics',
  coursework: [
    'Algorithms & Data Structures, Computer Science I & II',
    'Computer Architecture, Operating Systems, Computer Science Theory, Software Engineering I & II',
    'System Administration, Network Processing, Database Processing, Cloud Computing, Web Programming',
    'Mathematical Modelling, Discrete Mathematics, Calculus I & II, Physics with Calculus, Modern Physics',
    'Material Science, Probability & Statistics, Linear Algebra',
  ],
};

// ==== experience: unchanged ====
const experience = [
  {
    company: 'Pure Storage',
    role: 'Technical Program Manager Intern',
    location: 'Santa Clara, CA',
    dates: '5/25 – 8/25',
    bullets: [
      'Drove alignment across engineers, QA, and TPMs by defining success criteria and KPIs for release readiness.',
      'Delivered a release readiness dashboard that gave leadership real-time visibility into product health.',
      'Authored the full technical design package (system architecture, data flows, API documentation) to guide engineering teams.',
      'Automated data retrieval with a python script integrating Jira, Jira XRAY, and Jenkins cutting manual tracking by 95% and speeding release decisions.',
      'Mitigated reliability and scalability risks through detailed cross-solution risk analysis.',
    ],
  },
  {
    company: 'Caregiver Mental Wellness Inc',
    role: 'Student Project Manager and Software Engineer',
    location: 'Concord, NC',
    dates: '8/24 – 5/25',
    bullets: [
      'Identified stakeholder pain points by gathering client requirements and translating them into technical specifications.',
      'Created and tested multiple UI/UX prototypes, iterating with client feedback and engineering input to refine usability.',
      'Balanced stakeholder needs and technical constraints ensuring that the product design was feasible and aligned with user expectations.',
      'Designed the database and backend architecture to support secure report storage and generation and provided engineers with implementation documentation.',
      'Coordinated a 7-person Agile team by setting priorities, delegating tasks, and tracking progress towards milestones',
      'Delivered a reporting tool that transitioned stakeholders from a manual reporting system to an automated system, saving them 10+ hours a week in report generation,',
    ],
  },
  {
    company: 'SC Institute of Biomedical Research Summer Program | Winthrop University',
    role: 'Undergraduate Student Researcher',
    location: 'Rock Hill, SC',
    dates: '5/24 – 6/24',
    bullets: [
      'Developed stochastic simulation programs to model disease containment and assess vaccine efficacy using the firefighter model.',
      'Explored variations of bootstrap percolation, including the SIR model, to analyze infection and recovery parameters and investigated a probabilistic disease variation.',
    ],
  },
  {
    company: 'The Academic Success Center | Winthrop University',
    role: 'Tutor',
    location: 'Rock Hill, SC',
    dates: '5/23 – 1/24',
    bullets: [
      'Tutored students in Microeconomics and Macroeconomics, providing academic support through one-on-one sessions and group discussion.',
      'Led study sessions and exam preparations in Econometrics to aid students in developing quantitative problem-solving skills and to provide extra support outside of the classroom.',
    ],
  },
];

// ==== management + technical skills ====
const managementSkills = [
  'Agile / Scrum methodologies',
  'Stakeholder communication',
  'Requirements gathering & analysis',
  'Cross-functional team leadership',
  'Risk analysis & mitigation',
];

const technicalSkills = [
  'System architecture design',
  'Database design & management',
  'API documentation & integration',
  'Cloud infrastructure basics (AWS)',
  'UI/UX design principles',
];

export default function Resume() {
  return (
    <div className="bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-24">
        {/* Page heading + download */}
        <header className="pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">Resume</h1>
              <p className="mt-3 text-neutral-700 max-w-2xl">
                Product Architect -  From Concept to Code
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/resume.pdf" className="px-5 py-3 rounded-2xl bg-black text-white text-sm font-medium">
                Download PDF
              </Link>
              <Link href="/resume.pdf" target="_blank" className="px-5 py-3 rounded-2xl border border-black/15 text-sm text-neutral-800">
                Open in new tab
              </Link>
            </div>
          </div>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-black/20 via-black/10 to-transparent" />
        </header>

        {/* EDUCATION */}
        <Reveal as="section" className="mt-10">
          <div className="sticky top-16 z-10 -mx-6 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h2 className="text-2xl font-semibold text-neutral-900">EDUCATION</h2>
          </div>

          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="text-lg font-medium text-neutral-900">{education.school}</div>
              <div className="text-sm text-neutral-500">{education.dates}</div>
            </div>
            <div className="mt-2 text-neutral-800">{education.degree}</div>

            <div className="mt-4">
              <div className="font-medium text-neutral-900">Selected Coursework:</div>
              <ul className="mt-2 space-y-1 text-neutral-700 list-disc pl-5">
                {education.coursework.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        {/* EXPERIENCE */}
        <Reveal as="section" className="mt-12">
          <div className="sticky top-16 z-10 -mx-6 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h2 className="text-2xl font-semibold text-neutral-900">RELEVANT EXPERIENCE</h2>
          </div>

          <div className="mt-4 space-y-6">
            {experience.map((job) => (
              <article key={job.company} className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <div className="text-lg font-medium text-neutral-900">{job.company}</div>
                    <div className="text-neutral-700">{job.role}</div>
                  </div>
                  <div className="text-sm text-neutral-500">{job.location} · {job.dates}</div>
                </div>
                <ul className="mt-4 space-y-2 text-neutral-700 list-disc pl-5">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Reveal>

        {/* MANAGEMENT SKILLS */}
        <Reveal as="section" className="mt-12">
          <div className="sticky top-16 z-10 -mx-6 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h2 className="text-2xl font-semibold text-neutral-900">MANAGEMENT SKILLS</h2>
          </div>
          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <ul className="space-y-2 text-neutral-700 list-disc pl-5">
              {managementSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* TECHNICAL SKILLS */}
        <Reveal as="section" className="mt-12">
          <div className="sticky top-16 z-10 -mx-6 px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <h2 className="text-2xl font-semibold text-neutral-900">TECHNICAL SKILLS</h2>
          </div>
          <div className="mt-4 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <ul className="space-y-2 text-neutral-700 list-disc pl-5">
              {technicalSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* FOOTER: skills carousel */}
      <footer className="mt-16 border-t border-black/10 bg-neutral-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <SkillsCarousel items={skillItems} />
        </div>
      </footer>
    </div>
  );
}
