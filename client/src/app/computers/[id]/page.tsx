import { UpdateComputer } from '@/components/UpdateComputer'
import { getData } from '@/utils/get-data'
import { Laptop2 } from 'lucide-react'

interface DeviceProps {
  params: {
    id: string
  }
}

interface ComputerRequestResponse {
  computer: Computer
}

export default async function DevicePage({ params }: DeviceProps) {
  const { computer } = await getData<ComputerRequestResponse>(`computers/${params.id}`)

  return (
    <main className="container mx-auto px-8 mb-8">
      <header className="mt-8 flex items-center gap-4 text-zinc-800">
        <Laptop2 size={32} strokeWidth={1} />
        <h1 className="text-xl">{computer.name}</h1>
      </header>

      <div className="w-full border border-black/20 p-4 mt-8 rounded-lg grid grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">Hostname</span>
          <strong>{computer.specs.hostname}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">used by</span>
          <strong className="capitalize">{computer.usedBy}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">processor</span>
          <strong className="capitalize">{computer.specs.processor}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">office</span>
          <strong className="capitalize">{computer.specs.office}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">SO</span>
          <strong className="capitalize">{computer.specs.so}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">storage</span>
          <strong className="capitalize">
            {computer.specs.storage.type} - {computer.specs.storage.capacity}GB
          </strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">ram</span>
          <strong className="capitalize">{computer.specs.ram}</strong>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-black/50 capitalize text-sm">status</span>
          <strong className="uppercase">{computer.status}</strong>
        </div>
      </div>

      <UpdateComputer computer={computer} />
    </main>
  )
}
