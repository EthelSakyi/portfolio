'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center">
      <nav className="w-[95%] max-w-7xl rounded-2xl border border-black/10 dark:border-white/10 
                      backdrop-blur bg-white/30 dark:bg-black/30 shadow-md px-6 h-16 flex 
                      items-center justify-between">
        {/* Left side: logo + name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-full overflow-hidden ring-1 ring-black/10 dark:ring-white/20">
            <Image
              src="/pfp.jpeg"
              alt="Ethel Sakyi"
              width={24}
              height={24}
              className="h-6 w-6 object-cover"
            />
          </div>
          <span className="text-sm tracking-[0.25em] uppercase text-black dark:text-white">
            ETHEL SAKYI
          </span>
        </Link>

        {/* Right side: nav links */}
        <div className="flex items-center gap-8 text-sm text-black/70 dark:text-white/70">
          <Link href="/about" className="hover:opacity-100 opacity-80">About</Link>
          <Link href="/resume" className="hover:opacity-100 opacity-80">Resume</Link>
          <Link href="/contact" className="hover:opacity-100 opacity-80">Contact</Link>
        </div>
      </nav>
    </header>
  );
}
