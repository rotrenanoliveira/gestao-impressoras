import { Laptop2, Printer } from 'lucide-react'
import { NavLink } from '../NavLink'

export function NavBar() {
  return (
    <nav className="mt-12">
      <ul className="flex justify-center items-center flex-col space-y-4">
        <NavLink to="/computers" path="/computers" navTitle="computers" icon={<Laptop2 size={32} strokeWidth={1} />} />

        <NavLink to="/printers" path="/printers" navTitle="printers" icon={<Printer size={32} strokeWidth={1} />} />
      </ul>
    </nav>
  )
}
