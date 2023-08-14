import './globals.css'
import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'

export const metadata: Metadata = {
  title: 'IT Manager',
  description: 'IT manager to small business',
}

const roboto = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
