'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleNewPrinter(event: FormEvent<HTMLFormElement>) {
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
    const response = await axios.post('http://0.0.0.0:3333/printers', {
      ...printerData,
    })

    setIsSubmitting(false)

    if (response.status === 201) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/printers`)

      router.refresh()
      router.replace(`/printers`)
    }
  }

  return (
    <main className="p-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-2xl">Printer</h1>
        <span className="font-normal text-sm text-zinc-500">Register new printer.</span>
      </header>

      <form onSubmit={handleNewPrinter} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="device-name" className="font-medium text-sm">
            Device name
          </label>
          <input
            type="text"
            name="device-name"
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
            placeholder="obs"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">Some additional information for the printer.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-zinc-950 hover:bg-zinc-800 disabled:cursor-not-allowed text-white px-4 py-2 text-sm font-medium"
        >
          Register
        </button>
      </form>
    </main>
  )
}
