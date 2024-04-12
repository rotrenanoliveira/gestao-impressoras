import { Either, failure, success } from '@/core/either'
import { UseCase } from '@/core/use-cases/use-case'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { PrintersRepository } from '../../repositories/printers-repository'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

interface GetPrinterByIdUseCaseProps {
  printerId: string
}

type GetPrinterByIdUseCaseResponse = Either<ResourceNotFoundError, { printer: Printer }>

export class GetPrinterByIdUseCase implements UseCase {
  constructor(private printersRepository: PrintersRepository) {}

  async execute({ printerId }: GetPrinterByIdUseCaseProps): Promise<GetPrinterByIdUseCaseResponse> {
    const printer = await this.printersRepository.findById(printerId)

    if (!printer) {
      return failure(new ResourceNotFoundError(`Printer with id ${printerId} not found`))
    }

    return success({
      printer,
    })
  }
}
