import { DevicesRepository } from '@/repositories/devices-repository'
import { ResourceNotFound } from '../errors/resource-not-found'
import { PrintersRepository } from '@/repositories/printers-repository'

export class RemovePrinterUseCase {
  constructor(
    private devicesRepository: DevicesRepository,
    private printersRepository: PrintersRepository,
  ) {}

  async execute(printerId: string): Promise<void> {
    const printer = await this.printersRepository.findById(printerId)

    if (!printer) {
      throw new ResourceNotFound('printer')
    }

    await this.printersRepository.remove(printerId)
    await this.devicesRepository.remove(printer.deviceId)

    return
  }
}
