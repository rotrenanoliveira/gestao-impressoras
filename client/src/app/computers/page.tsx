import { getData } from '@/utils/get-data'
import { ExternalLink, Laptop2 } from 'lucide-react'
import Link from 'next/link'

interface ComputerRequestResponse {
  computers: Computer[]
}

export default async function Page() {
  const { computers } = await getData<ComputerRequestResponse>('computers')

  return (
    <main className="container mx-auto px-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <Laptop2 size={32} strokeWidth={1} />
        <h1 className="text-2xl">Computers</h1>
      </header>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg overflow-x-scroll">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">Hostname</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Department</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Used by</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Processor</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">RAM</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Storage</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">SO</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Office</th>
              <th className="w-max[2rem] px-3 py-3 font-normal text-sm text-black/50">Status</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Device name</th>
              <th className="w-max[2rem]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {computers.map((computer) => {
              return (
                <tr key={computer.id} className="text-black/75 hover:bg-zinc-50 hover:text-black whitespace-nowrap">
                  <td className="px-3 py-3 font-light">{computer.specs.hostname}</td>
                  <td className="px-3 py-3 font-light">{computer.department}</td>
                  <td className="px-3 py-3 font-light">{computer.usedBy}</td>
                  <td className="px-3 py-3 font-light">{computer.specs.processor}</td>
                  <td className="px-3 py-3 font-light">{computer.specs.ram}</td>
                  <td className="px-3 py-3 font-light">
                    {computer.specs.storage.type} - {computer.specs.storage.capacity}GB
                  </td>
                  <td className="px-3 py-3 font-light">{computer.specs.so}</td>
                  <td className="px-3 py-3 font-light">{computer.specs.office}</td>
                  <td className="px-3 py-3 font-semibold">{computer.status}</td>
                  <td className="px-3 py-3 font-light">{computer.name}</td>
                  <td className="px-3 py-3 font-light hover:text-blue-600">
                    <Link href={`/computers/${computer.id}`}>
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
