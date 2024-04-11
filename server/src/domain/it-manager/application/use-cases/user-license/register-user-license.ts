import { Either, failure, success } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'
import { UseCase } from '@/core/use-cases/use-case'
import { UserLicense } from '@/domain/it-manager/enterprise/entities/user-license'
import { DepartmentsRepository } from '../../repositories/departments-repositories'
import { LicensesRepository } from '../../repositories/licenses-repository'
import { UserLicensesRepository } from '../../repositories/user-licenses-repository'
import { UsersRepository } from '../../repositories/users-repository'
import { InvalidParameterError } from '@/core/errors/invalid-parameter-error'

interface RegisterUserLicenseUseCaseProps {
  licenseId: string
  userId: string | null
  departmentId: string | null
}

type RegisterUserLicenseUseCaseResponse = Either<ResourceNotFoundError, { userLicense: UserLicense }>

export class RegisterUserLicenseUseCase implements UseCase {
  constructor(
    private usersLicensesRepository: UserLicensesRepository,
    private licensesRepository: LicensesRepository,
    private usersRepository: UsersRepository,
    private departmentsRepository: DepartmentsRepository,
  ) {}

  async execute({
    licenseId,
    userId,
    departmentId,
  }: RegisterUserLicenseUseCaseProps): Promise<RegisterUserLicenseUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError(`License with id ${licenseId} not found`))
    }

    if (userId !== null && departmentId !== null) {
      return failure(new InvalidParameterError('User and Department cannot be registered at the same time'))
    }

    if (userId === null && departmentId === null) {
      return failure(new InvalidParameterError('User and department cannot be null at the same time'))
    }

    if (userId !== null && departmentId === null) {
      const user = await this.usersRepository.findById(userId)

      if (!user) {
        return failure(new ResourceNotFoundError(`User with id ${userId} not found`))
      }
    }

    if (departmentId !== null && userId === null) {
      const department = await this.departmentsRepository.findById(departmentId)

      if (!department) {
        return failure(new ResourceNotFoundError(`Department with id ${departmentId} not found`))
      }
    }

    const userLicense = UserLicense.create({
      licenseId: new UniqueEntityID(licenseId),
      userId: userId ? new UniqueEntityID(userId) : null,
      departmentId: departmentId ? new UniqueEntityID(departmentId) : null,
    })

    await this.usersLicensesRepository.create(userLicense)

    return success({ userLicense })
  }
}
