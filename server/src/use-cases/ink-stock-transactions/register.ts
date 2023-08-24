import { PrinterInkStockRepository } from '@/repositories/printer-ink-stock-repository'
import { InkStockTransactionsRepository } from '@/repositories/printer-ink-stock-transactions-repository'
import { ResourceNotFound } from '../errors/resource-not-found'

interface InkStockTransactionRequest {
  inkId: string
  operator: string
  transaction: TransactionType
}

export class RegisterInkStockTransactionUseCase {
  constructor(
    private inkStockTransactionsRepository: InkStockTransactionsRepository,
    private printerInkStockRepository: PrinterInkStockRepository,
  ) {}

  async execute({
    inkId,
    operator,
    transaction,
  }: InkStockTransactionRequest): Promise<{ transaction: InkStockTransaction }> {
    const ink = await this.printerInkStockRepository.findById(inkId)

    if (!ink) {
      throw new ResourceNotFound('printer ink')
    }

    await this.printerInkStockRepository.stockTransaction(inkId, transaction)

    const stockTransaction = await this.inkStockTransactionsRepository.create({
      inkId,
      operator,
      type: transaction,
    })

    return {
      transaction: stockTransaction,
    }
  }
}
