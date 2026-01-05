import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className="bg-[#f5f5f7] text-black dark:bg-black dark:text-white min-h-screen">
      <section className="max-w-5xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-16">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-16 grid gap-12 md:grid-cols-12 items-center">
          {/* PHOTO */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative h-72 w-60 md:h-80 md:w-64 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 bg-neutral-200 dark:bg-neutral-800">
              <Image
                src="/pfp.jpeg"
                alt="Ethel Adwoa Sakyi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* INFO */}
          <div className="md:col-span-7">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Contact
            </h1>

            <div className="mt-8 space-y-6">
              {/* NAME */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Name
                </div>
                <div className="mt-1 text-base md:text-lg">
                  Ethel Adwoa Sakyi
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                  Email
                </div>
                <a
                  href="mailto:etsakyi@outlook.com"
                  className="mt-1 inline-flex items-center gap-2 text-base md:text-lg underline underline-offset-4 hover:opacity-80"
                >
                  {/* Mail icon */}
                  etsakyi@outlook.com
                </a>
              </div>

              {/* LINKS */}
              <div className="pt-2 flex items-center gap-8">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ethel-sakyi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 8.98h4v12H3zM9 8.98h3.8v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14v6.28h-4v-5.57c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.15 1.45-2.15 2.95v5.67H9z" />
                  </svg>
                  LinkedIn
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/EthelSakyi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-base text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.54-3.87-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.72 0-1.26.45-2.3 1.19-3.11-.12-.3-.52-1.52.11-3.16 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 5.8 0c2.21-1.5 3.18-1.19 3.18-1.19.63 1.64.23 2.86.11 3.16.74.81 1.19 1.85 1.19 3.11 0 4.45-2.7 5.42-5.28 5.7.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.53 11.53 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
                  </svg>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
