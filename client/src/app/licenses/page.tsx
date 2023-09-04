import { formatCurrency, formatDate } from '@/utils/format-date'
import { getData } from '@/utils/get-data'
import { BadgeCheck, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface LicensesRequestResponse {
  licenses: License[]
}

export default async function Page() {
  const { licenses } = await getData<LicensesRequestResponse>('licenses')

  return (
    <main className="container mx-auto px-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <BadgeCheck size={32} strokeWidth={1} />
        <h1 className="text-2xl">Licenses</h1>
      </header>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg overflow-x-scroll">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">Description</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Price</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Init At</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Expires At</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">Registered At</th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">OBS</th>
              <th className="w-max[2rem]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {licenses.map((license) => {
              return (
                <tr key={license.id} className="text-black/75 hover:bg-zinc-50 hover:text-black whitespace-nowrap">
                  <td className="px-3 py-3 font-light">{license.description}</td>
                  <td className="px-3 py-3 font-light">{formatCurrency(license.price)}</td>
                  <td className="px-3 py-3 font-light">{formatDate(license.initAt)}</td>
                  <td className="px-3 py-3 font-light">{formatDate(license.expiresAt)}</td>
                  <td className="px-3 py-3 font-light">{formatDate(license.createdAt)}</td>
                  <td className="px-3 py-3 font-light">{license.obs}</td>
                  <td className="px-3 py-3 font-light hover:text-blue-600">
                    <Link href={`/licenses/${license.id}`}>
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
