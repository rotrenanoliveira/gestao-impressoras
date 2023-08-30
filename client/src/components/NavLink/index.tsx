'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import { usePathname } from 'next/navigation'

interface NavLinkProps {
  to: string
  path: string
  navTitle: string
  icon: ReactNode
}

export function NavLink({ to, path, navTitle, icon }: NavLinkProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <li className="w-full">
      <Link
        href={to}
        className={`w-full flex items-center p-2 rounded-lg transition-colors hover:bg-white gap-3 group ${
          isActive(path) ? 'bg-white' : 'text-gray-800'
        }`}
      >
        {icon}
        <span className="hidden xl:block capitalize">{navTitle}</span>
      </Link>
    </li>
  )
}
