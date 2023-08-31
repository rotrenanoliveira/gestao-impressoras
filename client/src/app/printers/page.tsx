import { getData } from '@/utils/get-data'
import { ExternalLink, Printer } from 'lucide-react'
import Link from 'next/link'

interface PrintersRequestResponse {
  printers: Printer[]
}

export default async function Page() {
  const { printers } = await getData<PrintersRequestResponse>('printers')

  return (
    <main className="container mx-auto px-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <Printer size={32} strokeWidth={1} />
        <h1 className="text-2xl">Printers</h1>
      </header>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg overflow-x-scroll">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">Device name</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Department</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">IP</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Rented in</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Expires At</th>
              <th className="w-max[2rem] px-3 py-3 font-normal text-sm text-black/50">Status</th>
              <th className="w-max[2rem]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {printers.map((printer) => {
              return (
                <tr key={printer.id} className="text-black/75 hover:bg-zinc-50 hover:text-black whitespace-nowrap">
                  <td className="px-3 py-3 font-light">{printer.name}</td>
                  <td className="px-3 py-3 font-light">{printer.department}</td>
                  <td className="px-3 py-3 font-light">{printer.ip}</td>
                  <td className="px-3 py-3 font-light">
                    {printer.rentedIn ? new Date(printer.rentedIn).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-3 py-3 font-light">
                    {printer.expiresAt ? new Date(printer.expiresAt).toLocaleDateString('pt-BR') : '-'}
                  </td>
                  <td className="px-3 py-3 uppercase font-semibold">{printer.status}</td>
                  <td className="px-3 py-3 font-light hover:text-blue-600">
                    <Link href={`/printers/${printer.id}`}>
                      <ExternalLink strokeWidth={1} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </main>
  )
}
