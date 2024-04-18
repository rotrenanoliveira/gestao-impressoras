import { Injectable } from '@nestjs/common'

import { PrintersRepository } from '@/domain/it-manager/application/repositories/printers-repository'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

@Injectable()
export class PrismaPrintersRepository implements PrintersRepository {
  findById(printerId: string): Promise<Printer | null> {
    throw new Error('Method not implemented.')
  }

  findMany(): Promise<Printer[]> {
    throw new Error('Method not implemented.')
  }

  create(printer: Printer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(printer: Printer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(printerId: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
