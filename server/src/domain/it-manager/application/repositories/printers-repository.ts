import { Printer } from '../../enterprise/entities/printer'

export interface PrintersRepository {
  findById(printerId: string): Promise<Printer | null>
  findMany(): Promise<Printer[]>

  create(printer: Printer): Promise<void>
  save(printer: Printer): Promise<void>
  delete(printerId: string): Promise<void>
}
