import { Computer, ExternalLink } from 'lucide-react'
import Link from 'next/link'

type SearchParams = {
  [key: string]: string
}

async function getData<T>(searchParams?: SearchParams) {
  const apiDevicesURL = new URL('http://127.0.0.1:3333/devices')

  if (searchParams) {
    Object.keys(searchParams).forEach((key) => {
      const value = searchParams[key]
      apiDevicesURL.searchParams.set(key, value)
    })
  }

  const res = await fetch(apiDevicesURL, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const data = res.json()

  return data as T
}

interface PageProps {
  searchParams?: SearchParams
}

export default async function Page({ searchParams }: PageProps) {
  const { devices } = await getData<{ devices: Device[] }>(searchParams)

  return (
    <main className="container mx-auto px-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <Computer size={32} strokeWidth={1} />
        <h1 className="text-2xl">Devices</h1>
      </header>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="w-1/3 px-3 py-3 font-normal text-sm text-black/50">
                Device
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Supplier
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Type
              </th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">
                OBS
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Status
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {devices.map((device) => {
              return (
                <tr key={device.id} className="text-black/75 hover:text-black">
                  <td className="px-3 py-3 font-light">{device.name}</td>
                  <td className="px-3 py-3 font-light">{device.supplier}</td>
                  <td className="px-3 py-3 font-light">{device.type}</td>
                  <td className="px-3 py-3 font-light">{device.obs}</td>
                  <td className="px-3 py-3 font-semibold text-green-600">
                    {device.status}
                  </td>
                  <td className="px-3 py-3 font-light hover:text-blue-600">
                    <Link href={`/devices/${device.id}`}>
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
