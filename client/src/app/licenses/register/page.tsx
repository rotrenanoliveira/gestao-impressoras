'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  async function handleNewLicense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)

    const description = formData.get('description')
    const initAt = formData.get('init-at')
    const expiresAt = formData.get('expires-at')
    const priceValue = formData.get('price-value')
    const priceCurrency = formData.get('price-currency')
    const obs = formData.get('obs')

    const licenseData = {
      description,
      initAt,
      expiresAt,
      obs,
      price: {
        value: priceValue,
        currency: priceCurrency,
      },
    }

    const response = await axios.post('http://0.0.0.0:3333/licenses', {
      ...licenseData,
    })

    setIsSubmitting(false)

    if (response.status === 201) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/licenses`)

      router.refresh()
      router.replace(`/licenses`)
    }
  }

  return (
    <main className="p-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-2xl">License</h1>
        <span className="font-normal text-sm text-zinc-500">Register new license.</span>
      </header>

      <form onSubmit={handleNewLicense} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-medium text-sm">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="description"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The description of the license.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="init-at" className="font-medium text-sm">
            Init at
          </label>
          <input
            type="date"
            name="init-at"
            placeholder="init at"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">The date when license has started.</span>
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
          <span className="text-xs text-zinc-500">The license expiration date.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="price-value" className="font-medium text-sm">
            Price
          </label>
          <input
            step={0.01}
            name="price-value"
            type="number"
            placeholder="License price"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
            required
          />
          <span className="text-xs text-zinc-500">The price of the license.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="price-currency" className="font-medium text-sm">
            Currency
          </label>

          <select
            name="price-currency"
            className="border border-zinc-300 uppercase rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          >
            <option value="USD">usd</option>
            <option value="BRL">brl</option>
            <option value="EUR">eur</option>
          </select>
          <span className="text-xs text-zinc-500">The currency of the license.</span>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="obs" className="font-medium text-sm">
            OBS
          </label>
          <input
            type="text"
            name="obs"
            placeholder="obs"
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">Some additional information for the license.</span>
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
