import { UpdatePrinterInk } from '@/components/UpdatePrinterInk'
import { getData } from '@/utils/get-data'
import { ListMinus, PaintBucket, Plus } from 'lucide-react'
import Link from 'next/link'

interface PrinterInkProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: PrinterInkProps) {
  const { ink } = await getData<{ ink: PrinterInk }>(`ink-stock/${params.id}`)
  const { transactions } = await getData<{ transactions: InkStockTransaction[] }>(`stock-transactions?ink=${params.id}`)

  return (
    <main className="container mx-auto px-8 mb-8">
      <header className="mt-8 flex items-center justify-between text-zinc-800">
        <div className="flex items-center gap-4">
          <PaintBucket size={32} strokeWidth={1} />
          <h1 className="text-xl capitalize">{ink.name}</h1>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/stock-transactions/register?printer=${ink.printer.id}&ink=${ink.id}`}
            className="flex items-center gap-4 rounded-md bg-zinc-950 text-white px-4 py-2 text-sm font-medium group hover:bg-zinc-800"
          >
            Transaction
            <Plus strokeWidth={1} className="transition-all group-hover:rotate-90" />
          </Link>

          <Link
            href={`mailto:`}
            className="flex items-center gap-4 rounded-md bg-zinc-950 text-white px-4 py-2 text-sm font-medium group hover:bg-zinc-800"
          >
            Request
            <Plus strokeWidth={1} className="transition-all group-hover:rotate-90" />
          </Link>
        </div>
      </header>

      <div className="w-full border border-black/20 p-4 mt-8 rounded-lg grid grid-cols-6 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">From printer</span>
          <strong className="capitalize">{ink.printer.name}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Stock quantity</span>
          <strong>{ink.quantity}</strong>
        </div>
      </div>

      {/*  */}

      <section id="update">
        <UpdatePrinterInk ink={ink} />
      </section>

      {/*  */}

      <div className="mt-8 flex items-center justify-between text-zinc-800">
        <div className="flex items-center gap-4">
          <ListMinus size={32} strokeWidth={1} />
          <h1 className="text-xl">Printer ink stock transactions</h1>
        </div>
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
    </main>
  )
}
