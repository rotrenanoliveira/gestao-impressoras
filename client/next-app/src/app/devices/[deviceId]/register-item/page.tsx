'use client'

import axios from 'axios'
import { FilePlus2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface DeviceProps {
  params: {
    deviceId: string
  }
}

export default function InventoryItemRegister({ params }: DeviceProps) {
  const router = useRouter()

  async function handleNewDevice(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const title = formData.get('title')
    const quantity = formData.get('quantity')
    const location = formData.get('location')
    const description = formData.get('description')

    const inventory = {
      title,
      quantity,
      location,
      device_id: params.deviceId,
      description,
    }

    const response = await axios.post('http://0.0.0.0:3333/inventory', {
      ...inventory,
    })

    if (response.status === 201) {
      router.refresh()
      router.replace(`/devices/${params.deviceId}`)
    }

    console.log(response.status)
    console.log(response.data)
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="flex border border-black/10 items-center flex-col p-8 rounded-xl">
        <header className="flex items-center gap-4 text-zinc-800">
          <FilePlus2 size={32} strokeWidth={1} />
          <h1 className="text-2xl">New Inventory Item</h1>
        </header>

        <form
          onSubmit={handleNewDevice}
          className="w-96 mt-8 p-4 mx-auto space-y-4"
        >
          <div className="space-y-2">
            <label htmlFor="title" className="font-medium text-sm">
              Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              placeholder="title"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="quantity" className="font-medium text-sm">
              Quantity
            </label>

            <input
              id="quantity"
              name="quantity"
              type="number"
              min={0}
              step={1}
              placeholder="quantity"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="font-medium text-sm">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="location"
              className="w-full border border-black/20 placeholder:text-black/25 rounded-md font-light placeholder:font-light placeholder:text-sm p-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="font-medium text-sm">
              Description
            </label>

            <input
              id="description"
              name="description"
              type="text"
              placeholder="description"
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
