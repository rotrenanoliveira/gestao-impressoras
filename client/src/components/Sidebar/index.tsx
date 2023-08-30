import Link from 'next/link'
import Image from 'next/image'

import { NavBar } from '../NavBar'

export function Sidebar() {
  return (
    <aside className="w-16 py-4 px-2 h-full xl:w-60">
      <header className="w-full flex justify-center items-center gap-4">
        <Link href={'/'} className="flex justify-center items-center gap-4">
          <Image src="/logo.png" width={48} height={48} alt="" />

          <h1 className="text-xl hidden xl:block">
            <strong className="text-blue-500">IT</strong> Manager
          </h1>
        </Link>
      </header>

      <NavBar />
    </aside>
  )
}
