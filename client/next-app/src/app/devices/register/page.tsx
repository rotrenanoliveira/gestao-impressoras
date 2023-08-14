'use client'

import axios from 'axios'
import { FilePlus2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function DeviceRegister() {
  const router = useRouter()

  async function handleNewDevice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const name = formData.get('name')
    const supplier = formData.get('supplier')
    const obs = formData.get('obs')

    const device = {
      obs,
      name,
      supplier,
      type: 'printer',
      status: 'ok',
      acquisition_type: 'rented',
      rented_in: new Date('2020, 10, 28'),
      contract_expiration: new Date('2023, 10, 28'),
      description: null,
    }

    const response = await axios.post('http://0.0.0.0:3333/devices', {
      ...device,
    })

    if (response.status === 201) {
      router.push('/devices')
    }

    console.log(response.status)
    console.log(response.data)
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="flex border border-black/10 items-center flex-col p-8 rounded-xl">
        <header className="flex items-center gap-4 text-zinc-800">
          <FilePlus2 size={32} strokeWidth={1} />
          <h1 className="text-2xl">New Device</h1>
        </header>

        <form
          onSubmit={handleNewDevice}
          className="w-96 mt-8 p-4 mx-auto space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="name" className="font-medium text-sm">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="name"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="supplier" className="font-medium text-sm">
              Supplier
            </label>

            <input
              id="supplier"
              name="supplier"
              type="text"
              placeholder="supplier"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="obs" className="font-medium text-sm">
              OBS
            </label>

            <input
              id="obs"
              name="obs"
              type="text"
              placeholder="obs"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
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
