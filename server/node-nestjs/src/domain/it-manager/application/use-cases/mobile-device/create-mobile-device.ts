import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'

import { ContractsRepository } from '../../repositories/contracts-repository'
import { DepartmentsRepository } from '../../repositories/departments-repository'
import { MobileDevicesRepository } from '../../repositories/mobile-devices-repository'

interface CreateMobileDeviceUseCaseProps {
  name: string
  model: string
  serialNumber: string
  type: string
  invoice: string
  assetTag: string | null
  operatingSystem: string
  serviceCompany: string | null
  serviceNumber: string | null
  purchaseDate: Date
  warrantyEndDate: Date | null
  departmentId: string | null
  contractId: string | null
}

type CreateMobileDeviceUseCaseResponse = Either<ResourceNotFoundError, { mobileDevice: MobileDevice }>

export class CreateMobileDeviceUseCase implements UseCase {
  constructor(
    private mobileDevicesRepository: MobileDevicesRepository,
    private contractsRepository: ContractsRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute(props: CreateMobileDeviceUseCaseProps): Promise<CreateMobileDeviceUseCaseResponse> {
    if (props.contractId) {
      const contract = await this.contractsRepository.findById(props.contractId)

      if (!contract) {
        return failure(new ResourceNotFoundError(`Contract with id ${props.contractId} not found`))
      }
    }

    if (props.departmentId) {
      const department = await this.departmentsRepository.findById(props.departmentId)

      if (!department) {
        return failure(new ResourceNotFoundError(`Department with id ${props.departmentId} not found`))
      }
    }

    const mobileDevice = MobileDevice.create({
      name: props.name,
      model: props.model,
      serialNumber: props.serialNumber,
      type: props.type,
      invoice: props.invoice,
      assetTag: props.assetTag,
      operatingSystem: props.operatingSystem,
      serviceCompany: props.serviceCompany,
      serviceNumber: props.serviceNumber,
      purchaseDate: props.purchaseDate,
      warrantyEndDate: props.warrantyEndDate,
      contractId: props.contractId ? new UniqueEntityID(props.contractId) : null,
      departmentId: props.departmentId ? new UniqueEntityID(props.departmentId) : null,
    })

    await this.mobileDevicesRepository.create(mobileDevice)

    return success({
      mobileDevice,
    })
  }
}
