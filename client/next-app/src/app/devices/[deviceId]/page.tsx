import { ListMinus, Package, Plus, PlusCircle, Send, Tv2 } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface DeviceProps {
  params: {
    deviceId: string
  }
}

async function getDevice(deviceId: string): Promise<{ device: Device }> {
  const res = await fetch(`http://127.0.0.1:3333/devices/${deviceId}`, {
    cache: 'no-store',
  })

  if (res.status === 404) {
    return notFound()
  }

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getInventory(deviceId: string): Promise<{ items: Inventory[] }> {
  const res = await fetch(
    `http://127.0.0.1:3333/inventory?deviceId=${deviceId}`,
    {
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getInventoryTransaction(item: string[]) {
  if (item.length === 0) {
    return {
      transactions: [],
    } as {
      transactions: InventoryTransaction[]
    }
  }

  let data: InventoryTransaction[] = []

  for (const id of item) {
    const res = await fetch(
      `http://127.0.0.1:3333/inventory/transactions?itemId=${id}`,
      {
        next: {
          tags: ['transactions'],
        },
      },
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const responseData: { transactions: InventoryTransaction[] } =
      await res.json()

    data = [...data, ...responseData.transactions]
  }

  return {
    transactions: data,
  }
}

export default async function DevicePage({ params }: DeviceProps) {
  const { device } = await getDevice(params.deviceId)
  const { items: inventory } = await getInventory(params.deviceId)

  const itemsId = inventory.map((item) => item.id)
  const { transactions } = await getInventoryTransaction(itemsId)
  return (
    <main className="container mx-auto px-8 mb-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <Tv2 size={32} strokeWidth={1} />
        <h1 className="text-2xl">{device.name}</h1>
      </header>

      <div className="w-full border border-black/20 p-4 mt-8 rounded-xl grid grid-cols-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-black/50 uppercase text-sm">type:</span>
          <strong className="uppercase">{device.type}</strong>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black/50 uppercase text-sm">supplier:</span>
          <strong className="uppercase">{device.supplier}</strong>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black/50 uppercase text-sm">status:</span>
          <strong className="uppercase">{device.status}</strong>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black/50 uppercase text-sm">obs:</span>
          <strong className="uppercase">{device.obs}</strong>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black/50 uppercase text-sm">description:</span>
          <strong className="uppercase">{device.description}</strong>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-black/50 uppercase text-sm">registred at:</span>
          <strong className="uppercase">
            {new Date(device.created_at).toLocaleDateString('en-GB')}
          </strong>
        </div>
      </div>

      {/* Inventory  */}

      <header className="mt-8 flex items-center justify-between text-zinc-800">
        <div className="flex items-center gap-4">
          <Package size={32} strokeWidth={1} />
          <h1 className="text-2xl">Inventory</h1>
        </div>

        <Link href={`/devices/${device.id}/register-item`}>
          <button className="border flex items-center  justify-between gap-4 hover:border-blue-500 hover:bg-blue-50 rounded-lg py-3 px-6 font-semibold text-blue-600">
            Item
            <PlusCircle size={24} strokeWidth={1} />
          </button>
        </Link>
      </header>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Title
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Quantity
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Location
              </th>
              <th className="w-1/3 px-3 py-3 font-normal text-sm text-black/50">
                Description
              </th>
              <th className=" px-3 py-3 font-normal text-sm text-black/50">
                Transactions
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Send Email
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200">
            {inventory.map((item) => {
              return (
                <tr key={item.id} className="text-black/75 hover:text-black">
                  <td className="px-3 py-3 font-light">{item.title}</td>
                  <td className="px-3 py-3 font-light">{item.quantity}</td>
                  <td className="px-3 py-3 font-light">{item.location}</td>
                  <td className="px-3 py-3 font-light">{item.description}</td>
                  <td className="px-3 py-3 font-light">
                    <Link
                      href={`/items/${item.id}/register-transactions?deviceId=${params.deviceId}`}
                      className="flex items-center gap-4 hover:text-blue-600"
                    >
                      Add
                      <Plus strokeWidth={1} />
                    </Link>
                  </td>
                  <td className="px-3 py-3 font-light hover:text-blue-600">
                    <Link href={`mailto:?subject=${device.name}&cc=&bcc=`}>
                      <Send strokeWidth={1} />
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Inventory Transactions  */}

      <div className="mt-8 flex items-center gap-4 text-zinc-800">
        <ListMinus size={32} strokeWidth={1} />
        <h1 className="text-2xl">Inventory Transaction</h1>
      </div>

      <div className="w-full mt-8 border border-zinc-300 rounded-lg">
        <table className="w-full border-collapse divide-y table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Item
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Transaction Type
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Quantity
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Operator
              </th>
              <th className="px-3 py-3 font-normal text-sm text-black/50">
                Registered at
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200">
            {transactions.map((transaction) => {
              return (
                <tr
                  key={transaction.id}
                  className="text-black/75 hover:text-black"
                >
                  <td className="px-3 py-3 font-light">
                    {transaction.item.title}
                  </td>
                  <td className="px-3 py-3 font-light">
                    {transaction.transaction_type === 'INSERT' ? (
                      <span className="font-semibold text-green-600">
                        {transaction.transaction_type}
                      </span>
                    ) : (
                      <span className="font-semibold text-red-600">
                        {transaction.transaction_type}
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3 font-light">
                    {transaction.quantity}
                  </td>
                  <td className="px-3 py-3 font-light">
                    {transaction.operator}
                  </td>
                  <td className="px-3 py-3 font-light">
                    {new Date(transaction.created_at).toLocaleString('en-GB')}
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
