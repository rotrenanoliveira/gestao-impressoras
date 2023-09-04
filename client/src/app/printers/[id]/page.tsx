import { UpdatePrinter } from '@/components/UpdatePrinter'
import { getData } from '@/utils/get-data'
import { ExternalLink, ListMinus, PaintBucket, Plus, PlusCircle, Printer, Send } from 'lucide-react'
import Link from 'next/link'

interface DeviceProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: DeviceProps) {
  const { printer } = await getData<{ printer: Printer }>(`printers/${params.id}`)
  const { inkStock } = await getData<{ inkStock: PrinterInk[] }>(`ink-stock?printer=${params.id}`)

  let transactions: InkStockTransaction[] = []

  for (const ink of inkStock) {
    const data = await getData<{ transactions: InkStockTransaction[] }>(`stock-transactions?ink=${ink.id}`)

    transactions = [...transactions, ...data.transactions]
  }
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

      {/*  */}
      <div className="mt-8 flex items-center justify-between text-zinc-800">
        <div className="flex items-center gap-4">
          <PaintBucket size={32} strokeWidth={1} />
          <h1 className="text-xl">Printer ink</h1>
        </div>

        <Link
          href={`/ink-stock/register?printer=${printer.id}`}
          className="flex items-center gap-4 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium"
        >
          New Ink
          <PlusCircle size={20} strokeWidth={1} />
        </Link>
      </div>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg overflow-x-scroll">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">Ink name</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Quantity</th>
              <th className="w-24"></th>
              <th className="w-16"></th>
              <th className="w-16"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {inkStock.map((ink) => {
              return (
                <tr key={ink.id} className="text-black/75 hover:bg-zinc-50 hover:text-black whitespace-nowrap">
                  <td className="px-3 py-3 font-light">{ink.name}</td>
                  <td className="px-3 py-3 font-light">{ink.quantity}</td>
                  <td className="w-24 px-3 border-r py-3 font-light hover:text-blue-600">
                    <Link href={`mailto:`} className="flex items-center gap-2">
                      Request
                      <Send strokeWidth={1} />
                    </Link>
                  </td>
                  <td className="px-3 py-3 border-r flex gap-2 font-light group hover:text-blue-500">
                    <Link href={`/stock-transactions/register?printer=${printer.id}&ink=${ink.id}`}>
                      New transaction
                    </Link>
                    <Plus strokeWidth={1} className="transition-all group-hover:rotate-90" />
                  </td>
                  <td className="w-16 px-5 font-light hover:text-blue-600">
                    <Link href={`/ink-stock/${ink.id}`}>
                      <ExternalLink strokeWidth={1} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/*  */}
      <div className="mt-8 flex items-center justify-between text-zinc-800">
        <div className="flex items-center gap-4">
          <ListMinus size={32} strokeWidth={1} />
          <h1 className="text-xl">Printer ink stock transactions</h1>
        </div>
        {/* 
        <Link
          href={`/ink-stock/register?printer=${printer.id}`}
          className="flex items-center gap-4 rounded-md bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium"
        >
          Register
          <PlusCircle size={20} strokeWidth={1} />
        </Link> */}
      </div>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg overflow-x-scroll">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">Ink name</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Operator</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Transaction type</th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">Registered at</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id} className="text-black/75 hover:bg-zinc-50 hover:text-black whitespace-nowrap">
                  <td className="px-3 py-3 font-light">{transaction.ink.name}</td>
                  <td className="px-3 py-3 font-light">{transaction.operator}</td>
                  <td className="px-3 py-3 font-light">{transaction.type}</td>
                  <td className="px-3 py-3 font-light">
                    {new Date(transaction.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <section id="update">
        <UpdatePrinter printer={printer} />
      </section>
    </main>
  )
}
