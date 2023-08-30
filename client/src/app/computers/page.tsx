import { Computer, ExternalLink, Laptop2 } from 'lucide-react'
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
  // const { devices } = await getData<{ devices: Device[] }>(searchParams)

  // {
  //   "computer": {
  //     "id": "2d8b9bee-f465-4be7-9cda-ddc7f30c8d0d",
  //     "name": "notebook",
  //     "specs": {
  //       "so": "windows 11",
  //       "ram": "16GB",
  //       "office": "microsoft 365",
  //       "storage": {
  //         "type": "SSD",
  //         "capacity": 1024
  //       },
  //       "hostname": "notebook.domain.local",
  //       "processor": "intel core i7"
  //     },
  //     "status": "ok",
  //     "deviceId": "0e5ceb85-5632-41ca-ac88-1459699468ae",
  //     "usedBy": "john doe"
  //   }
  // }

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
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Name
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Hostname
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Used by
              </th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">
                Processor
              </th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">
                RAM
              </th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">
                Storage
              </th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">
                SO
              </th>
              <th className="px-3 py-3 font-normal text-sm text-zinc-900/50">
                Office
              </th>
              <th className="w-max[2rem] px-3 py-3 font-normal text-sm text-black/50">
                Status
              </th>
              <th className="w-max[2rem]"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            <tr className="text-black/75 hover:text-black whitespace-nowrap">
              <td className="px-3 py-3 font-light">full name full name</td>
              <td className="px-3 py-3 font-light">hostname</td>
              <td className="px-3 py-3 font-light">used by</td>
              <td className="px-3 py-3 font-light">processor</td>
              <td className="px-3 py-3 font-light">ram</td>
              <td className="px-3 py-3 font-light">storage</td>
              <td className="px-3 py-3 font-light">so</td>
              <td className="px-3 py-3 font-light">office</td>
              <td className="px-3 py-3 font-semibold">warning</td>
              <td className="px-3 py-3 font-light hover:text-blue-600">
                <Link href={`/`}>
                  <ExternalLink strokeWidth={1} />
                </Link>
              </td>
            </tr>

            {/* {devices.map((device) => {
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
            })} */}
          </tbody>
        </table>
      </div>
    </main>
  )
}
