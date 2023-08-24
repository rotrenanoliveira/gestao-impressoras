import { PrintersRepository } from '@/repositories/printers-repository'

export class FetchManyPrintersUseCase {
  constructor(private printersRepository: PrintersRepository) {}

  async execute(): Promise<{ printers: Printer[] }> {
    const printers = await this.printersRepository.findMany()

    return {
      printers,
    }
  }
}
