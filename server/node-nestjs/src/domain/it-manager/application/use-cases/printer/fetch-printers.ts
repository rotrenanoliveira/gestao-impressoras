import { Either, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { PrintersRepository } from '../../repositories/printers-repository'

type FetchPrintersUseCaseResponse = Either<void, { printers: Printer[] }>

export class FetchPrintersUseCase implements UseCase {
  constructor(private printersRepository: PrintersRepository) {}

  async execute(): Promise<FetchPrintersUseCaseResponse> {
    const printers = await this.printersRepository.findMany()

    return success({
      printers,
    })
  }
}
