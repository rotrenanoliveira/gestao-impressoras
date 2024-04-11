import { Either, failure, success } from '@/core/either'
import { LicensesRepository } from '../../repositories/licenses-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found'

interface DeleteLicenseUseCaseProps {
  licenseId: string
}

type DeleteLicenseUseCaseResponse = Either<ResourceNotFoundError, Record<string, never>>

export class DeleteLicenseUseCase {
  constructor(private licensesRepository: LicensesRepository) {}

  async execute({ licenseId }: DeleteLicenseUseCaseProps): Promise<DeleteLicenseUseCaseResponse> {
    const license = await this.licensesRepository.findById(licenseId)

    if (!license) {
      return failure(new ResourceNotFoundError(`License with id ${licenseId} not found`))
    }

    await this.licensesRepository.delete(licenseId)

    return success({})
  }
}
