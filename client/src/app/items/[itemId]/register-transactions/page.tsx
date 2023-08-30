'use client'
import axios from 'axios'
import { FilePlus2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface DeviceProps {
  params: {
    itemId: string
  }
  searchParams?: {
    deviceId: string
  }
}

export default function InventoryTransactionsRegister({
  params,
  searchParams,
}: DeviceProps) {
  const router = useRouter()

  console.log(params.itemId)

  async function handleNewDevice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const operator = formData.get('operator')
    const transactionType = formData.get('type')
    const QUANTITY_TRANSACTION = 1

    const inventoryTransaction = {
      operator,
      quantity: QUANTITY_TRANSACTION,
      transaction_type: transactionType,
    }

    const response = await axios.post(
      `http://0.0.0.0:3333/inventory/${params.itemId}/transactions`,
      {
        ...inventoryTransaction,
      },
    )

    if (response.status === 201) {
      // if (searchParams) {
      //   router.push(`/devices/${searchParams.deviceId}`)
      // } else {
      //   router.push(`/devices`)
      // }
      router.refresh()

      if (searchParams) {
        router.push(`/devices/${searchParams.deviceId}`)
      }
    }

    console.log(response.status)
    console.log(response.data)
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="flex border border-black/10 items-center flex-col p-8 rounded-xl">
        <header className="flex items-center gap-4 text-zinc-800">
          <FilePlus2 size={32} strokeWidth={1} />
          <h1 className="text-2xl">Inventory Transaction</h1>
        </header>

        <form
          onSubmit={handleNewDevice}
          className="w-96 mt-8 p-4 mx-auto space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="operator" className="font-medium text-sm">
              Operator
            </label>

            <input
              id="operator"
              name="operator"
              type="text"
              placeholder="operator"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="type" className="font-medium text-sm">
              Transaction type
            </label>

            <select
              name="type"
              id="type"
              defaultValue={0}
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            >
              <option value="0" disabled>
                Select transaction type
              </option>
              <option value="insert">insert</option>
              <option value="remove">remove</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-200 rounded-md p-3 font-bold text-blue-600 hover:bg-blue-300/75 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  )
}
