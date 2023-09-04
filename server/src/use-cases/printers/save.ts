import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { PrintersRepository } from '@/repositories/printers-repository'

interface SavePrinterRequest {
  name?: string
  department?: string
  status?: DeviceStatus
  ip?: string
  obs?: string
  rentedIn?: Date
  expiresAt?: Date
}

export class SavePrinterUseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private printersRepository: PrintersRepository,
  ) {}

  async execute(printerId: string, data: SavePrinterRequest): Promise<{ printer: Printer }> {
    const currentPrinter = await this.printersRepository.findById(printerId)

    if (!currentPrinter) {
      throw new ResourceNotFound('printer')
    }

    if (data.department || data.status || data.name) {
      const { deviceId } = currentPrinter
      await this.devicesRepository.save(deviceId, { ...data })
    }

    if (!data.ip && !data.obs && !data.rentedIn && !data.expiresAt) {
      return {
        printer: {
          ...currentPrinter,
          name: data.name!,
          status: data.status!,
        },
      }
    }

    const printer = await this.printersRepository.save(printerId, { ...data })

    if (!printer) {
      throw new Error('Failed to save printer')
    }

    return {
      printer,
    }
  }
}
