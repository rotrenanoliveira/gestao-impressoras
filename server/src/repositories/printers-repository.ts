export interface PrintersRepository {
  create(data: PrinterCreateInput): Promise<Printer>

  findMany(): Promise<Printer[]>

  findById(printerId: string): Promise<Printer | null>

  save(printerId: string, rawData: Partial<PrinterSaveInput>): Promise<Printer | null>

  remove(printerId: string): Promise<Printer | null>
}
