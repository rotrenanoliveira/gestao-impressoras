import { UpdateLicense } from '@/components/UpdateLicense'
import { formatCurrency, formatDate } from '@/utils/format-date'
import { getData } from '@/utils/get-data'
import { BadgeCheck } from 'lucide-react'

interface LicenseProps {
  params: {
    id: string
  }
}

interface LicenseRequestResponse {
  license: License
}

export default async function DevicePage({ params }: LicenseProps) {
  const { license } = await getData<LicenseRequestResponse>(`licenses/${params.id}`)

  return (
    <main className="container mx-auto px-8 mb-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <BadgeCheck size={32} strokeWidth={1} />
        <h1 className="text-xl">{license.description}</h1>
      </header>

      <div className="w-full border border-black/20 p-4 mt-8 rounded-lg grid grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Init At</span>
          <strong>{formatDate(license.initAt)}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Expires At</span>
          <strong>{formatDate(license.expiresAt)}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Registered At</span>
          <strong>{formatDate(license.createdAt)}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Price</span>
          <strong className="capitalize">{formatCurrency(license.price)}</strong>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">OBS</span>
          <strong className="uppercase">{license.obs}</strong>
        </div>
      </div>

      {/*  */}
      <UpdateLicense license={license} />
    </main>
  )
}
