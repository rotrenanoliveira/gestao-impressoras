'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function ComputerRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  async function handleNewComputer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const name = formData.get('device-name')
    const usedBy = formData.get('used-by')
    const department = formData.get('department')
    const hostname = formData.get('hostname')
    const so = formData.get('so')
    const ram = formData.get('ram')
    const office = formData.get('office')
    const processor = formData.get('processor')
    const storage = formData.get('storage')

    const computerData = {
      name,
      usedBy,
      department,
      specs: {
        so,
        ram: `${ram}GB`,
        office,
        hostname,
        processor,
        storage: { type: 'SSD', capacity: Number(storage) },
      },
    }

    const response = await axios.post('http://0.0.0.0:3333/computers', {
      ...computerData,
    })

    setIsSubmitting(false)

    if (response.status === 201) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/computers`)

      router.refresh()
      router.replace(`/computers`)
    }
  }

  return (
    <main className="p-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-2xl">Computer</h1>
        <span className="font-normal text-sm text-zinc-500">Register new computer.</span>
      </header>

      <form onSubmit={handleNewComputer} className="space-y-6">
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
          <label htmlFor="used-by" className="font-medium text-sm">
            Used by
          </label>
          <input
            type="text"
            name="used-by"
            placeholder="Used by"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The name of the user using the pc.</span>
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
          <h1 className="font-medium text-xl">Computer Specs</h1>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="hostname" className="font-medium text-sm">
            Hostname
          </label>
          <input
            type="text"
            name="hostname"
            placeholder="Hostname"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">This will be the hostname of the computer.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="so" className="font-medium text-sm">
            Operational system
          </label>
          <input
            type="text"
            name="so"
            placeholder="Operational system"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The operational system of the computer.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="ram" className="font-medium text-sm">
            RAM
          </label>
          <input
            type="number"
            step={1}
            name="ram"
            placeholder="RAM (in GB)"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The amount of ram memory of the computer.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="office" className="font-medium text-sm">
            Office
          </label>
          <input
            type="text"
            name="office"
            placeholder="Office version"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The version of Microsoft Office.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="processor" className="font-medium text-sm">
            Processor
          </label>
          <input
            type="text"
            name="processor"
            placeholder="Processor"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The processor of the computer.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="storage" className="font-medium text-sm">
            Storage
          </label>
          <input
            type="number"
            name="storage"
            step={1}
            placeholder="Storage (in GB)"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The storage of the computer.</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md disabled:cursor-not-allowed bg-zinc-950 hover:bg-zinc-800 text-white px-4 py-2 text-sm font-medium"
        >
          Register
        </button>
      </form>
    </main>
  )
}
