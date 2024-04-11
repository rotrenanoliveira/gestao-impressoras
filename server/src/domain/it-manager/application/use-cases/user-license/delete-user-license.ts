import { UseCase } from '@/core/use-cases/use-case'
import { UserLicensesRepository } from '../../repositories/user-licenses-repository'
import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

interface DeleteUserLicenseUseCaseProps {
  userLicenseId: string
}

type DeleteUserLicenseUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteUserLicenseUseCase implements UseCase {
  constructor(private userLicensesRepository: UserLicensesRepository) {}

  async execute({ userLicenseId }: DeleteUserLicenseUseCaseProps): Promise<DeleteUserLicenseUseCaseResponse> {
    const userLicense = await this.userLicensesRepository.findById(userLicenseId)

    if (!userLicense) {
      return failure(new ResourceNotFoundError(`User license with id ${userLicenseId} not found`))
    }

    await this.userLicensesRepository.delete(userLicenseId)

    return success({})
  }
}
