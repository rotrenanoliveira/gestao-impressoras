import { ResourceNotFound } from '../errors/resource-not-found'
import { PrintersRepository } from '@/repositories/printers-repository'

export class GetPrinterByIdUseCase {
  constructor(private printersRepository: PrintersRepository) {}

  async execute(printerId: string): Promise<{ printer: Printer }> {
    const printer = await this.printersRepository.findById(printerId)

    if (!printer) {
      throw new ResourceNotFound('printer')
    }

    return {
      printer,
    }
  }
}
