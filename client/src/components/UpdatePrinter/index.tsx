'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface UpdatePrinterProps {
  printer: Printer
}

export function UpdatePrinter({ printer }: UpdatePrinterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleUpdatePrinter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get('device-name')
    const department = formData.get('department')
    const ip = formData.get('ip')
    const rentedIn = formData.get('rented-in')
    const expiresAt = formData.get('expires-at')
    const obs = formData.get('obs')

    const printerData = {
      name,
      department,
      ip,
      rentedIn: rentedIn !== '' ? rentedIn : null,
      expiresAt: expiresAt !== '' ? expiresAt : null,
      obs,
    }
    const response = await axios.put(`http://0.0.0.0:3333/printers/${printer.id}`, {
      ...printerData,
    })

    setIsSubmitting(false)

    if (response.status === 200) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/printers`)
      await axios.post(`http://localhost:3000/api/revalidate?path=/printers/${printer.id}`)

      router.refresh()
      router.replace(`/printers/${printer.id}`)
    }
  }

  const rentedIn = printer.rentedIn ? new Date(printer.rentedIn).toISOString().split('T')[0] : ''
  const expiresAt = printer.expiresAt ? new Date(printer.expiresAt).toISOString().split('T')[0] : ''

  return (
    <main className="mt-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-2xl">Printer</h1>
        <span className="font-normal text-sm text-zinc-500">Update printer info.</span>
      </header>

      <form onSubmit={handleUpdatePrinter} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="device-name" className="font-medium text-sm">
            Device name
          </label>
          <input
            type="text"
            name="device-name"
            defaultValue={printer.name}
            placeholder="Device name"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">This is the model of the device.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="department" className="font-medium text-sm">
            Department
          </label>
          <input
            type="text"
            name="department"
            defaultValue={printer.department}
            placeholder="Department"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The department where is located this pc.</span>
        </div>

        <div className="border-b-[1px] pb-2 border-b-zinc-300">
          <h1 className="font-medium text-xl">Printer Info</h1>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="ip" className="font-medium text-sm">
            IP Address
          </label>
          <input
            type="text"
            name="ip"
            defaultValue={printer.ip}
            placeholder="IP v4 address"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">Printer IP v4 address.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="rented-in" className="font-medium text-sm">
            Rented in
          </label>
          <input
            type="date"
            name="rented-in"
            defaultValue={rentedIn}
            placeholder="rented-in version"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">The date when is the device was rented in.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="expires-at" className="font-medium text-sm">
            Expires At
          </label>
          <input
            type="date"
            name="expires-at"
            defaultValue={expiresAt}
            placeholder="expires-at"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">The printer contract expiration date..</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="obs" className="font-medium text-sm">
            OBS
          </label>
          <input
            type="number"
            step={1}
            name="obs"
            defaultValue={printer.obs ?? ''}
            placeholder="obs"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">Some additional information for the printer.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium disabled:cursor-not-allowed"
        >
          Update
        </button>
      </form>
    </main>
  )
}
