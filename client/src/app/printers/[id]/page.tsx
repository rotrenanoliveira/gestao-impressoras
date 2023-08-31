import { UpdatePrinter } from '@/components/UpdatePrinter'
import { getData } from '@/utils/get-data'
import { ExternalLink, Printer } from 'lucide-react'
import Link from 'next/link'

interface DeviceProps {
  params: {
    id: string
  }
}

interface PrinterRequestResponse {
  printer: Printer
}

export default async function DevicePage({ params }: DeviceProps) {
  const { printer } = await getData<PrinterRequestResponse>(`printers/${params.id}`)

  return (
    <main className="container mx-auto px-8 mb-8">
      <header className="mt-8 flex items-center justify-between text-zinc-800">
        <div className="flex items-center gap-4">
          <Printer size={32} strokeWidth={1} />
          <h1 className="text-xl">{printer.name}</h1>
        </div>

        <Link
          href={'#update'}
          className="flex items-center gap-4 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium"
        >
          Update
          <ExternalLink size={20} strokeWidth={1} />
        </Link>
      </header>

      <div className="w-full border border-black/20 p-4 mt-8 rounded-lg grid grid-cols-6 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Department</span>
          <strong>{printer.department}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">IP address</span>
          <strong className="capitalize">{printer.ip}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">rented in</span>
          <strong className="capitalize">
            {printer.rentedIn ? new Date(printer.rentedIn).toLocaleDateString('pt-BR') : '-'}
          </strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">expires at</span>
          <strong className="capitalize">
            {printer.expiresAt ? new Date(printer.expiresAt).toLocaleDateString('pt-BR') : '-'}
          </strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">status</span>
          <strong className="uppercase">{printer.status}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">OBS</span>
          <strong className="capitalize">{printer.obs ? printer.obs : '-'}</strong>
        </div>
      </div>

      <section id="update">
        <UpdatePrinter printer={printer} />
      </section>
    </main>
  )
}
