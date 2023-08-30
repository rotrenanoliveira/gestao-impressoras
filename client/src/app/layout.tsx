import './globals.css'
import type { Metadata } from 'next'

import { Manrope } from 'next/font/google'

import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'IT Manager',
  description: 'IT manager to small business',
}

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className} bg-[#f2f3f5] p-4 box-border w-screen h-screen lg:gap-2 lg:flex`}
      >
        <Sidebar />

        <main className="w-full h-full bg-white rounded-3xl overflow-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
