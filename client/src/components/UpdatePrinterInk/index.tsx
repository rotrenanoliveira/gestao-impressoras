'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface UpdatePrinterInkProps {
  ink: PrinterInk
}

export function UpdatePrinterInk({ ink }: UpdatePrinterInkProps) {
  const router = useRouter()

  async function handleUpdatePrinter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const name = formData.get('ink-name')

    const printerData = {
      name,
    }

    const response = await axios.put(`http://0.0.0.0:3333/ink-stock/${ink.id}`, {
      ...printerData,
    })

    console.log(response)

    if (response.status === 200) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/ink-stock/${ink.id}`)
      await axios.post(`http://localhost:3000/api/revalidate?path=/printers/${ink.printer.id}`)

      router.refresh()
      router.replace(`/ink-stock/${ink.id}`)
    }
  }

  return (
    <main className="mt-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-2xl">Printer Ink</h1>
        <span className="font-normal text-sm text-zinc-500">Update printer ink info.</span>
      </header>

      <form onSubmit={handleUpdatePrinter} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="ink-name" className="font-medium text-sm">
            Name
          </label>
          <input
            type="text"
            name="ink-name"
            defaultValue={ink.name}
            placeholder="Ink name"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">This is the model of the device.</span>
        </div>

        <button
          type="submit"
          className="rounded-md bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium"
        >
          Update
        </button>
      </form>
    </main>
  )
}
