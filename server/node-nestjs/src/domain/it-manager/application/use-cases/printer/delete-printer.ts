import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'

import { PrintersRepository } from '../../repositories/printers-repository'

interface DeletePrinterUseCaseProps {
  printerId: string
}

type DeletePrinterUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeletePrinterUseCase implements UseCase {
  constructor(private printersRepository: PrintersRepository) {}

  async execute({ printerId }: DeletePrinterUseCaseProps): Promise<DeletePrinterUseCaseResponse> {
    const printer = await this.printersRepository.findById(printerId)

    if (!printer) {
      return failure(new ResourceNotFoundError(`Printer with id ${printerId} not found`))
    }

    await this.printersRepository.delete(printer)

    return success({})
  }
}
