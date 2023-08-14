import { Package, Tv2 } from 'lucide-react'
import { NavLink } from '../NavLink'

export function NavBar() {
  return (
    <nav className="mt-12">
      <ul className="flex justify-center items-center flex-col space-y-4">
        <NavLink
          to="/devices"
          path="/devices"
          navTitle="devices"
          icon={<Tv2 size={32} strokeWidth={1} />}
        />

        <NavLink
          to="/inventory"
          path="/inventory"
          navTitle="inventory"
          icon={<Package size={32} strokeWidth={1} />}
        />
      </ul>
    </nav>
  )
}
