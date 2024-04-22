import { Printer } from '../../enterprise/entities/printer'

export abstract class PrintersRepository {
  abstract findById(printerId: string): Promise<Printer | null>
  abstract findMany(): Promise<Printer[]>

  abstract create(printer: Printer): Promise<void>
  abstract save(printer: Printer): Promise<void>
  abstract delete(printer: Printer): Promise<void>
}
