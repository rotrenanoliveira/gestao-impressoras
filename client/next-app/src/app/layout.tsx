import './globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'

import { Sidebar } from '@/components/Sidebar'

export const metadata: Metadata = {
  title: 'IT Manager',
  description: 'IT manager to small business',
}

const roboto = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} bg-[#f2f3f5] p-4 box-border w-screen h-screen lg:gap-2 lg:flex`}
      >
        <Sidebar />

        <main className="w-full h-full bg-white rounded-3xl">{children}</main>
      </body>
    </html>
  )
}
