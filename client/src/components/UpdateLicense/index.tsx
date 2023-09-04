'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface UpdateLicenseProps {
  license: License
}

export function UpdateLicense({ license }: UpdateLicenseProps) {
  const router = useRouter()

  async function handleUpdateLicense(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const description = formData.get('description')
    const initAt = formData.get('init-at')
    const expiresAt = formData.get('expires-at')
    const priceValue = formData.get('price-value')
    const priceCurrency = formData.get('price-currency')
    const obs = formData.get('obs')

    const printerData = {
      description,
      initAt,
      expiresAt,
      obs,
      price: {
        value: priceValue,
        currency: priceCurrency,
      },
    }

    const response = await axios.put(`http://0.0.0.0:3333/licenses/${license.id}`, {
      ...printerData,
    })

    console.log(response)

    if (response.status === 200) {
      await axios.post(`http://localhost:3000/api/revalidate?path=/licenses`)
      await axios.post(`http://localhost:3000/api/revalidate?path=/licenses/${license.id}`)

      router.refresh()
      router.replace(`/licenses/${license.id}`)
    }
  }

  const initAt = license.initAt ? new Date(license.initAt).toISOString().split('T')[0] : ''
  const expiresAt = license.expiresAt ? new Date(license.expiresAt).toISOString().split('T')[0] : ''

  return (
    <main className="mt-8">
      <header className="border-b-[1px] pb-6 border-b-zinc-300 mb-8">
        <h1 className="font-medium text-xl">License</h1>
        <span className="font-normal text-sm text-zinc-500">Update license info.</span>
      </header>

      <form onSubmit={handleUpdateLicense} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-medium text-sm">
            Description
          </label>
          <input
            type="text"
            name="description"
            placeholder="description"
            defaultValue={license.description}
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
            defaultValue={initAt}
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
            defaultValue={expiresAt}
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
            defaultValue={license.price.value}
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
            defaultValue={license.price.currency}
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
            defaultValue={license.obs ?? ''}
            className="border border-zinc-300 rounded-md px-3 py-1 h-9 placeholder:text-zinc-400 placeholder:text-sm"
          />
          <span className="text-xs text-zinc-500">Some additional information for the license.</span>
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
