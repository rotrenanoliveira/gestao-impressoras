import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { MobileDevice } from '@/domain/it-manager/enterprise/entities/mobile-device'
import { ContractsRepository } from '../../repositories/contracts-repository'
import { DepartmentsRepository } from '../../repositories/departments-repositories'
import { MobileDevicesRepository } from '../../repositories/mobile-devices-repository'

interface EditMobileDeviceUseCaseProps {
  mobileDeviceId: string
  name: string
  model: string
  warrantyEndDate: Date | null
  serviceNumber: string | null
  serviceCompany: string | null
  operatingSystem: string
  departmentId: string | null
  contractId: string | null
}

type EditMobileDeviceUseCaseResponse = Either<ResourceNotFoundError, { mobileDevice: MobileDevice }>

export class EditMobileDeviceUseCase implements UseCase {
  constructor(
    private mobileDevicesRepository: MobileDevicesRepository,
    private contractsRepository: ContractsRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute(props: EditMobileDeviceUseCaseProps): Promise<EditMobileDeviceUseCaseResponse> {
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

    const mobileDevice = await this.mobileDevicesRepository.findById(props.mobileDeviceId)

    if (!mobileDevice) {
      return failure(new ResourceNotFoundError(`Mobile device with id ${props.mobileDeviceId} not found`))
    }

    mobileDevice.name = props.name
    mobileDevice.model = props.model
    mobileDevice.warrantyEndDate = props.warrantyEndDate
    mobileDevice.serviceNumber = props.serviceNumber
    mobileDevice.serviceCompany = props.serviceCompany
    mobileDevice.operatingSystem = props.operatingSystem
    mobileDevice.departmentId = props.departmentId ? new UniqueEntityID(props.departmentId) : null
    mobileDevice.contractId = props.contractId ? new UniqueEntityID(props.contractId) : null

    await this.mobileDevicesRepository.save(mobileDevice)

    return success({
      mobileDevice,
    })
  }
}
