'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface PageProps {
  searchParams?: {
    printer: string
  }
}

export default function Page({ searchParams }: PageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  if (!searchParams) {
    return router.push('/printers')
  }

  const handleNewPrinterInk = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get('name')
    const quantity = formData.get('quantity')

    const printerInkData = {
      name,
      quantity: Number(quantity),
      printerId: searchParams.printer,
    }

    const response = await axios.post('http://0.0.0.0:3333/ink-stock', {
      ...printerInkData,
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
        <h1 className="font-medium text-2xl">Printer Ink</h1>
        <span className="font-normal text-sm text-zinc-500">Register new printer ink.</span>
      </header>

      <form onSubmit={handleNewPrinterInk} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="font-medium text-sm">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="ink name"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">This is the model of the device.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="quantity" className="font-medium text-sm">
            Quantity
          </label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The department where is located this pc.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-zinc-950 disabled:cursor-not-allowed hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium"
        >
          Register
        </button>
      </form>
    </main>
  )
}
