export interface PrintersRepository {
  create(data: PrinterCreateInput): Promise<Printer>

  findMany(): Promise<Printer[]>

  findById(printerId: string): Promise<Printer | null>

  save(printerId: string, rawData: PrinterSaveInput): Promise<Printer>

  remove(printerId: string): Promise<Printer>
}
