'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface PageProps {
  searchParams?: {
    printer: string
    ink: string
  }
}

export default function Page({ searchParams }: PageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  if (!searchParams) {
    return router.push('/printers')
  }

  const handleNewInkTransaction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const operator = formData.get('operator')
    const transaction = formData.get('transaction')

    const stockTransactionData = {
      operator,
      transaction,
      inkId: searchParams.ink,
    }

    const response = await axios.post('http://0.0.0.0:3333/stock-transactions', {
      ...stockTransactionData,
    })

    setIsSubmitting(false)

    if (response.status === 201) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/printers`)

      router.refresh()
      router.replace(`/printers/${searchParams.printer}`)
    }
  }

  return (
    <main className="p-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-2xl">Printer Ink Transaction</h1>
        <span className="font-normal text-sm text-zinc-500">Register new printer ink stock transaction.</span>
      </header>

      <form onSubmit={handleNewInkTransaction} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="operator" className="font-medium text-sm">
            Operator
          </label>
          <input
            type="text"
            name="operator"
            placeholder="operator"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The name of the operator.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="transaction" className="font-medium text-sm">
            Transaction
          </label>

          <select
            name="transaction"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          >
            <option value="insert">Insert</option>
            <option value="remove">Remove</option>
          </select>
          <span className="text-xs text-zinc-500">The department where is located this pc.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-zinc-950 text-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed hover:bg-zinc-800"
        >
          Register
        </button>
      </form>
    </main>
  )
}
