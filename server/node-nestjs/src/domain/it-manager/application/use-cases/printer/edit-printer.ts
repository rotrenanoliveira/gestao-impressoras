import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { ContractsRepository } from '../../repositories/contracts-repository'
import { PrintersRepository } from '../../repositories/printers-repository'

interface EditPrinterUseCaseProps {
  printerId: string
  contractId: string | null
  name: string
  model: string
  warrantyEndDate: Date | null
  ipAddress: string | null
}

type EditPrinterUseCaseResponse = Either<ResourceNotFoundError, { printer: Printer }>

export class EditPrinterUseCase implements UseCase {
  constructor(
    private readonly printersRepository: PrintersRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute({
    printerId,
    contractId,
    name,
    model,
    warrantyEndDate,
    ipAddress,
  }: EditPrinterUseCaseProps): Promise<EditPrinterUseCaseResponse> {
    const printer = await this.printersRepository.findById(printerId)

    if (!printer) {
      return failure(new ResourceNotFoundError(`Printer with id ${printerId} not found`))
    }

    if (contractId) {
      const contract = await this.contractsRepository.findById(contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${contractId} not found`))
      }
    }

    printer.contractId = contractId ? new UniqueEntityID(contractId) : null
    printer.name = name
    printer.model = model
    printer.warrantyEndDate = warrantyEndDate
    printer.ipAddress = ipAddress

    await this.printersRepository.save(printer)

    return success({
      printer,
    })
  }
}
