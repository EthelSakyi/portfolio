import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: 'Ethel Sakyi — Portfolio',
  description: 'Apple × Palantir style portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Navbar />
        {/* 
          snap-y = vertical snap
          snap-mandatory = locks into place
          h-screen = each section will fill viewport height
        */}
        <main className="pt-14 snap-y snap-mandatory h-screen overflow-y-scroll">
          {children}
        </main>
      </body>
    </html>
  )
}
