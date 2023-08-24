export interface PrinterInkStockRepository {
  create(data: PrinterInkStockCreateInput): Promise<PrinterInkStock>

  findMany(): Promise<PrinterInkStock[]>
  findManyByPrinter(printerId: string): Promise<PrinterInkStock[]>

  findById(inkId: string): Promise<PrinterInkStock | null>

  save(inkId: string, data: PrinterInkStockSaveInput): Promise<PrinterInkStock>

  stockTransaction(inkId: string, transaction: 'insert' | 'remove'): Promise<void | null>

  remove(inkId: string): Promise<PrinterInkStock | null>
}
