import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { Printer } from '@/domain/it-manager/enterprise/entities/printer'

import { ContractsRepository } from '../../repositories/contracts-repository'
import { PrintersRepository } from '../../repositories/printers-repository'

interface CreatePrinterUseCaseProps {
  name: string
  colorMode: 'black-and-white' | 'color'
  printingType: 'laser' | 'inkjet' | 'dot-matrix' | 'thermal'
  ipAddress?: string | null
  obs: string | null
  contractId: string | null
  serialNumber: string
  model: string
  invoice: string
  assetTag: string | null
  purchaseDate: Date
  warrantyEndDate: Date | null
}

type CreatePrinterUseCaseResponse = Either<ResourceNotFoundError, { printer: Printer }>

export class CreatePrinterUseCase implements UseCase {
  constructor(
    private printersRepository: PrintersRepository,
    private contractsRepository: ContractsRepository,
  ) {}

  async execute(props: CreatePrinterUseCaseProps): Promise<CreatePrinterUseCaseResponse> {
    if (props.contractId) {
      const contract = await this.contractsRepository.findById(props.contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${props.contractId} not found`))
      }
    }

    const printer = Printer.create({
      contractId: props.contractId ? new UniqueEntityID(props.contractId) : null,
      serialNumber: props.serialNumber,
      model: props.model,
      invoice: props.invoice,
      assetTag: props.assetTag,
      purchaseDate: props.purchaseDate,
      warrantyEndDate: props.warrantyEndDate,
      name: props.name,
      colorMode: props.colorMode,
      printingType: props.printingType,
      ipAddress: props.ipAddress,
      obs: props.obs,
    })

    await this.printersRepository.create(printer)

    return success({
      printer,
    })
  }
}
