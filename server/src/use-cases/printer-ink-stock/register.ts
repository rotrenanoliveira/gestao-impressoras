import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'
import { PrintersRepository } from '@/repositories/printers-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

interface RegisterPrinterInkUseCaseRequest {
  name: string
  quantity: number
  printerId: string
}

export class RegisterPrinterInkUseCase {
  constructor(
    private printerInkStockRepository: PrinterInkStockRepository,
    private printersRepository: PrintersRepository,
  ) {}

  async execute({ name, quantity, printerId }: RegisterPrinterInkUseCaseRequest): Promise<{ ink: PrinterInkStock }> {
    const printer = await this.printersRepository.findById(printerId)

    if (!printer) {
      throw new ResourceNotFound('printer')
    }

    const ink = await this.printerInkStockRepository.create({
      name,
      quantity,
      printerId,
    })

    return {
      ink,
    }
  }
}
