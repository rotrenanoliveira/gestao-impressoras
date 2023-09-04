import { ResourceNotFound } from '../errors/resource-not-found'
import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'

interface SavePrinterInkStockRequest {
  name: string
}

export class SavePrinterInkUseCase {
  constructor(private printerInkStockRepository: PrinterInkStockRepository) {}

  async execute(inkId: string, { name }: SavePrinterInkStockRequest): Promise<{ ink: PrinterInkStock }> {
    const printerInk = await this.printerInkStockRepository.findById(inkId)

    if (!printerInk) {
      throw new ResourceNotFound('printer ink')
    }

    const ink = await this.printerInkStockRepository.save(inkId, {
      name,
    })

    return {
      ink,
    }
  }
}
